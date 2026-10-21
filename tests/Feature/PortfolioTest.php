<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;
    public function test_portfolio_home_page_is_accessible(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_contact_inquiry_can_be_submitted(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'subject' => 'Diskusi Proyek Web Development',
            'message' => 'Halo Taufiq, saya berminat membuat website untuk perusahaan kami.',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('inquiries', [
            'email' => 'budi@example.com',
            'name' => 'Budi Santoso',
        ]);
    }

    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    public function test_admin_can_access_dashboard_and_projects(): void
    {
        $user = User::first() ?? User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertStatus(200);

        $projectsResponse = $this->actingAs($user)->get('/admin/projects');
        $projectsResponse->assertStatus(200);
    }
}
