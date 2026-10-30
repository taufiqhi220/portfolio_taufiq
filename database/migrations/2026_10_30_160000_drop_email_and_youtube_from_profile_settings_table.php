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
            if (Schema::hasColumn('profile_settings', 'email')) {
                $columnsToDrop[] = 'email';
            }
            if (Schema::hasColumn('profile_settings', 'youtube_url')) {
                $columnsToDrop[] = 'youtube_url';
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
