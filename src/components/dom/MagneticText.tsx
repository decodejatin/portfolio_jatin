'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MagneticText({
    children,
    className = "",
    strength = 0.3,
    delay = 0,
    stagger = 0.05
}: {
    children: string;
    className?: string;
    strength?: number;
    delay?: number;
    stagger?: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const chars = container.querySelectorAll('.char');

        // THE "JUMBLED / SCATTER" REVEAL
        // Letters come together from different directions to form the word
        chars.forEach((char, i) => {
            const randomX = (Math.random() - 0.5) * 400; // Random X spread
            const randomY = (Math.random() - 0.5) * 400; // Random Y spread
            const randomRotation = (Math.random() - 0.5) * 360;

            gsap.fromTo(char,
                {
                    x: randomX,
                    y: randomY,
                    rotation: randomRotation,
                    opacity: 0,
                    scale: 0,
                    color: "#E11D48" // Start Red
                },
                {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    color: "#F5F5F7", // End White
                    duration: 1.5,
                    ease: "expo.out",
                    delay: delay + (i * stagger), // True stagger
                    onComplete: () => {
                        gsap.to(char, { color: "#F5F5F7", duration: 0.5 });
                    }
                }
            );
        });

        // Magnetic Interaction
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const mouseFactor = 120;

            chars.forEach((char: any) => {
                const { left, top, width, height } = char.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;

                const dist = Math.hypot(clientX - centerX, clientY - centerY);

                if (dist < mouseFactor) {
                    const power = (1 - dist / mouseFactor);
                    const x = (clientX - centerX) * strength * power;
                    const y = (clientY - centerY) * strength * power;

                    gsap.to(char, {
                        x,
                        y,
                        color: "#E11D48",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(char, {
                        x: 0,
                        y: 0,
                        color: "#F5F5F7",
                        duration: 0.6,
                        ease: "power3.out"
                    });
                }
            });
        };

        const handleMouseLeave = () => {
            chars.forEach((char: any) => {
                gsap.to(char, {
                    x: 0,
                    y: 0,
                    color: "#F5F5F7",
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength, stagger, delay]);

    return (
        <div ref={containerRef} className={`inline-block overflow-visible ${className}`}>
            {children.split('').map((char, i) => (
                <span key={i} className="char inline-block whitespace-pre will-change-transform pb-2">
                    {char}
                </span>
            ))}
        </div>
    );
}
