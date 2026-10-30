<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

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
                $firstEpisodeUrl = $this->extra_meta['episodes'][0]['video_url'] ?? null;

                if (!empty($firstEpisodeUrl) && (empty($rawUrl) || preg_match('/youtube\.com\/playlist\?/i', (string) $rawUrl))) {
                    $rawUrl = $firstEpisodeUrl;
                }

                if (empty($rawUrl)) {
                    return null;
                }

                return self::convertVideoUrlToEmbed(trim((string) $rawUrl));
            }
        );
    }

    /**
     * Automatically populate extra_meta.episodes from a YouTube playlist URL if episodes are not yet stored.
     */
    public function resolvePlaylistIfNeeded(): self
    {
        $rawUrl = trim((string) ($this->video_url ?? ''));
        if ($rawUrl === '') {
            return $this;
        }

        if (!empty($this->extra_meta['episodes']) && is_array($this->extra_meta['episodes'])) {
            return $this;
        }

        if (preg_match('/youtube\.com\/playlist\?.*list=([a-zA-Z0-9_-]+)/i', $rawUrl, $matches)) {
            $episodes = self::fetchYouTubePlaylistEpisodes($matches[1]);
            if (!empty($episodes)) {
                $meta = is_array($this->extra_meta) ? $this->extra_meta : [];
                $meta['episodes'] = $episodes;
                $this->extra_meta = $meta;

                if ($this->exists) {
                    try {
                        $this->saveQuietly();
                    } catch (\Throwable $e) {
                        report($e);
                    }
                }
            }
        }

        return $this;
    }

    /**
     * Fetch video items (title, watch URL, duration) from a public or unlisted YouTube playlist.
     *
     * @return array<int, array{title: string, video_url: string, duration: string|null}>
     */
    public static function fetchYouTubePlaylistEpisodes(string $playlistIdOrUrl): array
    {
        $playlistId = $playlistIdOrUrl;
        if (preg_match('/list=([a-zA-Z0-9_-]+)/i', $playlistIdOrUrl, $matches)) {
            $playlistId = $matches[1];
        }
        $playlistId = trim($playlistId);
        if ($playlistId === '') {
            return [];
        }

        $cacheKey = "yt_playlist_v1:{$playlistId}";
        try {
            $cached = Cache::get($cacheKey);
            if (is_array($cached) && !empty($cached)) {
                return $cached;
            }
        } catch (\Throwable $e) {
            // Ignore cache read failure
        }

        try {
            $response = Http::timeout(8)
                ->withoutVerifying()
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                    'Accept-Language' => 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                ])
                ->get("https://www.youtube.com/playlist?list={$playlistId}");

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $episodes = [];

            if (preg_match('/var ytInitialData = (\{.*?\});<\/script>/s', $html, $m)) {
                $data = json_decode($m[1], true);
                $contents = $data['contents']['twoColumnBrowseResultsRenderer']['tabs'][0]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'] ?? [];

                foreach ($contents as $item) {
                    if (isset($item['lockupViewModel'])) {
                        $vm = $item['lockupViewModel'];
                        $vid = $vm['contentId'] ?? null;
                        $title = $vm['metadata']['lockupMetadataViewModel']['title']['content'] ?? null;
                        $duration = $vm['contentImage']['thumbnailViewModel']['overlays'][0]['thumbnailBottomOverlayViewModel']['badges'][0]['thumbnailBadgeViewModel']['text'] ?? null;

                        if (!empty($vid) && is_string($vid)) {
                            $episodes[] = [
                                'title' => !empty($title) ? $title : 'Episode ' . (count($episodes) + 1),
                                'video_url' => "https://www.youtube.com/watch?v={$vid}",
                                'duration' => is_string($duration) ? str_replace('.', ':', $duration) : null,
                            ];
                        }
                    } elseif (isset($item['playlistVideoListRenderer']['contents']) && is_array($item['playlistVideoListRenderer']['contents'])) {
                        foreach ($item['playlistVideoListRenderer']['contents'] as $sub) {
                            $r = $sub['playlistVideoRenderer'] ?? null;
                            if ($r && !empty($r['videoId'])) {
                                $vid = $r['videoId'];
                                $title = $r['title']['runs'][0]['text']
                                    ?? ($r['title']['simpleText'] ?? ('Episode ' . (count($episodes) + 1)));
                                $duration = $r['lengthText']['simpleText'] ?? null;

                                $episodes[] = [
                                    'title' => $title,
                                    'video_url' => "https://www.youtube.com/watch?v={$vid}",
                                    'duration' => is_string($duration) ? str_replace('.', ':', $duration) : null,
                                ];
                            }
                        }
                    }
                }
            }

            if (empty($episodes) && preg_match_all('/"videoId":"([a-zA-Z0-9_-]{11})"/', $html, $vidMatches)) {
                $uniqueIds = array_values(array_unique($vidMatches[1]));
                foreach ($uniqueIds as $idx => $vid) {
                    $episodes[] = [
                        'title' => 'Episode ' . ($idx + 1),
                        'video_url' => "https://www.youtube.com/watch?v={$vid}",
                        'duration' => null,
                    ];
                }
            }

            if (!empty($episodes)) {
                try {
                    Cache::put($cacheKey, $episodes, now()->addDays(7));
                } catch (\Throwable $e) {
                    // Ignore cache write failure
                }
            }

            return $episodes;
        } catch (\Throwable $e) {
            report($e);
            return [];
        }
    }

    public static function convertVideoUrlToEmbed(string $url): string
    {
        // Pure YouTube Playlist: https://www.youtube.com/playlist?list=PL...
        if (preg_match('/youtube\.com\/playlist\?.*list=([a-zA-Z0-9_-]+)/i', $url, $matches)) {
            $episodes = self::fetchYouTubePlaylistEpisodes($matches[1]);
            if (!empty($episodes[0]['video_url'])) {
                return self::convertVideoUrlToEmbed($episodes[0]['video_url']);
            }
            return "https://www.youtube.com/embed/videoseries?list={$matches[1]}&rel=0";
        }

        // YouTube Watch/Shorts/Embed/youtu.be (do not pass &list=PL... because Unlisted playlists fail in YouTube's iframe player)
        if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i', $url, $matches)) {
            $videoId = $matches[1];
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
