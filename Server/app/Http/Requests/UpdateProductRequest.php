<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'seller_id' => 'nullable|exists:users,id',
            'quantity' => 'nullable|integer|min:0',
            'popularity' => 'nullable|integer|min:0',
            'product_category_ids' => 'nullable|array',
            'product_category_ids.*' => 'exists:product_categories,id',
            'product_images' => 'nullable|array',
            'product_images.*' => 'file|mimes:png,jpeg,jpg,webp',
            'delete_product_images_ids' => 'nullable|array',
            'delete_product_images_ids.*' => 'exists:file_records,id',
        ];
    }
}
