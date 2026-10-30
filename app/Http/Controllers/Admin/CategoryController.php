<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::withCount('projects')
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'slug' => ['nullable', 'string', 'max:100', 'unique:categories,slug'],
            'description' => ['nullable', 'string', 'max:255'],
            'display_mode' => ['required', 'in:web,video,case_study'],
            'sort_order' => ['integer'],
        ]);

        Category::create([
            'name' => $validated['name'],
            'slug' => !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'display_mode' => $validated['display_mode'],
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => true,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Kategori baru berhasil ditambahkan.');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'slug' => ['nullable', 'string', 'max:100', 'unique:categories,slug,' . $category->id],
            'description' => ['nullable', 'string', 'max:255'],
            'display_mode' => ['required', 'in:web,video,case_study'],
            'sort_order' => ['integer'],
            'is_active' => ['boolean'],
        ]);

        $category->update([
            'name' => $validated['name'],
            'slug' => !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'display_mode' => $validated['display_mode'],
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Request $request, $category)
    {
        $model = $category instanceof Category
            ? $category
            : (Category::find($category) ?? Category::where('slug', $category)->first());

        if (! $model) {
            return redirect()->route('admin.categories.index')->with('warning', 'Kategori tidak ditemukan atau sudah dihapus sebelumnya.');
        }

        if ($model->projects()->count() > 0) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki proyek terkait.');
        }

        $model->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
