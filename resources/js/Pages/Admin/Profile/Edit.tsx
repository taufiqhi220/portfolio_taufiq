import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Profile } from '@/types/portfolio';

interface ProfileEditProps {
    profile: Profile;
}

export default function ProfileEdit({ profile }: ProfileEditProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        full_name: profile.full_name || '',
        headline: profile.headline || '',
        bio: profile.bio || '',
        location: profile.location || 'Indonesia (WITA / UTC+8)',
        email: profile.email || '',
        github_url: profile.github_url || '',
        linkedin_url: profile.linkedin_url || '',
        youtube_url: profile.youtube_url || '',
        resume_url: profile.resume_url || '',
        is_available_for_work: profile.is_available_for_work ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.profileSettings.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold leading-tight text-stone-900 font-serif">
                        Pengaturan Profil &amp; Identitas Portofolio
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 font-mono">
                        Sesuaikan bio, zona waktu (WITA), headline, dan tautan kontak yang tampil di halaman depan.
                    </p>
                </div>
            }
        >
            <Head title="Pengaturan Profil Portofolio" />

            <div className="py-10">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm">
                        {recentlySuccessful && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                                Pengaturan profil berhasil disimpan dan langsung diperbarui di halaman depan.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="full_name" className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        id="full_name"
                                        type="text"
                                        required
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    />
                                    {errors.full_name && <p className="text-xs text-rose-500 mt-1">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                        Lokasi &amp; Zona Waktu *
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Misal: Indonesia (WITA / UTC+8)"
                                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    />
                                    {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="headline" className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Headline / Peran Utama
                                </label>
                                <input
                                    id="headline"
                                    type="text"
                                    value={data.headline}
                                    onChange={(e) => setData('headline', e.target.value)}
                                    placeholder="Full-Stack Web Developer & Creative Video Editor"
                                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                />
                                {errors.headline && <p className="text-xs text-rose-500 mt-1">{errors.headline}</p>}
                            </div>

                            <div>
                                <label htmlFor="bio" className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Bio / Deskripsi Pribadi (Tampil di Hero &amp; Tentang)
                                </label>
                                <textarea
                                    id="bio"
                                    rows={4}
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Tulis deskripsi atau pendekatan kerja Anda sendiri secara bebas..."
                                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                />
                                {errors.bio && <p className="text-xs text-rose-500 mt-1">{errors.bio}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-2">
                                    Email Kontak Profesional
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@domain.com"
                                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                />
                                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                                <p className="text-[11px] font-mono text-stone-400 mt-1">
                                    Saluran komunikasi utama untuk penawaran proyek dan kolaborasi formal.
                                </p>
                            </div>

                            <div className="border-t border-stone-200/80 pt-6">
                                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-4">
                                    Tautan Portofolio Profesional &amp; Dokumen
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="github_url" className="block text-xs font-mono text-stone-600 mb-1">GitHub URL</label>
                                        <input
                                            id="github_url"
                                            type="url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="linkedin_url" className="block text-xs font-mono text-stone-600 mb-1">LinkedIn URL</label>
                                        <input
                                            id="linkedin_url"
                                            type="url"
                                            value={data.linkedin_url}
                                            onChange={(e) => setData('linkedin_url', e.target.value)}
                                            placeholder="https://linkedin.com/in/..."
                                            className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="youtube_url" className="block text-xs font-mono text-stone-600 mb-1">YouTube URL</label>
                                        <input
                                            id="youtube_url"
                                            type="url"
                                            value={data.youtube_url}
                                            onChange={(e) => setData('youtube_url', e.target.value)}
                                            placeholder="https://youtube.com/@..."
                                            className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="resume_url" className="block text-xs font-mono text-stone-600 mb-1">
                                        Tautan CV / Resume Publik (Google Drive / Dropbox / PDF URL)
                                    </label>
                                    <input
                                        id="resume_url"
                                        type="url"
                                        value={data.resume_url}
                                        onChange={(e) => setData('resume_url', e.target.value)}
                                        placeholder="https://drive.google.com/file/d/.../view atau link PDF resume"
                                        className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    />
                                    {errors.resume_url && <p className="text-xs text-rose-500 mt-1">{errors.resume_url}</p>}
                                </div>
                            </div>

                            <div className="border-t border-stone-200/80 pt-6 flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_available_for_work}
                                        onChange={(e) => setData('is_available_for_work', e.target.checked)}
                                        className="rounded border-stone-300 text-stone-900 focus:ring-amber-500"
                                    />
                                    <span className="text-sm font-medium text-stone-700">
                                        Tandai sebagai "Tersedia untuk proyek baru"
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-stone-950 hover:bg-stone-850 text-white rounded-xl text-xs font-mono font-medium tracking-wider shadow-sm transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
