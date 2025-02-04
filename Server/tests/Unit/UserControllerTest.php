<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_destroy()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_update_role()
    {
        $user = User::factory()->create();

        $response = $this->putJson("/api/users/{$user->id}/role", [
            'role_id' => 2,
        ]);

        $response->assertStatus(200);
        $this->assertEquals(2, $user->fresh()->role_id);
    }

    public function test_become_seller()
    {
        $user = User::factory()->create(['role_id' => 1]);

        $response = $this->postJson("/api/users/become-seller");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'User is now a seller.']);
        $this->assertEquals(2, $user->fresh()->role_id);
    }

    public function test_update_contact_details()
    {
        $response = $this->putJson("/api/users/update-contact-details", [
            'phone' => '1234567890',
            'address' => '123 Main St',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'User updated.']);
        $this->assertEquals('1234567890', $this->user->fresh()->phone);
        $this->assertEquals('123 Main St', $this->user->fresh()->address);
    }
}