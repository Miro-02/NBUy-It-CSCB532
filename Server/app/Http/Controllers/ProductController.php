<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
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

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
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

    public function update(Request $request, $id)
    {
        dump($id);
        dump($request->all());
        return "nice";
       /*  $product = $this->productService->getProductById($id);
        $data = $request->all();
        dump($data); */
        // dump($this->productService->updateProduct($product, $data));

        /* $this->productService->updateProduct($product, $data);

        if (isset($data['product_category_ids'])) {
            $product->productCategories()->sync($data['product_category_ids']);
        }*/

    

        /* return new ProductResource($product); */
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

        return response()->noContent();
    }

    public function destroyImages(Request $request, $productId)
    {
        $data = $request->validated();

        // Find the product
        $product = $this->productService->getProductById($productId);

        // Get the image IDs to delete
        $imageIds = $data['product_image_ids'];

        // Delete the images
        foreach ($imageIds as $imageId) {
            $image = FileRecord::find($imageId);

            // Check if the image exists and is associated with the product
            if ($image && $product->productImages->contains($imageId)) {
                // Delete the file from the filesystem
                if (File::exists($image->path)) {
                    File::delete($image->path);
                }

                // Detach the image from the product
                $product->productImages()->detach($imageId);

                // Delete the image record from the database
                $image->delete();
            }
        }

        return response()->json( 200);
    }
}
