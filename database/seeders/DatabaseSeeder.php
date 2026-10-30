<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\ToolStack;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with authentic, high-craft initial data.
     */
    public function run(): void
    {
        // 1. Admin Account for Taufiq Hidayat
        $admin = User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'taufiq@portfolio.test')],
            [
                'name' => env('ADMIN_NAME', 'Taufiq Hidayat'),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
                'email_verified_at' => now(),
            ]
        );

        // 2. Profile Settings
        ProfileSetting::firstOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Taufiq Hidayat',
                'headline' => 'Web Developer & Video Editor',
                'bio' => 'Mengembangkan aplikasi web dengan Laravel & React, serta mengerjakan editing video dan motion graphic.',
                'phone' => '+62 812-3456-7890',
                'location' => 'Indonesia (WITA / UTC+8)',
                'github_url' => 'https://github.com/taufiqhidayat',
                'linkedin_url' => 'https://linkedin.com/in/taufiqhidayat',
                'instagram_url' => 'https://instagram.com/taufiqhidayat',
                'resume_url' => '#',
                'is_available_for_work' => true,
            ]
        );

        // 3. Categories (Dynamic & Extensible)
        $catWeb = Category::firstOrCreate(
            ['slug' => 'web-development'],
            [
                'name' => 'Web Development',
                'description' => 'Aplikasi web skala penuh, sistem informasi, dan antarmuka modern.',
                'display_mode' => 'web',
                'sort_order' => 1,
                'is_active' => true,
            ]
        );

        $catVideo = Category::firstOrCreate(
            ['slug' => 'video-editing'],
            [
                'name' => 'Video Editing & Motion',
                'description' => 'Produksi video komersial, motion graphic, dan color grading.',
                'display_mode' => 'video',
                'sort_order' => 2,
                'is_active' => true,
            ]
        );

        $catResearch = Category::firstOrCreate(
            ['slug' => 'case-studies'],
            [
                'name' => 'Studi Kasus & Riset',
                'description' => 'Dokumentasi riset, proyek arsitektur sistem, dan eksplorasi teknis.',
                'display_mode' => 'case_study',
                'sort_order' => 3,
                'is_active' => true,
            ]
        );

        $catExp = Category::firstOrCreate(
            ['slug' => 'experiments'],
            [
                'name' => 'Eksperimen & Tools',
                'description' => 'Pustaka utilitas, eksperimen UI komponen, dan script otomasi.',
                'display_mode' => 'web',
                'sort_order' => 4,
                'is_active' => true,
            ]
        );

        // 4. Tools & Stacks
        $tools = [
            // Creative Software
            ['name' => 'Adobe Premiere Pro', 'slug' => 'premiere-pro', 'group_type' => 'creative_software', 'icon_name' => 'premiere', 'sort_order' => 1],
            ['name' => 'Adobe After Effects', 'slug' => 'after-effects', 'group_type' => 'creative_software', 'icon_name' => 'after-effects', 'sort_order' => 2],
            ['name' => 'DaVinci Resolve', 'slug' => 'davinci-resolve', 'group_type' => 'creative_software', 'icon_name' => 'davinci', 'sort_order' => 3],
            ['name' => 'CapCut Pro', 'slug' => 'capcut', 'group_type' => 'creative_software', 'icon_name' => 'capcut', 'sort_order' => 4],
            ['name' => 'Figma', 'slug' => 'figma', 'group_type' => 'creative_software', 'icon_name' => 'figma', 'sort_order' => 5],
            ['name' => 'Adobe Photoshop', 'slug' => 'photoshop', 'group_type' => 'creative_software', 'icon_name' => 'photoshop', 'sort_order' => 6],

            // Web Stack
            ['name' => 'Laravel 13', 'slug' => 'laravel', 'group_type' => 'web_stack', 'icon_name' => 'laravel', 'sort_order' => 10],
            ['name' => 'React', 'slug' => 'react', 'group_type' => 'web_stack', 'icon_name' => 'react', 'sort_order' => 11],
            ['name' => 'Inertia.js', 'slug' => 'inertia', 'group_type' => 'web_stack', 'icon_name' => 'inertia', 'sort_order' => 12],
            ['name' => 'TypeScript', 'slug' => 'typescript', 'group_type' => 'web_stack', 'icon_name' => 'typescript', 'sort_order' => 13],
            ['name' => 'PostgreSQL', 'slug' => 'postgresql', 'group_type' => 'web_stack', 'icon_name' => 'postgresql', 'sort_order' => 14],
            ['name' => 'Tailwind CSS v4', 'slug' => 'tailwindcss', 'group_type' => 'web_stack', 'icon_name' => 'tailwindcss', 'sort_order' => 15],
            ['name' => 'Nginx', 'slug' => 'nginx', 'group_type' => 'web_stack', 'icon_name' => 'nginx', 'sort_order' => 16],
            ['name' => 'Git & GitHub', 'slug' => 'git', 'group_type' => 'web_stack', 'icon_name' => 'git', 'sort_order' => 17],

            // General & Research
            ['name' => 'Python', 'slug' => 'python', 'group_type' => 'general_tools', 'icon_name' => 'python', 'sort_order' => 20],
            ['name' => 'RESTful API', 'slug' => 'rest-api', 'group_type' => 'general_tools', 'icon_name' => 'api', 'sort_order' => 21],
            ['name' => 'Docker', 'slug' => 'docker', 'group_type' => 'general_tools', 'icon_name' => 'docker', 'sort_order' => 22],
        ];

        $toolModels = [];
        foreach ($tools as $t) {
            $toolModels[$t['slug']] = ToolStack::firstOrCreate(['slug' => $t['slug']], $t);
        }

        // 5. Authentic Sample Projects
        // Project 1: Web App
        $p1 = Project::firstOrCreate(
            ['slug' => 'sistem-informasi-portal-desa'],
            [
                'category_id' => $catWeb->id,
                'title' => 'Sistem Informasi & Portal Administrasi Terpadu',
                'slug' => 'sistem-informasi-portal-desa',
                'custom_badge' => 'Aplikasi Skala Penuh',
                'summary' => 'Platform layanan publik dan transparansi administrasi desa dengan manajemen surat-menyurat online dan dashboard penduduk.',
                'problem_statement' => 'Proses verifikasi berkas warga sebelumnya membutuhkan waktu berhari-hari karena masih menggunakan buku arsip fisik dan antrean langsung di kantor desa.',
                'solution' => 'Membangun aplikasi web terintegrasi dengan validasi data penduduk berbasis NIK, verifikasi berkas digital, dan notifikasi status pemrosesan dokumen.',
                'media_type' => 'image',
                'thumbnail_path' => null,
                'live_url' => 'https://example.com/demo-portal',
                'github_url' => 'https://github.com/taufiqhidayat/portal-desa',
                'extra_meta' => [
                    'role' => 'Full-Stack Developer',
                    'year' => '2025',
                ],
                'is_featured' => true,
                'sort_order' => 1,
                'published_at' => now(),
            ]
        );
        $p1->tools()->sync([
            $toolModels['laravel']->id,
            $toolModels['react']->id,
            $toolModels['inertia']->id,
            $toolModels['postgresql']->id,
            $toolModels['tailwindcss']->id,
        ]);

        // Project 2: Video Editing (YouTube Embed)
        $p2 = Project::firstOrCreate(
            ['slug' => 'cinematic-brand-teaser-showcase'],
            [
                'category_id' => $catVideo->id,
                'title' => 'Cinematic Brand Teaser & Motion Graphic',
                'slug' => 'cinematic-brand-teaser-showcase',
                'custom_badge' => 'Komersial / Kreatif',
                'summary' => 'Produksi video promosi berdurasi 60 detik dengan teknik kinetic typography, sound design dinamis, dan grading tone sinematik.',
                'problem_statement' => 'Klien memerlukan video promosi yang mampu mempertahankan atensi audiens pada 5 detik pertama di platform media sosial vertikal dan horizontal.',
                'solution' => 'Menerapkan pacing dinamis mengikuti ketukan instrumen, transisi masking yang mulus, serta visualisasi produk dengan motion graphic 2D/3D.',
                'media_type' => 'video_embed',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Link contoh YouTube
                'thumbnail_path' => null,
                'extra_meta' => [
                    'duration' => '01:00',
                    'aspect_ratio' => '16:9 & 9:16',
                    'role' => 'Lead Video Editor & Sound Designer',
                ],
                'is_featured' => true,
                'sort_order' => 2,
                'published_at' => now(),
            ]
        );
        $p2->tools()->sync([
            $toolModels['premiere-pro']->id,
            $toolModels['after-effects']->id,
            $toolModels['davinci-resolve']->id,
        ]);

        // Project 3: Academic / Case Study
        $p3 = Project::firstOrCreate(
            ['slug' => 'analisis-optimasi-indeks-kueri-database'],
            [
                'category_id' => $catResearch->id,
                'title' => 'Studi Kasus Optimasi Indeks Kueri Relasional',
                'slug' => 'analisis-optimasi-indeks-kueri-database',
                'custom_badge' => 'Studi Kasus & Riset',
                'summary' => 'Analisis dan komparasi performa indeks B-Tree vs Hash pada dataset relasional berskala ratusan ribu entitas.',
                'problem_statement' => 'Pencarian data multi-kondisi pada tabel transaksi besar menyebabkan lonjakan beban CPU dan waktu kueri di atas 2 detik.',
                'solution' => 'Merancang arsitektur indeks komposit dan partisi tabel PostgreSQL sehingga latensi pencarian menurun drastis di bawah 30ms.',
                'media_type' => 'image',
                'thumbnail_path' => null,
                'github_url' => 'https://github.com/taufiqhidayat/database-benchmark',
                'extra_meta' => [
                    'academic_course' => 'Rekayasa Basis Data',
                    'semester' => 'Semester 6',
                    'metrics' => '98% Query Latency Reduction',
                ],
                'is_featured' => false,
                'sort_order' => 3,
                'published_at' => now(),
            ]
        );
        $p3->tools()->sync([
            $toolModels['postgresql']->id,
            $toolModels['python']->id,
            $toolModels['git']->id,
        ]);

        // Project 4: Video Editing (Google Drive Showcase Example)
        $p4 = Project::firstOrCreate(
            ['slug' => 'mini-documentary-color-grading'],
            [
                'category_id' => $catVideo->id,
                'title' => 'Dokumenter Pendek & Color Grading Showcase',
                'slug' => 'mini-documentary-color-grading',
                'custom_badge' => 'Color Grading',
                'summary' => 'Koreksi warna dan grading emosional untuk rekaman outdoor dengan kondisi pencahayaan natural yang bervariasi.',
                'problem_statement' => 'Footage dari kamera berbeda memiliki profil warna (gamma & gamut) yang saling bertabrakan antara sensor kamera.',
                'solution' => 'Menggunakan Color Management di DaVinci Resolve untuk standarisasi color space dan grading kurva film look.',
                'media_type' => 'video_embed',
                'video_url' => 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view', // Link contoh Google Drive
                'thumbnail_path' => null,
                'extra_meta' => [
                    'duration' => '03:45',
                    'role' => 'Colorist & Offline Editor',
                ],
                'is_featured' => false,
                'sort_order' => 4,
                'published_at' => now(),
            ]
        );
        $p4->tools()->sync([
            $toolModels['davinci-resolve']->id,
            $toolModels['premiere-pro']->id,
        ]);
    }
}
