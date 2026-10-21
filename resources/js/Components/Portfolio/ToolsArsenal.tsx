import React from 'react';
import { ToolStack } from '@/types/portfolio';

interface ToolsArsenalProps {
    tools: Record<string, ToolStack[]>;
}

export default function ToolsArsenal({ tools }: ToolsArsenalProps) {
    const creativeTools = tools['creative_software'] || [];
    const webTools = tools['web_stack'] || [];
    const generalTools = tools['general_tools'] || [];

    return (
        <section id="arsenal" className="py-20 md:py-28 bg-slate-950/60 border-y border-slate-900 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        Kompilasi Alat & Teknologi
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                        Tools, Framework & Software
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base mt-3">
                        Perangkat lunak dan teknologi yang saya gunakan sehari-hari dalam rekayasa sistem web serta alur produksi konten multimedia.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Creative Software Suite */}
                    <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-bold text-white">Creative & Video Suite</h3>
                                    <p className="text-xs text-slate-400">Editing, motion grafis & grading</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                Digunakan untuk alur pascaproduksi video, mulai dari assembly cut, motion graphics, audio mastering, hingga color grading profesional.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {creativeTools.map((t) => (
                                <span
                                    key={t.id}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/70 text-xs font-medium hover:border-purple-500/40 hover:bg-slate-800 transition-colors"
                                >
                                    {t.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Web & Software Engineering Stack */}
                    <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-bold text-white">Web & Engineering Stack</h3>
                                    <p className="text-xs text-slate-400">Arsitektur web & backend terstruktur</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                Pondasi pengembangan aplikasi monolitik modern maupun micro-services dengan performa tinggi, keamanan teruji, dan clean architecture.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {webTools.map((t) => (
                                <span
                                    key={t.id}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/70 text-xs font-medium hover:border-cyan-500/40 hover:bg-slate-800 transition-colors"
                                >
                                    {t.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* DevOps & Development Tools */}
                    <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-bold text-white">Workflow & DevOps</h3>
                                    <p className="text-xs text-slate-400">Manajemen rilis, API & terminal</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                Peralatan pendukung untuk kolaborasi kode tim, pengujian endpoint API, automasi alur kerja, dan deployment cloud.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {generalTools.map((t) => (
                                <span
                                    key={t.id}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/70 text-xs font-medium hover:border-emerald-500/40 hover:bg-slate-800 transition-colors"
                                >
                                    {t.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
