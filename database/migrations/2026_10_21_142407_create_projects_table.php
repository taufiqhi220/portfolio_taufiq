<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('custom_badge')->nullable(); // e.g. "Tugas Akhir", "Freelance", "Komersial"
            $table->text('summary');
            $table->longText('description')->nullable();
            $table->text('problem_statement')->nullable();
            $table->text('solution')->nullable();
            $table->string('media_type')->default('image'); // 'image', 'video_embed', 'video_file'
            $table->string('video_url')->nullable(); // YouTube, Google Drive, Vimeo, MP4
            $table->string('thumbnail_path')->nullable();
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->json('extra_meta')->nullable(); // Custom attributes (client, course name, video duration, etc.)
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
