import React, { useState, useMemo } from 'react';
import { Category, Project } from '@/types/portfolio';
import ProjectCard from './ProjectCard';

interface SegmentedPortfolioProps {
    categories: Category[];
    projects: Project[];
    onPlayVideo: (project: Project) => void;
    onViewDetail: (project: Project) => void;
}

export default function SegmentedPortfolio({
    categories,
    projects,
    onPlayVideo,
    onViewDetail,
}: SegmentedPortfolioProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter projects based on category and search query
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesCategory =
                selectedCategory === 'all' ||
                project.category?.slug === selectedCategory ||
                project.category_id?.toString() === selectedCategory;

            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                project.title.toLowerCase().includes(q) ||
                project.summary.toLowerCase().includes(q) ||
                (project.tools && project.tools.some((t) => t.name.toLowerCase().includes(q))) ||
                (project.custom_badge && project.custom_badge.toLowerCase().includes(q));

            return matchesCategory && matchesSearch;
        });
    }, [projects, selectedCategory, searchQuery]);

    return (
        <section id="karya" className="py-20 md:py-28 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                            Portofolio Terpilih
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                            Rekam Jejak & Eksplorasi Karya
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                            Semua karya dikelompokkan secara dinamis: aplikasi web berskala penuh, produksi video sinematik, hingga studi kasus teknis.
                        </p>
                    </div>

                    {/* Quick Search Input */}
                    <div className="w-full md:w-72">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari karya atau stack..."
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                            <svg
                                className="w-4 h-4 text-slate-500 absolute left-3 top-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dynamic Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center gap-2 ${
                            selectedCategory === 'all'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                        }`}
                    >
                        <span>Semua Karya</span>
                        <span
                            className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                                selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                        >
                            {projects.length}
                        </span>
                    </button>

                    {categories.map((cat) => {
                        const count = projects.filter((p) => p.category_id === cat.id).length;
                        const isActive = selectedCategory === cat.slug;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                        : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                                }`}
                            >
                                <span>{cat.name}</span>
                                <span
                                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                                        isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onPlayVideo={onPlayVideo}
                                onViewDetail={onViewDetail}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 max-w-lg mx-auto">
                        <div className="w-12 h-12 rounded-xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <h3 className="text-base font-heading font-semibold text-white mb-1">
                            Belum Ada Karya yang Sesuai
                        </h3>
                        <p className="text-sm text-slate-400 mb-6">
                            {searchQuery
                                ? `Tidak ditemukan proyek yang cocok dengan kata kunci "${searchQuery}".`
                                : 'Belum ada proyek yang ditambahkan ke kategori ini.'}
                        </p>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                            >
                                Bersihkan Pencarian & Filter
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
