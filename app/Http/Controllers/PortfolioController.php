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
        $profile = ProfileSetting::first() ?? new ProfileSetting([
            'full_name' => 'Taufiq Hidayat',
            'headline' => 'Full-Stack Web Developer & Creative Video Editor',
            'bio' => 'Memadukan ketelitian rekayasa perangkat lunak dengan kepekaan visual storytelling multimedia.',
            'is_available_for_work' => true,
        ]);

        $categories = Category::where('is_active', true)
            ->withCount('projects')
            ->orderBy('sort_order', 'asc')
            ->get();

        $projects = Project::with(['category', 'tools'])
            ->orderBy('is_featured', 'desc')
            ->orderBy('sort_order', 'asc')
            ->get();

        $tools = ToolStack::orderBy('sort_order', 'asc')
            ->get()
            ->groupBy('group_type');

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
