import React from 'react';
import { Profile } from '@/types/portfolio';

interface HeroProps {
    profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
    return (
        <section id="top" className="pt-32 pb-16 md:pt-44 md:pb-24 border-b border-slate-900 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    {/* Left Column: Personal Narrative */}
                    <div className="lg:col-span-8">
                        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
                            01 / Portofolio Pribadi
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                            Taufiq Hidayat.
                        </h1>

                        <p className="text-xl sm:text-2xl font-heading text-slate-300 font-medium leading-snug max-w-2xl mb-6">
                            Full-Stack Web Developer &amp; Creative Video Editor berbasis di Indonesia.
                        </p>

                        <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mb-8">
                            {profile.bio ||
                                'Memadukan ketelitian arsitektur perangkat lunak modern (Laravel, React, PostgreSQL) dengan kepekaan ritme visual pascaproduksi multimedia (Premiere Pro, DaVinci Resolve, After Effects).'}
                        </p>

                        {/* Direct Editorial Links */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <a
                                href="#karya"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            >
                                <span>Lihat Karya Terpilih</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                            <a
                                href="#kontak"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-medium hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                                <span>Mari Terhubung</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Studio Colophon & Practice Meta */}
                    <div className="lg:col-span-4 lg:pl-6 space-y-6 text-xs text-slate-400 font-mono">
                        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                            <div>
                                <span className="text-slate-500 block uppercase tracking-wider text-[10px] mb-1">
                                    Wilayah &amp; Waktu
                                </span>
                                <span className="text-slate-200 font-medium text-sm">
                                    {profile.location || 'Indonesia'} (WIB / UTC+7)
                                </span>
                            </div>

                            <div className="pt-3 border-t border-slate-800">
                                <span className="text-slate-500 block uppercase tracking-wider text-[10px] mb-1">
                                    Fokus Bidang
                                </span>
                                <span className="text-slate-200 font-medium text-sm block">
                                    Web Systems &amp; APIs
                                </span>
                                <span className="text-slate-200 font-medium text-sm block">
                                    Video Editing &amp; Motion
                                </span>
                            </div>

                            <div className="pt-3 border-t border-slate-800">
                                <span className="text-slate-500 block uppercase tracking-wider text-[10px] mb-1">
                                    Status Ketersediaan
                                </span>
                                {profile.is_available_for_work ? (
                                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Terbuka untuk proyek baru
                                    </span>
                                ) : (
                                    <span className="text-slate-400">Sedang fokus pada proyek aktif</span>
                                )}
                            </div>
                        </div>

                        {/* Social Links Minimal */}
                        <div className="flex items-center gap-4 text-slate-400 text-xs">
                            {profile.github_url && (
                                <a
                                    href={profile.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors underline underline-offset-4"
                                >
                                    GitHub
                                </a>
                            )}
                            {profile.linkedin_url && (
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors underline underline-offset-4"
                                >
                                    LinkedIn
                                </a>
                            )}
                            {profile.youtube_url && (
                                <a
                                    href={profile.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors underline underline-offset-4"
                                >
                                    YouTube
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
