import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Category, Profile, Project, ToolStack } from '@/types/portfolio';
import Navbar from '@/Components/Portfolio/Navbar';
import Hero from '@/Components/Portfolio/Hero';
import SegmentedPortfolio from '@/Components/Portfolio/SegmentedPortfolio';
import ToolsArsenal from '@/Components/Portfolio/ToolsArsenal';
import ContactForm from '@/Components/Portfolio/ContactForm';
import Footer from '@/Components/Portfolio/Footer';
import VideoPlayerModal from '@/Components/Portfolio/VideoPlayerModal';
import ProjectDetailModal from '@/Components/Portfolio/ProjectDetailModal';
import FluidBackground from '@/Components/Portfolio/FluidBackground';
import MarqueeTicker from '@/Components/Portfolio/MarqueeTicker';

interface WelcomeProps {
    profile: Profile;
    categories: Category[];
    projects: Project[];
    tools: Record<string, ToolStack[]>;
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
}

export default function Welcome({ profile, categories, projects, tools, auth }: WelcomeProps) {
    const [activeVideoProject, setActiveVideoProject] = useState<Project | null>(null);
    const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);

    // Deep-link support: read ?project=slug on initial load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const projectSlug = params.get('project');
            if (projectSlug) {
                const found = projects.find((p) => p.slug === projectSlug);
                if (found) {
                    if (found.media_type === 'video_embed' && params.get('play') === 'true') {
                        setActiveVideoProject(found);
                    } else {
                        setActiveDetailProject(found);
                    }
                }
            }
        }
    }, [projects]);

    // Update browser URL query without reloading when modal changes
    const handleOpenDetail = (project: Project) => {
        setActiveDetailProject(project);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('project', project.slug);
            window.history.replaceState({}, '', url.toString());
        }
    };

    const handleCloseDetail = () => {
        setActiveDetailProject(null);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('project');
            window.history.replaceState({}, '', url.toString());
        }
    };

    const handleOpenVideo = (project: Project) => {
        setActiveVideoProject(project);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('project', project.slug);
            url.searchParams.set('play', 'true');
            window.history.replaceState({}, '', url.toString());
        }
    };

    const handleCloseVideo = () => {
        setActiveVideoProject(null);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('project');
            url.searchParams.delete('play');
            window.history.replaceState({}, '', url.toString());
        }
    };

    const pageTitle = profile?.full_name
        ? `${profile.full_name} | Web Developer & Video Editor`
        : 'Taufiq Hidayat | Portofolio';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name="description"
                    content={
                        profile?.bio ||
                        'Portofolio profesional Taufiq Hidayat: Web Developer & Video Editor. Menampilkan aplikasi web sistem penuh, video motion graphic, dan studi kasus teknis.'
                    }
                />
            </Head>

            <div className="min-h-screen bg-transparent text-stone-900 selection:bg-amber-100 selection:text-amber-900 font-sans antialiased relative">
                {/* Dynamic Fluid Organic Waves Background */}
                <FluidBackground />

                {/* Fixed Top Navigation Bar */}
                <Navbar profile={profile} auth={auth} />

                <main className="relative z-10">
                    {/* Hero Section with Interactive Featured Showcase */}
                    <Hero
                        profile={profile}
                        projects={projects}
                        onPlayVideo={handleOpenVideo}
                        onViewDetail={handleOpenDetail}
                    />

                    {/* Continuous Competency Marquee Ticker */}
                    <MarqueeTicker />

                    {/* Dynamic Segmented Portfolio (Web, Video, Research, Experiments) */}
                    <SegmentedPortfolio
                        categories={categories}
                        projects={projects}
                        onPlayVideo={handleOpenVideo}
                        onViewDetail={handleOpenDetail}
                    />

                    {/* Tools, Software & Tech Stack Section */}
                    <ToolsArsenal tools={tools} profile={profile} />

                    {/* Contact Form Section */}
                    <ContactForm profile={profile} />
                </main>

                {/* Footer Section */}
                <Footer profile={profile} />

                {/* Interactive Video Player Modal (YouTube, Google Drive, Vimeo, MP4) */}
                <VideoPlayerModal
                    project={activeVideoProject}
                    onClose={handleCloseVideo}
                />

                {/* Comprehensive Project Detail Case Study Modal */}
                <ProjectDetailModal
                    project={activeDetailProject}
                    onClose={handleCloseDetail}
                    onPlayVideo={(project) => {
                        handleCloseDetail();
                        handleOpenVideo(project);
                    }}
                />
            </div>
        </>
    );
}
