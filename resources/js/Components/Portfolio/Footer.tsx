import React from 'react';
import { Link } from '@inertiajs/react';
import { Profile } from '@/types/portfolio';

interface FooterProps {
    profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-stone-200/30 bg-transparent py-12 text-stone-500 font-mono text-xs">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="text-stone-900 font-bold font-heading text-sm">
                        {profile.full_name || 'Taufiq Hidayat'}
                    </span>
                    <span className="text-stone-500 ml-2">
                        &copy; {currentYear}. Hak cipta dilindungi.
                    </span>
                </div>

                <div className="flex items-center gap-6 text-stone-600">
                    <Link
                        href={route('login')}
                        className="hover:text-stone-950 transition-colors underline underline-offset-4"
                    >
                        Admin Panel
                    </Link>
                    <a
                        href="#top"
                        className="hover:text-stone-950 transition-colors underline underline-offset-4"
                    >
                        Ke Atas &uarr;
                    </a>
                </div>
            </div>
        </footer>
    );
}
