<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\ToolStack;
use App\Support\MediaStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with(['category', 'tools', 'images'])
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::orderBy('sort_order', 'asc')->get();
        $tools = ToolStack::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Admin/Projects/Create', [
            'categories' => $categories,
            'tools' => $tools,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:200'],
            'slug' => ['nullable', 'string', 'max:200', 'unique:projects,slug'],
            'custom_badge' => ['nullable', 'string', 'max:50'],
            'summary' => ['required', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'problem_statement' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'media_type' => ['required', 'in:image,video_embed,video_file'],
            'video_url' => ['nullable', 'string', 'max:500'],
            'thumbnail_file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,gif,svg,bmp,avif', 'max:10240'],
            'thumbnail_url' => ['nullable', 'string', 'max:500'],
            'live_url' => ['nullable', 'string', 'max:500'],
            'github_url' => ['nullable', 'string', 'max:500'],
            'extra_meta' => ['nullable', 'array'],
            'is_featured' => ['boolean'],
            'sort_order' => ['integer'],
            'tool_ids' => ['array'],
            'tool_ids.*' => ['exists:tools_stacks,id'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,gif,svg,bmp,avif', 'max:10240'],
            'gallery_urls' => ['nullable', 'array'],
            'gallery_urls.*' => ['nullable', 'string', 'max:500'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Handle thumbnail upload or direct URL
        $thumbnailPath = $validated['thumbnail_url'] ?? null;
        if ($request->hasFile('thumbnail_file') && $request->file('thumbnail_file')->isValid()) {
            $thumbnailPath = MediaStorage::store($request->file('thumbnail_file'), 'thumbnails');
        }

        $project = Project::create([
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => $slug,
            'custom_badge' => $validated['custom_badge'] ?? null,
            'summary' => $validated['summary'],
            'description' => $validated['description'] ?? null,
            'problem_statement' => $validated['problem_statement'] ?? null,
            'solution' => $validated['solution'] ?? null,
            'media_type' => $validated['media_type'],
            'video_url' => $validated['video_url'] ?? null,
            'thumbnail_path' => $thumbnailPath,
            'live_url' => $validated['live_url'] ?? null,
            'github_url' => $validated['github_url'] ?? null,
            'extra_meta' => $validated['extra_meta'] ?? null,
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        if (!empty($validated['tool_ids'])) {
            $project->tools()->sync($validated['tool_ids']);
        }

        // Process gallery image uploads
        $imageOrder = 0;
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                if ($file && $file->isValid()) {
                    $storedPath = MediaStorage::store($file, 'gallery');
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_path' => $storedPath,
                        'sort_order' => $imageOrder++,
                    ]);
                }
            }
        }

        // Process direct gallery image URLs
        if (!empty($validated['gallery_urls'])) {
            foreach ($validated['gallery_urls'] as $url) {
                if (!empty(trim($url))) {
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_path' => trim($url),
                        'sort_order' => $imageOrder++,
                    ]);
                }
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil ditambahkan.');
    }

    public function edit(Project $project): Response
    {
        $project->load(['category', 'tools', 'images']);
        $categories = Category::orderBy('sort_order', 'asc')->get();
        $tools = ToolStack::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'categories' => $categories,
            'tools' => $tools,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:200'],
            'slug' => ['nullable', 'string', 'max:200', 'unique:projects,slug,' . $project->id],
            'custom_badge' => ['nullable', 'string', 'max:50'],
            'summary' => ['required', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'problem_statement' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'media_type' => ['required', 'in:image,video_embed,video_file'],
            'video_url' => ['nullable', 'string', 'max:500'],
            'thumbnail_file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,gif,svg,bmp,avif', 'max:10240'],
            'thumbnail_url' => ['nullable', 'string', 'max:500'],
            'live_url' => ['nullable', 'string', 'max:500'],
            'github_url' => ['nullable', 'string', 'max:500'],
            'extra_meta' => ['nullable', 'array'],
            'is_featured' => ['boolean'],
            'sort_order' => ['integer'],
            'tool_ids' => ['array'],
            'tool_ids.*' => ['exists:tools_stacks,id'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,gif,svg,bmp,avif', 'max:10240'],
            'gallery_urls' => ['nullable', 'array'],
            'gallery_urls.*' => ['nullable', 'string', 'max:500'],
            'deleted_image_ids' => ['nullable', 'array'],
            'deleted_image_ids.*' => ['integer'],
        ]);

        $thumbnailPath = $project->thumbnail_path;
        if ($request->hasFile('thumbnail_file') && $request->file('thumbnail_file')->isValid()) {
            MediaStorage::delete($project->thumbnail_path);
            $thumbnailPath = MediaStorage::store($request->file('thumbnail_file'), 'thumbnails');
        } elseif (isset($validated['thumbnail_url']) && !empty($validated['thumbnail_url'])) {
            $thumbnailPath = $validated['thumbnail_url'];
        }

        $project->update([
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['title']),
            'custom_badge' => $validated['custom_badge'] ?? null,
            'summary' => $validated['summary'],
            'description' => $validated['description'] ?? null,
            'problem_statement' => $validated['problem_statement'] ?? null,
            'solution' => $validated['solution'] ?? null,
            'media_type' => $validated['media_type'],
            'video_url' => $validated['video_url'] ?? null,
            'thumbnail_path' => $thumbnailPath,
            'live_url' => $validated['live_url'] ?? null,
            'github_url' => $validated['github_url'] ?? null,
            'extra_meta' => $validated['extra_meta'] ?? null,
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        if (isset($validated['tool_ids'])) {
            $project->tools()->sync($validated['tool_ids']);
        }

        // Delete requested gallery images
        if (!empty($validated['deleted_image_ids'])) {
            $imagesToDelete = ProjectImage::where('project_id', $project->id)
                ->whereIn('id', $validated['deleted_image_ids'])
                ->get();

            foreach ($imagesToDelete as $img) {
                MediaStorage::delete($img->image_path);
                $img->delete();
            }
        }

        // Current max sort order for existing images
        $maxOrder = $project->images()->max('sort_order') ?? 0;
        $nextOrder = $maxOrder + 1;

        // Process new gallery image uploads
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                if ($file && $file->isValid()) {
                    $storedPath = MediaStorage::store($file, 'gallery');
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_path' => $storedPath,
                        'sort_order' => $nextOrder++,
                    ]);
                }
            }
        }

        // Process new direct gallery URLs
        if (!empty($validated['gallery_urls'])) {
            foreach ($validated['gallery_urls'] as $url) {
                if (!empty(trim($url))) {
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_path' => trim($url),
                        'sort_order' => $nextOrder++,
                    ]);
                }
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil diperbarui.');
    }

    public function destroy(Request $request, $project)
    {
        $model = $project instanceof Project
            ? $project
            : (Project::find($project) ?? Project::where('slug', $project)->first());

        if (! $model) {
            return redirect()->route('admin.projects.index')->with('warning', 'Proyek tidak ditemukan atau telah dihapus sebelumnya.');
        }

        MediaStorage::delete($model->thumbnail_path);
        foreach ($model->images as $img) {
            MediaStorage::delete($img->image_path);
        }

        $model->tools()->detach();
        $model->images()->delete();
        $model->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil dihapus.');
    }
}
