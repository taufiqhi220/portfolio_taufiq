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
            setScrolled(window.scrollY > 20);
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
                    ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Brand Logo / Identity */}
                <a
                    href="#top"
                    className="flex items-center gap-2.5 text-white font-heading font-bold text-lg tracking-tight group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1"
                >
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                        TH
                    </span>
                    <span>{profile.full_name || 'Taufiq Hidayat'}</span>
                </a>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <a
                        href="#karya"
                        className="hover:text-cyan-400 transition-colors focus:outline-none focus:text-cyan-400"
                    >
                        Karya & Proyek
                    </a>
                    <a
                        href="#arsenal"
                        className="hover:text-cyan-400 transition-colors focus:outline-none focus:text-cyan-400"
                    >
                        Tools & Stack
                    </a>
                    <a
                        href="#kontak"
                        className="hover:text-cyan-400 transition-colors focus:outline-none focus:text-cyan-400"
                    >
                        Kontak
                    </a>

                    {profile.is_available_for_work && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Tersedia untuk Proyek</span>
                        </div>
                    )}

                    <Link
                        href="/dashboard"
                        className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded border border-slate-700/60 hover:border-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-slate-400"
                    >
                        Admin Portal
                    </Link>
                </nav>

                {/* Mobile Menu Button (Accessible 44px tap target) */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu navigasi"
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

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#090d16] border-b border-slate-800 px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col gap-4 text-base font-medium text-slate-200">
                        <a
                            href="#karya"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 hover:text-cyan-400 transition-colors"
                        >
                            Karya & Proyek
                        </a>
                        <a
                            href="#arsenal"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 hover:text-cyan-400 transition-colors"
                        >
                            Tools & Stack
                        </a>
                        <a
                            href="#kontak"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 hover:text-cyan-400 transition-colors"
                        >
                            Kontak
                        </a>
                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                            {profile.is_available_for_work && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Tersedia untuk Proyek
                                </span>
                            )}
                            <Link
                                href="/dashboard"
                                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded border border-slate-700"
                            >
                                Admin Login
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
