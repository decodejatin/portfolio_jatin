'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        // Hover effect for interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 4,
                backgroundColor: '#E11D48', // Turn Red on hover
                duration: 0.4,
                ease: "power2.out"
            });
        };
        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: '#FFFFFF',
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const updateInteractives = () => {
            const interactives = document.querySelectorAll('button, a, .group, .cursor-pointer');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
            return interactives;
        };

        const interactives = updateInteractives();

        // Use a mutation observer to handle dynamic elements
        const observer = new MutationObserver(updateInteractives);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        />
    );
}
