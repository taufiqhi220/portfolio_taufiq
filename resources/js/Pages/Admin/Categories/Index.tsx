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
                    <h2 className="text-xl font-bold leading-tight text-gray-800">
                        Manajemen Kategori Portofolio Dinamis
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Tambah kategori baru secara fleksibel kapan saja (Web Dev, Video, Riset Akademik, Freelance, dll.).
                    </p>
                </div>
            }
        >
            <Head title="Kelola Kategori" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: List of Categories */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 text-sm">
                                    Daftar Kategori Aktif ({categories.length})
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {categories.map((c) => (
                                    <div key={c.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-gray-900 text-sm">{c.name}</h4>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                                                    Mode: {c.display_mode}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Slug: <code className="text-gray-700">#{c.slug}</code> &bull; Urutan: {c.sort_order} &bull; Proyek: {c.projects_count ?? 0}
                                            </p>
                                            {c.description && (
                                                <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => startEditing(c)}
                                                className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(c)}
                                                className="px-2.5 py-1 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded hover:bg-rose-100"
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
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 text-sm mb-4">
                                {editingCategory ? `Edit Kategori: ${editingCategory.name}` : 'Tambah Kategori Baru'}
                            </h3>

                            <form onSubmit={editingCategory ? handleUpdate : handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">
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
                                        placeholder="Contoh: Video Editing, Studi Kasus, Riset"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {editingCategory
                                        ? editForm.errors.name && <p className="text-xs text-rose-500 mt-1">{editForm.errors.name}</p>
                                        : createForm.errors.name && <p className="text-xs text-rose-500 mt-1">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">
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
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">
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
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="web">Web &amp; Software (Fokus live demo &amp; GitHub)</option>
                                        <option value="video">Video &amp; Motion (Fokus play video pop-up)</option>
                                        <option value="case_study">Studi Kasus / Riset (Fokus problem statement &amp; solusi)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">
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
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">
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
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={editingCategory ? editForm.processing : createForm.processing}
                                        className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                                    >
                                        {editingCategory ? 'Perbarui Kategori' : 'Simpan Kategori Baru'}
                                    </button>

                                    {editingCategory && (
                                        <button
                                            type="button"
                                            onClick={() => setEditingCategory(null)}
                                            className="py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium"
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
