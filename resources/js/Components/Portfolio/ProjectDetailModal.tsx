import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
    onPlayVideo?: (project: Project) => void;
}

export default function ProjectDetailModal({ project, onClose, onPlayVideo }: ProjectDetailModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (project) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, onClose]);

    if (!project) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
        >
            <div className="fixed inset-0" onClick={onClose} />

            <div className="relative z-10 w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/60">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {project.category?.name}
                            </span>
                            {project.custom_badge && (
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                    {project.custom_badge}
                                </span>
                            )}
                        </div>
                        <h2 id="project-detail-title" className="text-2xl font-heading font-bold text-white">
                            {project.title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup detail proyek"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-slate-300">
                    {/* Ringkasan */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                            Ringkasan Proyek
                        </h4>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                            {project.summary}
                        </p>
                    </div>

                    {/* Problem Statement */}
                    {project.problem_statement && (
                        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500" />
                                Tantangan & Masalah
                            </h4>
                            <p className="text-sm leading-relaxed text-slate-300">
                                {project.problem_statement}
                            </p>
                        </div>
                    )}

                    {/* Solution */}
                    {project.solution && (
                        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Solusi Rekayasa & Hasil
                            </h4>
                            <p className="text-sm leading-relaxed text-slate-300">
                                {project.solution}
                            </p>
                        </div>
                    )}

                    {/* Tools & Stacks Used */}
                    {project.tools && project.tools.length > 0 && (
                        <div>
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2.5">
                                Tools & Aplikasi yang Digunakan
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((t) => (
                                    <span
                                        key={t.id}
                                        className="text-xs px-3 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700/80"
                                    >
                                        {t.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extra Metadata (if any) */}
                    {project.extra_meta && Object.keys(project.extra_meta).length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
                            {Object.entries(project.extra_meta).map(([key, val]) => (
                                <div key={key} className="p-3 rounded-lg bg-slate-950/30 border border-slate-800/60">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-0.5">
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs font-medium text-slate-200">{String(val)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Action Bar */}
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        {project.media_type === 'video_embed' && project.video_url && onPlayVideo && (
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onPlayVideo(project);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <span>Putar Video Sekarang</span>
                            </button>
                        )}

                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <span>Live Demo</span>
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
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                                <span>Lihat Kode (GitHub)</span>
                            </a>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
