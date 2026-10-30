import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Project } from '@/types/portfolio';
import ToolIcon from '@/Components/Portfolio/ToolIcon';
import { confirmDialog } from '@/Utils/alert';

interface ProjectsIndexProps {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const handleDelete = async (project: Project) => {
        const confirmed = await confirmDialog({
            title: 'Hapus Proyek?',
            text: `Apakah Anda yakin ingin menghapus proyek "${project.title}"? Seluruh galeri gambar dan relasi terkait akan dibersihkan.`,
            confirmButtonText: 'Ya, Hapus Proyek',
            cancelButtonText: 'Batal',
            isDanger: true,
        });

        if (confirmed) {
            router.post(
                route('admin.projects.destroy', project.id),
                { _method: 'DELETE' },
                {
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-stone-900 tracking-tight">
                            Manajemen Proyek Portofolio
                        </h2>
                        <p className="text-xs font-mono text-stone-500 mt-1">
                            Kelola seluruh karya web development, produksi video, dan riset Anda.
                        </p>
                    </div>
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
            }
        >
            <Head title="Kelola Proyek Portofolio" />

            <div className="bg-white/95 rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200/80">
                                <th className="py-3.5 px-5">Proyek</th>
                                <th className="py-3.5 px-5">Kategori</th>
                                <th className="py-3.5 px-5">Media &amp; Tautan</th>
                                <th className="py-3.5 px-5">Teknologi</th>
                                <th className="py-3.5 px-5 text-center">Featured</th>
                                <th className="py-3.5 px-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-sm">
                            {projects.length > 0 ? (
                                projects.map((p) => (
                                    <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-13 h-9 rounded-lg bg-stone-900 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center text-white">
                                                    {p.thumbnail_path ? (
                                                        <img
                                                            src={p.thumbnail_path}
                                                            alt={p.title}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="font-mono text-[10px] font-bold text-amber-400">
                                                            {p.media_type === 'video_embed' ? '▶' : '</>'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="min-w-0 max-w-xs">
                                                    <p className="font-heading font-bold text-stone-900 truncate">
                                                        {p.title}
                                                    </p>
                                                    {p.custom_badge && (
                                                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                                                            {p.custom_badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-xs font-mono">
                                            <span className="inline-block whitespace-nowrap px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200/80 font-medium">
                                                {p.category?.name}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-xs font-mono">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {(p.video_url || (p.extra_meta?.episodes && p.extra_meta.episodes.length > 0)) && (
                                                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                                                        {p.extra_meta?.episodes && p.extra_meta.episodes.length > 0
                                                            ? `Playlist (${p.extra_meta.episodes.length} Ep)`
                                                            : 'Video'}
                                                    </span>
                                                )}
                                                {p.live_url && (
                                                    <a
                                                        href={p.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-stone-700 hover:text-stone-950 font-semibold underline underline-offset-2 flex items-center gap-1"
                                                    >
                                                        <span>Live</span>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {p.github_url && (
                                                    <a
                                                        href={p.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-stone-500 hover:text-stone-900 font-medium underline underline-offset-2"
                                                    >
                                                        Repo
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-xs">
                                            <div className="flex flex-wrap items-center gap-1 max-w-xs">
                                                {p.tools && p.tools.map((t) => (
                                                    <ToolIcon key={t.id} name={t.name} slug={t.slug} iconUrl={t.icon_url} className="w-4 h-4 text-[8px]" />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-center">
                                            {p.is_featured ? (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                                    <span>Ya</span>
                                                </span>
                                            ) : (
                                                <span className="text-[11px] font-mono text-stone-400">Tidak</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.projects.edit', p.id)}
                                                    className="px-3 py-1.5 text-xs font-mono font-semibold text-stone-700 hover:text-stone-950 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg shadow-2xs transition-all"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(p)}
                                                    className="px-3 py-1.5 text-xs font-mono font-semibold text-rose-700 hover:text-rose-900 bg-rose-50/70 hover:bg-rose-100 border border-rose-200/60 rounded-lg transition-all cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-xs font-mono text-stone-500">
                                        Belum ada proyek yang terdaftar. Silakan tambah proyek baru.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
