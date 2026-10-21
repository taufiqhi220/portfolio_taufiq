import React from 'react';
import { Profile } from '@/types/portfolio';

interface FooterProps {
    profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand & Copy */}
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">
                            TH
                        </span>
                        <div>
                            <p className="font-medium text-slate-200">
                                {profile.full_name || 'Taufiq Hidayat'}
                            </p>
                            <p className="text-xs text-slate-500">
                                &copy; {currentYear}. Seluruh hak cipta dilindungi.
                            </p>
                        </div>
                    </div>

                    {/* Tech Stack Indicator */}
                    <div className="text-xs text-slate-500 text-center md:text-right">
                        <span>Dibangun dengan Laravel 13, Inertia React, Tailwind CSS v4 &amp; PostgreSQL.</span>
                    </div>

                    {/* Social & Back to Top */}
                    <div className="flex items-center gap-4">
                        {profile.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                                aria-label="Profil GitHub"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                        )}
                        {profile.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                                aria-label="Profil LinkedIn"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.62 1.62 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63s1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63z" />
                                </svg>
                            </a>
                        )}
                        <a
                            href="#top"
                            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                            aria-label="Kembali ke atas"
                            title="Kembali ke atas"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
