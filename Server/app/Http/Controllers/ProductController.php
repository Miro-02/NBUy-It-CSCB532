<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\OrderProduct;
use App\Models\OrderProductStatus;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\FileRecord;
use File;
use Illuminate\Support\Facades\DB;

class ProductController 

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

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['seller_id'] = $request->user()->id;
        $product = $this->productService->createProduct($data);
        if (isset($data['product_category_ids'])) {
            $product->productCategories()->sync($data['product_category_ids']);
        }
        $images = $data['product_images'];
        foreach ($images as $image) {
            $directory = 'files/product_images/';

            $fileName = uniqid(mt_rand(), true) . '.' . $image->getClientOriginalExtension();

            $image->move($directory, $fileName);

            $fileRecord = FileRecord::create([
                'path' => $directory . $fileName,
                'original_name' => $image->getClientOriginalName(),
            ]);

            $product->productImages()->attach($fileRecord->id);
        }
        return new ProductResource($product);
    }

    public function show($id)
    {
        $product = $this->productService->getProductById($id)->load('productCategories', 'productImages');
        return new ProductResource($product);
    }

    public function update($id, UpdateProductRequest $request)
    {
        DB::beginTransaction();

        try {
            $product = $this->productService->getProductById($id);
            $data = $request->validated();

            $deleteProductImagesIds = $data['delete_product_images_ids'] ?? [];

            // Update the product
            $this->productService->updateProduct($product, $data);

            // Sync product categories
            if (isset($data['product_category_ids'])) {
                $product->productCategories()->sync($data['product_category_ids']);
            }

            // Handle new product images
            if (isset($data['product_images']) && !empty($data['product_images'])) {
                $images = $data['product_images'];
                foreach ($images as $image) {
                    $directory = 'files/product_images/';

                    $fileName = uniqid(mt_rand(), true) . '.' . $image->getClientOriginalExtension();

                    $image->move($directory, $fileName);

                    $fileRecord = FileRecord::create([
                        'path' => $directory . $fileName,
                        'original_name' => $image->getClientOriginalName(),
                    ]);
                    $product->productImages()->attach($fileRecord->id);
                }
            }

            // Handle deletion of product images
            if (!empty($deleteProductImagesIds)) {
                foreach ($deleteProductImagesIds as $imageId) {
                    $image = FileRecord::find($imageId);
                    if ($image) {
                        
                        // Detach the image from the product
                        $product->productImages()->detach($imageId);

                        // Delete the file from storage
                        if (File::exists($image->path)) {
                            File::delete($image->path);
                        }

                        // Delete the file record
                        $image->delete();
                    }
                }
            }

            // After all actions, check if the product has at least one image
            $product->load('productImages'); // Refresh the relationship
            if ($product->productImages->isEmpty()) {
                DB::rollBack(); // Revert all changes
                return response()->json([
                    'success' => false,
                    'message' => 'The product must have at least one image.',
                ], 400);
            }

            DB::commit();

            return new ProductResource($product);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the product.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $product = $this->productService->getProductById($id);

        // Delete product images
        foreach ($product->productImages as $image) {
            if (File::exists($image->path)) {
                File::delete($image->path);
            }
            $image->delete();
        }

        // Detach product categories
        $product->productCategories()->detach();

        // Delete the product
        $this->productService->deleteProduct($product);

        return response()->json(null, 204);
    }

    public function myProducts(Request $request)
    {
        $user = $request->user();
        $products = Product::where('seller_id', $user->id)
            ->with(['productCategories', 'productImages'])
            ->get();

        return response()->json(ProductResource::collection($products));
    }

    public function myProduct(Request $request, $id)
    {
        $user = $request->user();
        $product = Product::where('seller_id', $user->id)
            ->with(['productCategories', 'productImages'])
            ->findOrFail($id);
        return response()->json(new ProductResource($product));
    }
}
