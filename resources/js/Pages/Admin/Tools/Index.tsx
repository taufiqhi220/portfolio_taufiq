import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ToolStack } from '@/types/portfolio';
import ToolIcon from '@/Components/Portfolio/ToolIcon';
import { confirmDialog } from '@/Utils/alert';
import { compressImageFile } from '@/Utils/imageCompressor';

interface ToolsIndexProps {
    tools: ToolStack[];
}

export default function ToolsIndex({ tools }: ToolsIndexProps) {
    const [editingTool, setEditingTool] = useState<ToolStack | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'creative_software' | 'web_stack' | 'general_tools'>('all');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form for creating a new tool
    const createForm = useForm({
        name: '',
        slug: '',
        group_type: 'web_stack' as 'creative_software' | 'web_stack' | 'general_tools',
        sort_order: tools.length + 1,
        icon_file: null as File | null,
        icon_url_input: '',
    });

    // Form for editing an existing tool
    const editForm = useForm({
        _method: 'PUT',
        name: '',
        slug: '',
        group_type: 'web_stack' as 'creative_software' | 'web_stack' | 'general_tools',
        sort_order: 1,
        icon_file: null as File | null,
        icon_url_input: '',
        remove_icon: false,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(route('admin.tools.store'), {
            forceFormData: true,
            onSuccess: () => {
                createForm.reset();
                setPreviewImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const startEditing = (tool: ToolStack) => {
        setEditingTool(tool);
        setPreviewImage(tool.icon_url || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        editForm.setData({
            _method: 'PUT',
            name: tool.name,
            slug: tool.slug,
            group_type: tool.group_type,
            sort_order: tool.sort_order,
            icon_file: null,
            icon_url_input: tool.icon_name && (tool.icon_name.startsWith('http://') || tool.icon_name.startsWith('https://')) ? tool.icon_name : '',
            remove_icon: false,
        });
    };

    const cancelEditing = () => {
        setEditingTool(null);
        setPreviewImage(null);
        editForm.reset();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTool) return;

        editForm.post(route('admin.tools.update', editingTool.id), {
            forceFormData: true,
            onSuccess: () => {
                setEditingTool(null);
                setPreviewImage(null);
                editForm.reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleDelete = async (tool: ToolStack) => {
        const hasProjects = Boolean(tool.projects_count && tool.projects_count > 0);
        const confirmed = await confirmDialog({
            title: 'Hapus Tech Stack?',
            text: hasProjects
                ? `Tool "${tool.name}" masih terhubung dengan ${tool.projects_count} proyek. Tetap hapus dari daftar tech stack?`
                : `Apakah Anda yakin ingin menghapus "${tool.name}" dari daftar tech stack?`,
            confirmButtonText: 'Ya, Hapus Tool',
            cancelButtonText: 'Batal',
            isDanger: true,
        });

        if (!confirmed) {
            return;
        }

        router.post(
            route('admin.tools.destroy', tool.id),
            { _method: 'DELETE' },
            { preserveScroll: true }
        );
    };

    const filteredTools = tools.filter((t) => {
        if (activeFilter === 'all') return true;
        return t.group_type === activeFilter;
    });

    const getGroupLabel = (type: string) => {
        switch (type) {
            case 'creative_software':
                return 'Video & Motion';
            case 'web_stack':
                return 'Web & Backend';
            case 'general_tools':
                return 'Workflow & Tools';
            default:
                return type;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold leading-tight text-stone-900 font-serif">
                        Manajemen Tech Stack &amp; Software
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 font-mono">
                        Tambah teknologi baru atau unggah logo kustom yang tampil pada bagian Toolkit portofolio.
                    </p>
                </div>
            }
        >
            <Head title="Kelola Tech Stack" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: List of Tools */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
                            {/* Filter Bar */}
                            <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/40">
                                <div>
                                    <h3 className="font-mono font-bold text-stone-900 text-xs uppercase tracking-wider">
                                        Daftar Stack &amp; Software ({filteredTools.length})
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
                                    <button
                                        type="button"
                                        onClick={() => setActiveFilter('all')}
                                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                                            activeFilter === 'all'
                                                ? 'bg-stone-950 text-white font-medium shadow-xs'
                                                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                                        }`}
                                    >
                                        Semua
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveFilter('web_stack')}
                                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                                            activeFilter === 'web_stack'
                                                ? 'bg-stone-950 text-white font-medium shadow-xs'
                                                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                                        }`}
                                    >
                                        Web Dev
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveFilter('creative_software')}
                                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                                            activeFilter === 'creative_software'
                                                ? 'bg-stone-950 text-white font-medium shadow-xs'
                                                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                                        }`}
                                    >
                                        Video
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveFilter('general_tools')}
                                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                                            activeFilter === 'general_tools'
                                                ? 'bg-stone-950 text-white font-medium shadow-xs'
                                                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                                        }`}
                                    >
                                        Workflow
                                    </button>
                                </div>
                            </div>

                            {/* Tools Grid List */}
                            <div className="divide-y divide-stone-100 max-h-[640px] overflow-y-auto">
                                {filteredTools.map((t) => (
                                    <div
                                        key={t.id}
                                        className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            {/* Icon Preview */}
                                            <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                                                <ToolIcon
                                                    name={t.name}
                                                    slug={t.slug}
                                                    iconUrl={t.icon_url || t.icon_name || null}
                                                    className="w-7 h-7"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="font-semibold text-stone-900 text-sm truncate">
                                                        {t.name}
                                                    </h4>
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-stone-100 text-stone-700 border border-stone-200">
                                                        {getGroupLabel(t.group_type)}
                                                    </span>
                                                    {t.icon_url && (
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-50 text-amber-800 border border-amber-200">
                                                            Gambar Kustom
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-stone-500 mt-1 font-mono">
                                                    Slug: <code className="text-stone-700">#{t.slug}</code> &bull; Urutan: {t.sort_order} &bull; Proyek: {t.projects_count ?? 0}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => startEditing(t)}
                                                className="px-3 py-1.5 text-xs font-mono font-medium text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(t)}
                                                className="px-3 py-1.5 text-xs font-mono font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredTools.length === 0 && (
                                    <div className="p-8 text-center text-stone-500 text-xs font-mono">
                                        Tidak ada tech stack di kategori ini.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Add or Edit Tool Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 sticky top-24">
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                                <h3 className="font-mono font-bold text-stone-900 text-xs uppercase tracking-wider">
                                    {editingTool ? `Edit Stack: ${editingTool.name}` : 'Tambah Tech Stack Baru'}
                                </h3>
                                {editingTool && (
                                    <button
                                        type="button"
                                        onClick={cancelEditing}
                                        className="text-xs font-mono text-stone-500 hover:text-stone-900 underline"
                                    >
                                        Batal Edit
                                    </button>
                                )}
                            </div>

                            <form onSubmit={editingTool ? handleUpdate : handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Nama Perangkat / Tool *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editingTool ? editForm.data.name : createForm.data.name}
                                        onChange={(e) =>
                                            editingTool
                                                ? editForm.setData('name', e.target.value)
                                                : createForm.setData('name', e.target.value)
                                        }
                                        placeholder="Contoh: Docker, Next.js, DaVinci Resolve"
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                    {editingTool
                                        ? editForm.errors.name && <p className="text-xs text-rose-500 mt-1">{editForm.errors.name}</p>
                                        : createForm.errors.name && <p className="text-xs text-rose-500 mt-1">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Kategori Grup *
                                    </label>
                                    <select
                                        value={editingTool ? editForm.data.group_type : createForm.data.group_type}
                                        onChange={(e) => {
                                            const val = e.target.value as any;
                                            editingTool
                                                ? editForm.setData('group_type', val)
                                                : createForm.setData('group_type', val);
                                        }}
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    >
                                        <option value="web_stack">Web &amp; Backend Engineering</option>
                                        <option value="creative_software">Video Editing &amp; Motion</option>
                                        <option value="general_tools">Workflow &amp; General Tools</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Slug Pengenal (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={editingTool ? editForm.data.slug : createForm.data.slug}
                                        onChange={(e) =>
                                            editingTool
                                                ? editForm.setData('slug', e.target.value)
                                                : createForm.setData('slug', e.target.value)
                                        }
                                        placeholder="Dibuat otomatis dari nama"
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Icon Upload or URL */}
                                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider">
                                            Gambar Icon / Logo
                                        </label>
                                        <span className="text-[10px] font-mono text-stone-500">
                                            SVG, PNG, atau WebP
                                        </span>
                                    </div>

                                    {/* Preview */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-stone-300 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Icon Preview"
                                                    className="w-full h-full object-contain"
                                                    onError={() => setPreviewImage(null)}
                                                />
                                            ) : (
                                                <span className="font-mono text-xs text-stone-400 font-bold">
                                                    {editingTool
                                                        ? editingTool.name.slice(0, 2).toUpperCase()
                                                        : 'TH'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs font-mono text-stone-600">
                                            <p className="font-semibold text-stone-800">
                                                {previewImage ? 'Pratinjau Gambar Icon' : 'Default Monogram Badge'}
                                            </p>
                                            <p className="text-[11px] text-stone-500 mt-0.5">
                                                Bila dikosongkan, sistem memakai lencana 2-huruf bersih.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-[11px] font-mono text-stone-600">
                                                Unggah File Logo dari Komputer
                                            </label>
                                            {(editingTool ? editForm.data.icon_file : createForm.data.icon_file) && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (editingTool) {
                                                            editForm.setData('icon_file', null);
                                                            setPreviewImage(editingTool.icon_url || null);
                                                        } else {
                                                            createForm.setData('icon_file', null);
                                                            setPreviewImage(null);
                                                        }
                                                        if (fileInputRef.current) {
                                                            fileInputRef.current.value = '';
                                                        }
                                                    }}
                                                    className="text-[10px] font-mono text-amber-700 hover:text-amber-800 underline"
                                                >
                                                    Batal Pilih File
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/png,image/svg+xml,image/webp,image/jpeg,image/gif"
                                            onChange={async (e) => {
                                                const rawFile = e.target.files ? e.target.files[0] : null;
                                                if (rawFile) {
                                                    const url = URL.createObjectURL(rawFile);
                                                    setPreviewImage(url);
                                                    const optimizedFile = await compressImageFile(rawFile, 512, 0.9);
                                                    if (editingTool) {
                                                        editForm.setData('icon_file', optimizedFile);
                                                    } else {
                                                        createForm.setData('icon_file', optimizedFile);
                                                    }
                                                }
                                            }}
                                            className="w-full text-xs text-stone-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:font-semibold file:bg-stone-900 file:text-amber-400 hover:file:bg-stone-800 transition-all cursor-pointer"
                                        />
                                        {(editingTool ? editForm.errors.icon_file : createForm.errors.icon_file) && (
                                            <p className="text-xs text-rose-500 mt-1 font-mono">
                                                {editingTool ? editForm.errors.icon_file : createForm.errors.icon_file}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-mono text-stone-600 mb-1">
                                            Atau Tautan Icon Web / CDN URL
                                        </label>
                                        <input
                                            type="text"
                                            value={editingTool ? editForm.data.icon_url_input : createForm.data.icon_url_input}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val && (val.startsWith('http') || val.startsWith('/'))) {
                                                    setPreviewImage(val);
                                                }
                                                if (editingTool) {
                                                    editForm.setData('icon_url_input', val);
                                                } else {
                                                    createForm.setData('icon_url_input', val);
                                                }
                                            }}
                                            placeholder="https://.../icon.svg"
                                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all"
                                        />
                                        {(editingTool ? editForm.errors.icon_url_input : createForm.errors.icon_url_input) && (
                                            <p className="text-xs text-rose-500 mt-1 font-mono">
                                                {editingTool ? editForm.errors.icon_url_input : createForm.errors.icon_url_input}
                                            </p>
                                        )}
                                    </div>

                                    {editingTool && editingTool.icon_url && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreviewImage(null);
                                                editForm.setData('remove_icon', true);
                                                editForm.setData('icon_file', null);
                                                editForm.setData('icon_url_input', '');
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                            className="text-[11px] font-mono text-rose-600 hover:text-rose-700 underline"
                                        >
                                            Hapus Logo Kustom (Kembali ke Monogram)
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-semibold uppercase text-stone-700 tracking-wider mb-1">
                                        Nomor Urutan Tampilan
                                    </label>
                                    <input
                                        type="number"
                                        value={editingTool ? editForm.data.sort_order : createForm.data.sort_order}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            editingTool
                                                ? editForm.setData('sort_order', val)
                                                : createForm.setData('sort_order', val);
                                        }}
                                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={editingTool ? editForm.processing : createForm.processing}
                                        className="flex-1 py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-850 text-white font-mono font-medium text-xs tracking-wider shadow-sm transition-all disabled:opacity-50"
                                    >
                                        {editingTool
                                            ? editForm.processing
                                                ? 'Menyimpan Perubahan...'
                                                : 'SIMPAN PERUBAHAN'
                                            : createForm.processing
                                              ? 'Menambahkan Stack...'
                                              : 'TAMBAH TECH STACK'}
                                    </button>

                                    {editingTool && (
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
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
