import React from 'react';
import { Profile } from '@/types/portfolio';

interface FooterProps {
    profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-900 bg-[#060910] py-12 text-slate-500 font-mono text-xs">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="text-slate-300 font-bold font-heading text-sm">
                        {profile.full_name || 'Taufiq Hidayat'}
                    </span>
                    <span className="text-slate-500 ml-2">
                        &copy; {currentYear}. Hak cipta dilindungi.
                    </span>
                </div>

                <div className="flex items-center gap-6 text-slate-400">
                    <span>Dirancang dengan kesederhanaan &amp; presisi.</span>
                    <a
                        href="#top"
                        className="hover:text-white transition-colors underline underline-offset-4"
                    >
                        Ke Atas &uarr;
                    </a>
                </div>
            </div>
        </footer>
    );
}
