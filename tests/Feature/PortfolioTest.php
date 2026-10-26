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

    public function test_admin_can_create_project_with_gallery_and_metadata(): void
    {
        $user = User::first() ?? User::factory()->create();
        $category = Category::first() ?? Category::create([
            'name' => 'Web Development',
            'slug' => 'web-development',
            'display_mode' => 'web',
            'sort_order' => 1,
        ]);

        $response = $this->actingAs($user)->post('/admin/projects', [
            'category_id' => $category->id,
            'title' => 'E-Commerce Skala Enterprise',
            'summary' => 'Platform toko online dengan sistem microservices.',
            'media_type' => 'image',
            'extra_meta' => [
                'figma_url' => 'https://figma.com/proto/test',
                'docs_url' => 'https://drive.google.com/file/d/test/view',
                'aspect_ratio' => '16:9',
                'client_name' => 'PT Nusantara Maju',
                'role' => 'Full-Stack Engineer',
            ],
            'gallery_urls' => [
                'https://example.com/screenshot1.png',
                'https://example.com/screenshot2.png',
            ],
        ]);

        $response->assertRedirect('/admin/projects');
        $this->assertDatabaseHas('projects', [
            'title' => 'E-Commerce Skala Enterprise',
        ]);

        $project = Project::where('title', 'E-Commerce Skala Enterprise')->first();
        $this->assertNotNull($project);
        $this->assertEquals('PT Nusantara Maju', $project->extra_meta['client_name']);
        $this->assertCount(2, $project->images);
    }

    public function test_admin_can_update_project_and_delete_gallery_image(): void
    {
        $user = User::first() ?? User::factory()->create();
        $category = Category::first() ?? Category::create([
            'name' => 'Web Development',
            'slug' => 'web-development',
            'display_mode' => 'web',
            'sort_order' => 1,
        ]);

        $project = Project::create([
            'category_id' => $category->id,
            'title' => 'Proyek Uji Coba',
            'slug' => 'proyek-uji-coba',
            'summary' => 'Ringkasan uji coba.',
            'media_type' => 'image',
        ]);

        $img1 = \App\Models\ProjectImage::create([
            'project_id' => $project->id,
            'image_path' => 'https://example.com/img1.png',
            'sort_order' => 0,
        ]);

        $img2 = \App\Models\ProjectImage::create([
            'project_id' => $project->id,
            'image_path' => 'https://example.com/img2.png',
            'sort_order' => 1,
        ]);

        $response = $this->actingAs($user)->put("/admin/projects/{$project->id}", [
            'category_id' => $category->id,
            'title' => 'Proyek Uji Coba Diperbarui',
            'summary' => 'Ringkasan yang diperbarui.',
            'media_type' => 'image',
            'deleted_image_ids' => [$img1->id],
            'gallery_urls' => ['https://example.com/img3.png'],
        ]);

        $response->assertRedirect('/admin/projects');
        $this->assertDatabaseMissing('project_images', ['id' => $img1->id]);
        $this->assertDatabaseHas('project_images', ['id' => $img2->id]);
        $this->assertCount(2, $project->fresh()->images);
    }
}
