import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/types/portfolio';
import ToolIcon from '@/Components/Portfolio/ToolIcon';

interface DashboardStats {
    total_projects: number;
    total_categories: number;
    total_tools: number;
    unread_inquiries: number;
}

interface InquiryItem {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface AdminDashboardProps {
    stats: DashboardStats;
    recentProjects: Project[];
    recentInquiries: InquiryItem[];
}

export default function AdminDashboard({
    stats,
    recentProjects,
    recentInquiries,
}: AdminDashboardProps) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-stone-900 tracking-tight">
                            Dashboard Portofolio
                        </h2>
                        <p className="text-xs font-mono text-stone-500 mt-1">
                            Pusat kendali dan manajemen data website pribadi Taufiq Hidayat.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.projects.create')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 hover:bg-stone-850 active:scale-95 text-stone-50 rounded-xl text-xs font-mono font-semibold transition-all shadow-xs"
                        >
                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Tambah Proyek Baru</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Proyek */}
                    <Link
                        href={route('admin.projects.index')}
                        className="group bg-white/90 hover:bg-white backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-amber-400/80 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 group-hover:text-amber-800 transition-colors">
                                Total Proyek
                            </p>
                            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1.5">
                                {stats.total_projects}
                            </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </Link>

                    {/* Total Kategori */}
                    <Link
                        href={route('admin.categories.index')}
                        className="group bg-white/90 hover:bg-white backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-amber-400/80 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 group-hover:text-amber-800 transition-colors">
                                Kategori Aktif
                            </p>
                            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1.5">
                                {stats.total_categories}
                            </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                    </Link>

                    {/* Tools & Teknologi */}
                    <Link
                        href={route('admin.tools.index')}
                        className="group bg-white/90 hover:bg-white backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-amber-400/80 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 group-hover:text-amber-800 transition-colors">
                                Stack &amp; Software
                            </p>
                            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1.5">
                                {stats.total_tools}
                            </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                    </Link>

                    {/* Unread Inquiries */}
                    <Link
                        href={route('admin.inquiries.index')}
                        className="group bg-white/90 hover:bg-white backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-amber-400/80 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 group-hover:text-amber-800 transition-colors">
                                Pesan Masuk
                            </p>
                            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1.5 flex items-center gap-2">
                                <span>{stats.unread_inquiries}</span>
                                {stats.unread_inquiries > 0 && (
                                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                                )}
                            </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </Link>
                </div>

                {/* Content Section: Recent Projects & Recent Messages */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                    {/* Recent Projects */}
                    <div className="bg-white/95 rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/50">
                                <h3 className="font-heading font-bold text-stone-900 text-sm">
                                    Proyek Terbaru
                                </h3>
                                <Link
                                    href={route('admin.projects.index')}
                                    className="text-xs font-mono font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                                >
                                    <span>Lihat Semua Proyek</span>
                                    <span>&rarr;</span>
                                </Link>
                            </div>
                            <div className="divide-y divide-stone-100">
                                {recentProjects.length > 0 ? (
                                    recentProjects.map((p) => (
                                        <div key={p.id} className="p-4 hover:bg-stone-50/70 transition-colors flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-heading font-bold text-stone-900 truncate">
                                                    {p.title}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-mono">
                                                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10.5px] border border-stone-200/60">
                                                        {p.category?.name}
                                                    </span>
                                                    {p.custom_badge && (
                                                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[10.5px] border border-amber-200/70">
                                                            {p.custom_badge}
                                                        </span>
                                                    )}
                                                    {p.is_featured && (
                                                        <span className="text-[10.5px] text-amber-800 flex items-center gap-1 font-medium">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                                                            Unggulan
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <Link
                                                    href={route('admin.projects.edit', p.id)}
                                                    className="px-3 py-1.5 text-xs font-mono font-semibold text-stone-700 hover:text-stone-950 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg shadow-2xs transition-all"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-xs font-mono text-stone-500">
                                        Belum ada data proyek.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Inquiries */}
                    <div className="bg-white/95 rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/50">
                                <h3 className="font-heading font-bold text-stone-900 text-sm">
                                    Pesan Kontak Masuk
                                </h3>
                                <Link
                                    href={route('admin.inquiries.index')}
                                    className="text-xs font-mono font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                                >
                                    <span>Buka Kotak Masuk</span>
                                    <span>&rarr;</span>
                                </Link>
                            </div>
                            <div className="divide-y divide-stone-100">
                                {recentInquiries.length > 0 ? (
                                    recentInquiries.map((inq) => (
                                        <div key={inq.id} className="p-4 hover:bg-stone-50/70 transition-colors">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-heading font-bold text-stone-900">
                                                        {inq.name}
                                                    </span>
                                                    {!inq.is_read && (
                                                        <span className="font-mono text-[9.5px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold">
                                                            Baru
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[11px] font-mono text-stone-400">
                                                    {new Date(inq.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                            <p className="text-xs font-mono text-amber-800 font-semibold mb-1 truncate">
                                                {inq.subject}
                                            </p>
                                            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                                                {inq.message}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-xs font-mono text-stone-500">
                                        Belum ada pesan kontak masuk.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
