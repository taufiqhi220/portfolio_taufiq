import React, { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';

interface VideoPlayerModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function VideoPlayerModal({ project, onClose }: VideoPlayerModalProps) {
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
            const timer = setTimeout(() => setAnimateIn(true), 20);
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

    // Determine embed URL (fallback to video_url if embed_url not provided)
    const embedUrl = project.embed_url || project.video_url;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ease-out ${
                animateIn ? 'bg-black/85 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            {/* Click outside to close backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className={`relative z-10 w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out transform ${
                    animateIn ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-stone-800 bg-stone-950/90">
                    <div className="min-w-0 pr-4">
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-500 font-mono block mb-0.5">
                            {project.category?.name || 'Video Showcase'}
                        </span>
                        <h3 id="video-modal-title" className="text-base sm:text-lg font-heading font-bold text-stone-100 truncate">
                            {project.title}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup pemutar video"
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0 cursor-pointer"
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
                        <div className="text-stone-400 text-sm p-8 text-center font-mono">
                            Video player tidak tersedia untuk sumber ini.
                        </div>
                    )}
                </div>

                {/* Video Info Footer */}
                <div className="p-4 sm:p-5 bg-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-800/80">
                    <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed line-clamp-2">
                        {project.summary}
                    </p>

                    {project.video_url && (
                        <a
                            href={project.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap focus:outline-none focus:underline shrink-0"
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
