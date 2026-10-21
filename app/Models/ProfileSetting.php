<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'headline',
        'bio',
        'avatar_path',
        'email',
        'phone',
        'location',
        'github_url',
        'linkedin_url',
        'youtube_url',
        'instagram_url',
        'resume_url',
        'is_available_for_work',
    ];

    protected $casts = [
        'is_available_for_work' => 'boolean',
    ];
}
