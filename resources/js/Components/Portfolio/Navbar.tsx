import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Profile } from '@/types/portfolio';

interface NavbarProps {
    profile: Profile;
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
}

export default function Navbar({ profile, auth }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
                <a
                    href="#top"
                    className="font-heading font-bold text-stone-900 text-lg sm:text-xl tracking-tight hover:text-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 rounded"
                >
                    {profile.full_name || 'Taufiq Hidayat'}
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-stone-600">
                    <a href="#karya" className="hover:text-stone-950 transition-colors">Karya</a>
                    <a href="#tentang" className="hover:text-stone-950 transition-colors">Tentang</a>
                    <a href="#kontak" className="hover:text-stone-950 transition-colors">Kontak</a>

                    {profile.is_available_for_work && (
                        <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            Tersedia
                        </span>
                    )}

                    {/* Admin Access Link */}
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-3.5 py-1.5 rounded-lg bg-stone-950 text-stone-50 text-xs font-mono font-medium hover:bg-stone-850 transition-all shadow-2xs hover:shadow-xs"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="text-stone-400 hover:text-stone-900 text-xs font-mono transition-colors flex items-center gap-1"
                            title="Akses Admin"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Admin</span>
                        </Link>
                    )}
                </nav>

                {/* Animated Mobile Hamburger Button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu navigasi ponsel"
                    aria-expanded={mobileMenuOpen}
                    className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-stone-800 rounded-lg hover:bg-stone-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                    <span
                        className={`w-5 h-0.5 bg-stone-900 rounded-full transition-all duration-300 ease-out origin-center ${
                            mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                        }`}
                    />
                    <span
                        className={`w-5 h-0.5 bg-stone-900 rounded-full transition-all duration-300 ease-out ${
                            mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                        }`}
                    />
                    <span
                        className={`w-5 h-0.5 bg-stone-900 rounded-full transition-all duration-300 ease-out origin-center ${
                            mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                        }`}
                    />
                </button>
            </div>

            {/* Mobile Animated Dropdown Drawer */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-stone-200/80 shadow-md ${
                    mobileMenuOpen ? 'max-h-80 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-2">
                    <a
                        href="#karya"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-200/50 transition-colors"
                    >
                        <span>Karya Terpilih</span>
                        <span className="font-mono text-xs text-stone-400">02</span>
                    </a>
                    <a
                        href="#tentang"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-200/50 transition-colors"
                    >
                        <span>Tentang &amp; Toolkit</span>
                        <span className="font-mono text-xs text-stone-400">03</span>
                    </a>
                    <a
                        href="#kontak"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-200/50 transition-colors"
                    >
                        <span>Kontak &amp; Kolaborasi</span>
                        <span className="font-mono text-xs text-stone-400">04</span>
                    </a>

                    <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between">
                        {profile.is_available_for_work && (
                            <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                Tersedia Untuk Proyek
                            </span>
                        )}
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-1.5 rounded-md bg-stone-900 text-stone-50 text-xs font-mono font-medium"
                            >
                                Dashboard Admin
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-stone-500 hover:text-stone-900 text-xs font-mono flex items-center gap-1"
                            >
                                <span>Akses Admin</span>
                                <span>&rarr;</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
