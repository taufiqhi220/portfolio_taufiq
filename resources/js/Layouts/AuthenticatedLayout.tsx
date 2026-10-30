import Dropdown from '@/Components/Dropdown';
import FlashNotification from '@/Components/Feedback/FlashNotification';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans antialiased">
            <FlashNotification />
            {/* Top Navigation Bar */}
            <nav className="border-b border-stone-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-8">
                            {/* Brand Header */}
                            <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
                                <span className="w-8 h-8 rounded-lg bg-stone-950 text-stone-50 font-mono font-bold flex items-center justify-center text-xs shadow-xs">
                                    TH
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-heading font-extrabold text-stone-900 text-base tracking-tight">
                                        Taufiq Hidayat
                                    </span>
                                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-100/80 text-amber-950 font-bold border border-amber-300/60 uppercase tracking-wider">
                                        Studio Admin
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav Items */}
                            <div className="hidden space-x-7 sm:-my-px sm:flex items-center text-xs font-mono">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('admin.projects.index')}
                                    active={route().current('admin.projects.*')}
                                >
                                    Proyek
                                </NavLink>
                                <NavLink
                                    href={route('admin.categories.index')}
                                    active={route().current('admin.categories.*')}
                                >
                                    Kategori
                                </NavLink>
                                <NavLink
                                    href={route('admin.tools.index')}
                                    active={route().current('admin.tools.*')}
                                >
                                    Tech Stack
                                </NavLink>
                                <NavLink
                                    href={route('admin.inquiries.index')}
                                    active={route().current('admin.inquiries.*')}
                                >
                                    Pesan Masuk
                                </NavLink>
                                <NavLink
                                    href={route('admin.profileSettings.edit')}
                                    active={route().current('admin.profileSettings.*')}
                                >
                                    Profil Portofolio
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:gap-4">
                            {/* Public Website External Trigger */}
                            <a
                                href={route('home')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 hover:text-stone-950 text-xs font-mono transition-colors border border-stone-200/60"
                            >
                                <span>Lihat Web Utama</span>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>

                            {/* User Menu Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs font-mono font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer shadow-2xs"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                            <span>{user.name}</span>
                                            <svg
                                                className="h-3.5 w-3.5 text-stone-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Keamanan Akun
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Keluar (Log Out)
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Hamburger Toggle */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-lg p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={showingNavigationDropdown ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Nav */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden border-t border-stone-200 bg-white`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.projects.index')} active={route().current('admin.projects.*')}>
                            Proyek
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.categories.index')} active={route().current('admin.categories.*')}>
                            Kategori
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.tools.index')} active={route().current('admin.tools.*')}>
                            Tech Stack
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.inquiries.index')} active={route().current('admin.inquiries.*')}>
                            Pesan Masuk
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.profileSettings.edit')} active={route().current('admin.profileSettings.*')}>
                            Profil Portofolio
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('home')}>
                            Lihat Web Utama
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-stone-200 pb-3 pt-4 px-4">
                        <div className="text-sm font-semibold text-stone-900">{user.name}</div>
                        <div className="text-xs font-mono text-stone-500 mb-3">{user.email}</div>
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Keamanan Akun
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Keluar (Log Out)
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Title Section */}
            {header && (
                <header className="bg-white/80 border-b border-stone-200/80">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Page Canvas */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
    );
}
