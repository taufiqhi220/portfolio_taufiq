import React, { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import ToolIcon from './ToolIcon';

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
    onPlayVideo?: (project: Project) => void;
}

export default function ProjectDetailModal({ project, onClose, onPlayVideo }: ProjectDetailModalProps) {
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (project) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
            // Trigger smooth spring entrance
            const timer = setTimeout(() => setAnimateIn(true), 15);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            setAnimateIn(false);
        }
    }, [project, onClose]);

    if (!project) return null;

    const isVideo = project.media_type === 'video_embed' || project.category?.slug === 'video-editing';
    const isWeb = project.category?.slug === 'web-development';

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ease-out ${
                animateIn ? 'bg-black/65 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
        >
            {/* Backdrop click to dismiss */}
            <div className="fixed inset-0" onClick={onClose} />

            {/* Modal Box with Spring Transition */}
            <div
                className={`relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-stone-300/80 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden my-auto flex flex-col max-h-[88vh] transition-all duration-300 ease-out transform ${
                    animateIn ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {/* Visual Banner Preview Canvas */}
                <div className="relative aspect-21/9 sm:aspect-21/8 bg-stone-950 overflow-hidden flex items-center justify-center border-b border-stone-200/80 shrink-0 select-none">
                    {project.thumbnail_path ? (
                        <img
                            src={project.thumbnail_path}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-90"
                        />
                    ) : isVideo ? (
                        <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-black p-4 flex flex-col justify-between relative text-stone-300">
                            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-stone-400">
                                <span className="flex items-center gap-1.5 text-rose-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    <span>CINEMATIC SHOWCASE</span>
                                </span>
                                <span className="text-amber-400/90 font-medium">4K MASTER</span>
                            </div>
                            <div className="my-auto text-center">
                                <h3 className="text-base font-heading font-bold text-white line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                                <span>{project.extra_meta?.duration ? `Durasi: ${project.extra_meta.duration}` : 'Post-Production'}</span>
                                <span className="text-amber-400">LOG / COLOR GRADE</span>
                            </div>
                        </div>
                    ) : isWeb ? (
                        <div className="w-full h-full bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 p-3.5 flex flex-col justify-between relative text-stone-300 font-mono">
                            <div className="flex items-center justify-between pb-1.5 border-b border-stone-800/80 text-[10px]">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                </div>
                                <span className="text-stone-500">production.cluster.local</span>
                                <span className="text-emerald-400">● 99.8% Uptime</span>
                            </div>
                            <div className="my-auto text-center font-sans">
                                <h3 className="text-base font-heading font-bold text-white line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-stone-400">
                                <span>Laravel &bull; Inertia &bull; React</span>
                                <span>PostgreSQL Engine</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-3.5 flex flex-col justify-between relative text-stone-300 font-mono text-[10px]">
                            <div className="flex items-center justify-between border-b border-stone-800/80 pb-1">
                                <span>BENCHMARK LAB</span>
                                <span className="text-emerald-400 font-bold">100x SPEEDUP</span>
                            </div>
                            <div className="my-auto text-center font-sans">
                                <h3 className="text-base font-heading font-bold text-white line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="text-stone-400 text-right">
                                PostgreSQL 16
                            </div>
                        </div>
                    )}

                    {/* Close button at top right of banner */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup modal detail"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-xs cursor-pointer z-20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Header Information */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-stone-200/80 bg-white shrink-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200">
                            {project.category?.name}
                        </span>
                        {project.custom_badge && (
                            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                {project.custom_badge}
                            </span>
                        )}
                        {project.is_featured && (
                            <span className="text-[11px] font-sans font-medium text-amber-800 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                                <span>Proyek Unggulan</span>
                            </span>
                        )}
                    </div>
                    <h2 id="project-detail-title" className="text-xl sm:text-2xl font-heading font-bold text-stone-900 leading-tight">
                        {project.title}
                    </h2>
                </div>

                {/* Scrollable Body Content */}
                <div className="p-5 sm:p-6 space-y-5 overflow-y-auto scroll-smooth text-stone-700 flex-1">
                    {/* Ringkasan */}
                    <div>
                        <h4 className="text-[11px] uppercase tracking-wider font-mono font-bold text-stone-500 mb-2">
                            Ringkasan Proyek
                        </h4>
                        <p className="text-sm sm:text-base leading-relaxed text-stone-800">
                            {project.summary}
                        </p>
                    </div>

                    {/* Tantangan & Masalah */}
                    {project.problem_statement && (
                        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 shadow-2xs">
                            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-600" />
                                <span>Tantangan &amp; Masalah</span>
                            </h4>
                            <p className="text-sm leading-relaxed text-stone-700">
                                {project.problem_statement}
                            </p>
                        </div>
                    )}

                    {/* Solusi Rekayasa & Hasil */}
                    {project.solution && (
                        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
                            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-emerald-950 mb-1.5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                                <span>Solusi Rekayasa &amp; Hasil</span>
                            </h4>
                            <p className="text-sm leading-relaxed text-emerald-900">
                                {project.solution}
                            </p>
                        </div>
                    )}

                    {/* Tools & Stacks Used (Using ToolIcon with uploaded custom image support!) */}
                    {project.tools && project.tools.length > 0 && (
                        <div>
                            <h4 className="text-[11px] uppercase tracking-wider font-mono font-bold text-stone-500 mb-2.5">
                                Tools &amp; Perangkat yang Digunakan
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((t) => (
                                    <div
                                        key={t.id}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-stone-300/80 text-stone-800 text-xs font-mono shadow-2xs"
                                    >
                                        <ToolIcon name={t.name} slug={t.slug} iconUrl={t.icon_url} className="w-4 h-4 text-[9px]" />
                                        <span>{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extra Metadata Grid */}
                    {project.extra_meta && Object.keys(project.extra_meta).length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-200/80">
                            {Object.entries(project.extra_meta).map(([key, val]) => (
                                <div key={key} className="p-3 rounded-lg bg-stone-50 border border-stone-200/70">
                                    <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500 block mb-0.5">
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs font-semibold text-stone-900">{String(val)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Action Hub */}
                <div className="p-4 sm:p-5 border-t border-stone-200/80 bg-stone-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {isVideo && project.video_url && onPlayVideo && (
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onPlayVideo(project);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-950 hover:bg-stone-850 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <span>Putar Video Trailer</span>
                            </button>
                        )}

                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-950 text-white text-xs font-semibold hover:bg-stone-850 transition-all shadow-xs"
                            >
                                <span>Demo Live</span>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}

                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-all shadow-2xs"
                            >
                                <span>Repositori Kode</span>
                            </a>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
