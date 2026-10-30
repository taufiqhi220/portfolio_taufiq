import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import ToolIcon from './ToolIcon';

interface ProjectCardProps {
    project: Project;
    index: number;
    onPlayVideo: (project: Project) => void;
    onViewDetail: (project: Project) => void;
}

export default function ProjectCard({ project, index, onPlayVideo, onViewDetail }: ProjectCardProps) {
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const isVideo = project.media_type === 'video_embed' || project.category?.slug === 'video-editing';
    const isWeb = project.category?.slug === 'web-development';
    const isResearch = project.category?.slug === 'research-experiment' || !isVideo && !isWeb;
    const projectNumber = String(index + 1).padStart(2, '0');
    const episodesCount = project.extra_meta?.episodes?.length || 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        setMousePos(null);
    };

    return (
        <article
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-white/80 hover:bg-white/95 backdrop-blur-md rounded-2xl border border-stone-300/60 hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.10)]"
        >
            {/* Dynamic Cursor Spotlight Overlay */}
            {mousePos && (
                <div
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-100"
                    style={{
                        background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 119, 6, 0.08), transparent 70%)`,
                    }}
                />
            )}

            {/* Visual Media Canvas */}
            <div className="relative aspect-video bg-stone-950 overflow-hidden flex items-center justify-center border-b border-stone-200/50 select-none">
                {project.thumbnail_path ? (
                    <img
                        src={project.thumbnail_path}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                ) : isVideo ? (
                    /* High-Craft Cinematic Video Production Monitor Canvas */
                    <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-black p-4 flex flex-col justify-between relative overflow-hidden text-stone-300">
                        {/* Viewfinder Corner Framing Brackets */}
                        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/60" />
                        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/60" />
                        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/60" />
                        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/60" />

                        {/* Top Technical HUD Bar */}
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-stone-400 z-10">
                            <span className="flex items-center gap-1.5 text-rose-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                <span>REC [4K 24FPS]</span>
                            </span>
                            <span className="text-amber-400/90 font-medium">LOG / COLOR GRADE</span>
                        </div>

                        {/* Center Stage: Title Preview & Shimmer */}
                        <div className="text-center z-10 px-4 my-auto">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400/80 block mb-1">
                                {episodesCount > 0 ? `Serial Video &bull; ${episodesCount} Episode` : 'Produksi Video &bull; Motion Graphic'}
                            </span>
                            <p className="text-xs font-heading font-bold text-white line-clamp-1 drop-shadow-md">
                                {project.title}
                            </p>
                        </div>

                        {/* Bottom Sound Spectrum Bar & Timecode */}
                        <div className="flex items-center justify-between z-10 pt-1">
                            {/* Animated Audio Equalizer Spectrum */}
                            <div className="flex items-end gap-1 h-3.5 px-1.5 py-0.5 rounded bg-black/60 border border-stone-800/80">
                                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                                <span className="w-0.5 bg-amber-500 rounded-full animate-eq-2" />
                                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                                <span className="w-0.5 bg-amber-500 rounded-full animate-eq-4" />
                                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-5" />
                            </div>

                            <span className="font-mono text-[10px] text-stone-400 tracking-wider">
                                {project.extra_meta?.duration ? `00:00 / ${project.extra_meta.duration}` : 'PRORES 422 HQ'}
                            </span>
                        </div>

                        {/* Dynamic Anamorphic Prism Lens Flare on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-400/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>
                ) : isWeb ? (
                    /* High-Craft Developer System Architecture Canvas */
                    <div className="w-full h-full bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 p-3.5 flex flex-col justify-between relative overflow-hidden text-stone-300">
                        {/* Terminal Header Bar */}
                        <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="font-mono text-[10px] text-stone-500">
                                app/Http/Portal.php
                            </span>
                            <span className="w-2" />
                        </div>

                        {/* Interactive Code Snippet / Architecture Visual */}
                        <div className="font-mono text-[10.5px] leading-relaxed text-stone-300 my-auto space-y-1 px-1">
                            <div className="text-stone-500 text-[10px]">
                                // Modern Inertia + Laravel Stack
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-emerald-400 font-bold">&rarr; GET</span>
                                <span className="text-amber-300">/api/v1/layanan</span>
                                <span className="text-stone-500">200 OK (22ms)</span>
                            </div>
                            <div className="text-stone-400 text-[10px] flex items-center gap-1">
                                <span>&bull; PostgreSQL Cluster &bull; Redis Cache</span>
                                <span className="w-1.5 h-3 bg-amber-400 animate-cursor-blink inline-block" />
                            </div>
                        </div>

                        {/* System Status Footer */}
                        <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-stone-400 border-t border-stone-800/60">
                            <span className="flex items-center gap-1 text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Production Ready</span>
                            </span>
                            <span className="text-stone-500">99.8% Uptime</span>
                        </div>
                    </div>
                ) : (
                    /* Database / Research Benchmark Canvas */
                    <div className="w-full h-full bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-3.5 flex flex-col justify-between relative overflow-hidden text-stone-300">
                        <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pb-1.5 border-b border-stone-800/80">
                            <span>EXPLAIN ANALYZE BENCHMARK</span>
                            <span className="text-emerald-400 font-bold">100x FASTER</span>
                        </div>
                        <div className="my-auto font-mono text-[10.5px] space-y-1.5 px-1">
                            <div className="flex items-center justify-between">
                                <span className="text-rose-400">Seq Scan:</span>
                                <span className="text-stone-400">1,420 ms</span>
                            </div>
                            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-rose-500 h-full w-[90%]" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-emerald-400 font-semibold">B-Tree Index:</span>
                                <span className="text-emerald-300 font-bold">14 ms (-99%)</span>
                            </div>
                            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[5%]" />
                            </div>
                        </div>
                        <div className="text-[10px] font-mono text-stone-500 text-right">
                            PostgreSQL 16 Engine
                        </div>
                    </div>
                )}

                {/* Video Play Trigger for Video Projects with Animated Pulse Wave */}
                {isVideo && (
                    <button
                        type="button"
                        onClick={() => onPlayVideo(project)}
                        aria-label={`Putar video proyek ${project.title}`}
                        className="absolute inset-0 m-auto w-13 h-13 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/50 group/btn cursor-pointer z-20"
                    >
                        {/* Outer Concentric Ripple Wave */}
                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ripple-ping pointer-events-none" />
                        <svg className="w-5 h-5 ml-0.5 text-stone-950 group-hover/btn:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                )}

                {/* Index Pill & Custom Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-white/95 text-stone-900 backdrop-blur-sm border border-stone-300/80 shadow-2xs">
                        #{projectNumber}
                    </span>
                    {project.custom_badge && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-100/95 text-amber-950 border border-amber-300/80 backdrop-blur-sm shadow-2xs">
                            {project.custom_badge}
                        </span>
                    )}
                </div>

                {/* Multi-image Gallery or Video Episode Count Badge */}
                {episodesCount > 0 ? (
                    <div className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold backdrop-blur-xs z-20 shadow-xs flex items-center gap-1">
                        <span>▶ Playlist &bull; {episodesCount} Ep</span>
                    </div>
                ) : project.images && project.images.length > 0 ? (
                    <div className="absolute top-3 right-3 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/75 text-stone-200 backdrop-blur-xs z-20 border border-stone-700/80 flex items-center gap-1">
                        <svg className="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>+{project.images.length}</span>
                    </div>
                ) : null}

                {/* Video Duration Tag */}
                {isVideo && project.extra_meta?.duration && (
                    <div className="absolute bottom-3 right-3 font-mono text-[11px] px-2 py-0.5 rounded bg-black/85 text-white backdrop-blur-xs z-20 border border-stone-800">
                        {project.extra_meta.duration}
                    </div>
                )}
            </div>

            {/* Card Content & Meta */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                        <span>{project.category?.name}</span>
                        {project.is_featured && (
                            <span className="text-amber-800 font-sans font-medium text-[11px] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                                <span>Unggulan</span>
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-heading font-bold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-5">
                        {project.summary}
                    </p>
                </div>

                <div>
                    {/* Tool Badges with Clean Monogram Icons */}
                    {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mb-5 pt-3 border-t border-stone-200/50">
                            {project.tools.slice(0, 4).map((tool) => (
                                <ToolIcon key={tool.id} name={tool.name} slug={tool.slug} iconUrl={tool.icon_url} className="w-5 h-5 text-[9px]" />
                            ))}
                            {project.tools.length > 4 && (
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                                    +{project.tools.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-200/50">
                        <button
                            type="button"
                            onClick={() => onViewDetail(project)}
                            className="text-stone-800 hover:text-stone-950 font-semibold inline-flex items-center gap-1.5 focus:outline-none focus:underline group/btn2 cursor-pointer"
                        >
                            <span>Buka Studi Kasus</span>
                            <svg className="w-3.5 h-3.5 text-stone-500 group-hover/btn2:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3">
                            {isVideo ? (
                                <button
                                    type="button"
                                    onClick={() => onPlayVideo(project)}
                                    className="text-amber-700 hover:text-amber-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                                >
                                    <span>{episodesCount > 0 ? `Tonton Playlist (${episodesCount} Ep)` : 'Tonton Video'}</span>
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            ) : (
                                <>
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-700 hover:text-amber-900 font-semibold inline-flex items-center gap-1"
                                        >
                                            <span>Demo Live</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.extra_meta?.figma_url && !project.live_url && (
                                        <a
                                            href={project.extra_meta.figma_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-700 hover:text-purple-900 font-semibold inline-flex items-center gap-1"
                                        >
                                            <span>Figma</span>
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-stone-500 hover:text-stone-900 font-medium inline-flex items-center gap-1"
                                        >
                                            <span>Kode</span>
                                        </a>
                                    )}
                                    {project.extra_meta?.docs_url && !project.github_url && (
                                        <a
                                            href={project.extra_meta.docs_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-rose-700 hover:text-rose-900 font-medium inline-flex items-center gap-1"
                                        >
                                            <span>Dokumen</span>
                                        </a>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
