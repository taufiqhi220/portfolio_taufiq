import React from 'react';
import { PortfolioRole } from '@/types/portfolio';

const VIDEO_DISCIPLINES = [
    'Video Editing',
    'Content Creation',
    'Color Grading',
    'Motion Graphics',
    'Sound Design',
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'DaVinci Resolve',
    'Program TV & Digital',
    'Visual Storytelling',
];

const WEB_DISCIPLINES = [
    'Full-Stack Web Development',
    'Laravel Framework',
    'React & TypeScript',
    'Inertia.js',
    'PostgreSQL & MySQL',
    'RESTful API',
    'Tailwind CSS',
    'Responsive UI',
    'Database Design',
    'System Architecture',
];

interface MarqueeTickerProps {
    activeRole: PortfolioRole;
}

export default function MarqueeTicker({ activeRole }: MarqueeTickerProps) {
    const items = activeRole === 'video' ? VIDEO_DISCIPLINES : WEB_DISCIPLINES;

    return (
        <aside
            aria-label="Keahlian & Disiplin Utama"
            className="w-full overflow-hidden border-y border-stone-300/40 bg-white/30 backdrop-blur-xs py-3.5 my-8 select-none"
        >
            <div className="animate-marquee flex items-center gap-8">
                {[0, 1].map((cycle) =>
                    items.map((item, index) => (
                        <div key={`d${cycle}-${index}`} className="flex items-center gap-8 shrink-0">
                            <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone-700 font-medium">
                                {item}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
}
