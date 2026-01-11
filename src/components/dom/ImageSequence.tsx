'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
    framePath: (index: number) => string;
    frameCount: number;
    canvasWidth?: number;
    canvasHeight?: number;
}

export default function ImageSequence({
    framePath,
    frameCount,
    canvasWidth = 1920,
    canvasHeight = 1080
}: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // 1. Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = framePath(i);
                    img.onload = () => {
                        loadedImages[i - 1] = img; // Ensure order
                        resolve();
                    };
                    img.onerror = () => {
                        // Handle missing frames gracefully-ish? 
                        console.warn(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            // Track progress
            let loadedCount = 0;
            promises.forEach(p => p.then(() => {
                loadedCount++;
                setProgress(Math.round((loadedCount / frameCount) * 100));
            }));

            await Promise.all(promises);
            setImages(loadedImages);
            setLoading(false);
        };

        if (frameCount > 0) {
            loadImages();
        }
    }, [frameCount, framePath]);

    // 2. Animate on Scroll
    useEffect(() => {
        if (images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Set intial frame
        const renderFrame = (index: number) => {
            if (images[index]) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                // Draw image responsibly (contain or cover logic could go here)
                // For now, stretching to canvas size which should match aspect ratio
                ctx.drawImage(images[index], 0, 0, canvasWidth, canvasHeight);
            }
        };

        renderFrame(0);

        const renderObj = { frame: 0 };

        const ctxTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${frameCount * 0.5}%`, // Speed control relative to frame count
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(self.progress * (frameCount - 1))
                );
                if (frameIndex !== renderObj.frame) {
                    renderObj.frame = frameIndex;
                    renderFrame(frameIndex);
                }
            }
        });

        return () => {
            ctxTrigger.kill();
        };
    }, [images, frameCount, canvasWidth, canvasHeight]);

    return (
        <div ref={containerRef} className="relative h-screen w-full bg-black">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center text-white font-mono text-xs z-50">
                    LOADING SEQUENCE... {progress}%
                </div>
            )}
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
