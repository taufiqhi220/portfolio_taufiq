<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
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
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('profile_settings')) {
            Schema::table('profile_settings', function (Blueprint $table) {
                if (!Schema::hasColumn('profile_settings', 'email')) {
                    $table->string('email')->nullable();
                }
                if (!Schema::hasColumn('profile_settings', 'youtube_url')) {
                    $table->string('youtube_url')->nullable();
                }
            });
        }
    }
};

