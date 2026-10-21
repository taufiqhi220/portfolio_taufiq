<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ToolStack extends Model
{
    use HasFactory;

    protected $table = 'tools_stacks';

    protected $fillable = [
        'name',
        'slug',
        'group_type',
        'icon_name',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'icon_url',
    ];

    /**
     * Provide full accessible URL if icon_name is a stored file or external URL
     */
    protected function iconUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->icon_name) {
                    return null;
                }
                // Handle legacy stored URL containing portfolio_taufiq.test
                if (str_contains($this->icon_name, 'portfolio_taufiq.test/storage/')) {
                    $rel = strstr($this->icon_name, 'storage/');
                    return '/' . ltrim($rel, '/');
                }
                if (str_starts_with($this->icon_name, 'http://') || str_starts_with($this->icon_name, 'https://')) {
                    return $this->icon_name;
                }
                if (str_starts_with($this->icon_name, '/storage/') || str_starts_with($this->icon_name, 'storage/')) {
                    return '/' . ltrim($this->icon_name, '/');
                }
                if (file_exists(public_path(ltrim($this->icon_name, '/')))) {
                    return '/' . ltrim($this->icon_name, '/');
                }
                return null;
            }
        );
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_tool');
    }
}
