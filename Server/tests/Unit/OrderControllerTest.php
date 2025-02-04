<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_store_order()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $product = Product::factory()->create();
        $cart->products()->attach($product->id, ['quantity' => 1]);

        $response = $this->postJson('/api/orders');

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'user_id', 'orderProducts']);
    }

    public function test_my_orders()
    {
        Order::factory()->create(['user_id' => $this->user->id]);

        $response = $this->getJson('/api/orders/my-orders');

        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'user_id', 'orderProducts']]);
    }

    public function test_my_order()
    {
        $order = Order::factory()->create(['user_id' => $this->user->id]);

        $response = $this->getJson("/api/orders/my-orders/{$order->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'user_id', 'orderProducts']);
    }

    public function test_index()
    {
        Order::factory()->create();

        $response = $this->getJson('/api/orders');

        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'user_id', 'orderProducts']]);
    }

    public function test_show()
    {
        $order = Order::factory()->create();

        $response = $this->getJson("/api/orders/{$order->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'user_id', 'orderProducts']);
    }
}