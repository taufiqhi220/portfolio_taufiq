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
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedToolSlug, setSelectedToolSlug] = useState<string>('all');

    // Extract all unique tools available in the project list for secondary filtering
    const availableTools = useMemo(() => {
        const toolMap = new Map<string, { slug: string; name: string }>();
        projects.forEach((p) => {
            if (p.tools) {
                p.tools.forEach((t) => {
                    if (!toolMap.has(t.slug)) {
                        toolMap.set(t.slug, { slug: t.slug, name: t.name });
                    }
                });
            }
        });
        return Array.from(toolMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [projects]);

    // Filter projects based on category, search query, and tool
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            // Category check
            const matchesCategory =
                selectedCategory === 'all' ||
                project.category?.slug === selectedCategory ||
                project.category_id?.toString() === selectedCategory;

            if (!matchesCategory) return false;

            // Tool check
            if (selectedToolSlug !== 'all') {
                const hasTool = project.tools?.some((t) => t.slug === selectedToolSlug);
                if (!hasTool) return false;
            }

            // Search query check
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const titleMatch = project.title.toLowerCase().includes(q);
                const summaryMatch = project.summary.toLowerCase().includes(q);
                const badgeMatch = project.custom_badge?.toLowerCase().includes(q);
                const toolMatch = project.tools?.some((t) => t.name.toLowerCase().includes(q));
                return titleMatch || summaryMatch || badgeMatch || toolMatch;
            }

            return true;
        });
    }, [projects, selectedCategory, selectedToolSlug, searchQuery]);

    const handleResetFilter = () => {
        setSelectedCategory('all');
        setSelectedToolSlug('all');
        setSearchQuery('');
    };

    return (
        <section id="karya" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Section Header */}
                <Reveal delay={40}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-200/40 gap-6">
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

                {/* Filter & Live Search Toolbar */}
                <Reveal delay={80}>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
                        {/* Minimalist Category Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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

                        {/* Live Search Input */}
                        <div className="relative w-full md:w-64 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari karya / stack..."
                                className="w-full pl-9 pr-8 py-1.5 rounded-lg text-xs font-mono bg-white/80 backdrop-blur-md border border-stone-300/70 focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 focus:outline-none text-stone-800 placeholder-stone-400 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-700 text-sm"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Secondary Tool Tag Filter (if available) */}
                    {availableTools.length > 0 && (
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 text-[11px] font-mono scrollbar-none">
                            <span className="text-stone-500 uppercase tracking-wider shrink-0 mr-1 text-[10px]">
                                Filter Stack:
                            </span>
                            <button
                                type="button"
                                onClick={() => setSelectedToolSlug('all')}
                                className={`px-2 py-0.5 rounded transition-all shrink-0 ${
                                    selectedToolSlug === 'all'
                                        ? 'bg-amber-600 text-white font-semibold'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                Semua Tools
                            </button>
                            {availableTools.map((tool) => {
                                const isSelected = selectedToolSlug === tool.slug;
                                return (
                                    <button
                                        key={tool.slug}
                                        type="button"
                                        onClick={() => setSelectedToolSlug(isSelected ? 'all' : tool.slug)}
                                        className={`px-2 py-0.5 rounded transition-all shrink-0 ${
                                            isSelected
                                                ? 'bg-amber-600 text-white font-semibold'
                                                : 'bg-stone-100/90 text-stone-600 hover:bg-stone-200'
                                        }`}
                                    >
                                        {tool.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
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
                    /* Accessible Empty State */
                    <div className="py-16 text-center bg-stone-50/50 rounded-2xl border border-stone-200/60 p-8 max-w-md mx-auto">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="font-heading font-bold text-stone-900 text-base mb-1">
                            Tidak Ada Karya yang Cocok
                        </h3>
                        <p className="text-xs text-stone-500 font-mono mb-4 leading-relaxed">
                            {searchQuery
                                ? `Tidak ditemukan karya dengan kata kunci "${searchQuery}".`
                                : 'Belum ada karya yang diunggah untuk kategori atau filter ini.'}
                        </p>
                        <button
                            type="button"
                            onClick={handleResetFilter}
                            className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-stone-900 text-white hover:bg-stone-850 transition-colors cursor-pointer"
                        >
                            Reset Filter &amp; Tampilkan Semua
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
