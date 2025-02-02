<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'seller_id' => $this->seller_id,
            'quantity' => $this->quantity,
            'popularity' => $this->popularity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'product_categories' => ProductCategoryResource::collection($this->whenLoaded('productCategories')),
            'product_images' => FileResource::collection($this->whenLoaded('productImages')),
        ];
    }
}
