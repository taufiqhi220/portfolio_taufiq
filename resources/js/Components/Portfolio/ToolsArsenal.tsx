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
        <section id="tentang" className="py-20 md:py-28 bg-[#080c14] border-t border-slate-900 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Personal Philosophy & Background */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                            03 / Tentang &amp; Pendekatan
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
                            Menghubungkan Kode yang Terstruktur dengan Cerita Visual.
                        </h2>

                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                            Saya percaya bahwa aplikasi web yang tangguh dan video yang berkesan memiliki prinsip dasar yang sama: fondasi arsitektur yang kokoh, ritme yang terukur, dan kepedulian tinggi terhadap pengalaman manusia yang menggunakannya.
                        </p>

                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                            Di sisi rekayasa web, fokus utama saya adalah membangun sistem monolitik modern maupun API dengan Laravel, React, dan PostgreSQL yang aman serta mudah dipelihara. Di sisi pascaproduksi video, saya mengolah potongan visual mentah menjadi narasi dinamis melalui tata suara, kinetic motion, dan color grading sinematik.
                        </p>

                        <div className="pt-4 border-t border-slate-800/80 font-mono text-xs text-slate-400 space-y-2">
                            <p>&bull; Spesialisasi: Full-Stack Web Architecture &amp; Video Post-Production</p>
                            <p>&bull; Prinsip: Kode yang bersih, desain yang fungsional, dan visual yang berkarakter</p>
                        </div>
                    </div>

                    {/* Right Column: Authentic Toolkit & Colophon */}
                    <div className="lg:col-span-6 lg:pl-6 space-y-8">
                        <div>
                            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-4">
                                Toolkit &amp; Perangkat Harian
                            </span>
                        </div>

                        {/* Creative & Video */}
                        <div className="space-y-3">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                                01 / Video Editing &amp; Motion
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {creativeTools.map((t) => (
                                    <span
                                        key={t.id}
                                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                                    >
                                        {t.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Web Development Stack */}
                        <div className="space-y-3">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                                02 / Web &amp; Backend Engineering
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {webTools.map((t) => (
                                    <span
                                        key={t.id}
                                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                                    >
                                        {t.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Workflow & DevOps */}
                        <div className="space-y-3">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                                03 / Alur Kerja &amp; Deployment
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {generalTools.map((t) => (
                                    <span
                                        key={t.id}
                                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                                    >
                                        {t.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
