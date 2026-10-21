import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Project } from '@/types/portfolio';

interface ProjectsIndexProps {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const handleDelete = (project: Project) => {
        if (confirm(`Apakah Anda yakin ingin menghapus proyek "${project.title}"?`)) {
            router.delete(route('admin.projects.destroy', project.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-gray-800">
                            Manajemen Proyek Portofolio
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Kelola seluruh karya web development, produksi video, dan studi kasus Anda.
                        </p>
                    </div>
                    <Link
                        href={route('admin.projects.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Proyek Baru</span>
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Proyek" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                                        <th className="py-3 px-4">Proyek</th>
                                        <th className="py-3 px-4">Kategori</th>
                                        <th className="py-3 px-4">Media &amp; Tautan</th>
                                        <th className="py-3 px-4">Teknologi</th>
                                        <th className="py-3 px-4 text-center">Featured</th>
                                        <th className="py-3 px-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {projects.length > 0 ? (
                                        projects.map((p) => (
                                            <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-14 h-9 rounded bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                            {p.thumbnail_path ? (
                                                                <img
                                                                    src={p.thumbnail_path}
                                                                    alt={p.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-[10px] text-gray-400 font-bold uppercase">
                                                                    TH
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{p.title}</p>
                                                            {p.custom_badge && (
                                                                <span className="inline-block mt-0.5 px-2 py-0.2 rounded text-[10px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                                                                    {p.custom_badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-xs font-medium text-gray-700">
                                                    <span className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200">
                                                        {p.category?.name}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-xs text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        {p.video_url && (
                                                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-medium">
                                                                Video Embed
                                                            </span>
                                                        )}
                                                        {p.live_url && (
                                                            <a
                                                                href={p.live_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Demo
                                                            </a>
                                                        )}
                                                        {p.github_url && (
                                                            <a
                                                                href={p.github_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-700 hover:underline"
                                                            >
                                                                Repo
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-xs text-gray-500">
                                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                                        {p.tools && p.tools.map((t) => (
                                                            <span
                                                                key={t.id}
                                                                className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px]"
                                                            >
                                                                {t.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    {p.is_featured ? (
                                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" title="Featured" />
                                                    ) : (
                                                        <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('admin.projects.edit', p.id)}
                                                            className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(p)}
                                                            className="px-2.5 py-1 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded hover:bg-rose-100"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-gray-500">
                                                Belum ada proyek. Klik tombol &quot;Tambah Proyek Baru&quot; di atas untuk mulai memasukkan karya.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
