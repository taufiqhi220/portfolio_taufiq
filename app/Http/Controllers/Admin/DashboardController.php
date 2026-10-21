<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\ToolStack;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_projects' => Project::count(),
            'total_categories' => Category::count(),
            'total_tools' => ToolStack::count(),
            'unread_inquiries' => Inquiry::where('is_read', false)->count(),
        ];

        $recentProjects = Project::with('category')
            ->latest()
            ->take(5)
            ->get();

        $recentInquiries = Inquiry::latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentProjects' => $recentProjects,
            'recentInquiries' => $recentInquiries,
        ]);
    }
}
