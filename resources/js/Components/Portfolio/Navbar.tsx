import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Profile } from '@/types/portfolio';

interface NavbarProps {
    profile: Profile;
}

export default function Navbar({ profile }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md py-4'
                    : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Personal Identity */}
                <a
                    href="#top"
                    className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                >
                    <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xs font-heading font-black text-white group-hover:border-cyan-500 transition-colors">
                        TH
                    </div>
                    <div>
                        <span className="font-heading font-bold text-base text-white tracking-tight block">
                            {profile.full_name || 'Taufiq Hidayat'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 block -mt-0.5">
                            Web &amp; Video Portfolio
                        </span>
                    </div>
                </a>

                {/* Editorial Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <a
                        href="#karya"
                        className="hover:text-white transition-colors focus:outline-none focus:text-white"
                    >
                        Karya Terpilih
                    </a>
                    <a
                        href="#tentang"
                        className="hover:text-white transition-colors focus:outline-none focus:text-white"
                    >
                        Tentang &amp; Toolkit
                    </a>
                    <a
                        href="#kontak"
                        className="hover:text-white transition-colors focus:outline-none focus:text-white"
                    >
                        Kontak
                    </a>

                    {profile.is_available_for_work && (
                        <div className="flex items-center gap-2 pl-4 border-l border-slate-800 text-xs text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Tersedia untuk proyek</span>
                        </div>
                    )}

                    <Link
                        href="/dashboard"
                        className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded border border-slate-800 hover:border-slate-600 transition-all focus:outline-none focus:ring-1 focus:ring-slate-400"
                    >
                        Admin
                    </Link>
                </nav>

                {/* Mobile Menu Trigger */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Buka menu navigasi"
                    aria-expanded={mobileMenuOpen}
                    className="md:hidden flex items-center justify-center w-11 h-11 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#090d16] border-b border-slate-800 px-6 py-5 space-y-4">
                    <a
                        href="#karya"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-medium text-slate-200 hover:text-cyan-400"
                    >
                        Karya Terpilih
                    </a>
                    <a
                        href="#tentang"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-medium text-slate-200 hover:text-cyan-400"
                    >
                        Tentang &amp; Toolkit
                    </a>
                    <a
                        href="#kontak"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-medium text-slate-200 hover:text-cyan-400"
                    >
                        Kontak
                    </a>
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <Link
                            href="/dashboard"
                            className="text-xs text-slate-400 hover:text-white"
                        >
                            Portal Admin
                        </Link>
                        {profile.is_available_for_work && (
                            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Tersedia untuk proyek
                            </span>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
