<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone' => 'required|string|max:255',
            'is_banned' => 'boolean',
            'cart_id' => 'nullable|exists:carts,id',
            'role_id' => 'required|exists:roles,id',
            'age' => 'required|integer|min:0',
            'address' => 'required|string|max:255',
        ];
    }
}
