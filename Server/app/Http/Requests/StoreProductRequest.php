<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'popularity' => 'nullable|integer|min:0',
            'product_category_ids' => 'nullable|array',
            'product_category_ids.*' => 'exists:product_categories,id',
            'product_images' => 'required|array|min:1',
            'product_images.*' => 'file|mimes:png,jpeg,jpg,webp',
        ];
    }
}
