'use client';

import { useRef, useEffect } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string | string[];
    className?: string;
    delay?: number;
    stagger?: number;
}

/**
 * REFINED FLIPPING TEXT
 * Focuses on smooth, high-end motion with a 'Quiet Luxury' feel.
 */
export function FlippingText({ children, className = "", delay = 0, stagger = 0.03 }: TextRevealProps) {
    const el = useRef<HTMLSpanElement>(null);
    const content = Array.isArray(children) ? children.join(" ") : children;

    useEffect(() => {
        if (!el.current) return;
        const q = gsap.utils.selector(el.current);
        const chars = q(".char");

        gsap.fromTo(chars,
            {
                rotateX: -100,
                opacity: 0,
                y: 30,
                transformOrigin: "50% 100% -50",
            },
            {
                scrollTrigger: {
                    trigger: el.current,
                    start: "top 92%",
                    toggleActions: "play none none reverse"
                },
                rotateX: 0,
                opacity: 1,
                y: 0,
                stagger: stagger,
                duration: 1.2,
                ease: "expo.out",
                delay: delay
            }
        );
    }, [children, delay, stagger]);

    return (
        <span ref={el} className={`inline-block perspective-1000 transform-style-3d ${className}`}>
            {content.split("").map((char, i) => (
                <span key={i} className="char inline-block whitespace-pre transform-style-3d will-change-transform">
                    {char}
                </span>
            ))}
        </span>
    );
}

/**
 * JUMBLED REVEAL (ELEGANT VERSION)
 * Letters drift together with high easing for a sophisticated look.
 */
export function JumbledReveal({ children, className = "", delay = 0 }: TextRevealProps) {
    const el = useRef<HTMLSpanElement>(null);
    const content = Array.isArray(children) ? children.join(" ") : children;

    useEffect(() => {
        if (!el.current) return;
        const q = gsap.utils.selector(el.current);
        const chars = q(".char");

        chars.forEach((char, i) => {
            const randomX = (Math.random() - 0.5) * 150;
            const randomY = (Math.random() - 0.5) * 150;

            gsap.fromTo(char,
                { x: randomX, y: randomY, opacity: 0, filter: "blur(10px)", scale: 0.8 },
                {
                    scrollTrigger: {
                        trigger: el.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    x: 0, y: 0, opacity: 1, filter: "blur(0px)", scale: 1,
                    duration: 1.5,
                    ease: "expo.out",
                    delay: delay + (i * 0.04)
                }
            );
        });
    }, [children, delay]);

    return (
        <span ref={el} className={`inline-block ${className}`}>
            {content.split("").map((char, i) => (
                <span key={i} className="char inline-block whitespace-pre">
                    {char}
                </span>
            ))}
        </span>
    );
}

/**
 * STANDARD REVEAL (CLEANEST)
 */
export function TextReveal({ children, className = "", delay = 0, stagger = 0.02, accentOnHover = false }: TextRevealProps & { accentOnHover?: boolean }) {
    const el = useRef<HTMLSpanElement>(null);
    const content = Array.isArray(children) ? children.join(" ") : children;

    useEffect(() => {
        if (!el.current) return;
        const q = gsap.utils.selector(el.current);
        const words = q(".word");

        gsap.fromTo(words,
            { y: "100%", opacity: 0 },
            {
                scrollTrigger: {
                    trigger: el.current,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                y: 0, opacity: 1,
                stagger: stagger,
                duration: 1.2,
                ease: "power3.out",
                delay: delay
            }
        );
    }, [children, delay, stagger]);

    return (
        <span ref={el} className={`inline-block overflow-hidden ${className} ${accentOnHover ? 'group' : ''}`}>
            {content.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.2em] will-change-transform group-hover:text-accent transition-colors duration-500">
                    {word}
                </span>
            ))}
        </span>
    );
}

export function ParagraphReveal({ children, className = "" }: { children: string, className?: string }) {
    return (
        <p className={`text-lg md:text-xl font-light leading-relaxed mb-6 ${className}`}>
            <TextReveal stagger={0.01}>
                {children}
            </TextReveal>
        </p>
    );
}

// Keep Scramble & Floating for specific decorative moments if needed
export function FloatingText({ children, className = "" }: { children: string, className?: string }) {
    const el = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!el.current) return;
        const q = gsap.utils.selector(el.current);
        const words = q(".word");
        words.forEach((word, i) => {
            gsap.to(word, {
                y: -5,
                duration: 2 + (i * 0.2),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });
        });
    }, [children]);
    return (
        <span ref={el} className={`inline-block ${className}`}>
            {children.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
            ))}
        </span>
    );
}
