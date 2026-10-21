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
        subject: 'Diskusi Proyek Web Development',
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
        <section id="kontak" className="py-20 md:py-28 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Direct Info & Availability */}
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/80 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                            Mulai Komunikasi
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
                            Punya Rencana Proyek atau Pertanyaan?
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
                            Terbuka untuk kolaborasi pembuatan sistem web, aplikasi web custom, penyuntingan video komersial, motion grafik, maupun diskusi teknis.
                        </p>

                        {/* Availability Pill */}
                        <div className="mt-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-4">
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping relative">
                                <span className="absolute inset-0 rounded-full bg-emerald-500" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Status: Tersedia untuk Kolaborasi</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Menerima proyek lepas, kontrak, maupun kerja sama tim.</p>
                            </div>
                        </div>

                        {/* Contact Meta Details */}
                        <div className="mt-8 space-y-4 text-sm text-slate-300">
                            {profile.email && (
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500 block">Email Kontak</span>
                                        <a href={`mailto:${profile.email}`} className="hover:text-cyan-400 transition-colors">
                                            {profile.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {profile.location && (
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500 block">Domisili</span>
                                        <span>{profile.location}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-xl">
                            {submitted && (
                                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Pesan Anda telah berhasil dikirim! Saya akan segera merespons melalui email Anda.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                            Nama Anda *
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Contoh: Budi Santoso"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                        {errors.name && <p className="text-xs text-rose-400 mt-1.5">{errors.name}</p>}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                            Email Anda *
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="nama@perusahaan.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                        {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Subject / Need Selector */}
                                <div>
                                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Topik Kebutuhan
                                    </label>
                                    <select
                                        id="contact-subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    >
                                        <option value="Diskusi Proyek Web Development">Proyek Web Development / Aplikasi Full-Stack</option>
                                        <option value="Produksi Video / Motion Graphic">Produksi Video / Motion Graphic / Editing</option>
                                        <option value="Konsultasi & Riset Teknis">Konsultasi Arsitektur Web & Riset</option>
                                        <option value="Peluang Kerja Sama / Kolaborasi">Peluang Kerja Sama Tim / Lainnya</option>
                                    </select>
                                    {errors.subject && <p className="text-xs text-rose-400 mt-1.5">{errors.subject}</p>}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Pesan atau Gambaran Proyek *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Ceritakan gambaran singkat kebutuhan proyek, estimasi waktu, atau pertanyaan yang ingin didiskusikan..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    />
                                    {errors.message && <p className="text-xs text-rose-400 mt-1.5">{errors.message}</p>}
                                </div>

                                {/* Submit Button (Accessible 44px min height) */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                >
                                    {processing ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Mengirim Pesan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Kirim Pesan Sekarang</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
