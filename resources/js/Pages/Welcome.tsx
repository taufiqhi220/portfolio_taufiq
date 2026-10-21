import React, { useState } from 'react';
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
                        onPlayVideo={(project) => setActiveVideoProject(project)}
                        onViewDetail={(project) => setActiveDetailProject(project)}
                    />

                    {/* Continuous Competency Marquee Ticker */}
                    <MarqueeTicker />

                    {/* Dynamic Segmented Portfolio (Web, Video, Research, Experiments) */}
                    <SegmentedPortfolio
                        categories={categories}
                        projects={projects}
                        onPlayVideo={(project) => setActiveVideoProject(project)}
                        onViewDetail={(project) => setActiveDetailProject(project)}
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
                    onClose={() => setActiveVideoProject(null)}
                />

                {/* Comprehensive Project Detail Case Study Modal */}
                <ProjectDetailModal
                    project={activeDetailProject}
                    onClose={() => setActiveDetailProject(null)}
                    onPlayVideo={(project) => {
                        setActiveDetailProject(null);
                        setActiveVideoProject(project);
                    }}
                />
            </div>
        </>
    );
}
