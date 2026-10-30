import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Category, ToolStack, VideoEpisode } from '@/types/portfolio';
import { compressImageFile } from '@/Utils/imageCompressor';

interface ProjectsCreateProps {
    categories: Category[];
    tools: ToolStack[];
}

export default function ProjectsCreate({ categories, tools }: ProjectsCreateProps) {
    const [galleryUrlInput, setGalleryUrlInput] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [episodeTitle, setEpisodeTitle] = useState('');
    const [episodeUrl, setEpisodeUrl] = useState('');
    const [episodeDuration, setEpisodeDuration] = useState('');

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
        gallery_files: [] as File[],
        gallery_urls: [] as string[],
        extra_meta: {
            aspect_ratio: '16:9',
            figma_url: '',
            docs_url: '',
            playstore_url: '',
            client_name: '',
            completion_year: new Date().getFullYear().toString(),
            role: '',
            episodes: [] as VideoEpisode[],
        },
    });

    const selectedCategory = categories.find((c) => c.id === Number(data.category_id));
    const isVideoMode = selectedCategory?.display_mode === 'video' || data.media_type === 'video_embed';

    const handleAddEpisode = () => {
        if (!episodeUrl.trim()) return;
        const currentEpisodes = data.extra_meta.episodes || [];
        const nextEpNumber = currentEpisodes.length + 1;
        const newEpisode: VideoEpisode = {
            title: episodeTitle.trim() || `Episode ${nextEpNumber}`,
            video_url: episodeUrl.trim(),
            duration: episodeDuration.trim() || undefined,
        };
        setData('extra_meta', {
            ...data.extra_meta,
            episodes: [...currentEpisodes, newEpisode],
        });
        setEpisodeTitle('');
        setEpisodeUrl('');
        setEpisodeDuration('');
    };

    const handleRemoveEpisode = (index: number) => {
        const currentEpisodes = data.extra_meta.episodes || [];
        setData('extra_meta', {
            ...data.extra_meta,
            episodes: currentEpisodes.filter((_, i) => i !== index),
        });
    };

    const handleToolToggle = (toolId: number) => {
        if (data.tool_ids.includes(toolId)) {
            setData('tool_ids', data.tool_ids.filter((id) => id !== toolId));
        } else {
            setData('tool_ids', [...data.tool_ids, toolId]);
        }
    };

    const handleAddGalleryUrl = () => {
        if (galleryUrlInput.trim()) {
            setData('gallery_urls', [...data.gallery_urls, galleryUrlInput.trim()]);
            setGalleryUrlInput('');
        }
    };

    const handleRemoveGalleryUrl = (index: number) => {
        setData('gallery_urls', data.gallery_urls.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-stone-900 font-serif">
                            Tambah Proyek Baru
                        </h2>
                        <p className="text-xs text-stone-500 mt-1 font-mono">
                            Masukkan detail proyek aplikasi web, post-production video, riset, atau karya multimedia.
                        </p>
                    </div>
                    <Link
                        href={route('admin.projects.index')}
                        className="px-3.5 py-1.5 text-xs font-mono font-medium text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                    >
                        &larr; Kembali ke Daftar
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Proyek Baru" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6">
                        {/* 1. Category & Title */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
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
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
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
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Judul Proyek *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Portal Sistem Informasi Terpadu"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                                {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
                            </div>
                        </div>

                        {/* 2. Slug & Custom Badge */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Slug URL (Opsional, Otomatis)
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="portal-sistem-informasi"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all font-mono text-xs"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Badge Kustom (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.custom_badge}
                                    onChange={(e) => setData('custom_badge', e.target.value)}
                                    placeholder="Misal: Tugas Akhir, Freelance, Open Source"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* 3. Ringkasan & Deskripsi */}
                        <div>
                            <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                Ringkasan Singkat (Summary) *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.summary}
                                onChange={(e) => setData('summary', e.target.value)}
                                placeholder="Penjelasan 1 hingga 2 kalimat tentang tujuan dan hasil karya ini..."
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                            />
                            {errors.summary && <p className="text-xs text-rose-500 mt-1">{errors.summary}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                Deskripsi Lengkap Studi Kasus (Opsional)
                            </label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan alur kerja, latar belakang masalah, dan hasil pencapaian secara rinci..."
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                            />
                        </div>

                        {/* 4. Tipe Media & Video URL / Aspect Ratio */}
                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                        Format Media Utama
                                    </label>
                                    <select
                                        value={data.media_type}
                                        onChange={(e) => setData('media_type', e.target.value as any)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    >
                                        <option value="image">Gambar / Screenshot Utama</option>
                                        <option value="video_embed">Video Embed (YouTube / Vimeo / Google Drive)</option>
                                    </select>
                                </div>

                                {isVideoMode && (
                                    <div>
                                        <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                            Aspek Rasio Video
                                        </label>
                                        <select
                                            value={data.extra_meta.aspect_ratio || '16:9'}
                                            onChange={(e) =>
                                                setData('extra_meta', {
                                                    ...data.extra_meta,
                                                    aspect_ratio: e.target.value as '16:9' | '9:16',
                                                })
                                            }
                                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                        >
                                            <option value="16:9">Lanskap 16:9 (YouTube, Standar Web)</option>
                                            <option value="9:16">Vertikal 9:16 (Shorts, TikTok, Instagram)</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {isVideoMode && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                            Tautan Video Utama atau Playlist YouTube
                                        </label>
                                        <input
                                            type="url"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=... atau https://www.youtube.com/playlist?list=..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                        />
                                        <p className="text-[11px] text-stone-500 mt-1 font-mono">
                                            Mendukung link video tunggal (YouTube, Shorts, Google Drive, Vimeo) maupun link Playlist YouTube.
                                        </p>
                                    </div>

                                    {/* Multi-Episode / Playlist Builder for Recurring Video Series */}
                                    <div className="p-4 rounded-xl bg-white border border-stone-200/90 space-y-3">
                                        <div>
                                            <h4 className="text-xs font-mono font-bold uppercase text-stone-800 tracking-wider">
                                                Daftar Episode / Playlist Video Berseri (Opsional)
                                            </h4>
                                            <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                                                Punya proyek video berulang banyak episode (misal: serial Ustad Gaul)? Tambahkan daftar episodenya di bawah agar tersusun rapi dalam satu proyek.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                            <input
                                                type="text"
                                                value={episodeTitle}
                                                onChange={(e) => setEpisodeTitle(e.target.value)}
                                                placeholder="Judul (misal: Episode 1 - Hijrah)"
                                                className="sm:col-span-4 px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-amber-600 focus:outline-none"
                                            />
                                            <input
                                                type="url"
                                                value={episodeUrl}
                                                onChange={(e) => setEpisodeUrl(e.target.value)}
                                                placeholder="Link Video (YouTube / GDrive / Shorts)"
                                                className="sm:col-span-5 px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-amber-600 focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={episodeDuration}
                                                onChange={(e) => setEpisodeDuration(e.target.value)}
                                                placeholder="Durasi (03:15)"
                                                className="sm:col-span-1 px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:border-amber-600 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddEpisode}
                                                className="sm:col-span-2 px-3 py-2 text-xs font-mono font-semibold bg-stone-900 text-amber-400 rounded-xl hover:bg-stone-800 cursor-pointer transition-colors"
                                            >
                                                + Episode
                                            </button>
                                        </div>

                                        {data.extra_meta.episodes && data.extra_meta.episodes.length > 0 && (
                                            <div className="space-y-1.5 pt-1">
                                                {data.extra_meta.episodes.map((ep, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between text-xs font-mono bg-stone-50 px-3 py-2 rounded-lg border border-stone-200"
                                                    >
                                                        <div className="min-w-0 pr-3">
                                                            <span className="font-bold text-stone-800">
                                                                {idx + 1}. {ep.title}
                                                            </span>
                                                            {ep.duration && (
                                                                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                                                                    {ep.duration}
                                                                </span>
                                                            )}
                                                            <p className="text-[10px] text-stone-500 truncate mt-0.5">
                                                                {ep.video_url}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveEpisode(idx)}
                                                            className="text-rose-600 hover:text-rose-800 font-bold text-xs px-2 py-1 cursor-pointer shrink-0"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 5. Tautan Proyek Lengkap (Live, GitHub, Figma, Docs, PlayStore) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Live Demo URL
                                </label>
                                <input
                                    type="url"
                                    value={data.live_url}
                                    onChange={(e) => setData('live_url', e.target.value)}
                                    placeholder="https://aplikasi-anda.com"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    GitHub Repositori URL
                                </label>
                                <input
                                    type="url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    placeholder="https://github.com/taufiqhidayat/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Figma Prototype URL (Desain UI/UX)
                                </label>
                                <input
                                    type="url"
                                    value={data.extra_meta.figma_url || ''}
                                    onChange={(e) =>
                                        setData('extra_meta', {
                                            ...data.extra_meta,
                                            figma_url: e.target.value,
                                        })
                                    }
                                    placeholder="https://www.figma.com/proto/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Dokumen PDF / Riset URL (Google Drive / Paper)
                                </label>
                                <input
                                    type="url"
                                    value={data.extra_meta.docs_url || ''}
                                    onChange={(e) =>
                                        setData('extra_meta', {
                                            ...data.extra_meta,
                                            docs_url: e.target.value,
                                        })
                                    }
                                    placeholder="https://drive.google.com/file/d/.../view atau link PDF"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* 6. Metadata Konteks (Klien, Peran, Tahun) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Klien / Instansi
                                </label>
                                <input
                                    type="text"
                                    value={data.extra_meta.client_name || ''}
                                    onChange={(e) =>
                                        setData('extra_meta', {
                                            ...data.extra_meta,
                                            client_name: e.target.value,
                                        })
                                    }
                                    placeholder="Misal: PT Inovasi Mandiri / Tugas Akhir"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Peran / Kontribusi
                                </label>
                                <input
                                    type="text"
                                    value={data.extra_meta.role || ''}
                                    onChange={(e) =>
                                        setData('extra_meta', {
                                            ...data.extra_meta,
                                            role: e.target.value,
                                        })
                                    }
                                    placeholder="Misal: Full-Stack Developer / Colorist"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Tahun Pengerjaan
                                </label>
                                <input
                                    type="text"
                                    value={data.extra_meta.completion_year || ''}
                                    onChange={(e) =>
                                        setData('extra_meta', {
                                            ...data.extra_meta,
                                            completion_year: e.target.value,
                                        })
                                    }
                                    placeholder="2026"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* 7. Thumbnail Gambar Utama */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200/80">
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Upload Thumbnail Utama
                                </label>
                                {(thumbnailPreview || data.thumbnail_url) && (
                                    <div className="mb-3">
                                        <img
                                            src={thumbnailPreview || data.thumbnail_url}
                                            alt="Pratinjau Thumbnail"
                                            className="h-24 w-40 object-cover rounded-xl border border-stone-200 shadow-2xs"
                                            onError={() => setThumbnailPreview(null)}
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const rawFile = e.target.files ? e.target.files[0] : null;
                                        if (rawFile) {
                                            setThumbnailPreview(URL.createObjectURL(rawFile));
                                            const optimized = await compressImageFile(rawFile, 1600, 0.85);
                                            setData('thumbnail_file', optimized);
                                        } else {
                                            setThumbnailPreview(null);
                                            setData('thumbnail_file', null);
                                        }
                                    }}
                                    className="w-full text-xs text-stone-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-900 file:text-amber-400 hover:file:bg-stone-800 transition-all cursor-pointer"
                                />
                                {errors.thumbnail_file && <p className="text-xs text-rose-500 mt-1">{errors.thumbnail_file}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Atau Tautan Thumbnail Eksternal
                                </label>
                                <input
                                    type="text"
                                    value={data.thumbnail_url}
                                    onChange={(e) => setData('thumbnail_url', e.target.value)}
                                    placeholder="https://.../thumbnail.jpg"
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* 8. Galeri Gambar Tambahan (Multi-Image / Screenshots) */}
                        <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-4">
                            <div>
                                <h3 className="text-xs font-mono font-bold uppercase text-stone-800 tracking-wider">
                                    Galeri Tangkapan Layar Tambahan (Multi-Image Showcase)
                                </h3>
                                <p className="text-[11px] text-stone-500 font-mono mt-1">
                                    Tambahkan beberapa tangkapan layar antarmuka, diagram sistem, atau stills video untuk melengkapi modal studi kasus.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-stone-700 mb-1">
                                        Upload Berkas Gambar (Bisa Pilih Banyak)
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const rawFiles = e.target.files ? Array.from(e.target.files) : [];
                                            const optimizedFiles = await Promise.all(
                                                rawFiles.map((f) => compressImageFile(f, 1600, 0.85))
                                            );
                                            setData('gallery_files', optimizedFiles);
                                        }}
                                        className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-900 file:text-amber-400 hover:file:bg-stone-800 cursor-pointer"
                                    />
                                    {data.gallery_files.length > 0 && (
                                        <p className="text-xs text-amber-700 font-mono mt-1">
                                            {data.gallery_files.length} berkas dipilih untuk di-upload.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-stone-700 mb-1">
                                        Atau Tambah Tautan Gambar Eksternal
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            value={galleryUrlInput}
                                            onChange={(e) => setGalleryUrlInput(e.target.value)}
                                            placeholder="https://.../screenshot.png"
                                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-amber-600 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddGalleryUrl}
                                            className="px-3 py-2 text-xs font-mono bg-stone-900 text-white rounded-xl hover:bg-stone-800 shrink-0"
                                        >
                                            Tambah
                                        </button>
                                    </div>

                                    {data.gallery_urls.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {data.gallery_urls.map((url, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between text-[11px] font-mono bg-white p-1.5 px-2.5 rounded-lg border border-stone-200"
                                                >
                                                    <span className="truncate max-w-[220px] text-stone-600">{url}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveGalleryUrl(idx)}
                                                        className="text-rose-500 hover:text-rose-700 font-bold ml-2"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 9. Technical Case Study: Problem & Solution */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Tantangan &amp; Masalah (Problem Statement)
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.problem_statement}
                                    onChange={(e) => setData('problem_statement', e.target.value)}
                                    placeholder="Kendala atau latar belakang mengapa proyek ini dibuat..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Solusi &amp; Pendekatan Teknis (Solution)
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.solution}
                                    onChange={(e) => setData('solution', e.target.value)}
                                    placeholder="Teknik, arsitektur sistem, atau gaya visual yang diterapkan..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* 10. Tools & Stacks Checkboxes */}
                        <div>
                            <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                Teknologi &amp; Software yang Digunakan
                            </label>
                            <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 max-h-48 overflow-y-auto">
                                {tools.map((t) => {
                                    const isSelected = data.tool_ids.includes(t.id);
                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => handleToolToggle(t.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
                                                isSelected
                                                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/30'
                                                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                                            }`}
                                        >
                                            {t.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 11. Options: Featured & Submit Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-stone-200/80 gap-4">
                            <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-stone-700 select-none">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="rounded border-stone-300 text-stone-900 shadow-sm focus:ring-amber-500"
                                />
                                <span>Tandai sebagai Proyek Unggulan (Featured)</span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-850 text-white font-mono font-medium text-xs tracking-wider shadow-sm transition-all disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan Proyek...' : 'SIMPAN PROYEK'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
