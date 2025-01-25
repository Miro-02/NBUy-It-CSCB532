<?php

namespace App\Services;

use App\Models\OrderProduct;

class OrderProductService
{
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
