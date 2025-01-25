<?php

namespace App\Services;

use App\Models\ProductCategory;

class ProductCategoryService
{
    public function getAll()
    {
        return ProductCategory::all();
    }

    public function getById($id)
    {
        return ProductCategory::findOrFail($id);
    }

    public function create(array $data)
    {
        return ProductCategory::create($data);
    }

    public function update($id, array $data)
    {
        $category = ProductCategory::findOrFail($id);
        $category->update($data);
        return $category;
    }

    public function delete($id)
    {
        $category = ProductCategory::findOrFail($id);
        $category->delete();
    }
}

