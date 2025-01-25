<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function getAllProducts(): Collection
    {
        return Product::all();
    }

    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    public function getProductById(int $id): ?Product
    {
        return Product::find($id);
    }

    public function updateProduct(Product $product, array $data): bool
    {
        return $product->update($data);
    }

    public function deleteProduct(Product $product): bool
    {
        return $product->delete();
    }
}
