<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'custom_badge',
        'summary',
        'description',
        'problem_statement',
        'solution',
        'media_type',
        'video_url',
        'thumbnail_path',
        'live_url',
        'github_url',
        'extra_meta',
        'is_featured',
        'sort_order',
        'published_at',
    ];

    protected $casts = [
        'extra_meta' => 'array',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
        'published_at' => 'datetime',
    ];

    protected $appends = [
        'embed_url',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tools(): BelongsToMany
    {
        return $this->belongsToMany(ToolStack::class, 'project_tool');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('sort_order', 'asc');
    }

    /**
     * Transform raw YouTube or Google Drive URLs into playable iframe embed URLs
     */
    protected function embedUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (empty($this->video_url)) {
                    return null;
                }

                $url = trim($this->video_url);

                // YouTube: https://www.youtube.com/watch?v=ID or https://youtu.be/ID
                if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i', $url, $matches)) {
                    return "https://www.youtube.com/embed/{$matches[1]}?autoplay=1&rel=0";
                }

                // Google Drive: https://drive.google.com/file/d/FILE_ID/view...
                if (preg_match('/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i', $url, $matches)) {
                    return "https://drive.google.com/file/d/{$matches[1]}/preview";
                }

                // Vimeo: https://vimeo.com/ID
                if (preg_match('/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i', $url, $matches)) {
                    return "https://player.vimeo.com/video/{$matches[3]}?autoplay=1";
                }

                return $url;
            }
        );
    }
}
