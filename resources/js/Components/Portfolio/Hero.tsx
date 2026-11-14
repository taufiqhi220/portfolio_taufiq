import React, { useState, useEffect, useRef } from 'react';
import { PortfolioRole, Profile, Project } from '@/types/portfolio';
import Reveal from './Reveal';
import ToolIcon from './ToolIcon';

interface HeroProps {
    profile: Profile;
    projects?: Project[];
    activeRole: PortfolioRole;
    isRoleLocked?: boolean;
    onRoleChange?: (role: PortfolioRole) => void;
    onPlayVideo?: (project: Project) => void;
    onViewDetail?: (project: Project) => void;
}

export default function Hero({
    profile,
    projects = [],
    activeRole,
    isRoleLocked = false,
    onRoleChange,
    onPlayVideo,
    onViewDetail,
}: HeroProps) {
    const spotlightProjects = projects.slice(0, 4);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [userInteracted, setUserInteracted] = useState<boolean>(false);
    const autoCycleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activeProject = spotlightProjects[activeIndex] || spotlightProjects[0] || null;
    const isPlayableVideo = Boolean(
        activeProject &&
            activeRole === 'video' &&
            (activeProject.media_type === 'video_embed' ||
                activeProject.media_type === 'video_file' ||
                activeProject.video_url)
    );

    // Reset spotlight index cleanly when role or project list changes
    useEffect(() => {
        setActiveIndex(0);
        setUserInteracted(false);
    }, [activeRole, projects.length]);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (autoCycleTimeoutRef.current) {
                clearTimeout(autoCycleTimeoutRef.current);
            }
        };
    }, []);

    // Auto-cycle projects inside the active role when not hovered or manually selected
    useEffect(() => {
        if (isHovered || userInteracted || spotlightProjects.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % spotlightProjects.length);
        }, 5500);

        return () => clearInterval(interval);
    }, [isHovered, userInteracted, spotlightProjects.length]);

    const handleSelectSpotlight = (index: number) => {
        setActiveIndex(index);
        setUserInteracted(true);

        if (autoCycleTimeoutRef.current) {
            clearTimeout(autoCycleTimeoutRef.current);
        }

        autoCycleTimeoutRef.current = setTimeout(() => {
            setUserInteracted(false);
        }, 10000);
    };

    return (
        <section id="top" className="pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 relative overflow-x-clip">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Column: Personal Narrative & Role Switcher */}
                    <div className="lg:col-span-7">
                        <Reveal delay={30}>
                            {/* Location & Status Indicator */}
                            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-stone-700 uppercase tracking-widest mb-4 sm:mb-5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-300/80 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                <span>{profile.location || 'Indonesia (WITA / UTC+8)'}</span>
                                <span className="text-stone-300">&bull;</span>
                                <span className="text-amber-800 font-bold">Terbuka Untuk Kolaborasi</span>
                            </div>

                            {!isRoleLocked && onRoleChange && (
                                <div className="mb-5 sm:mb-6">
                                    <div
                                        role="group"
                                        aria-label="Pilih jalur portofolio"
                                        className="inline-flex flex-wrap items-center p-1 rounded-xl bg-white/90 backdrop-blur-md border border-stone-300/80 shadow-2xs gap-1"
                                    >
                                        <button
                                            type="button"
                                            aria-pressed={activeRole === 'web'}
                                            onClick={() => onRoleChange('web')}
                                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-600 ${
                                                activeRole === 'web'
                                                    ? 'bg-stone-950 text-white shadow-xs'
                                                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/80'
                                            }`}
                                        >
                                            Web Developer
                                        </button>
                                        <button
                                            type="button"
                                            aria-pressed={activeRole === 'video'}
                                            onClick={() => onRoleChange('video')}
                                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-600 ${
                                                activeRole === 'video'
                                                    ? 'bg-stone-950 text-white shadow-xs'
                                                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/80'
                                            }`}
                                        >
                                            Video Editor &amp; Content Creator
                                        </button>
                                    </div>
                                </div>
                            )}

                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-stone-900 tracking-tight leading-[1.08] mb-4 sm:mb-5">
                                {profile.full_name || 'Taufiq Hidayat'}.
                            </h1>

                            <p className="text-lg sm:text-2xl font-heading text-stone-800 font-semibold leading-snug max-w-2xl mb-3 sm:mb-4">
                                {profile.headline || (activeRole === 'video' ? 'Video Editor & Content Creator' : 'Web Developer')}
                            </p>

                            <p className="text-sm sm:text-base text-stone-700 font-normal leading-relaxed max-w-2xl mb-7 sm:mb-9">
                                {profile.bio}
                            </p>

                            {/* Direct Action Links */}
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                {activeRole === 'video' ? (
                                    <>
                                        {activeProject && (
                                            <button
                                                type="button"
                                                onClick={() => onPlayVideo?.(activeProject)}
                                                className="min-h-[44px] inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-stone-950 text-white font-medium hover:bg-stone-850 active:scale-95 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer group"
                                            >
                                                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                                                    &#9654;
                                                </span>
                                                <span>Tonton Video Karya</span>
                                            </button>
                                        )}

                                        <a
                                            href="#karya"
                                            className="min-h-[44px] inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-white/90 backdrop-blur-md border border-stone-300 text-stone-800 font-medium hover:bg-white hover:border-stone-400 active:scale-95 transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-stone-400 group"
                                        >
                                            <span>Lihat {projects.length > 0 ? `${projects.length} ` : ''}Karya Video</span>
                                            <svg className="w-4 h-4 text-stone-500 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </a>
                                    </>
                                ) : (
                                    <a
                                        href="#karya"
                                        className="min-h-[44px] inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-stone-950 text-white font-medium hover:bg-stone-850 active:scale-95 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 group"
                                    >
                                        <span>Lihat {projects.length > 0 ? `${projects.length} ` : ''}Proyek Web</span>
                                        <svg className="w-4 h-4 text-stone-300 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </a>
                                )}

                                <a
                                    href="#kontak"
                                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-xl bg-white/80 hover:bg-white border border-stone-300/70 text-stone-800 font-medium transition-colors"
                                >
                                    <span>Hubungi Saya</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Role-Focused Spotlight Showcase */}
                    <div
                        className="lg:col-span-5 relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Single Floating Micro-Badge Matching Active Role */}
                        <div className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-stone-300/80 shadow-md text-stone-800 text-[11px] font-mono">
                            <span
                                className={`w-2 h-2 rounded-full ${
                                    activeRole === 'video' ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}
                            />
                            <span>
                                {activeRole === 'video'
                                    ? 'Motion • Premiere • After Effects • DaVinci'
                                    : 'Laravel • React • TypeScript • SQL'}
                            </span>
                        </div>

                        <Reveal delay={100}>
                            <div className="bg-white/85 hover:bg-white/95 backdrop-blur-md rounded-2xl border border-stone-300/70 shadow-[0_8px_36px_-6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] p-4 sm:p-6 space-y-4 transition-all duration-300 relative z-10">
                                {/* Spotlight Header */}
                                <div className="flex items-center justify-between gap-2 pb-3 sm:pb-3.5 border-b border-stone-200/70">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                                            {activeRole === 'video' ? 'Spotlight Karya Video' : 'Spotlight Proyek Web'}
                                        </span>
                                    </div>

                                    {spotlightProjects.length > 1 && (
                                        <div
                                            role="group"
                                            aria-label="Pilih karya unggulan"
                                            className="flex items-center gap-1 p-1 rounded-lg bg-stone-100/90 border border-stone-200 text-[11px] font-mono"
                                        >
                                            {spotlightProjects.map((item, idx) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => handleSelectSpotlight(idx)}
                                                    aria-label={`Tampilkan karya ${idx + 1}: ${item.title}`}
                                                    aria-pressed={activeIndex === idx}
                                                    className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                                                        activeIndex === idx
                                                            ? 'bg-white text-stone-950 font-bold shadow-xs'
                                                            : 'text-stone-500 hover:text-stone-900'
                                                    }`}
                                                >
                                                    0{idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Active Showcase Media Canvas */}
                                {activeProject ? (
                                    <div key={`${activeRole}-${activeProject.id}`} className="space-y-4 animate-in fade-in duration-300">
                                        <div className="relative aspect-video rounded-xl bg-stone-950 overflow-hidden border border-stone-300/70 group shadow-inner">
                                            {activeProject.thumbnail_path ? (
                                                <img
                                                    src={activeProject.thumbnail_path}
                                                    alt={activeProject.title}
                                                    fetchPriority="high"
                                                    decoding="async"
                                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
                                                />
                                            ) : activeRole === 'video' ? (
                                                /* Cinematic Production Monitor Canvas */
                                                <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-black p-4 flex flex-col justify-between relative overflow-hidden text-stone-300">
                                                    <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/60" />
                                                    <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/60" />
                                                    <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/60" />
                                                    <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/60" />

                                                    <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-stone-400 z-10">
                                                        <span className="flex items-center gap-1.5 text-rose-400">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                                            <span>VIDEO PREVIEW</span>
                                                        </span>
                                                        <span className="text-amber-400/90 font-medium">VIDEO SHOWCASE</span>
                                                    </div>

                                                    <div className="text-center z-10 px-4 my-auto">
                                                        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400/90 block mb-1">
                                                            Production Showcase
                                                        </span>
                                                        <p className="text-sm font-heading font-bold text-white line-clamp-1 drop-shadow-md">
                                                            {activeProject.title}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between z-10 pt-1">
                                                        <div className="flex items-end gap-1 h-3.5 px-1.5 py-0.5 rounded bg-black/60 border border-stone-800/80">
                                                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                                                            <span className="w-0.5 bg-amber-500 rounded-full animate-eq-2" />
                                                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                                                            <span className="w-0.5 bg-amber-500 rounded-full animate-eq-4" />
                                                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-5" />
                                                        </div>
                                                        <span className="font-mono text-[10px] text-stone-400 tracking-wider">
                                                            EDITING &bull; MOTION &bull; KONTEN
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Developer System Architecture Canvas */
                                                <div className="w-full h-full bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 p-3.5 flex flex-col justify-between relative overflow-hidden text-stone-300">
                                                    <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                                            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                                            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                                        </div>
                                                        <span className="font-mono text-[10px] text-stone-500">
                                                            web-application
                                                        </span>
                                                        <span className="w-2" />
                                                    </div>

                                                    <div className="font-mono text-[10.5px] leading-relaxed text-stone-300 my-auto space-y-1 px-1">
                                                        <div className="text-stone-500 text-[10px]">
                                                            // Full-Stack Laravel + React Architecture
                                                        </div>
                                                        <div className="text-amber-300 font-semibold line-clamp-1">
                                                            {activeProject.title}
                                                        </div>
                                                        <div className="text-stone-400 text-[10px]">
                                                            Laravel &bull; React &bull; SQL
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-stone-400 border-t border-stone-800/60">
                                                        <span className="text-emerald-400">Web System</span>
                                                        <span className="text-stone-500">Studi Kasus</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Interactive Action Overlay */}
                                            {isPlayableVideo ? (
                                                <button
                                                    type="button"
                                                    onClick={() => onPlayVideo?.(activeProject)}
                                                    aria-label={`Putar video ${activeProject.title}`}
                                                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all group/play cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/50 z-20"
                                                >
                                                    <span className="absolute inset-0 rounded-full bg-amber-400 animate-ripple-ping pointer-events-none" />
                                                    <svg className="w-5 h-5 ml-0.5 text-stone-950 group-hover/play:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => onViewDetail?.(activeProject)}
                                                    className="absolute inset-0 m-auto w-fit h-fit px-4 py-2 rounded-lg bg-white/95 text-stone-950 text-xs font-mono font-bold flex items-center gap-2 shadow-xl hover:scale-105 active:scale-90 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 z-20"
                                                >
                                                    <span>{activeRole === 'video' ? 'Lihat Detail Karya' : 'Buka Studi Kasus Web'}</span>
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </button>
                                            )}

                                            {/* Duration Tag */}
                                            {isPlayableVideo && activeProject.extra_meta?.duration && (
                                                <div className="absolute bottom-2.5 right-2.5 font-mono text-[10px] px-2 py-0.5 rounded bg-black/80 text-white backdrop-blur-xs z-20 border border-stone-800">
                                                    {activeProject.extra_meta.duration}
                                                </div>
                                            )}
                                        </div>

                                        {/* Project Meta & Direct Trigger */}
                                        <div>
                                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                                                <span>{activeProject.category?.name}</span>
                                                <span className="text-amber-800 font-sans font-medium flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                                    <span>Unggulan</span>
                                                </span>
                                            </div>

                                            <h4 className="text-base font-heading font-bold text-stone-900 line-clamp-1 mb-1.5">
                                                {activeProject.title}
                                            </h4>

                                            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                                                {activeProject.summary}
                                            </p>

                                            {/* Tech Stack Chips & Action Link */}
                                            <div className="flex items-center justify-between pt-2.5 border-t border-stone-200/60">
                                                <div className="flex items-center gap-1.5">
                                                    {activeProject.tools?.slice(0, 3).map((tool) => (
                                                        <ToolIcon key={tool.id} name={tool.name} slug={tool.slug} iconUrl={tool.icon_url} className="w-5 h-5 text-[9px]" />
                                                    ))}
                                                </div>

                                                {isPlayableVideo ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => onPlayVideo?.(activeProject)}
                                                        className="font-mono text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 hover:underline underline-offset-4 cursor-pointer"
                                                    >
                                                        <span>Putar Video</span>
                                                        <span>&rarr;</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => onViewDetail?.(activeProject)}
                                                        className="font-mono text-xs text-stone-900 hover:text-amber-800 font-bold flex items-center gap-1 hover:underline underline-offset-4 cursor-pointer"
                                                    >
                                                        <span>Lihat Studi Kasus</span>
                                                        <span>&rarr;</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-10 px-4 text-center rounded-xl bg-stone-50 border border-stone-200/80">
                                        <p className="text-sm font-heading font-semibold text-stone-800 mb-1">
                                            Belum Ada Karya Terpasang
                                        </p>
                                        <p className="text-xs text-stone-500">
                                            Karya {activeRole === 'video' ? 'video editing dan konten' : 'web development'} akan tampil di sini setelah ditambahkan di panel admin.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
