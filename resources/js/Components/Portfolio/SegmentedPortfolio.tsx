import React, { useState, useMemo } from 'react';
import { Category, Project } from '@/types/portfolio';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

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
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Section Header */}
                <Reveal delay={40}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200/40 gap-6">
                        <div>
                            <div className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-2">
                                02 / Karya Terpilih
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-stone-900 tracking-tight">
                                Koleksi Proyek &amp; Studi Kasus
                            </h2>
                        </div>

                        <div className="text-xs text-stone-500 font-mono">
                            Menampilkan {filteredProjects.length} dari total {projects.length} karya
                        </div>
                    </div>
                </Reveal>

                {/* Minimalist Filter Tabs */}
                <Reveal delay={80}>
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => setSelectedCategory('all')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-stone-400 flex items-center gap-2 ${
                                selectedCategory === 'all'
                                    ? 'bg-stone-900 text-stone-50 font-bold shadow-xs'
                                    : 'bg-white/75 backdrop-blur-md text-stone-600 hover:text-stone-900 border border-stone-300/60 hover:border-stone-400 shadow-2xs'
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
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-stone-400 flex items-center gap-2 ${
                                        isActive
                                            ? 'bg-stone-900 text-stone-50 font-bold shadow-xs'
                                            : 'bg-white/75 backdrop-blur-md text-stone-600 hover:text-stone-900 border border-stone-300/60 hover:border-stone-400 shadow-2xs'
                                    }`}
                                >
                                    <span>{cat.name}</span>
                                    <span className="opacity-70">[{count}]</span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Editorial Projects Grid with Staggered Reveal */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, idx) => (
                            <Reveal key={project.id} delay={Math.min(idx * 75, 400)}>
                                <ProjectCard
                                    project={project}
                                    index={idx}
                                    onPlayVideo={onPlayVideo}
                                    onViewDetail={onViewDetail}
                                />
                            </Reveal>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-4 rounded-xl bg-white/75 backdrop-blur-md border border-stone-300/60 max-w-md mx-auto shadow-2xs">
                        <p className="text-sm text-stone-500 mb-4">
                            Belum ada proyek yang dipublikasikan pada kategori ini.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSelectedCategory('all')}
                            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-mono transition-colors"
                        >
                            Tampilkan Semua Proyek
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
