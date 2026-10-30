import React from 'react';
import { Profile } from '@/types/portfolio';
import Reveal from './Reveal';

interface ContactFormProps {
    profile: Profile;
}

export default function ContactForm({ profile }: ContactFormProps) {
    const hasSocialLinks = Boolean(profile.github_url || profile.linkedin_url);

    return (
        <section id="kontak" className="py-20 md:py-28 relative">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
                <Reveal delay={40}>
                    <div className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-3">
                        04 / Kontak &amp; Tautan
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight mb-5">
                        Mari Terhubung
                    </h2>

                    <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed">
                        Tertarik berdiskusi mengenai pengembangan web, editing video, atau peluang kerja sama? Silakan terhubung melalui tautan berikut.
                    </p>
                </Reveal>

                {hasSocialLinks && (
                    <Reveal delay={120}>
                        <div className="max-w-lg mx-auto bg-white/75 backdrop-blur-md rounded-2xl border border-stone-300/60 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] p-6 sm:p-8">
                            <span className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-4">
                                Tautan Profil
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {profile.github_url && (
                                    <a
                                        href={profile.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-stone-300/60 backdrop-blur-xs text-stone-800 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                        <span>GitHub</span>
                                    </a>
                                )}

                                {profile.linkedin_url && (
                                    <a
                                        href={profile.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-stone-300/60 backdrop-blur-xs text-stone-800 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs"
                                    >
                                        <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
