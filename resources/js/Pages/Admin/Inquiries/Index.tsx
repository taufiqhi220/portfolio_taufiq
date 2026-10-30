import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface InquiryItem {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    ip_address?: string;
    is_read: boolean;
    created_at: string;
}

interface InquiriesIndexProps {
    inquiries: InquiryItem[];
}

export default function InquiriesIndex({ inquiries }: InquiriesIndexProps) {
    const toggleRead = (id: number) => {
        router.patch(route('admin.inquiries.toggleRead', id), {}, { preserveScroll: true });
    };

    const handleDelete = (inquiry: InquiryItem) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pesan dari "${inquiry.name}"?`)) {
            router.post(
                route('admin.inquiries.destroy', inquiry.id),
                { _method: 'DELETE' },
                { preserveScroll: true }
            );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold leading-tight text-stone-900 font-serif">
                        Kotak Masuk Pesan Kontak ({inquiries.length})
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 font-mono">
                        Daftar pesan dan tawaran kerja sama yang dikirimkan pengunjung website.
                    </p>
                </div>
            }
        >
            <Head title="Kotak Masuk Kontak" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {inquiries.length > 0 ? (
                            inquiries.map((inq) => (
                                <div
                                    key={inq.id}
                                    className={`p-6 rounded-2xl border transition-all ${
                                        inq.is_read
                                            ? 'bg-white border-stone-200/80 shadow-xs opacity-90'
                                            : 'bg-amber-50/40 border-amber-200/90 shadow-sm ring-1 ring-amber-200/60'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full ${
                                                    inq.is_read ? 'bg-stone-300' : 'bg-amber-600 animate-pulse'
                                                }`}
                                            />
                                            <h3 className="font-bold text-stone-900 text-base">{inq.name}</h3>
                                            <span className="text-xs text-stone-500 font-mono">&lt;{inq.email}&gt;</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                                            <span>{new Date(inq.created_at).toLocaleString('id-ID')}</span>
                                            {inq.ip_address && (
                                                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-mono border border-stone-200">
                                                    IP: {inq.ip_address}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono font-semibold mb-2 border border-stone-200">
                                            Topik: {inq.subject}
                                        </div>
                                        <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap bg-stone-50/60 p-4 rounded-xl border border-stone-200/70 font-sans">
                                            {inq.message}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-mono">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-850 text-white font-medium transition-colors shadow-xs"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                </svg>
                                                <span>Balas via Email</span>
                                            </a>

                                            <button
                                                type="button"
                                                onClick={() => toggleRead(inq.id)}
                                                className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors border border-stone-200"
                                            >
                                                {inq.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(inq)}
                                            className="px-3 py-1.5 text-rose-700 hover:bg-rose-50 rounded-xl font-medium transition-colors border border-transparent hover:border-rose-200"
                                        >
                                            Hapus Pesan
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200/80 text-stone-500 text-sm font-mono">
                                Kotak masuk kosong. Belum ada pesan dari formulir kontak website.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
