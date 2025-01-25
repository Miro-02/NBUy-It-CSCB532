<?php

namespace App\Services;

use App\Models\OrderStatus;

class OrderStatusService
{
    public function getAll()
    {
        return OrderStatus::all();
    }

    public function getById($id)
    {
        return OrderStatus::findOrFail($id);
    }

    public function create(array $data)
    {
        return OrderStatus::create($data);
    }

    public function update($id, array $data)
    {
        $orderStatus = OrderStatus::findOrFail($id);
        $orderStatus->update($data);
        return $orderStatus;
    }

    public function delete($id)
    {
        $orderStatus = OrderStatus::findOrFail($id);
        $orderStatus->delete();
        return $orderStatus;
    }
}
