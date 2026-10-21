import React from 'react';
import { Profile } from '@/types/portfolio';

interface HeroProps {
    profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
    return (
        <section id="top" className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
            {/* Ambient Accent Light (Subtle and intentional) */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                {/* Role Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{profile.headline || 'Web Developer & Video Editor'}</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
                    Membangun Rekayasa Web yang Tangguh dan Cerita Visual yang Kuat.
                </h1>

                {/* Authentic Bio Paragraph */}
                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
                    {profile.bio ||
                        'Menggabungkan keahlian arsitektur web modern (Laravel, React, PostgreSQL) dengan sensibilitas sinematik multimedia (Premiere Pro, After Effects, DaVinci Resolve) untuk menghasilkan karya yang fungsional dan berkarakter.'}
                </p>

                {/* Direct Action Buttons (No dead links, 44px min tap target) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#karya"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Jelajahi Portofolio
                    </a>
                    <a
                        href="#kontak"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 hover:border-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                        Hubungi Saya
                    </a>
                </div>

                {/* Fast Facts / Discipline Badges */}
                <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <div className="text-cyan-400 font-heading font-bold text-lg mb-1">Web Development</div>
                        <p className="text-xs text-slate-400">Full-Stack Application, Clean Architecture, REST API & Database.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <div className="text-blue-400 font-heading font-bold text-lg mb-1">Video & Motion</div>
                        <p className="text-xs text-slate-400">Kinetic Typography, Sound Design, Color Grading & Teaser Promosi.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 col-span-2 md:col-span-1">
                        <div className="text-emerald-400 font-heading font-bold text-lg mb-1">Karya & Riset</div>
                        <p className="text-xs text-slate-400">Studi Kasus Pemecahan Masalah, Eksperimen Tools, dan Proyek Terapan.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
