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
     * Transform raw YouTube, Playlist, Shorts, Vimeo, or Google Drive URLs into playable iframe embed URLs.
     */
    protected function embedUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                $rawUrl = $this->video_url;

                if (empty($rawUrl) && !empty($this->extra_meta['episodes'][0]['video_url'])) {
                    $rawUrl = $this->extra_meta['episodes'][0]['video_url'];
                }

                if (empty($rawUrl)) {
                    return null;
                }

                return self::convertVideoUrlToEmbed(trim($rawUrl));
            }
        );
    }

    public static function convertVideoUrlToEmbed(string $url): string
    {
        // Pure YouTube Playlist: https://www.youtube.com/playlist?list=PL...
        if (preg_match('/youtube\.com\/playlist\?.*list=([a-zA-Z0-9_-]+)/i', $url, $matches)) {
            return "https://www.youtube.com/embed/videoseries?list={$matches[1]}&rel=0";
        }

        // YouTube Watch/Shorts/Embed/youtu.be (optionally with &list=...)
        if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i', $url, $matches)) {
            $videoId = $matches[1];
            if (preg_match('/[?&]list=([a-zA-Z0-9_-]+)/i', $url, $listMatches)) {
                return "https://www.youtube.com/embed/{$videoId}?list={$listMatches[1]}&autoplay=1&rel=0";
            }
            return "https://www.youtube.com/embed/{$videoId}?autoplay=1&rel=0";
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
}
