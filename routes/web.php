<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/contact', [PortfolioController::class, 'submitInquiry'])->name('contact.submit');

// Serve uploaded storage files directly on serverless hosting
Route::get('/storage/{path}', function (string $path) {
    $filePath = storage_path('app/public/' . $path);
    if (!file_exists($filePath)) {
        abort(404);
    }
    return response()->file($filePath);
})->where('path', '.*')->name('storage.local');

// Admin Protected Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin Resource Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('projects', ProjectController::class);
        Route::post('projects/{project}/delete', [ProjectController::class, 'destroy'])->name('projects.destroy.post');
        Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
        Route::post('categories/{category}/delete', [CategoryController::class, 'destroy'])->name('categories.destroy.post');
        Route::resource('tools', \App\Http\Controllers\Admin\ToolStackController::class)->except(['create', 'show', 'edit']);
        Route::post('tools/{tool}/delete', [\App\Http\Controllers\Admin\ToolStackController::class, 'destroy'])->name('tools.destroy.post');

        // Inquiries
        Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
        Route::patch('inquiries/{inquiry}/toggle-read', [InquiryController::class, 'toggleRead'])->name('inquiries.toggleRead');
        Route::delete('inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');

        // Portfolio Profile Settings
        Route::get('profile-settings', [\App\Http\Controllers\Admin\ProfileSettingController::class, 'edit'])->name('profileSettings.edit');
        Route::put('profile-settings', [\App\Http\Controllers\Admin\ProfileSettingController::class, 'update'])->name('profileSettings.update');
    });

    // User Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

