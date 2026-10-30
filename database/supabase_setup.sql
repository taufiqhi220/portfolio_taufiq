-- ==============================================================================
-- Supabase Schema & Initial Data Setup for Portfolio Taufiq
-- ==============================================================================

-- 1. Users table (Admin Authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload TEXT NOT NULL,
    last_activity INT NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_id_index ON sessions (user_id);
CREATE INDEX IF NOT EXISTS sessions_last_activity_index ON sessions (last_activity);

-- Cache
CREATE TABLE IF NOT EXISTS cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    expiration BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS cache_expiration_index ON cache (expiration);

CREATE TABLE IF NOT EXISTS cache_locks (
    key VARCHAR(255) PRIMARY KEY,
    owner VARCHAR(255) NOT NULL,
    expiration BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS cache_locks_expiration_index ON cache_locks (expiration);

-- Jobs
CREATE TABLE IF NOT EXISTS jobs (
    id BIGSERIAL PRIMARY KEY,
    queue VARCHAR(255) NOT NULL,
    payload TEXT NOT NULL,
    attempts SMALLINT NOT NULL,
    reserved_at INT NULL,
    available_at INT NOT NULL,
    created_at INT NOT NULL
);
CREATE INDEX IF NOT EXISTS jobs_queue_index ON jobs (queue);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    display_mode VARCHAR(255) DEFAULT 'web',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tool Stacks
CREATE TABLE IF NOT EXISTS tools_stacks (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    group_type VARCHAR(255) DEFAULT 'general_tools',
    icon_name VARCHAR(255) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Projects
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    custom_badge VARCHAR(255) NULL,
    summary TEXT NOT NULL,
    description TEXT NULL,
    problem_statement TEXT NULL,
    solution TEXT NULL,
    media_type VARCHAR(255) DEFAULT 'image',
    video_url VARCHAR(255) NULL,
    thumbnail_path VARCHAR(255) NULL,
    live_url VARCHAR(255) NULL,
    github_url VARCHAR(255) NULL,
    extra_meta JSONB NULL,
    is_featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Project Tool Pivot Table
CREATE TABLE IF NOT EXISTS project_tool (
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tool_stack_id BIGINT NOT NULL REFERENCES tools_stacks(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tool_stack_id)
);

-- 6. Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    ip_address VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Profile Settings
CREATE TABLE IF NOT EXISTS profile_settings (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) DEFAULT 'Taufiq Hidayat',
    headline VARCHAR(255) NULL,
    bio TEXT NULL,
    avatar_path VARCHAR(255) NULL,
    phone VARCHAR(255) NULL,
    location VARCHAR(255) NULL,
    github_url VARCHAR(255) NULL,
    linkedin_url VARCHAR(255) NULL,
    instagram_url VARCHAR(255) NULL,
    is_available_for_work BOOLEAN DEFAULT true,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Project Images (Multi-Image Gallery)
CREATE TABLE IF NOT EXISTS project_images (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_path VARCHAR(255) NOT NULL,
    caption VARCHAR(255) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Register Laravel Migrations Table
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch INT NOT NULL
);

INSERT INTO migrations (migration, batch) VALUES
('0001_01_01_000000_create_users_table', 1),
('0001_01_01_000001_create_cache_table', 1),
('0001_01_01_000002_create_jobs_table', 1),
('2026_10_21_142405_create_categories_table', 1),
('2026_10_21_142406_create_tools_stacks_table', 1),
('2026_10_21_142407_create_projects_table', 1),
('2026_10_21_142408_create_project_tool_table', 1),
('2026_10_21_142409_create_inquiries_table', 1),
('2026_10_21_142410_create_profile_settings_table', 1),
('2026_10_26_142411_create_project_images_table', 1)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Admin User (Email: taufiq@portfolio.test, Password: password)
INSERT INTO users (id, name, email, password, email_verified_at, created_at, updated_at)
VALUES (1, 'Taufiq Hidayat', 'taufiq@portfolio.test', '$2y$12$5gnNSJPsa7aiImceGJCrpOubj9zSqaetM0gvSKfdLC7x2M2WUGpoq', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Profile Settings
INSERT INTO profile_settings (id, full_name, headline, bio, phone, location, github_url, linkedin_url, instagram_url, is_available_for_work, created_at, updated_at)
VALUES (
    1,
    'Taufiq Hidayat',
    'Web Developer & Video Editor',
    'Mengembangkan aplikasi web dengan Laravel & React, serta mengerjakan editing video dan motion graphic.',
    '+62 812-3456-7890',
    'Indonesia (WITA / UTC+8)',
    'https://github.com/taufiqhidayat',
    'https://linkedin.com/in/taufiqhidayat',
    'https://instagram.com/taufiqhidayat',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO NOTHING;

-- Categories
INSERT INTO categories (id, name, slug, description, display_mode, sort_order, is_active, created_at, updated_at)
VALUES
(1, 'Web Development', 'web-development', 'Aplikasi web skala penuh, sistem informasi, dan antarmuka modern.', 'web', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Video Editing & Motion', 'video-editing', 'Produksi video komersial, motion graphic, dan color grading.', 'video', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Studi Kasus & Riset', 'case-studies', 'Dokumentasi riset, proyek arsitektur sistem, dan eksplorasi teknis.', 'case_study', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Eksperimen & Tools', 'experiments', 'Pustaka utilitas, eksperimen UI komponen, dan script otomasi.', 'web', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug) DO NOTHING;

-- Tool Stacks
INSERT INTO tools_stacks (id, name, slug, group_type, icon_name, sort_order, created_at, updated_at)
VALUES
(1, 'Adobe Premiere Pro', 'premiere-pro', 'creative_software', 'premiere', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Adobe After Effects', 'after-effects', 'creative_software', 'after-effects', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'DaVinci Resolve', 'davinci-resolve', 'creative_software', 'davinci', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'CapCut Pro', 'capcut', 'creative_software', 'capcut', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Figma', 'figma', 'creative_software', 'figma', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Adobe Photoshop', 'photoshop', 'creative_software', 'photoshop', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Laravel 13', 'laravel', 'web_stack', 'laravel', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'React', 'react', 'web_stack', 'react', 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Inertia.js', 'inertia', 'web_stack', 'inertia', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'TypeScript', 'typescript', 'web_stack', 'typescript', 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'PostgreSQL', 'postgresql', 'web_stack', 'postgresql', 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Tailwind CSS v4', 'tailwindcss', 'web_stack', 'tailwindcss', 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Nginx', 'nginx', 'web_stack', 'nginx', 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Git & GitHub', 'git', 'web_stack', 'git', 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Python', 'python', 'general_tools', 'python', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'RESTful API', 'rest-api', 'general_tools', 'api', 21, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Docker', 'docker', 'general_tools', 'docker', 22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug) DO NOTHING;

-- Sample Projects
INSERT INTO projects (id, category_id, title, slug, custom_badge, summary, problem_statement, solution, media_type, video_url, thumbnail_path, live_url, github_url, extra_meta, is_featured, sort_order, published_at, created_at, updated_at)
VALUES
(
    1,
    1,
    'Sistem Informasi & Portal Administrasi Terpadu',
    'sistem-informasi-portal-desa',
    'Aplikasi Skala Penuh',
    'Platform layanan publik dan transparansi administrasi desa dengan manajemen surat-menyurat online dan dashboard penduduk.',
    'Proses verifikasi berkas warga sebelumnya membutuhkan waktu berhari-hari karena masih menggunakan buku arsip fisik dan antrean langsung di kantor desa.',
    'Membangun aplikasi web terintegrasi dengan validasi data penduduk berbasis NIK, verifikasi berkas digital, dan notifikasi status pemrosesan dokumen.',
    'image',
    NULL,
    NULL,
    'https://example.com/demo-portal',
    'https://github.com/taufiqhidayat/portal-desa',
    '{"role": "Full-Stack Developer", "year": "2025"}'::jsonb,
    true,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    2,
    2,
    'Cinematic Brand Teaser & Motion Graphic',
    'cinematic-brand-teaser-showcase',
    'Komersial / Kreatif',
    'Produksi video promosi berdurasi 60 detik dengan teknik kinetic typography, sound design dinamis, dan grading tone sinematik.',
    'Klien memerlukan video promosi yang mampu mempertahankan atensi audiens pada 5 detik pertama di platform media sosial vertikal dan horizontal.',
    'Menerapkan pacing dinamis mengikuti ketukan instrumen, transisi masking yang mulus, serta visualisasi produk dengan motion graphic 2D/3D.',
    'video_embed',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    NULL,
    NULL,
    NULL,
    '{"duration": "01:00", "aspect_ratio": "16:9 & 9:16", "role": "Lead Video Editor & Sound Designer"}'::jsonb,
    true,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    3,
    3,
    'Studi Kasus Optimasi Indeks Kueri Relasional',
    'analisis-optimasi-indeks-kueri-database',
    'Studi Kasus & Riset',
    'Analisis dan komparasi performa indeks B-Tree vs Hash pada dataset relasional berskala ratusan ribu entitas.',
    'Pencarian data multi-kondisi pada tabel transaksi besar menyebabkan lonjakan beban CPU dan waktu kueri di atas 2 detik.',
    'Merancang arsitektur indeks komposit dan partisi tabel PostgreSQL sehingga latensi pencarian menurun drastis di bawah 30ms.',
    'image',
    NULL,
    NULL,
    NULL,
    'https://github.com/taufiqhidayat/database-benchmark',
    '{"academic_course": "Rekayasa Basis Data", "semester": "Semester 6", "metrics": "98% Query Latency Reduction"}'::jsonb,
    false,
    3,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    4,
    2,
    'Dokumenter Pendek & Color Grading Showcase',
    'mini-documentary-color-grading',
    'Color Grading',
    'Koreksi warna dan grading emosional untuk rekaman outdoor dengan kondisi pencahayaan natural yang bervariasi.',
    'Footage dari kamera berbeda memiliki profil warna (gamma & gamut) yang saling bertabrakan antara sensor kamera.',
    'Menggunakan Color Management di DaVinci Resolve untuk standarisasi color space dan grading kurva film look.',
    'video_embed',
    'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
    NULL,
    NULL,
    NULL,
    '{"duration": "03:45", "role": "Colorist & Offline Editor"}'::jsonb,
    false,
    4,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

-- Project Tools Mapping
INSERT INTO project_tool (project_id, tool_stack_id) VALUES
(1, 7), (1, 8), (1, 9), (1, 11), (1, 12),
(2, 1), (2, 2), (2, 3),
(3, 11), (3, 15), (3, 14),
(4, 3), (4, 1)
ON CONFLICT DO NOTHING;

-- Reset sequence IDs
SELECT setval('categories_id_seq', (SELECT COALESCE(MAX(id), 1) FROM categories));
SELECT setval('tools_stacks_id_seq', (SELECT COALESCE(MAX(id), 1) FROM tools_stacks));
SELECT setval('projects_id_seq', (SELECT COALESCE(MAX(id), 1) FROM projects));
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval('profile_settings_id_seq', (SELECT COALESCE(MAX(id), 1) FROM profile_settings));
