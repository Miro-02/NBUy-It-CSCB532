<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\User;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_add_product_to_cart()
    {
        $product = Product::factory()->create();

        $response = $this->postJson('/api/cart', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'user_id', 'products']);
    }

    public function test_remove_product_from_cart()
    {
        $product = Product::factory()->create();
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cart->products()->attach($product->id, ['quantity' => 1]);

        $response = $this->deleteJson("/api/cart/{$product->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('cart_product', ['product_id' => $product->id]);
    }

    public function test_get_user_cart()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);

        $response = $this->getJson('/api/cart');

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'user_id', 'products']);
    }
}