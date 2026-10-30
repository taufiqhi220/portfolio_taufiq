<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileSettingController extends Controller
{
    public function edit(): Response
    {
        ProfileSetting::dropDeprecatedColumnsIfNeeded();

        $profile = ProfileSetting::firstOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Taufiq Hidayat',
                'headline' => 'Web Developer & Video Editor',
                'location' => 'Indonesia (WITA / UTC+8)',
                'bio' => 'Mengembangkan aplikasi web dengan Laravel & React, serta mengerjakan editing video dan motion graphic.',
                'is_available_for_work' => true,
            ]
        );

        return Inertia::render('Admin/Profile/Edit', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        ProfileSetting::dropDeprecatedColumnsIfNeeded();

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'headline' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'github_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'resume_url' => 'nullable|string|max:500',
            'is_available_for_work' => 'boolean',
        ]);

        $profile = ProfileSetting::firstOrCreate(['id' => 1]);
        $profile->update($validated);

        return redirect()->back()->with('success', 'Pengaturan profil berhasil diperbarui.');
    }
}
