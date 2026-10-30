export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    display_mode: 'web' | 'video' | 'case_study';
    sort_order: number;
    projects_count?: number;
}

export interface ToolStack {
    id: number;
    name: string;
    slug: string;
    group_type: 'creative_software' | 'web_stack' | 'general_tools';
    icon_name?: string;
    icon_url?: string | null;
    sort_order: number;
    projects_count?: number;
}

export interface ProjectImage {
    id: number;
    project_id: number;
    image_path: string;
    caption?: string | null;
    sort_order: number;
}

export interface VideoEpisode {
    title: string;
    video_url: string;
    duration?: string;
}

export interface ProjectMeta {
    figma_url?: string;
    docs_url?: string;
    playstore_url?: string;
    aspect_ratio?: '16:9' | '9:16';
    client_name?: string;
    completion_year?: string;
    role?: string;
    duration?: string;
    episodes?: VideoEpisode[];
    [key: string]: any;
}

export interface Project {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    custom_badge?: string | null;
    summary: string;
    description?: string | null;
    problem_statement?: string | null;
    solution?: string | null;
    media_type: 'image' | 'video_embed' | 'video_file';
    video_url?: string | null;
    embed_url?: string | null;
    thumbnail_path?: string | null;
    live_url?: string | null;
    github_url?: string | null;
    extra_meta?: ProjectMeta | null;
    is_featured: boolean;
    sort_order: number;
    category?: Category;
    tools?: ToolStack[];
    images?: ProjectImage[];
}

export interface Profile {
    id: number;
    full_name: string;
    headline: string;
    bio: string;
    avatar_path?: string | null;
    phone?: string | null;
    location?: string | null;
    github_url?: string | null;
    linkedin_url?: string | null;
    instagram_url?: string | null;
    resume_url?: string | null;
    is_available_for_work: boolean;
}
