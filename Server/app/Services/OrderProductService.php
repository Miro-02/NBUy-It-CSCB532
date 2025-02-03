<?php

namespace App\Services;

use App\Models\OrderProduct;
use Illuminate\Database\Eloquent\Collection;

class OrderProductService
{
    public function getAll(): Collection
    {
        return OrderProduct::all();
    }

    public function create(array $data): OrderProduct
    {
        return OrderProduct::create($data);
    }

    public function update(OrderProduct $orderProduct, array $data): bool
    {
        return $orderProduct->update($data);
    }

    public function delete(OrderProduct $orderProduct): bool
    {
        return $orderProduct->delete();
    }
}