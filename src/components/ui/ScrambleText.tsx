'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ScrambleText({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
    const el = useRef<HTMLSpanElement>(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@0123456789";

    useEffect(() => {
        if (!el.current) return;

        const originalText = children;
        let iteration = 0;
        let interval: NodeJS.Timeout;

        const startScramble = () => {
            interval = setInterval(() => {
                if (!el.current) return;
                el.current.innerText = originalText.split("")
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        };

        const timeout = setTimeout(startScramble, delay * 1000);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [children, delay]);

    return <span ref={el} className={className}>{children}</span>;
}
