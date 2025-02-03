<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'phone' => $this->phone,
            'is_banned' => $this->is_banned,
            'cart_id' => $this->cart_id,
            'age' => $this->age,
            'address' => $this->address,
        ];
    }
}
