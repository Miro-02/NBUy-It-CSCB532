<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'seller_id' => 'required|exists:users,id',
            'quantity' => 'required|integer|min:1',
            'order_product_status_id' => 'required|exists:order_product_statuses,id',
        ];
    }
}
