<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductCategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        ProductCategory::factory()->count(3)->create();

        $response = $this->getJson('/api/product-categories');

        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'name']]);
    }

    public function test_show()
    {
        $category = ProductCategory::factory()->create();

        $response = $this->getJson("/api/product-categories/{$category->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name']);
    }

    public function test_store()
    {
        $response = $this->postJson('/api/product-categories', [
            'name' => 'Electronics',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'name']);
    }

    public function test_update()
    {
        $category = ProductCategory::factory()->create();

        $response = $this->putJson("/api/product-categories/{$category->id}", [
            'name' => 'Updated Category',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name']);
    }

    public function test_destroy()
    {
        $category = ProductCategory::factory()->create();

        $response = $this->deleteJson("/api/product-categories/{$category->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('product_categories', ['id' => $category->id]);
    }
}