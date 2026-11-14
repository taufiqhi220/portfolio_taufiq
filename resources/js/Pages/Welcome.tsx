import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Head } from '@inertiajs/react';
import { Category, PortfolioRole, Profile, Project, ToolStack } from '@/types/portfolio';
import Navbar from '@/Components/Portfolio/Navbar';
import Hero from '@/Components/Portfolio/Hero';
import SegmentedPortfolio from '@/Components/Portfolio/SegmentedPortfolio';
import ToolsArsenal from '@/Components/Portfolio/ToolsArsenal';
import ContactForm from '@/Components/Portfolio/ContactForm';
import Footer from '@/Components/Portfolio/Footer';
import FluidBackground from '@/Components/Portfolio/FluidBackground';
import MarqueeTicker from '@/Components/Portfolio/MarqueeTicker';
import FlashNotification from '@/Components/Feedback/FlashNotification';

const VideoPlayerModal = lazy(() => import('@/Components/Portfolio/VideoPlayerModal'));
const ProjectDetailModal = lazy(() => import('@/Components/Portfolio/ProjectDetailModal'));

const ROLE_PROFILE_OVERRIDES: Record<PortfolioRole, { headline: string; bio: string }> = {
    video: {
        headline: 'Video Editor',
        bio: 'Fresh graduate D4 Teknik Multimedia dan Jaringan dari Politeknik Negeri Ujung Pandang dengan minat pada video editing dan post-production. Berpengalaman mengerjakan penyuntingan video program televisi serta visual menggunakan Adobe Premiere Pro. Saya senang mempelajari hal baru dan menghasilkan karya visual yang komunikatif.',
    },
    web: {
        headline: 'Web Developer',
        bio: 'Fresh graduate D4 Teknik Multimedia dan Jaringan dari Politeknik Negeri Ujung Pandang dengan minat pada web development. Berpengalaman mengembangkan aplikasi web menggunakan Laravel, PHP, JavaScript, dan MySQL. Saya senang mempelajari teknologi baru dan mengembangkan solusi digital yang bermanfaat.',
    },
};

function isVideoCategory(category?: Partial<Category> | null): boolean {
    if (!category) return false;
    const slug = (category.slug || '').toLowerCase();
    const name = (category.name || '').toLowerCase();
    return (
        category.display_mode === 'video' ||
        slug.includes('video') ||
        slug.includes('content') ||
        name.includes('video') ||
        name.includes('konten')
    );
}

function isVideoProject(project?: Project | null, videoCategoryIds?: Set<number>): boolean {
    if (!project) return false;
    if (project.media_type === 'video_embed' || project.media_type === 'video_file') {
        return true;
    }
    if (videoCategoryIds && videoCategoryIds.has(project.category_id)) {
        return true;
    }
    return isVideoCategory(project.category);
}

interface WelcomeProps {
    profile: Profile;
    categories: Category[];
    projects: Project[];
    tools: Record<string, ToolStack[]>;
    lockedRole?: PortfolioRole | null;
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
}

export default function Welcome({
    profile = {
        id: 1,
        full_name: 'Taufiq Hidayat',
        headline: 'Web Developer',
        bio: ROLE_PROFILE_OVERRIDES.web.bio,
        is_available_for_work: true,
    },
    categories = [],
    projects = [],
    tools = {},
    lockedRole = null,
    auth,
}: WelcomeProps) {
    const [clientQueryRole] = useState<PortfolioRole | null>(() => {
        if (typeof window === 'undefined') return null;
        const params = new URLSearchParams(window.location.search);
        const param = params.get('role') ?? params.get('mode');
        return param === 'video' || param === 'web' ? param : null;
    });

    const effectiveLockedRole: PortfolioRole | null = lockedRole ?? clientQueryRole;
    const isRoleLocked = Boolean(effectiveLockedRole);

    const [activeRole, setActiveRole] = useState<PortfolioRole>(() => effectiveLockedRole || 'web');
    const [activeVideoProject, setActiveVideoProject] = useState<Project | null>(null);
    const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number>(0);
    const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);

    const videoCategoryIds = useMemo(
        () => new Set(categories.filter(isVideoCategory).map((c) => c.id)),
        [categories]
    );

    // Sync locked role and handle ?project=slug deep-link support on initial load
    useEffect(() => {
        if (effectiveLockedRole) {
            setActiveRole(effectiveLockedRole);
        }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const projectSlug = params.get('project');
            if (projectSlug) {
                const found = projects.find((p) => p.slug === projectSlug);
                if (found) {
                    const projectIsVideo = isVideoProject(found, videoCategoryIds);
                    if (!effectiveLockedRole) {
                        setActiveRole(projectIsVideo ? 'video' : 'web');
                    }

                    if (!effectiveLockedRole || (effectiveLockedRole === 'video') === projectIsVideo) {
                        if (found.media_type === 'video_embed' && params.get('play') === 'true') {
                            setActiveVideoProject(found);
                        } else {
                            setActiveDetailProject(found);
                        }
                    }
                }
            }
        }
    }, [effectiveLockedRole, projects, videoCategoryIds]);

    const handleRoleChange = (nextRole: PortfolioRole) => {
        if (isRoleLocked || nextRole === activeRole) return;
        setActiveRole(nextRole);
        setActiveVideoProject(null);
        setActiveDetailProject(null);

        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('project');
            url.searchParams.delete('play');
            window.history.replaceState({}, '', url.toString());
        }
    };

    const roleCategories = useMemo(
        () =>
            categories.filter((cat) =>
                activeRole === 'video' ? isVideoCategory(cat) : !isVideoCategory(cat)
            ),
        [categories, activeRole]
    );

    const roleProjects = useMemo(
        () =>
            projects.filter((project) => {
                const projectIsVideo = isVideoProject(project, videoCategoryIds);
                return activeRole === 'video' ? projectIsVideo : !projectIsVideo;
            }),
        [projects, videoCategoryIds, activeRole]
    );

    const roleProfile: Profile = useMemo(
        () => ({
            ...profile,
            headline: ROLE_PROFILE_OVERRIDES[activeRole].headline,
            bio: ROLE_PROFILE_OVERRIDES[activeRole].bio,
        }),
        [profile, activeRole]
    );

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

    const handleOpenVideo = (project: Project, episodeIndex = 0) => {
        setActiveEpisodeIndex(episodeIndex);
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

    const roleTitleLabel =
        activeRole === 'video' ? 'Video Editor' : 'Web Developer';

    const pageTitle = roleProfile?.full_name
        ? `${roleProfile.full_name} | ${roleTitleLabel}`
        : `Taufiq Hidayat | ${roleTitleLabel}`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={roleProfile.bio} />
            </Head>

            <div className="min-h-screen bg-transparent text-stone-900 selection:bg-amber-100 selection:text-amber-900 font-sans antialiased relative">
                <FlashNotification />
                {/* Dynamic Fluid Organic Waves Background */}
                <FluidBackground />

                {/* Fixed Top Navigation Bar */}
                <Navbar
                    profile={roleProfile}
                    auth={auth}
                    activeRole={activeRole}
                    isRoleLocked={isRoleLocked}
                    onRoleChange={handleRoleChange}
                />

                <main className="relative z-10">
                    {/* Hero Section with Interactive Featured Showcase */}
                    <Hero
                        profile={roleProfile}
                        projects={roleProjects}
                        activeRole={activeRole}
                        isRoleLocked={isRoleLocked}
                        onRoleChange={handleRoleChange}
                        onPlayVideo={handleOpenVideo}
                        onViewDetail={handleOpenDetail}
                    />

                    {/* Continuous Competency Marquee Ticker */}
                    <MarqueeTicker activeRole={activeRole} />

                    {/* Dynamic Segmented Portfolio */}
                    <SegmentedPortfolio
                        categories={roleCategories}
                        projects={roleProjects}
                        activeRole={activeRole}
                        onPlayVideo={handleOpenVideo}
                        onViewDetail={handleOpenDetail}
                    />

                    {/* Tools, Software & Tech Stack Section */}
                    <ToolsArsenal tools={tools} profile={roleProfile} activeRole={activeRole} />

                    {/* Contact Form Section */}
                    <ContactForm profile={roleProfile} activeRole={activeRole} />
                </main>

                {/* Footer Section */}
                <Footer profile={roleProfile} />

                <Suspense fallback={null}>
                    {/* Interactive Video Player Modal (YouTube, Google Drive, Vimeo, MP4) */}
                    {activeVideoProject && (
                        <VideoPlayerModal
                            project={activeVideoProject}
                            initialEpisodeIndex={activeEpisodeIndex}
                            onClose={handleCloseVideo}
                        />
                    )}

                    {/* Comprehensive Project Detail Case Study Modal */}
                    {activeDetailProject && (
                        <ProjectDetailModal
                            project={activeDetailProject}
                            onClose={handleCloseDetail}
                            onPlayVideo={(project, episodeIndex = 0) => {
                                handleCloseDetail();
                                handleOpenVideo(project, episodeIndex);
                            }}
                        />
                    )}
                </Suspense>
            </div>
        </>
    );
}
