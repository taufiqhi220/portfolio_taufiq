import React from 'react';
import { Project } from '@/types/portfolio';

interface ProjectCardProps {
    project: Project;
    index: number;
    onPlayVideo: (project: Project) => void;
    onViewDetail: (project: Project) => void;
}

export default function ProjectCard({ project, index, onPlayVideo, onViewDetail }: ProjectCardProps) {
    const isVideo = project.media_type === 'video_embed' || project.category?.display_mode === 'video';
    const projectNumber = String(index + 1).padStart(2, '0');

    return (
        <article className="group bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col overflow-hidden">
            {/* Visual Media Canvas */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800/60">
                {project.thumbnail_path ? (
                    <img
                        src={project.thumbnail_path}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                        <span className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-1">
                            {project.category?.name}
                        </span>
                        <h4 className="text-sm font-heading font-semibold text-slate-300 line-clamp-2 max-w-xs">
                            {project.title}
                        </h4>
                    </div>
                )}

                {/* Video Play Trigger for Video Projects */}
                {isVideo && (
                    <button
                        type="button"
                        onClick={() => onPlayVideo(project)}
                        aria-label={`Putar video proyek ${project.title}`}
                        className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-cyan-400 group/btn"
                    >
                        <svg className="w-5 h-5 ml-0.5 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                )}

                {/* Index Pill & Custom Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-black/80 text-white backdrop-blur-sm border border-white/10">
                        #{projectNumber}
                    </span>
                    {project.custom_badge && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 backdrop-blur-sm">
                            {project.custom_badge}
                        </span>
                    )}
                </div>

                {/* Video Duration / Format Tag if in extra_meta */}
                {isVideo && project.extra_meta?.duration && (
                    <div className="absolute bottom-3 right-3 font-mono text-[11px] px-2 py-0.5 rounded bg-black/80 text-white border border-white/10">
                        {project.extra_meta.duration}
                    </div>
                )}
            </div>

            {/* Card Content & Meta */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>{project.category?.name}</span>
                        {project.is_featured && (
                            <span className="text-emerald-400 font-sans font-medium text-[11px]">
                                &bull; Unggulan
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-5">
                        {project.summary}
                    </p>
                </div>

                <div>
                    {/* Tool Badges */}
                    {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800/60">
                            {project.tools.slice(0, 4).map((tool) => (
                                <span
                                    key={tool.id}
                                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/60"
                                >
                                    {tool.name}
                                </span>
                            ))}
                            {project.tools.length > 4 && (
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800/30 text-slate-400">
                                    +{project.tools.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Action Links (No SaaS generic buttons) */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
                        <button
                            type="button"
                            onClick={() => onViewDetail(project)}
                            className="text-slate-300 hover:text-white font-medium inline-flex items-center gap-1.5 focus:outline-none focus:underline"
                        >
                            <span>Studi Kasus</span>
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3">
                            {isVideo ? (
                                <button
                                    type="button"
                                    onClick={() => onPlayVideo(project)}
                                    className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                                >
                                    <span>Tonton Video</span>
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
                                            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                                        >
                                            <span>Demo</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-white font-medium inline-flex items-center gap-1"
                                        >
                                            <span>Kode</span>
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
