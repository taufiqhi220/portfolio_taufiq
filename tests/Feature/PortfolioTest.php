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

    public function test_uploaded_media_persists_in_database_and_serves_when_local_disk_is_cleared(): void
    {
        \Illuminate\Support\Facades\Storage::fake('public');
        $user = User::first() ?? User::factory()->create();

        $svgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
        $file = \Illuminate\Http\UploadedFile::fake()->createWithContent('custom-logo.svg', $svgContent);

        $response = $this->actingAs($user)->post('/admin/tools', [
            'name' => 'Custom SVG Tool',
            'group_type' => 'web_stack',
            'icon_file' => $file,
        ]);

        $response->assertRedirect('/admin/tools');

        $tool = \App\Models\ToolStack::where('name', 'Custom SVG Tool')->first();
        $this->assertNotNull($tool);
        $this->assertStringStartsWith('/storage/tools/', $tool->icon_name);

        // Simulate Vercel serverless ephemeral /tmp eviction by deleting the physical file on disk
        $relativePath = ltrim(substr($tool->icon_name, strlen('/storage/')), '/');
        \Illuminate\Support\Facades\Storage::disk('public')->delete($relativePath);

        // Request the file via /storage/{path} route; it should still be served from PostgreSQL/DB cache
        $serveResponse = $this->get($tool->icon_name);
        $serveResponse->assertStatus(200);
        $this->assertEquals($svgContent, $serveResponse->getContent());
    }

    public function test_youtube_playlist_resolves_episodes_and_embed_url(): void
    {
        \Illuminate\Support\Facades\Http::fake([
            'https://www.youtube.com/playlist*' => \Illuminate\Support\Facades\Http::response(
                '<script>var ytInitialData = {"contents":{"twoColumnBrowseResultsRenderer":{"tabs":[{"tabRenderer":{"content":{"sectionListRenderer":{"contents":[{"itemSectionRenderer":{"contents":[{"lockupViewModel":{"contentId":"dIvwUxv8yHc","metadata":{"lockupMetadataViewModel":{"title":{"content":"USTD GAUL EPS 26"}}},"contentImage":{"thumbnailViewModel":{"overlays":[{"thumbnailBottomOverlayViewModel":{"badges":[{"thumbnailBadgeViewModel":{"text":"1.02.25"}}]}}]}}}},{"lockupViewModel":{"contentId":"w49GDj_e4bw","metadata":{"lockupMetadataViewModel":{"title":{"content":"USTD GAUL EPS 27"}}},"contentImage":{"thumbnailViewModel":{"overlays":[{"thumbnailBottomOverlayViewModel":{"badges":[{"thumbnailBadgeViewModel":{"text":"55.41"}}]}}]}}}}]}}]}}}}]}}};</script>',
                200
            ),
        ]);

        $category = Category::first() ?? Category::create([
            'name' => 'Video Editing & Motion',
            'slug' => 'video-editing',
            'display_mode' => 'video',
            'sort_order' => 1,
        ]);
        $project = Project::create([
            'category_id' => $category->id,
            'title' => 'Ustad Gaul Season 3',
            'slug' => 'ustad-gaul-season-3',
            'summary' => 'Program televisi Ustad Gaul.',
            'media_type' => 'video_embed',
            'video_url' => 'https://youtube.com/playlist?list=PL0S65_4EEcXDElr4VC_z_A04rr9X27NxW',
            'extra_meta' => ['aspect_ratio' => '16:9'],
        ]);

        $project->resolvePlaylistIfNeeded();

        $this->assertCount(2, $project->extra_meta['episodes']);
        $this->assertEquals('USTD GAUL EPS 26', $project->extra_meta['episodes'][0]['title']);
        $this->assertEquals('https://www.youtube.com/watch?v=dIvwUxv8yHc', $project->extra_meta['episodes'][0]['video_url']);
        $this->assertEquals('1:02:25', $project->extra_meta['episodes'][0]['duration']);
        $this->assertEquals('https://www.youtube.com/embed/dIvwUxv8yHc?autoplay=1&rel=0', $project->embed_url);
    }
}
