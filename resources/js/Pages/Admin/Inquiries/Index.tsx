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
            router.delete(route('admin.inquiries.destroy', inquiry.id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold leading-tight text-gray-800">
                        Kotak Masuk Pesan Kontak ({inquiries.length})
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
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
                                    className={`p-6 rounded-xl border transition-all ${
                                        inq.is_read
                                            ? 'bg-white border-gray-100 shadow-sm opacity-90'
                                            : 'bg-blue-50/40 border-blue-200 shadow-md ring-1 ring-blue-100'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full ${
                                                    inq.is_read ? 'bg-gray-300' : 'bg-blue-600 animate-pulse'
                                                }`}
                                            />
                                            <h3 className="font-bold text-gray-900 text-base">{inq.name}</h3>
                                            <span className="text-xs text-gray-500">&lt;{inq.email}&gt;</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>{new Date(inq.created_at).toLocaleString('id-ID')}</span>
                                            {inq.ip_address && (
                                                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-[10px]">
                                                    IP: {inq.ip_address}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="inline-block px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800 text-xs font-semibold mb-2">
                                            Topik: {inq.subject}
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-lg border border-gray-100">
                                            {inq.message}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 text-xs">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                </svg>
                                                <span>Balas via Email</span>
                                            </a>

                                            <button
                                                type="button"
                                                onClick={() => toggleRead(inq.id)}
                                                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                                            >
                                                {inq.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(inq)}
                                            className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded font-medium transition-colors"
                                        >
                                            Hapus Pesan
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center bg-white rounded-xl border border-gray-100 text-gray-500 text-sm">
                                Kotak masuk kosong. Belum ada pesan dari formulir kontak website.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
