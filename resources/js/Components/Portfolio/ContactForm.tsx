import React, { useState } from 'react';
import { Profile } from '@/types/portfolio';
import Reveal from './Reveal';

interface ContactFormProps {
    profile: Profile;
}

export default function ContactForm({ profile }: ContactFormProps) {
    const [copied, setCopied] = useState(false);

    const email = profile.email || 'taufiq@portfolio.test';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <section id="kontak" className="py-20 md:py-28 relative">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
                <Reveal delay={40}>
                    <div className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-3">
                        04 / Kontak &amp; Kolaborasi
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight mb-5">
                        Mari Terhubung &amp; Berkolaborasi.
                    </h2>

                    <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed">
                        Tertarik mendiskusikan proyek web baru, produksi video kreatif, atau sekadar bertukar ide seputar teknologi dan multimedia? Pintu komunikasi saya selalu terbuka.
                    </p>
                </Reveal>

                {/* Direct Action Hub with Reveal & Frosted Glass */}
                <Reveal delay={120}>
                    <div className="max-w-lg mx-auto bg-white/75 backdrop-blur-md rounded-2xl border border-stone-300/60 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] p-6 sm:p-8 space-y-6">
                        {/* Primary Email Box */}
                        <div className="p-4 rounded-xl bg-white/60 border border-stone-300/50 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-left flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                                        Email Pribadi
                                    </span>
                                    <span className="font-heading font-semibold text-stone-900 text-sm sm:text-base truncate block">
                                        {email}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="px-3.5 py-2 rounded-lg bg-white/80 border border-stone-300/70 text-stone-700 hover:text-stone-900 text-xs font-medium hover:bg-white transition-colors shadow-2xs"
                                >
                                    {copied ? 'Tersalin!' : 'Salin'}
                                </button>

                                <a
                                    href={`mailto:${email}`}
                                    className="px-4 py-2 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-semibold transition-colors shadow-xs"
                                >
                                    Kirim Email
                                </a>
                            </div>
                        </div>

                        {/* Social Channels Minimal Grid */}
                        <div className="pt-2">
                            <span className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-4">
                                Tautan Jejaring Profesional
                            </span>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {profile.github_url && (
                                    <a
                                        href={profile.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-white/60 hover:bg-white/95 border border-stone-300/50 backdrop-blur-xs text-stone-800 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs"
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
                                        className="p-3 rounded-xl bg-white/60 hover:bg-white/95 border border-stone-300/50 backdrop-blur-xs text-stone-800 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs"
                                    >
                                        <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                )}

                                {profile.youtube_url && (
                                    <a
                                        href={profile.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-white/60 hover:bg-white/95 border border-stone-300/50 backdrop-blur-xs text-stone-800 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs"
                                    >
                                        <svg className="w-4 h-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                        <span>YouTube</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
