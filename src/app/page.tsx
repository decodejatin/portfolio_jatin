import MagneticButton from '@/components/dom/MagneticButton';
import MagneticText from '@/components/dom/MagneticText';
import InfiniteMarquee from '@/components/dom/InfiniteMarquee';
import ScrambleText from '@/components/ui/ScrambleText';
import { FlippingText, FloatingText, JumbledReveal, TextReveal, ParagraphReveal } from '@/components/ui/Typography';
import { resumeData } from '@/lib/data';

export default function Home() {
    return (
        <main className="flex flex-col items-center w-full overflow-x-hidden pt-10 md:pt-16 mix-blend-difference">

            {/* Hero Section */}
            <section className="h-[90vh] md:h-screen w-full flex flex-col items-center justify-center relative px-6">
                <div className="flex flex-col items-center text-center z-10 max-w-6xl">
                    <div className="overflow-hidden mb-4 md:mb-6">
                        <span className="font-mono text-xs md:text-base tracking-[0.4em] uppercase opacity-60 block animate-slide-up">
                            {resumeData.location}
                        </span>
                    </div>

                    <h1 className="text-[16vw] md:text-[12vw] leading-[0.75] font-serif tracking-tighter mb-16 px-4">
                        <MagneticText strength={0.4} stagger={0.06} className="text-white">
                            {resumeData.name}
                        </MagneticText>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mt-4">
                        <div className="h-[1px] w-12 md:w-24 bg-accent/40 hidden sm:block"></div>
                        <p className="font-sans text-xl md:text-3xl font-light italic text-white/80">
                            <ScrambleText delay={1.8} className="text-white/70">
                                {resumeData.role}
                            </ScrambleText>
                        </p>
                        <div className="h-[1px] w-12 md:w-24 bg-accent/40 hidden sm:block"></div>
                    </div>
                </div>

                <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                    <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-transparent via-accent to-accent/50 animate-pulse"></div>
                    <span className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-white/40 font-mono">Archive 01 / View</span>
                </div>
            </section>

            {/* Intro Section - Enhanced Glassmorphism */}
            <section id="concept" className="w-full py-40 md:py-72 px-6 md:px-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
                        <div className="lg:col-span-12 mb-20">
                            <span className="text-accent text-sm font-mono mb-8 block tracking-[0.5em]">01 / PHILOSOPHY</span>
                            <h2 className="text-8xl md:text-[160px] font-serif uppercase tracking-tighter leading-[0.7] mb-16">
                                <span className="block italic opacity-20">Pure</span>
                                <span className="block">Logic.</span>
                            </h2>
                            <FloatingText className="text-accent text-[12px] md:text-sm uppercase tracking-[0.5em] block mt-12 font-bold font-mono">
                                00 // THE ARCHITECTURAL CORE
                            </FloatingText>
                        </div>
                        <div className="lg:col-span-8 lg:col-start-5">
                            <h3 className="text-3xl md:text-5xl font-serif leading-[1.1] mb-16 text-white/90">
                                <TextReveal accentOnHover stagger={0.01} delay={0.8}>
                                    {resumeData.summary}
                                </TextReveal>
                            </h3>
                            <div className="flex flex-wrap gap-4 md:gap-6">
                                {resumeData.skills.languages.map((skill, i) => (
                                    <span key={i} className="text-[10px] md:text-xs uppercase tracking-[0.3em] px-8 py-4 bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-700 font-mono">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="w-full py-12 md:py-20 overflow-hidden bg-black z-10 border-b border-white/5">
                <InfiniteMarquee
                    items={["Specialist on Codeforces", "Quantum Computing", "Algorithmic Precision", "Premium Web Design"]}
                />
            </section>

            {/* Education Section - Floating Layout */}
            <section id="experience" className="w-full py-40 md:py-72 px-6 md:px-20 relative">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
                    <div className="lg:w-1/3 md:sticky top-32 h-fit">
                        <span className="text-accent text-sm font-mono mb-8 block tracking-[0.5em]">02 / ACADEMICS</span>
                        <h2 className="text-7xl md:text-[140px] font-serif tracking-tighter mb-12 leading-[0.75] opacity-20 hover:opacity-100 transition-opacity duration-1000">
                            Expertise.
                        </h2>
                        <ParagraphReveal className="opacity-40 max-w-xs text-xl font-light italic leading-loose">
                            Synthesizing theoretical data science with practical engineering.
                        </ParagraphReveal>
                    </div>

                    <div className="lg:w-2/3 space-y-32 md:space-y-64">
                        {resumeData.education.map((edu, i) => (
                            <div key={i} className="group relative pl-12 md:pl-24">
                                <span className="absolute left-0 top-0 text-[120px] md:text-[200px] font-serif text-white/[0.02] leading-none select-none -translate-x-12 translate-y-12">
                                    0{i + 1}
                                </span>
                                <span className="font-mono text-xs text-accent mb-8 block tracking-widest uppercase bg-accent/10 px-4 py-1 rounded w-fit">
                                    {edu.period}
                                </span>
                                <h3 className="text-4xl md:text-7xl font-serif mb-10 leading-[1] group-hover:pl-6 transition-all duration-1000">
                                    {edu.university}
                                </h3>
                                <div className="flex flex-col md:flex-row md:items-center gap-12 mb-12">
                                    <p className="text-2xl md:text-4xl font-light opacity-30 italic group-hover:opacity-100 transition-opacity duration-1000">
                                        {edu.degree}
                                    </p>
                                    {edu.score && (
                                        <div className="bg-white/[0.05] border border-white/10 px-10 py-5 rounded-none rotate-2 group-hover:rotate-0 transition-transform duration-700">
                                            <span className="text-white text-3xl md:text-5xl font-serif font-black">{edu.score}</span>
                                        </div>
                                    )}
                                </div>
                                {edu.details && (
                                    <p className="text-lg md:text-2xl opacity-30 max-w-2xl leading-relaxed font-light group-hover:opacity-70 transition-opacity duration-700">
                                        {edu.details}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Competitive Programming Section - Ultra Technical HUD */}
            <section id="performance" className="w-full py-40 md:py-80 px-6 md:px-20 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-8">
                            <span className="text-accent text-[10px] font-mono mb-8 block tracking-[1em] uppercase">SYSTEM ANALYSIS // GENESIS_03</span>
                            <h2 className="text-8xl md:text-[140px] font-serif tracking-tighter mb-16 leading-[0.75] font-black">
                                Peak <span className="italic font-light text-white/10">Entropy.</span>
                            </h2>
                            <p className="text-2xl md:text-5xl font-light opacity-30 leading-tight mb-24 max-w-4xl italic">
                                "Solving NP-hard logic through recursive structural decomposition."
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="group relative p-16 border border-white/5 bg-white/[0.02] rounded-[4rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-1000">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    <span className="text-[160px] font-serif font-black text-white/[0.02] absolute -top-10 -right-10 select-none group-hover:scale-110 transition-transform duration-1000 group-hover:text-accent/5">SP</span>
                                    <div className="relative z-10">
                                        <span className="block text-9xl font-serif font-black text-accent mb-6 tracking-tighter">1400+</span>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-[1px] bg-accent"></div>
                                            <span className="text-[12px] uppercase tracking-[0.5em] opacity-40 font-mono">CODEFORCES SPECIALIST</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="group relative p-16 border border-white/5 bg-white/[0.02] rounded-[4rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-1000">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    <span className="text-[160px] font-serif font-black text-white/[0.02] absolute -top-10 -right-10 select-none group-hover:scale-110 transition-transform duration-1000 group-hover:text-accent/5">LC</span>
                                    <div className="relative z-10">
                                        <span className="block text-9xl font-serif font-black text-accent mb-6 tracking-tighter">200+</span>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-[1px] bg-accent"></div>
                                            <span className="text-[12px] uppercase tracking-[0.5em] opacity-40 font-mono">ALGORITHMS MASTERED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-12 mt-40 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border-y border-white/5">
                            {resumeData.skills.competitive.topics.map((topic, i) => (
                                <div key={i} className="bg-[#0D0D0D] p-16 group hover:bg-accent transition-all duration-1000 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                    <span className="text-xs font-mono opacity-20 mb-6 group-hover:opacity-100 transition-opacity block">TOPIC_0{i + 1}</span>
                                    <span className="text-4xl font-serif block relative z-10 group-hover:scale-105 transition-transform duration-700">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section - Refined Grid */}
            <section id="work" className="w-full py-24 md:py-48 px-6 md:px-20 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-10">
                        <div className="max-w-3xl">
                            <span className="text-accent text-sm font-mono mb-6 block tracking-[0.5em]">04 / SELECTED WORKS</span>
                            <h2 className="text-6xl md:text-9xl font-serif tracking-tighter">
                                Projects.
                            </h2>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-2 font-mono">Curated Portfolio</p>
                            <div className="w-40 h-[1px] bg-white opacity-20 ml-auto transition-all duration-700 group-hover:w-full"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                        {resumeData.projects.map((project, i) => (
                            <div key={i} className="group relative min-h-[500px] md:min-h-[600px] overflow-hidden bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between hover:border-accent/30 transition-all duration-700 hover:bg-white/[0.05] shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                    <div className="w-14 h-14 rounded-full border border-accent flex items-center justify-center text-accent bg-accent/5 backdrop-blur-md">
                                        <span className="text-xl rotate-45 group-hover:rotate-0 transition-transform duration-500">↑</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <span className="text-accent font-mono text-xs font-bold tracking-[0.4em] uppercase opacity-60">{project.date}</span>
                                    <h3 className="text-4xl md:text-6xl font-serif leading-tight group-hover:text-accent transition-colors duration-500">
                                        {project.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, idx) => (
                                            <span key={idx} className="text-[10px] font-mono border border-white/10 px-4 py-1.5 rounded-full text-white/50 bg-white/[0.02] group-hover:border-accent/20 transition-colors uppercase">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <p className="text-lg md:text-xl font-light opacity-40 max-w-md group-hover:opacity-100 transition-all duration-700 leading-relaxed mb-12">
                                        {project.description}
                                    </p>
                                    <MagneticButton className="px-12 py-5 bg-white text-black rounded-full text-[10px] uppercase tracking-[0.4em] font-bold group-hover:bg-accent group-hover:text-white transition-all transform active:scale-95 shadow-xl">
                                        Case Study
                                    </MagneticButton>
                                </div>

                                {/* Background flare on hover */}
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 blur-[80px] rounded-full group-hover:bg-accent/10 transition-all duration-1000"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools & Tech Stack - Grid Layout */}
            <section className="w-full py-40 md:py-72 px-6 md:px-20 relative bg-white/[0.01]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-32">
                        <span className="text-accent text-sm font-mono mb-8 block tracking-[0.5em]">05 / THE STACK</span>
                        <h2 className="text-6xl md:text-9xl font-serif tracking-tighter mb-10">
                            Forged in <span className="italic text-white/20">Logic.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/5 border border-white/5">
                        {resumeData.skills.tools.concat(resumeData.skills.dataScience).map((tool, i) => (
                            <div key={i} className="group bg-[#030303] p-12 hover:bg-white hover:text-black transition-all duration-500 flex flex-col items-center justify-center min-h-[220px]">
                                <span className="text-xs font-mono opacity-20 mb-6 group-hover:opacity-100 transition-opacity">_0{i + 1}</span>
                                <span className="text-xl md:text-2xl font-serif text-center">{tool}</span>
                                <div className="w-0 h-px bg-black mt-4 group-hover:w-full transition-all duration-700"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer - Signature Edition */}
            <footer id="connect" className="w-full pt-40 md:pt-80 pb-20 md:pb-32 px-6 md:px-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="relative group cursor-pointer mb-32">
                        <span className="absolute -inset-10 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full"></span>
                        <a
                            href={`mailto:${resumeData.contacts.email}`}
                            className="text-[14vw] md:text-[16vw] font-serif leading-none transition-all duration-1000 relative z-10 hover:italic"
                        >
                            Connect.
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-24 md:gap-12 mt-40">
                        <div className="md:col-span-2">
                            <p className="text-[12px] font-mono uppercase tracking-[0.8em] opacity-20 mb-12">Social Architecture</p>
                            <div className="flex flex-col gap-8">
                                <a href={resumeData.contacts.github} target="_blank" rel="noopener noreferrer" className="text-4xl md:text-6xl font-light hover:text-accent transition-all duration-700 w-fit">Github <span className="text-sm italic opacity-20 group-hover:opacity-100 font-mono">/01</span></a>
                                <a href={resumeData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="text-4xl md:text-6xl font-light hover:text-accent transition-all duration-700 w-fit">LinkedIn <span className="text-sm italic opacity-20 group-hover:opacity-100 font-mono">/02</span></a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end">
                            <p className="text-[12px] font-mono uppercase tracking-[0.8em] opacity-20 mb-8">Base Coordinates</p>
                            <p className="text-2xl md:text-3xl font-light opacity-50 italic">{resumeData.location}</p>
                        </div>
                        <div className="flex flex-col justify-end md:items-end">
                            <div className="text-left md:text-right">
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-accent mb-4 block">ZENITH_ARCH // v3.5_FINAL</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-20">© 2026 JATIN JALANDHRA. ALL RIGHTS RESERVED.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
