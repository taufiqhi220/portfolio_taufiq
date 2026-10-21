import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Category } from '@/types/portfolio';

interface CategoriesIndexProps {
    categories: (Category & { is_active?: boolean })[];
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Form for creating a new category
    const createForm = useForm({
        name: '',
        slug: '',
        description: '',
        display_mode: 'web' as 'web' | 'video' | 'case_study',
        sort_order: categories.length + 1,
    });

    // Form for editing an existing category
    const editForm = useForm({
        name: '',
        slug: '',
        description: '',
        display_mode: 'web' as 'web' | 'video' | 'case_study',
        sort_order: 1,
        is_active: true,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(route('admin.categories.store'), {
            onSuccess: () => {
                createForm.reset();
            },
        });
    };

    const startEditing = (cat: Category) => {
        setEditingCategory(cat);
        editForm.setData({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            display_mode: cat.display_mode,
            sort_order: cat.sort_order,
            is_active: (cat as any).is_active ?? true,
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;
        editForm.put(route('admin.categories.update', editingCategory.id), {
            onSuccess: () => {
                setEditingCategory(null);
            },
        });
    };

    const handleDelete = (cat: Category) => {
        if (cat.projects_count && cat.projects_count > 0) {
            alert(`Kategori "${cat.name}" masih memiliki ${cat.projects_count} proyek. Pindahkan atau hapus proyeknya terlebih dahulu.`);
            return;
        }
        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${cat.name}"?`)) {
            router.delete(route('admin.categories.destroy', cat.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold leading-tight text-stone-900 font-serif">
                        Manajemen Kategori Portofolio Dinamis
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 font-mono">
                        Tambah atau sesuaikan tab kategori portofolio (Web Dev, Video, Riset Akademik, Freelance).
                    </p>
                </div>
            }
        >
            <Head title="Kelola Kategori" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: List of Categories */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
                            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
                                <h3 className="font-mono font-bold text-stone-900 text-xs uppercase tracking-wider">
                                    Daftar Kategori Aktif ({categories.length})
                                </h3>
                                <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                    Sinkronisasi Dinamis
                                </span>
                            </div>
                            <div className="divide-y divide-stone-100">
                                {categories.map((c) => (
                                    <div key={c.id} className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors flex items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-stone-900 text-sm">{c.name}</h4>
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-stone-100 text-stone-700 border border-stone-200">
                                                    Mode: {c.display_mode}
                                                </span>
                                            </div>
                                            <p className="text-xs text-stone-500 mt-1 font-mono">
                                                Slug: <code className="text-amber-800 font-bold">#{c.slug}</code> &bull; Urutan: {c.sort_order} &bull; Proyek: {c.projects_count ?? 0}
                                            </p>
                                            {c.description && (
                                                <p className="text-xs text-stone-500 mt-1 italic">{c.description}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => startEditing(c)}
                                                className="px-3 py-1.5 text-xs font-mono font-medium text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(c)}
                                                className="px-3 py-1.5 text-xs font-mono font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Add or Edit Category Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6">
                            <h3 className="font-mono font-bold text-stone-900 text-xs uppercase tracking-wider mb-4 pb-3 border-b border-stone-100">
                                {editingCategory ? `Edit Kategori: ${editingCategory.name}` : 'Tambah Kategori Baru'}
                            </h3>

                            <form onSubmit={editingCategory ? handleUpdate : handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Nama Kategori *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editingCategory ? editForm.data.name : createForm.data.name}
                                        onChange={(e) =>
                                            editingCategory
                                                ? editForm.setData('name', e.target.value)
                                                : createForm.setData('name', e.target.value)
                                        }
                                        placeholder="Contoh: Video Editing, Riset"
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                    {editingCategory
                                        ? editForm.errors.name && <p className="text-xs text-rose-500 mt-1">{editForm.errors.name}</p>
                                        : createForm.errors.name && <p className="text-xs text-rose-500 mt-1">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Slug Filter (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory ? editForm.data.slug : createForm.data.slug}
                                        onChange={(e) =>
                                            editingCategory
                                                ? editForm.setData('slug', e.target.value)
                                                : createForm.setData('slug', e.target.value)
                                        }
                                        placeholder="Dibuat otomatis dari nama jika kosong"
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Mode Tampilan Kartu di Frontend *
                                    </label>
                                    <select
                                        value={editingCategory ? editForm.data.display_mode : createForm.data.display_mode}
                                        onChange={(e) => {
                                            const val = e.target.value as any;
                                            editingCategory
                                                ? editForm.setData('display_mode', val)
                                                : createForm.setData('display_mode', val);
                                        }}
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    >
                                        <option value="web">Web &amp; Software (Live demo &amp; GitHub)</option>
                                        <option value="video">Video &amp; Motion (Play video pop-up)</option>
                                        <option value="case_study">Studi Kasus / Riset (Problem statement &amp; solusi)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Keterangan Singkat
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory ? editForm.data.description : createForm.data.description}
                                        onChange={(e) =>
                                            editingCategory
                                                ? editForm.setData('description', e.target.value)
                                                : createForm.setData('description', e.target.value)
                                        }
                                        placeholder="Deskripsi singkat kategori ini"
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Nomor Urutan Tab Filter
                                    </label>
                                    <input
                                        type="number"
                                        value={editingCategory ? editForm.data.sort_order : createForm.data.sort_order}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            editingCategory
                                                ? editForm.setData('sort_order', val)
                                                : createForm.setData('sort_order', val);
                                        }}
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={editingCategory ? editForm.processing : createForm.processing}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-850 text-white font-mono font-medium text-xs tracking-wider shadow-sm transition-all disabled:opacity-50"
                                    >
                                        {editingCategory ? 'SIMPAN PERUBAHAN' : 'TAMBAH KATEGORI'}
                                    </button>

                                    {editingCategory && (
                                        <button
                                            type="button"
                                            onClick={() => setEditingCategory(null)}
                                            className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono font-medium transition-colors"
                                        >
                                            Batal
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
