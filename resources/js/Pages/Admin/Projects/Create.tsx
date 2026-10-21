import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Category, ToolStack } from '@/types/portfolio';

interface ProjectsCreateProps {
    categories: Category[];
    tools: ToolStack[];
}

export default function ProjectsCreate({ categories, tools }: ProjectsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: categories[0]?.id || '',
        title: '',
        slug: '',
        custom_badge: '',
        summary: '',
        description: '',
        problem_statement: '',
        solution: '',
        media_type: 'image',
        video_url: '',
        thumbnail_url: '',
        thumbnail_file: null as File | null,
        live_url: '',
        github_url: '',
        is_featured: false,
        sort_order: 0,
        tool_ids: [] as number[],
    });

    const selectedCategory = categories.find((c) => c.id === Number(data.category_id));
    const isVideoMode = selectedCategory?.display_mode === 'video' || data.media_type === 'video_embed';

    const handleToolToggle = (toolId: number) => {
        if (data.tool_ids.includes(toolId)) {
            setData('tool_ids', data.tool_ids.filter((id) => id !== toolId));
        } else {
            setData('tool_ids', [...data.tool_ids, toolId]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-gray-800">
                            Tambah Proyek Baru
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Masukkan informasi detail proyek, video embed, atau tautan live demo.
                        </p>
                    </div>
                    <Link
                        href={route('admin.projects.index')}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        &larr; Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Proyek Baru" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
                        {/* 1. Category & Title */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Kategori Portofolio *
                                </label>
                                <select
                                    required
                                    value={data.category_id}
                                    onChange={(e) => {
                                        const catId = Number(e.target.value);
                                        const cat = categories.find((c) => c.id === catId);
                                        setData((prev) => ({
                                            ...prev,
                                            category_id: catId,
                                            media_type: cat?.display_mode === 'video' ? 'video_embed' : prev.media_type,
                                        }));
                                    }}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} ({c.display_mode})
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-xs text-rose-500 mt-1">{errors.category_id}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Label Kustom (Badge Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.custom_badge}
                                    onChange={(e) => setData('custom_badge', e.target.value)}
                                    placeholder="Contoh: Tugas Akhir, Freelance, Open Source"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.custom_badge && <p className="text-xs text-rose-500 mt-1">{errors.custom_badge}</p>}
                            </div>
                        </div>

                        {/* Title & Slug */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Judul Proyek *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Nama aplikasi atau judul video"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Slug URL (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="Dibuat otomatis jika dikosongkan"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.slug && <p className="text-xs text-rose-500 mt-1">{errors.slug}</p>}
                            </div>
                        </div>

                        {/* Summary */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                Ringkasan Singkat Proyek (Summary) *
                            </label>
                            <textarea
                                required
                                rows={2}
                                value={data.summary}
                                onChange={(e) => setData('summary', e.target.value)}
                                placeholder="Penjelasan padat 1 sampai 2 kalimat mengenai proyek ini..."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.summary && <p className="text-xs text-rose-500 mt-1">{errors.summary}</p>}
                        </div>

                        {/* Video URL or Live Links */}
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase text-gray-700 tracking-wider">
                                    Media &amp; Tautan Interaktif
                                </h3>
                                <div className="flex items-center gap-4 text-xs">
                                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="media_type"
                                            value="image"
                                            checked={data.media_type === 'image'}
                                            onChange={() => setData('media_type', 'image')}
                                        />
                                        <span>Gambar / Demo</span>
                                    </label>
                                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="media_type"
                                            value="video_embed"
                                            checked={data.media_type === 'video_embed'}
                                            onChange={() => setData('media_type', 'video_embed')}
                                        />
                                        <span>Video Embed (YouTube / GDrive)</span>
                                    </label>
                                </div>
                            </div>

                            {isVideoMode && (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Tautan Video (YouTube / Google Drive)
                                    </label>
                                    <input
                                        type="url"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=... atau https://drive.google.com/file/d/.../view"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1">
                                        Sistem secara otomatis mengonversi tautan YouTube dan Google Drive menjadi format pemutar video pop-up.
                                    </p>
                                    {errors.video_url && <p className="text-xs text-rose-500 mt-1">{errors.video_url}</p>}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Tautan Live Demo / Website Aktif
                                    </label>
                                    <input
                                        type="url"
                                        value={data.live_url}
                                        onChange={(e) => setData('live_url', e.target.value)}
                                        placeholder="https://namaproyek.com"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.live_url && <p className="text-xs text-rose-500 mt-1">{errors.live_url}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Tautan Repositori GitHub
                                    </label>
                                    <input
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        placeholder="https://github.com/..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.github_url && <p className="text-xs text-rose-500 mt-1">{errors.github_url}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail File or URL */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Upload Thumbnail Gambar
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('thumbnail_file', e.target.files ? e.target.files[0] : null)}
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {errors.thumbnail_file && <p className="text-xs text-rose-500 mt-1">{errors.thumbnail_file}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Atau Tautan Thumbnail Eksternal
                                </label>
                                <input
                                    type="text"
                                    value={data.thumbnail_url}
                                    onChange={(e) => setData('thumbnail_url', e.target.value)}
                                    placeholder="https://.../thumbnail.jpg"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.thumbnail_url && <p className="text-xs text-rose-500 mt-1">{errors.thumbnail_url}</p>}
                            </div>
                        </div>

                        {/* Technical Case Study: Problem & Solution */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Tantangan &amp; Masalah (Problem Statement)
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.problem_statement}
                                    onChange={(e) => setData('problem_statement', e.target.value)}
                                    placeholder="Kendala atau latar belakang mengapa proyek ini dibuat..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                    Solusi &amp; Pendekatan Teknis (Solution)
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.solution}
                                    onChange={(e) => setData('solution', e.target.value)}
                                    placeholder="Teknik, arsitektur sistem, atau gaya visual yang diterapkan..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Tools & Stacks Checkboxes */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                                Teknologi &amp; Software yang Digunakan
                            </label>
                            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-gray-50 border border-gray-200 max-h-48 overflow-y-auto">
                                {tools.map((t) => {
                                    const isSelected = data.tool_ids.includes(t.id);
                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => handleToolToggle(t.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                isSelected
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            {t.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Options: Featured & Sort Order */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                />
                                <span>Tandai sebagai Proyek Unggulan (Featured)</span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan Proyek...' : 'Simpan Proyek'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
