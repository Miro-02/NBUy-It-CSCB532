<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'seller_id' => 'required|exists:users,id',
            'quantity' => 'required|integer|min:0',
            'popularity' => 'nullable|integer|min:0',
        ];
    }
}
