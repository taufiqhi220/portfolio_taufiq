import React from 'react';
import { Profile, ToolStack } from '@/types/portfolio';
import ToolIcon from './ToolIcon';
import Reveal from './Reveal';

interface ToolsArsenalProps {
    tools: Record<string, ToolStack[]>;
    profile?: Profile;
}

export default function ToolsArsenal({ tools = {}, profile }: ToolsArsenalProps) {
    const creativeTools = (tools && tools['creative_software']) || [];
    const webTools = (tools && tools['web_stack']) || [];
    const generalTools = (tools && tools['general_tools']) || [];

    return (
        <section id="tentang" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Personal Approach & Background */}
                    <div className="lg:col-span-5 space-y-6">
                        <Reveal delay={50}>
                            <div className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-3">
                                03 / Profil
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
                                Tentang Saya
                            </h2>

                            <p className="text-base text-stone-600 leading-relaxed mb-6">
                                {profile?.bio ||
                                    'Mengembangkan aplikasi web dan mengerjakan editing video serta konten multimedia.'}
                            </p>

                            <div className="p-4 rounded-xl bg-white/75 backdrop-blur-md border border-stone-300/60 shadow-2xs space-y-2 text-xs font-mono text-stone-600">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                    <span>Fokus: {profile?.headline || 'Web Development & Video Editing'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                                    <span>Lokasi: {profile?.location || 'Indonesia (WITA / UTC+8)'}</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Toolkit with Brand Icons */}
                    <div className="lg:col-span-7 lg:pl-4 space-y-8">
                        <div>
                            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block mb-4">
                                Tools &amp; Software yang Digunakan
                            </span>
                        </div>

                        {/* Creative & Video */}
                        <Reveal delay={100}>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                                        01 / Video Editing &amp; Desain
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                    {creativeTools.map((t) => (
                                        <div
                                            key={t.id}
                                            className="p-2.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-stone-300/50 hover:border-amber-500/40 text-stone-800 text-xs font-medium shadow-2xs flex items-center gap-2.5 hover:shadow-xs transition-all"
                                        >
                                            <ToolIcon name={t.name} slug={t.slug} iconUrl={t.icon_url || t.icon_name || null} className="w-5 h-5 shrink-0" />
                                            <span className="truncate">{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {/* Web Development Stack */}
                        <Reveal delay={180}>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                                        02 / Web Development
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                    {webTools.map((t) => (
                                        <div
                                            key={t.id}
                                            className="p-2.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-stone-300/50 hover:border-amber-500/40 text-stone-800 text-xs font-medium shadow-2xs flex items-center gap-2.5 hover:shadow-xs transition-all"
                                        >
                                            <ToolIcon name={t.name} slug={t.slug} iconUrl={t.icon_url || t.icon_name || null} className="w-5 h-5 shrink-0" />
                                            <span className="truncate">{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {/* General & Workflow Tools */}
                        <Reveal delay={260}>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                                        03 / Tools Pendukung
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                    {generalTools.map((t) => (
                                        <div
                                            key={t.id}
                                            className="p-2.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-stone-300/50 hover:border-amber-500/40 text-stone-800 text-xs font-medium shadow-2xs flex items-center gap-2.5 hover:shadow-xs transition-all"
                                        >
                                            <ToolIcon name={t.name} slug={t.slug} iconUrl={t.icon_url || t.icon_name || null} className="w-5 h-5 shrink-0" />
                                            <span className="truncate">{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
