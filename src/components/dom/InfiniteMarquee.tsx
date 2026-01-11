'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InfiniteMarquee({
    items,
    direction = "left",
    speed = 0.05,
    className = ""
}: {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    let xPercent = 0;
    let moveDirection = direction === "left" ? -1 : 1;
    const velocity = useRef(1);

    useGSAP(() => {
        const animate = () => {
            if (xPercent <= -100) xPercent = 0;
            if (xPercent > 0) xPercent = -100;

            if (sliderRef.current) {
                sliderRef.current.style.transform = `translateX(${xPercent}%)`;
            }

            // Move with constant speed * current scroll velocity multiplier
            xPercent += speed * moveDirection * velocity.current;
            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        // Update velocity based on scroll
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: "max",
            onUpdate: (self) => {
                velocity.current = 1 + Math.abs(self.getVelocity() / 300);
                gsap.to(velocity, {
                    current: 1,
                    duration: 0.5,
                    overwrite: true
                });
            }
        });

        return () => cancelAnimationFrame(animId);
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative flex items-center overflow-hidden whitespace-nowrap ${className}`}>
            <div ref={sliderRef} className="relative flex whitespace-nowrap will-change-transform">
                {[...items, ...items, ...items, ...items].map((item, i) => (
                    <span key={i} className="mx-8 text-6xl font-serif text-white uppercase tracking-widest leading-none opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
