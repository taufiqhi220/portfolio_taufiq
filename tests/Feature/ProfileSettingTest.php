<?php

namespace Tests\Feature;

use App\Models\ProfileSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileSettingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_profile_settings(): void
    {
        $response = $this->get(route('admin.profileSettings.edit'));
        $response->assertRedirect(route('login'));
    }

    public function test_admin_can_view_and_update_profile_settings(): void
    {
        $admin = User::factory()->create();

        $response = $this->actingAs($admin)->get(route('admin.profileSettings.edit'));
        $response->assertStatus(200);

        $updateResponse = $this->actingAs($admin)->put(route('admin.profileSettings.update'), [
            'full_name' => 'Taufiq Hidayat',
            'headline' => 'Web Developer & Video Editor',
            'location' => 'Indonesia (WITA / UTC+8)',
            'bio' => 'Custom bio text written directly by user.',
            'github_url' => 'https://github.com/taufiqhi220',
            'is_available_for_work' => true,
        ]);

        $updateResponse->assertSessionHas('success');
        $this->assertDatabaseHas('profile_settings', [
            'location' => 'Indonesia (WITA / UTC+8)',
            'bio' => 'Custom bio text written directly by user.',
            'github_url' => 'https://github.com/taufiqhi220',
        ]);
    }
}
