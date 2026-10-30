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
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    // Combine thumbnail and gallery images into a unified gallery list
    const allGalleryImages = React.useMemo(() => {
        if (!project) return [];
        const list: { url: string; caption?: string | null }[] = [];
        if (project.thumbnail_path) {
            list.push({ url: project.thumbnail_path, caption: 'Thumbnail Utama' });
        }
        if (project.images && project.images.length > 0) {
            project.images.forEach((img) => {
                if (img.image_path && img.image_path !== project.thumbnail_path) {
                    list.push({ url: img.image_path, caption: img.caption });
                }
            });
        }
        return list;
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (project) {
            setActiveImageIndex(0);
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
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
    const isWeb = project.category?.slug === 'web-development' || project.media_type === 'image';
    const currentActiveImage = allGalleryImages[activeImageIndex]?.url || project.thumbnail_path;

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

            {/* Modal Box */}
            <div
                className={`relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-stone-300/80 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden my-auto flex flex-col max-h-[88vh] transition-all duration-300 ease-out transform ${
                    animateIn ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {/* Visual Banner Preview Canvas */}
                <div className="relative aspect-21/9 sm:aspect-21/8 bg-stone-950 overflow-hidden flex items-center justify-center border-b border-stone-200/80 shrink-0 select-none">
                    {currentActiveImage ? (
                        <img
                            src={currentActiveImage}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-95 transition-all duration-300"
                        />
                    ) : isVideo ? (
                        <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-black p-4 flex flex-col justify-between relative text-stone-300">
                            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-stone-400">
                                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    <span>POST-PRODUCTION &bull; VIDEO</span>
                                </span>
                                <span className="text-amber-400 font-medium">
                                    {project.extra_meta?.completion_year || 'Portofolio'}
                                </span>
                            </div>
                            <div className="my-auto text-center">
                                <h3 className="text-base font-heading font-bold text-white line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                                <span>{project.extra_meta?.role ? `Peran: ${project.extra_meta.role}` : 'Karya Visual'}</span>
                                <span className="text-amber-300 font-medium">{project.custom_badge || 'Showcase Video'}</span>
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
                                <span className="text-stone-400 font-semibold">{project.category?.name || 'Rekayasa Perangkat Lunak'}</span>
                                <span className="text-stone-400">{project.extra_meta?.completion_year || ''}</span>
                            </div>
                            <div className="my-auto text-center font-sans">
                                <h3 className="text-base font-heading font-bold text-white line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-stone-400">
                                <span>
                                    {project.tools && project.tools.length > 0
                                        ? project.tools.slice(0, 3).map((t) => t.name).join(' &bull; ')
                                        : 'Aplikasi Web'}
                                </span>
                                <span className="text-amber-400">{project.custom_badge || 'Studi Kasus'}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-3.5 flex flex-col justify-between relative text-stone-300 font-mono text-[10px]">
                            <div className="flex items-center justify-between border-b border-stone-800/80 pb-1">
                                <span className="font-semibold text-stone-400">{project.category?.name || 'Studi Kasus'}</span>
                                <span className="text-amber-400">{project.extra_meta?.completion_year || ''}</span>
                            </div>
                            <div className="my-auto text-center font-sans">
                                <h3 className="text-base font-heading font-bold text-white line-clamp-1">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="text-stone-400 text-right">
                                {project.custom_badge || 'Riset & Eksperimen'}
                            </div>
                        </div>
                    )}

                    {/* Close button at top right */}
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

                {/* Multi-Image Interactive Gallery Strip (if more than 1 image exists) */}
                {allGalleryImages.length > 1 && (
                    <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider shrink-0 mr-1">
                            Galeri:
                        </span>
                        {allGalleryImages.map((img, idx) => {
                            const isSelected = activeImageIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer h-10 w-16 ${
                                        isSelected
                                            ? 'border-amber-400 ring-2 ring-amber-400/40 opacity-100 scale-105'
                                            : 'border-stone-700 opacity-60 hover:opacity-90'
                                    }`}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.caption || `Screenshot ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Header Information */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-stone-200/80 bg-white shrink-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200">
                            {project.category?.name || 'Portofolio'}
                        </span>
                        {project.custom_badge && (
                            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                {project.custom_badge}
                            </span>
                        )}
                        {project.extra_meta?.completion_year && (
                            <span className="text-[11px] font-mono text-stone-500">
                                &bull; {project.extra_meta.completion_year}
                            </span>
                        )}
                        {project.extra_meta?.client_name && (
                            <span className="text-[11px] font-mono text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                                Klien: {project.extra_meta.client_name}
                            </span>
                        )}
                    </div>
                    <h2 id="project-detail-title" className="text-xl sm:text-2xl font-heading font-extrabold text-stone-900 leading-snug">
                        {project.title}
                    </h2>
                </div>

                {/* Scrollable Content Body */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed">
                    {/* Ringkasan Eksekutif */}
                    <div>
                        <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-stone-400 mb-2">
                            Ringkasan Proyek
                        </h3>
                        <p className="font-serif text-base text-stone-800 leading-relaxed font-normal">
                            {project.summary}
                        </p>
                    </div>

                    {/* Deskripsi Lengkap jika ada */}
                    {project.description && (
                        <div className="pt-2">
                            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-stone-400 mb-2">
                                Ulasan Lengkap Studi Kasus
                            </h3>
                            <div className="prose prose-stone prose-sm max-w-none whitespace-pre-line text-stone-700 leading-relaxed">
                                {project.description}
                            </div>
                        </div>
                    )}

                    {/* Tantangan & Pendekatan Teknis (Problem vs Solution) */}
                    {(project.problem_statement || project.solution) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            {project.problem_statement && (
                                <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/90 shadow-2xs">
                                    <div className="flex items-center gap-2 mb-2 text-rose-700 font-mono text-xs font-bold uppercase tracking-wider">
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span>Tantangan &amp; Kendala</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                                        {project.problem_statement}
                                    </p>
                                </div>
                            )}

                            {project.solution && (
                                <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 shadow-2xs">
                                    <div className="flex items-center gap-2 mb-2 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider">
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Solusi &amp; Pendekatan Rekayasa</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                                        {project.solution}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tools / Software Arsenal Tag Cloud */}
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

                    {/* Daftar Episode / Playlist Video jika ada */}
                    {project.extra_meta?.episodes && project.extra_meta.episodes.length > 0 && (
                        <div>
                            <h4 className="text-[11px] uppercase tracking-wider font-mono font-bold text-stone-500 mb-2.5">
                                Daftar Episode / Playlist ({project.extra_meta.episodes.length} Video)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.extra_meta.episodes.map((ep, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            if (onPlayVideo) {
                                                onClose();
                                                onPlayVideo(project);
                                            }
                                        }}
                                        className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50/70 border border-stone-200 hover:border-amber-300 text-left text-xs font-mono transition-all cursor-pointer"
                                    >
                                        <span className="font-semibold text-stone-800 truncate pr-2">
                                            {idx + 1}. {ep.title || `Episode ${idx + 1}`}
                                        </span>
                                        <span className="text-[10px] text-amber-700 font-bold shrink-0">
                                            ▶ {ep.duration || 'Putar'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Peran & Konteks Tambahan */}
                    {project.extra_meta?.role && (
                        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-mono">
                            <span className="text-stone-500">Peran / Kontribusi:</span>
                            <span className="font-semibold text-stone-900">{project.extra_meta.role}</span>
                        </div>
                    )}
                </div>

                {/* Footer Action Hub */}
                <div className="p-4 sm:p-5 border-t border-stone-200/80 bg-stone-50/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Play Video Button */}
                        {isVideo && (project.video_url || (project.extra_meta?.episodes && project.extra_meta.episodes.length > 0)) && onPlayVideo && (
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
                                <span>
                                    {project.extra_meta?.episodes && project.extra_meta.episodes.length > 0
                                        ? `Putar Playlist (${project.extra_meta.episodes.length} Episode)`
                                        : 'Putar Video Karya'}
                                </span>
                            </button>
                        )}

                        {/* Live Demo URL */}
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

                        {/* GitHub Source Code */}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-all shadow-2xs"
                            >
                                <svg className="w-3.5 h-3.5 text-stone-700" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                <span>Repositori Kode</span>
                            </a>
                        )}

                        {/* Figma Prototype Link */}
                        {project.extra_meta?.figma_url && (
                            <a
                                href={project.extra_meta.figma_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-all shadow-2xs"
                            >
                                <svg className="w-3.5 h-3.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 12C6 10.3431 7.34315 9 9 9H12V15H9C7.34315 15 6 13.6569 6 12Z" />
                                    <path d="M12 3H9C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9H12V3Z" />
                                    <path d="M12 3H15C16.6569 3 18 4.34315 18 6C18 7.65685 16.6569 9 15 9H12V3Z" />
                                    <path d="M12 9H15C16.6569 9 18 10.3431 18 12C18 13.6569 16.6569 15 15 15H12V9Z" />
                                    <path d="M12 15V21C10.3431 21 9 19.6569 9 18C9 16.3431 10.3431 15 12 15Z" />
                                </svg>
                                <span>Figma Prototype</span>
                            </a>
                        )}

                        {/* PDF / Research Documentation Link */}
                        {project.extra_meta?.docs_url && (
                            <a
                                href={project.extra_meta.docs_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-all shadow-2xs"
                            >
                                <svg className="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span>Dokumen PDF / Laporan</span>
                            </a>
                        )}

                        {/* Mobile App Link */}
                        {project.extra_meta?.playstore_url && (
                            <a
                                href={project.extra_meta.playstore_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-all shadow-2xs"
                            >
                                <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3.609 1.814L13.793 12 3.61 22.186A2.25 2.25 0 013 20.625V3.375c0-.622.254-1.2.609-1.561zM15.207 13.414l2.186 2.186-11.58 6.514 9.394-8.7zm0-2.828L5.813 1.886l11.58 6.514-2.186 2.186zm1.414 1.414l3.657 2.057a1.5 1.5 0 000-2.614L16.621 12z" />
                                </svg>
                                <span>Unduh Aplikasi</span>
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
