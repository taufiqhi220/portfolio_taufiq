import React, { useEffect, useState } from 'react';

export default function FluidBackground() {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Gentle parallax offsets
    const offsetX = (mousePos.x - 0.5) * 35;
    const offsetY = (mousePos.y - 0.5) * 35;

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            aria-hidden="true"
        >
            {/* Evolving Vertical Canvas Base: Soft luminous ivory at top, pure clean architectural studio in middle, warm grounding at bottom */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F5] to-[#F3EFE8]"
            />

            {/* Interactive Mouse-Following Ambient Spotlight (Consistent Circle) */}
            <div
                className="absolute inset-0 opacity-70 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(650px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(246, 232, 210, 0.45), transparent 70%)`,
                }}
            />

            {/* Solar System Concentric Circular Orbits (Consistently Perfect Circles / Garis Tata Surya) */}
            <div
                className="absolute -top-[220px] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] pointer-events-none transition-transform duration-700 ease-out flex items-center justify-center"
                style={{
                    transform: `translate3d(calc(-50% + ${offsetX * 0.2}px), ${offsetY * 0.15}px, 0)`,
                }}
            >
                {/* Central Luminous Core Star */}
                <div className="w-6 h-6 rounded-full bg-amber-500/25 blur-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0" />

                {/* Orbit 1: Innermost Planetary Ring (340px) */}
                <div className="absolute w-[340px] h-[340px] rounded-full border border-stone-400/25 animate-orbit-slow flex items-center justify-center">
                    <span className="absolute -top-1 w-2 h-2 rounded-full bg-amber-600/70 shadow-xs" />
                </div>

                {/* Orbit 2: Second Circular Ring with Counter-Rotation (620px) */}
                <div className="absolute w-[620px] h-[620px] rounded-full border border-stone-400/20 animate-orbit-reverse-slow flex items-center justify-center">
                    <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-stone-500/60 shadow-xs" />
                    <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                </div>

                {/* Orbit 3: Middle Technical Dashed Orbit with Degree Markings (920px) */}
                <div className="absolute w-[920px] h-[920px] rounded-full border border-dashed border-stone-400/30 animate-orbit-slow flex items-center justify-center">
                    <span className="absolute top-1/4 -right-1 w-2 h-2 rounded-full bg-amber-600/50" />
                    <span className="absolute bottom-1/4 -left-1 w-2 h-2 rounded-full bg-stone-400/50" />

                    {/* Technical Degree Markers */}
                    <span className="absolute top-2.5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-stone-500/70 tracking-widest">
                        000°
                    </span>
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[9px] text-stone-500/70 tracking-widest">
                        090°
                    </span>
                    <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-stone-500/70 tracking-widest">
                        180°
                    </span>
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[9px] text-stone-500/70 tracking-widest">
                        270°
                    </span>
                </div>

                {/* Orbit 4: Outer Planetary Circular Track (1220px) */}
                <div className="absolute w-[1220px] h-[1220px] rounded-full border border-stone-400/20 animate-orbit-reverse-slow flex items-center justify-center">
                    <span className="absolute top-12 left-1/4 w-2 h-2 rounded-full bg-amber-500/40" />
                    <span className="absolute bottom-16 right-1/4 w-2.5 h-2.5 rounded-full bg-stone-500/40" />
                </div>

                {/* Orbit 5: Outermost Deep Space Ring (1480px) */}
                <div className="absolute w-[1480px] h-[1480px] rounded-full border border-stone-400/15" />
            </div>

            {/* Consistent Circular Ambient Spheres (100% Rounded-Full, NO deformed morphing) */}
            {/* Sphere 1: Top Hero Area */}
            <div
                className="absolute -top-[10%] -left-[5%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate3d(${offsetX * 0.3}px, ${offsetY * 0.3}px, 0)`,
                }}
            >
                <div
                    className="w-full h-full rounded-full blur-[90px] opacity-60 animate-circular-drift-1"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(245, 225, 195, 0.45) 0%, rgba(235, 210, 180, 0.20) 55%, transparent 75%)',
                    }}
                />
            </div>

            {/* Sphere 2: Mid Right Portfolio Area */}
            <div
                className="absolute top-[35%] -right-[8%] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate3d(${-offsetX * 0.3}px, ${-offsetY * 0.3}px, 0)`,
                }}
            >
                <div
                    className="w-full h-full rounded-full blur-[95px] opacity-50 animate-circular-drift-2"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(243, 215, 185, 0.35) 0%, rgba(230, 205, 190, 0.15) 55%, transparent 75%)',
                    }}
                />
            </div>

            {/* Sphere 3: Bottom Contact Area */}
            <div
                className="absolute top-[70%] left-[5%] w-[48vw] h-[48vw] max-w-[700px] max-h-[700px] transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate3d(${offsetX * 0.25}px, ${offsetY * 0.25}px, 0)`,
                }}
            >
                <div
                    className="w-full h-full rounded-full blur-[100px] opacity-50 animate-circular-drift-3"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(240, 222, 195, 0.35) 0%, rgba(225, 210, 190, 0.15) 50%, transparent 75%)',
                    }}
                />
            </div>

            {/* Subtle tactile architectural drafting grid (Soft & Non-intrusive) */}
            <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                    backgroundImage:
                        'radial-gradient(rgba(120, 113, 108, 0.20) 0.85px, transparent 0.85px)',
                    backgroundSize: '24px 24px',
                }}
            />
        </div>
    );
}
