<?php

namespace App\Services;

use App\Models\OrderProductStatus;

class OrderProductStatusService
{
    public function getAllStatuses()
    {
        return OrderProductStatus::all();
    }

    public function getStatusById($id)
    {
        return OrderProductStatus::findOrFail($id);
    }

    public function createStatus(array $data)
    {
        return OrderProductStatus::create($data);
    }

    public function updateStatus($id, array $data)
    {
        $status = OrderProductStatus::findOrFail($id);
        $status->update($data);
        return $status;
    }

    public function deleteStatus($id)
    {
        $status = OrderProductStatus::findOrFail($id);
        $status->delete();
        return $status;
    }
}
