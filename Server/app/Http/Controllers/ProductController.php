<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllProducts();
        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();
        $product = $this->productService->createProduct($data);
        if (isset($data['product_category_ids'])) {
            $product->productCategories()->sync($data['product_category_ids']);
        }
        return new ProductResource($product);
    }

    public function show($id)
    {
        $product = $this->productService->getProductById($id);
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, $id)
    {
        $product = $this->productService->getProductById($id);
        $this->productService->updateProduct($product, $request->validated());
        return new ProductResource($product);
    }

    public function destroy($id)
    {
        $product = $this->productService->getProductById($id);
        $this->productService->deleteProduct($product);
        return response()->noContent();
    }
}
