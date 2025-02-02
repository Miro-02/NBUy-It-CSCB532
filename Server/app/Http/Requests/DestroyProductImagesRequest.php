<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DestroyProductImagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_image_ids' => 'required|array',
            'product_image_ids.*' => 'exists:file_record,id',
        ];
    }
}
