import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/types/portfolio';

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
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-gray-800">
                            Dashboard Portofolio
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Pusat kendali dan manajemen data website pribadi Taufiq Hidayat.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.projects.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 gap-1.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Tambah Proyek</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Total Proyek */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Total Proyek
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {stats.total_projects}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>

                        {/* Total Kategori */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Kategori Dinamis
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {stats.total_categories}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                        </div>

                        {/* Total Tools & Stack */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Tools & Teknologi
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {stats.total_tools}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                        </div>

                        {/* Unread Inquiries */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Pesan Masuk Baru
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {stats.unread_inquiries}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Content Section: Recent Projects & Recent Messages */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Projects */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900 text-sm">
                                    Proyek Terbaru
                                </h3>
                                <Link
                                    href={route('admin.projects.index')}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lihat Semua Proyek &rarr;
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentProjects.length > 0 ? (
                                    recentProjects.map((p) => (
                                        <div key={p.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">{p.title}</h4>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                    <span className="px-2 py-0.5 rounded bg-gray-100 font-medium">
                                                        {p.category?.name}
                                                    </span>
                                                    {p.custom_badge && (
                                                        <span className="text-cyan-700 font-medium">
                                                            {p.custom_badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('admin.projects.edit', p.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-sm text-gray-500">
                                        Belum ada data proyek.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Inquiries */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900 text-sm">
                                    Pesan Kontak Terbaru
                                </h3>
                                <Link
                                    href={route('admin.inquiries.index')}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Buka Kotak Masuk &rarr;
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentInquiries.length > 0 ? (
                                    recentInquiries.map((inq) => (
                                        <div key={inq.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-semibold text-gray-900">{inq.name}</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(inq.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                            <p className="text-xs font-medium text-blue-600 mb-1">{inq.subject}</p>
                                            <p className="text-xs text-gray-600 line-clamp-2">{inq.message}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-sm text-gray-500">
                                        Belum ada pesan masuk.
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
