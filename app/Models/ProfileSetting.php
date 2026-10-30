<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

class ProfileSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'headline',
        'bio',
        'avatar_path',
        'phone',
        'location',
        'github_url',
        'linkedin_url',
        'instagram_url',
        'is_available_for_work',
    ];

    protected $casts = [
        'is_available_for_work' => 'boolean',
    ];

    /**
     * Automatically drop deprecated email, youtube_url, and resume_url columns from profile_settings if they still exist.
     */
    public static function dropDeprecatedColumnsIfNeeded(): void
    {
        $cacheKey = 'profile_settings_cols_dropped_v2';

        try {
            if (Cache::get($cacheKey)) {
                return;
            }
        } catch (\Throwable $e) {
            // Ignore cache read error
        }

        try {
            if (Schema::hasTable('profile_settings')) {
                $columnsToDrop = [];
                foreach (['email', 'youtube_url', 'resume_url'] as $col) {
                    if (Schema::hasColumn('profile_settings', $col)) {
                        $columnsToDrop[] = $col;
                    }
                }

                if (!empty($columnsToDrop)) {
                    Schema::table('profile_settings', function (Blueprint $table) use ($columnsToDrop) {
                        $table->dropColumn($columnsToDrop);
                    });
                }

                Cache::forever($cacheKey, true);
            }
        } catch (\Throwable $e) {
            report($e);
        }
    }
}
