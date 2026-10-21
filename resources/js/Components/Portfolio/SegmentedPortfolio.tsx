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

    // Filter projects based on category
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            if (selectedCategory === 'all') return true;
            return (
                project.category?.slug === selectedCategory ||
                project.category_id?.toString() === selectedCategory
            );
        });
    }, [projects, selectedCategory]);

    return (
        <section id="karya" className="py-20 md:py-28 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-900 gap-6">
                    <div>
                        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2">
                            02 / Karya Terpilih
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                            Koleksi Proyek &amp; Studi Kasus
                        </h2>
                    </div>

                    <div className="text-sm text-slate-400 font-mono">
                        Menampilkan {filteredProjects.length} dari total {projects.length} karya
                    </div>
                </div>

                {/* Minimalist Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-slate-400 flex items-center gap-2 ${
                            selectedCategory === 'all'
                                ? 'bg-white text-slate-950 font-bold shadow-sm'
                                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                        }`}
                    >
                        <span>Semua</span>
                        <span className="opacity-70">[{projects.length}]</span>
                    </button>

                    {categories.map((cat) => {
                        const count = projects.filter((p) => p.category_id === cat.id).length;
                        const isActive = selectedCategory === cat.slug;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-slate-400 flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-white text-slate-950 font-bold shadow-sm'
                                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                <span>{cat.name}</span>
                                <span className="opacity-70">[{count}]</span>
                            </button>
                        );
                    })}
                </div>

                {/* Editorial Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, idx) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={idx}
                                onPlayVideo={onPlayVideo}
                                onViewDetail={onViewDetail}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-4 rounded-xl bg-slate-900/40 border border-slate-800/80 max-w-md mx-auto">
                        <p className="text-sm text-slate-400 mb-4">
                            Belum ada proyek yang dipublikasikan pada kategori ini.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSelectedCategory('all')}
                            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                        >
                            Tampilkan Semua Proyek
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
