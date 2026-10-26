<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Inquiry;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\ToolStack;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display the public portfolio page.
     */
    public function index(): Response
    {
        $defaultProfile = new ProfileSetting([
            'full_name' => 'Taufiq Hidayat',
            'headline' => 'Full-Stack Web Developer & Creative Video Editor',
            'bio' => 'Memadukan ketelitian rekayasa perangkat lunak dengan kepekaan visual storytelling multimedia.',
            'is_available_for_work' => true,
        ]);

        try {
            $profile = ProfileSetting::first() ?? $defaultProfile;

            $categories = Category::where('is_active', true)
                ->withCount('projects')
                ->orderBy('sort_order', 'asc')
                ->get();

            $projects = Project::with(['category', 'tools', 'images'])
                ->orderBy('is_featured', 'desc')
                ->orderBy('sort_order', 'asc')
                ->get();

            $tools = ToolStack::orderBy('sort_order', 'asc')
                ->get()
                ->groupBy('group_type');
        } catch (\Throwable $e) {
            report($e);
            $profile = $defaultProfile;
            
            $categories = [
                (object) ['id' => 1, 'name' => 'Web Development', 'slug' => 'web-development', 'projects_count' => 1, 'display_mode' => 'web'],
                (object) ['id' => 2, 'name' => 'Video Editing & Motion', 'slug' => 'video-editing', 'projects_count' => 2, 'display_mode' => 'video'],
                (object) ['id' => 3, 'name' => 'Studi Kasus & Riset', 'slug' => 'case-studies', 'projects_count' => 1, 'display_mode' => 'case_study'],
            ];

            $tools = [
                'creative_software' => [
                    (object) ['id' => 1, 'name' => 'Adobe Premiere Pro', 'slug' => 'premiere-pro', 'icon_name' => 'premiere'],
                    (object) ['id' => 2, 'name' => 'Adobe After Effects', 'slug' => 'after-effects', 'icon_name' => 'after-effects'],
                    (object) ['id' => 3, 'name' => 'DaVinci Resolve', 'slug' => 'davinci-resolve', 'icon_name' => 'davinci'],
                    (object) ['id' => 4, 'name' => 'CapCut Pro', 'slug' => 'capcut', 'icon_name' => 'capcut'],
                    (object) ['id' => 5, 'name' => 'Figma', 'slug' => 'figma', 'icon_name' => 'figma'],
                ],
                'web_stack' => [
                    (object) ['id' => 7, 'name' => 'Laravel 13', 'slug' => 'laravel', 'icon_name' => 'laravel'],
                    (object) ['id' => 8, 'name' => 'React', 'slug' => 'react', 'icon_name' => 'react'],
                    (object) ['id' => 9, 'name' => 'Inertia.js', 'slug' => 'inertia', 'icon_name' => 'inertia'],
                    (object) ['id' => 10, 'name' => 'TypeScript', 'slug' => 'typescript', 'icon_name' => 'typescript'],
                    (object) ['id' => 11, 'name' => 'PostgreSQL', 'slug' => 'postgresql', 'icon_name' => 'postgresql'],
                    (object) ['id' => 12, 'name' => 'Tailwind CSS v4', 'slug' => 'tailwindcss', 'icon_name' => 'tailwindcss'],
                ],
                'general_tools' => [
                    (object) ['id' => 14, 'name' => 'Git & GitHub', 'slug' => 'git', 'icon_name' => 'git'],
                    (object) ['id' => 15, 'name' => 'Python', 'slug' => 'python', 'icon_name' => 'python'],
                    (object) ['id' => 16, 'name' => 'RESTful API', 'slug' => 'rest-api', 'icon_name' => 'api'],
                ],
            ];

            $projects = [
                (object) [
                    'id' => 1,
                    'category_id' => 1,
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
                    'extra_meta' => ['role' => 'Full-Stack Developer', 'year' => '2025'],
                    'is_featured' => true,
                    'category' => (object) ['name' => 'Web Development', 'slug' => 'web-development'],
                    'tools' => [
                        (object) ['id' => 7, 'name' => 'Laravel 13', 'slug' => 'laravel', 'icon_name' => 'laravel'],
                        (object) ['id' => 8, 'name' => 'React', 'slug' => 'react', 'icon_name' => 'react'],
                        (object) ['id' => 9, 'name' => 'Inertia.js', 'slug' => 'inertia', 'icon_name' => 'inertia'],
                        (object) ['id' => 11, 'name' => 'PostgreSQL', 'slug' => 'postgresql', 'icon_name' => 'postgresql'],
                    ],
                    'images' => [],
                ],
                (object) [
                    'id' => 2,
                    'category_id' => 2,
                    'title' => 'Cinematic Brand Teaser & Motion Graphic',
                    'slug' => 'cinematic-brand-teaser-showcase',
                    'custom_badge' => 'Komersial / Kreatif',
                    'summary' => 'Produksi video promosi berdurasi 60 detik dengan teknik kinetic typography, sound design dinamis, dan grading tone sinematik.',
                    'problem_statement' => 'Klien memerlukan video promosi yang mampu mempertahankan atensi audiens pada 5 detik pertama di platform media sosial vertikal dan horizontal.',
                    'solution' => 'Menerapkan pacing dinamis mengikuti ketukan instrumen, transisi masking yang mulus, serta visualisasi produk dengan motion graphic 2D/3D.',
                    'media_type' => 'video_embed',
                    'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    'thumbnail_path' => null,
                    'extra_meta' => ['duration' => '01:00', 'aspect_ratio' => '16:9 & 9:16', 'role' => 'Lead Video Editor & Sound Designer'],
                    'is_featured' => true,
                    'category' => (object) ['name' => 'Video Editing & Motion', 'slug' => 'video-editing'],
                    'tools' => [
                        (object) ['id' => 1, 'name' => 'Adobe Premiere Pro', 'slug' => 'premiere-pro', 'icon_name' => 'premiere'],
                        (object) ['id' => 2, 'name' => 'Adobe After Effects', 'slug' => 'after-effects', 'icon_name' => 'after-effects'],
                        (object) ['id' => 3, 'name' => 'DaVinci Resolve', 'slug' => 'davinci-resolve', 'icon_name' => 'davinci'],
                    ],
                    'images' => [],
                ],
                (object) [
                    'id' => 3,
                    'category_id' => 3,
                    'title' => 'Studi Kasus Optimasi Indeks Kueri Relasional',
                    'slug' => 'analisis-optimasi-indeks-kueri-database',
                    'custom_badge' => 'Studi Kasus & Riset',
                    'summary' => 'Analisis dan komparasi performa indeks B-Tree vs Hash pada dataset relasional berskala ratusan ribu entitas.',
                    'problem_statement' => 'Pencarian data multi-kondisi pada tabel transaksi besar menyebabkan lonjakan beban CPU dan waktu kueri di atas 2 detik.',
                    'solution' => 'Merancang arsitektur indeks komposit dan partisi tabel PostgreSQL sehingga latensi pencarian menurun drastis di bawah 30ms.',
                    'media_type' => 'image',
                    'thumbnail_path' => null,
                    'live_url' => null,
                    'github_url' => 'https://github.com/taufiqhidayat/database-benchmark',
                    'extra_meta' => ['academic_course' => 'Rekayasa Basis Data', 'semester' => 'Semester 6', 'metrics' => '98% Query Latency Reduction'],
                    'is_featured' => false,
                    'category' => (object) ['name' => 'Studi Kasus & Riset', 'slug' => 'case-studies'],
                    'tools' => [
                        (object) ['id' => 11, 'name' => 'PostgreSQL', 'slug' => 'postgresql', 'icon_name' => 'postgresql'],
                        (object) ['id' => 15, 'name' => 'Python', 'slug' => 'python', 'icon_name' => 'python'],
                    ],
                    'images' => [],
                ],
                (object) [
                    'id' => 4,
                    'category_id' => 2,
                    'title' => 'Dokumenter Pendek & Color Grading Showcase',
                    'slug' => 'mini-documentary-color-grading',
                    'custom_badge' => 'Color Grading',
                    'summary' => 'Koreksi warna dan grading emosional untuk rekaman outdoor dengan kondisi pencahayaan natural yang bervariasi.',
                    'problem_statement' => 'Footage dari kamera berbeda memiliki profil warna (gamma & gamut) yang saling bertabrakan antara sensor kamera.',
                    'solution' => 'Menggunakan Color Management di DaVinci Resolve untuk standarisasi color space dan grading kurva film look.',
                    'media_type' => 'video_embed',
                    'video_url' => 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
                    'thumbnail_path' => null,
                    'extra_meta' => ['duration' => '03:45', 'role' => 'Colorist & Offline Editor'],
                    'is_featured' => false,
                    'category' => (object) ['name' => 'Video Editing & Motion', 'slug' => 'video-editing'],
                    'tools' => [
                        (object) ['id' => 3, 'name' => 'DaVinci Resolve', 'slug' => 'davinci-resolve', 'icon_name' => 'davinci'],
                        (object) ['id' => 1, 'name' => 'Adobe Premiere Pro', 'slug' => 'premiere-pro', 'icon_name' => 'premiere'],
                    ],
                    'images' => [],
                ],
            ];
        }

        return Inertia::render('Welcome', [
            'profile' => $profile,
            'categories' => $categories,
            'projects' => $projects,
            'tools' => $tools,
        ]);
    }

    /**
     * Store an inquiry message from contact form.
     */
    public function submitInquiry(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:2500'],
        ]);

        Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? 'Pesan dari Portofolio',
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Pesan Anda berhasil dikirim. Terima kasih telah menghubungi saya.');
    }
}
