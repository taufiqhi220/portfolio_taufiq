<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_tool', function (Blueprint $table) {
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignId('tool_stack_id')->constrained('tools_stacks')->onDelete('cascade');
            $table->primary(['project_id', 'tool_stack_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_tool');
    }
};
