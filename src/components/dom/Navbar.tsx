'use client';

import MagneticButton from './MagneticButton';
import { resumeData } from '@/lib/data';

export default function Navbar() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-8 z-[100] pointer-events-none mix-blend-difference">
            <div
                className="text-white font-serif text-3xl pointer-events-auto cursor-pointer group flex items-center gap-4"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center overflow-hidden">
                    <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                </div>
                <MagneticButton>
                    <span className="tracking-tighter font-bold uppercase">{resumeData.name}.</span>
                </MagneticButton>
            </div>

            <div className="flex gap-4 md:gap-8 pointer-events-auto bg-white/[0.03] backdrop-blur-2xl px-8 py-5 rounded-full border border-white/10 shadow-2xl">
                <MagneticButton>
                    <button
                        onClick={() => scrollToSection('concept')}
                        className="text-white text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all"
                    >
                        Concept
                    </button>
                </MagneticButton>
                <MagneticButton>
                    <button
                        onClick={() => scrollToSection('experience')}
                        className="text-white text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all"
                    >
                        Academics
                    </button>
                </MagneticButton>
                <MagneticButton>
                    <button
                        onClick={() => scrollToSection('performance')}
                        className="text-white text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all"
                    >
                        Logic
                    </button>
                </MagneticButton>
                <MagneticButton>
                    <button
                        onClick={() => scrollToSection('work')}
                        className="text-white text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all"
                    >
                        Artifacts
                    </button>
                </MagneticButton>
            </div>
        </nav>
    );
}
