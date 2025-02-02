<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\FileRecord;
use File;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllProducts()->load('productCategories', 'productImages');
        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->all();
        $product = $this->productService->createProduct($data);
        if (isset($data['product_category_ids'])) {
            $product->productCategories()->sync($data['product_category_ids']);
        }
        if (isset($data['product_images'])) {
            $images = $data['product_images'];
            foreach ($images as $image) {
                $directory = public_path('files/product_images/');
                
                $fileName = uniqid(mt_rand(), true) . '.' . $image->getClientOriginalExtension();
    
                $image->move($directory, $fileName);
    
                $fileRecord = FileRecord::create([
                    'path' => $directory . $fileName,
                    'original_name' => $image->getClientOriginalName(),
                ]);
    
                $product->productImages()->attach($fileRecord->id);
            }
        }
        return new ProductResource($product);
    }

    public function show($id)
    {
        $product = $this->productService->getProductById($id)->load('productCategories', 'productImages');
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
