<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Services\ProductCategoryService;
use Illuminate\Http\Request;

class ProductCategoryController 

{
    protected $productCategoryService;

    public function __construct(ProductCategoryService $productCategoryService)
    {
        $this->productCategoryService = $productCategoryService;
    }

    public function index()
    {
        $categories = $this->productCategoryService->getAll();
        return ProductCategoryResource::collection($categories);
    }

    public function show($id)
    {
        $category = $this->productCategoryService->getById($id);
        return new ProductCategoryResource($category);
    }

    public function store(ProductCategoryRequest $request)
    {
        $category = $this->productCategoryService->create($request->validated());
        return new ProductCategoryResource($category);
    }

    public function update(ProductCategoryRequest $request, $id)
    {
        $category = $this->productCategoryService->update($id, $request->validated());
        return new ProductCategoryResource($category);
    }

    public function destroy($id)
    {
        $this->productCategoryService->delete($id);
        return response()->noContent();
    }
}
