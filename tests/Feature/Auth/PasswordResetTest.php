<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_reset_password_link_screen_is_disabled(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(404);
    }

    public function test_reset_password_link_cannot_be_requested(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/forgot-password', ['email' => $user->email]);

        $response->assertStatus(404);
    }

    public function test_reset_password_screen_is_disabled(): void
    {
        $response = $this->get('/reset-password/test-token');

        $response->assertStatus(404);
    }

    public function test_password_cannot_be_reset_publicly(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/reset-password', [
            'token' => 'test-token',
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(404);
    }
}
