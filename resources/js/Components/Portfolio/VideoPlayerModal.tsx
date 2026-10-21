import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';

interface VideoPlayerModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function VideoPlayerModal({ project, onClose }: VideoPlayerModalProps) {
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

    // Determine embed URL (fallback to video_url if embed_url not provided)
    const embedUrl = project.embed_url || project.video_url;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            {/* Click outside to close backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative z-10 w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
                    <div>
                        <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
                            {project.category?.name || 'Video Showcase'}
                        </span>
                        <h3 id="video-modal-title" className="text-lg font-heading font-bold text-white truncate max-w-md">
                            {project.title}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup pemutar video"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 16:9 Responsive Video Aspect Ratio Container */}
                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={project.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <div className="text-slate-400 text-sm p-8 text-center">
                            Video player tidak tersedia untuk sumber ini.
                        </div>
                    )}
                </div>

                {/* Video Info Footer */}
                <div className="p-6 bg-slate-900/95 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                        {project.summary}
                    </p>

                    {project.video_url && (
                        <a
                            href={project.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium whitespace-nowrap focus:outline-none focus:underline"
                        >
                            <span>Buka di tab baru</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
