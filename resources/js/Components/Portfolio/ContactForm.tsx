import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Profile } from '@/types/portfolio';

interface ContactFormProps {
    profile: Profile;
}

export default function ContactForm({ profile }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
                setTimeout(() => setSubmitted(false), 8000);
            },
        });
    };

    return (
        <section id="kontak" className="py-20 md:py-28 border-t border-slate-900 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Personal Direct Contact */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                            04 / Kontak &amp; Kolaborasi
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                            Mari Bekerja Sama.
                        </h2>

                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                            Tertarik membangun aplikasi web baru, memproduksi video komersial, atau sekadar berdiskusi seputar teknologi dan multimedia? Pintu saya selalu terbuka untuk kolaborasi yang bermakna.
                        </p>

                        <div className="pt-6 border-t border-slate-900 space-y-4 text-xs font-mono">
                            {profile.email && (
                                <div>
                                    <span className="text-slate-500 block uppercase tracking-wider text-[10px] mb-1">
                                        Email Langsung
                                    </span>
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="text-white hover:text-cyan-400 text-sm transition-colors"
                                    >
                                        {profile.email}
                                    </a>
                                </div>
                            )}

                            <div>
                                <span className="text-slate-500 block uppercase tracking-wider text-[10px] mb-1">
                                    Lokasi Kerja
                                </span>
                                <span className="text-slate-300 text-sm">
                                    {profile.location || 'Indonesia'} (Bekerja secara remote maupun on-site)
                                </span>
                            </div>

                            <div>
                                <span className="text-slate-500 block uppercase tracking-wider text-[10px] mb-1">
                                    Jejaring Sosial &amp; Profil
                                </span>
                                <div className="flex items-center gap-4 pt-1">
                                    {profile.github_url && (
                                        <a
                                            href={profile.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-300 hover:text-white underline underline-offset-4"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {profile.linkedin_url && (
                                        <a
                                            href={profile.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-300 hover:text-white underline underline-offset-4"
                                        >
                                            LinkedIn
                                        </a>
                                    )}
                                    {profile.youtube_url && (
                                        <a
                                            href={profile.youtube_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-300 hover:text-white underline underline-offset-4"
                                        >
                                            YouTube
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clean Personal Form */}
                    <div className="lg:col-span-7">
                        <div className="p-7 sm:p-9 rounded-xl bg-slate-900/40 border border-slate-800">
                            {submitted && (
                                <div className="mb-6 p-4 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span>Pesan Anda berhasil terkirim. Terima kasih, saya akan membalas secepatnya.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                                            Nama Anda *
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Nama lengkap"
                                            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                        />
                                        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                                            Email Anda *
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@anda.com"
                                            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                        />
                                        {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-subject" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                                        Subjek / Topik
                                    </label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Contoh: Diskusi Proyek Web / Pembuatan Video"
                                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                    />
                                    {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                                        Pesan Anda *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Ceritakan gambaran singkat kebutuhan proyek atau pertanyaan Anda..."
                                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                    />
                                    {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-7 py-3 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
