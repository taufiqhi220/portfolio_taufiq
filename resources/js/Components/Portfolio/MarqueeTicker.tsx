import React from 'react';

const DISCIPLINES = [
    'Full-Stack Web Architecture',
    'Kinetic Motion Graphics',
    'Laravel 13 & Inertia.js',
    'Cinematic Color Grading',
    'PostgreSQL Query Optimization',
    'DaVinci Resolve & Premiere Pro',
    'Modern React & TypeScript',
    'After Effects Motion Design',
    'RESTful API Systems',
    'Audio Engineering & Sound Design',
];

export default function MarqueeTicker() {
    return (
        <aside
            aria-label="Keahlian & Disiplin Utama"
            className="w-full overflow-hidden border-y border-stone-300/40 bg-white/30 backdrop-blur-xs py-3.5 my-8 select-none"
        >
            <div className="animate-marquee flex items-center gap-8">
                {/* First repetition */}
                {DISCIPLINES.map((item, index) => (
                    <div key={`d1-${index}`} className="flex items-center gap-8 shrink-0">
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone-700 font-medium">
                            {item}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                    </div>
                ))}

                {/* Second repetition for seamless loop */}
                {DISCIPLINES.map((item, index) => (
                    <div key={`d2-${index}`} className="flex items-center gap-8 shrink-0">
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone-700 font-medium">
                            {item}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                    </div>
                ))}
            </div>
        </aside>
    );
}
