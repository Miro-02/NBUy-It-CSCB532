<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_index()
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'name', 'price']]);
    }

    public function test_store()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'New Product',
            'price' => 100,
            'product_category_ids' => [],
            'product_images' => [],
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'name', 'price']);
    }

    public function test_show()
    {
        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name', 'price']);
    }

    public function test_update()
    {
        $product = Product::factory()->create();

        $response = $this->putJson("/api/products/{$product->id}", [
            'name' => 'Updated Product',
            'price' => 200,
            'product_category_ids' => [],
            'product_images' => [],
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name', 'price']);
    }

    public function test_destroy()
    {
        $product = Product::factory()->create();

        $response = $this->deleteJson("/api/products/{$product->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_my_products()
    {
        Product::factory()->create(['seller_id' => $this->user->id]);

        $response = $this->getJson('/api/products/my-products');

        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'name', 'price']]);
    }

    public function test_my_product()
    {
        $product = Product::factory()->create(['seller_id' => $this->user->id]);

        $response = $this->getJson("/api/products/my-products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name', 'price']);
    }
}