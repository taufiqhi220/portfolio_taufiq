import React from 'react';
import { Project } from '@/types/portfolio';

interface ProjectCardProps {
    project: Project;
    onPlayVideo: (project: Project) => void;
    onViewDetail: (project: Project) => void;
}

export default function ProjectCard({ project, onPlayVideo, onViewDetail }: ProjectCardProps) {
    const isVideo = project.media_type === 'video_embed' || project.category?.display_mode === 'video';

    return (
        <article className="group bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900 transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-950/20">
            {/* Visual Header / Media Preview */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden flex items-center justify-center">
                {project.thumbnail_path ? (
                    <img
                        src={project.thumbnail_path}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    // Elegant crafted fallback background with subtle tech grid/waves
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center relative p-6">
                        <div className="text-center">
                            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                                {project.category?.name}
                            </span>
                            <span className="text-sm font-heading font-semibold text-slate-300 line-clamp-2">
                                {project.title}
                            </span>
                        </div>
                    </div>
                )}

                {/* Video Play Button Overlay for Video Projects */}
                {isVideo && (
                    <button
                        type="button"
                        onClick={() => onPlayVideo(project)}
                        aria-label={`Putar video ${project.title}`}
                        className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-900/40 transform group-hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    >
                        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                )}

                {/* Badge Pills */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 backdrop-blur-md">
                        {project.category?.name}
                    </span>
                    {project.custom_badge && (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 backdrop-blur-md">
                            {project.custom_badge}
                        </span>
                    )}
                </div>

                {/* Duration or Role tag if available in extra_meta */}
                {project.extra_meta?.duration && (
                    <div className="absolute bottom-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded bg-black/80 text-white">
                        {project.extra_meta.duration}
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                        {project.summary}
                    </p>
                </div>

                <div>
                    {/* Tool Badges */}
                    {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.tools.slice(0, 4).map((tool) => (
                                <span
                                    key={tool.id}
                                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                                >
                                    {tool.name}
                                </span>
                            ))}
                            {project.tools.length > 4 && (
                                <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
                                    +{project.tools.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <button
                            type="button"
                            onClick={() => onViewDetail(project)}
                            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 focus:outline-none focus:underline"
                        >
                            <span>Studi Kasus Detail</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3">
                            {project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    title="Kunjungi Live Demo"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    title="Lihat Sumber Kode"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
