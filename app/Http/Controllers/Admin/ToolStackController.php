<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ToolStack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ToolStackController extends Controller
{
    /**
     * Display a listing of all tech stack tools.
     */
    public function index(): Response
    {
        $tools = ToolStack::withCount('projects')
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc')
            ->get();

        return Inertia::render('Admin/Tools/Index', [
            'tools' => $tools,
        ]);
    }

    /**
     * Store a newly created tech stack tool.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'slug' => ['nullable', 'string', 'max:100', 'unique:tools_stacks,slug'],
            'group_type' => ['required', 'in:creative_software,web_stack,general_tools'],
            'sort_order' => ['nullable', 'integer'],
            'icon_file' => ['nullable', 'file', 'mimes:png,jpg,jpeg,svg,webp', 'max:5120'],
            'icon_url_input' => ['nullable', 'string', 'max:500'],
        ]);

        $iconName = null;

        if ($request->hasFile('icon_file')) {
            $path = $request->file('icon_file')->store('tools', 'public');
            $iconName = '/storage/' . $path;
        } elseif (!empty($validated['icon_url_input'])) {
            $iconName = trim($validated['icon_url_input']);
        }

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['name']);

        ToolStack::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'group_type' => $validated['group_type'],
            'icon_name' => $iconName,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.tools.index')->with('success', 'Tech stack berhasil ditambahkan.');
    }

    /**
     * Update the specified tech stack tool.
     */
    public function update(Request $request, ToolStack $tool)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'slug' => ['nullable', 'string', 'max:100', 'unique:tools_stacks,slug,' . $tool->id],
            'group_type' => ['required', 'in:creative_software,web_stack,general_tools'],
            'sort_order' => ['nullable', 'integer'],
            'icon_file' => ['nullable', 'file', 'mimes:png,jpg,jpeg,svg,webp', 'max:5120'],
            'icon_url_input' => ['nullable', 'string', 'max:500'],
            'remove_icon' => ['nullable', 'boolean'],
        ]);

        $iconName = $tool->icon_name;

        if (!empty($validated['remove_icon'])) {
            if ($tool->icon_name && str_starts_with($tool->icon_name, '/storage/tools/')) {
                $relativeStoragePath = str_replace('/storage/', '', $tool->icon_name);
                Storage::disk('public')->delete($relativeStoragePath);
            }
            $iconName = null;
        } elseif ($request->hasFile('icon_file')) {
            if ($tool->icon_name && str_starts_with($tool->icon_name, '/storage/tools/')) {
                $relativeStoragePath = str_replace('/storage/', '', $tool->icon_name);
                Storage::disk('public')->delete($relativeStoragePath);
            }
            $path = $request->file('icon_file')->store('tools', 'public');
            $iconName = '/storage/' . $path;
        } elseif (isset($validated['icon_url_input']) && trim($validated['icon_url_input']) !== '') {
            $iconName = trim($validated['icon_url_input']);
        }

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['name']);

        $tool->update([
            'name' => $validated['name'],
            'slug' => $slug,
            'group_type' => $validated['group_type'],
            'icon_name' => $iconName,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.tools.index')->with('success', 'Tech stack berhasil diperbarui.');
    }

    /**
     * Remove the specified tech stack tool.
     */
    public function destroy(Request $request, $tool)
    {
        $model = $tool instanceof ToolStack
            ? $tool
            : (ToolStack::find($tool) ?? ToolStack::where('slug', $tool)->first());

        if (! $model) {
            return redirect()->route('admin.tools.index')->with('warning', 'Tech stack tidak ditemukan atau sudah dihapus sebelumnya.');
        }

        $model->projects()->detach();
        $model->delete();

        return redirect()->route('admin.tools.index')->with('success', 'Tech stack berhasil dihapus.');
    }
}
