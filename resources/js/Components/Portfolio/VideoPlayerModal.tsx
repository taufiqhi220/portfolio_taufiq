import React, { useEffect, useMemo, useState } from 'react';
import { Project, VideoEpisode } from '@/types/portfolio';
import { toEmbedUrl } from '@/Utils/videoEmbed';

interface VideoPlayerModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function VideoPlayerModal({ project, onClose }: VideoPlayerModalProps) {
    const [animateIn, setAnimateIn] = useState(false);
    const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);

    const playlist = useMemo<VideoEpisode[]>(() => {
        if (!project) return [];
        const episodes = project.extra_meta?.episodes || [];
        if (episodes.length === 0) {
            return [];
        }

        // If main video_url is distinct from all episode URLs, include it first
        const mainUrl = project.video_url?.trim();
        if (mainUrl && !episodes.some((ep) => ep.video_url?.trim() === mainUrl)) {
            return [
                {
                    title: 'Video Utama',
                    video_url: mainUrl,
                    duration: project.extra_meta?.duration,
                },
                ...episodes,
            ];
        }

        return episodes;
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (project) {
            setActiveEpisodeIndex(0);
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

    const currentEpisode = playlist.length > 0 ? playlist[activeEpisodeIndex] || playlist[0] : null;
    const rawVideoUrl = currentEpisode ? currentEpisode.video_url : project.video_url;
    const embedUrl = toEmbedUrl(rawVideoUrl) || project.embed_url || rawVideoUrl;
    const isVertical = project.extra_meta?.aspect_ratio === '9:16';

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
                className={`relative z-10 w-full ${
                    isVertical ? 'max-w-sm sm:max-w-md' : 'max-w-4xl'
                } max-h-[92vh] flex flex-col bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out transform ${
                    animateIn ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-stone-800 bg-stone-950/90 shrink-0">
                    <div className="min-w-0 pr-4">
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-500 font-mono block mb-0.5">
                            {project.category?.name || 'Karya Video'} {isVertical ? '(9:16 Vertikal)' : ''}
                            {playlist.length > 0 ? ` • Episode ${activeEpisodeIndex + 1} dari ${playlist.length}` : ''}
                        </span>
                        <h3 id="video-modal-title" className="text-base sm:text-lg font-heading font-bold text-stone-100 truncate">
                            {currentEpisode ? `${project.title}: ${currentEpisode.title}` : project.title}
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

                {/* Adaptive Video Aspect Ratio Container (16:9 Landscape vs 9:16 Vertical) */}
                <div
                    className={`relative w-full ${
                        isVertical ? 'aspect-[9/16] max-h-[58vh]' : 'aspect-video max-h-[60vh]'
                    } bg-black flex items-center justify-center shrink-0`}
                >
                    {embedUrl ? (
                        <iframe
                            key={embedUrl}
                            src={embedUrl}
                            title={currentEpisode ? `${project.title} - ${currentEpisode.title}` : project.title}
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

                {/* Multi-Episode Playlist Selector (when project has episodes) */}
                {playlist.length > 0 && (
                    <div className="bg-stone-900/95 border-t border-stone-800 px-4 sm:px-6 py-3 overflow-y-auto max-h-44">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                                Daftar Episode / Playlist ({playlist.length} Video)
                            </span>
                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    disabled={activeEpisodeIndex <= 0}
                                    onClick={() => setActiveEpisodeIndex((i) => Math.max(0, i - 1))}
                                    className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 font-mono text-[10px] cursor-pointer transition-colors"
                                >
                                    &larr; Sebelumnya
                                </button>
                                <button
                                    type="button"
                                    disabled={activeEpisodeIndex >= playlist.length - 1}
                                    onClick={() => setActiveEpisodeIndex((i) => Math.min(playlist.length - 1, i + 1))}
                                    className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 font-mono text-[10px] cursor-pointer transition-colors"
                                >
                                    Berikutnya &rarr;
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {playlist.map((ep, idx) => {
                                const isCurrent = idx === activeEpisodeIndex;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveEpisodeIndex(idx)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-mono transition-all cursor-pointer border ${
                                            isCurrent
                                                ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                                                : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:text-white'
                                        }`}
                                    >
                                        <span className="truncate pr-2">
                                            {idx + 1}. {ep.title || `Episode ${idx + 1}`}
                                        </span>
                                        <span className="text-[10px] shrink-0 text-stone-400">
                                            {isCurrent ? '▶ Diputar' : ep.duration || 'Putar'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Video Info Footer */}
                <div className="p-4 sm:p-5 bg-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-800/80 shrink-0">
                    <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed line-clamp-2">
                        {project.summary}
                    </p>

                    {rawVideoUrl && (
                        <a
                            href={rawVideoUrl}
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
