<?php

namespace App\Models;

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

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_tool');
    }
}
