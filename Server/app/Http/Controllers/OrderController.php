<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Cart;
use App\Models\OrderProductStatus;
use App\Models\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController
{
    public function advanceStatus($id)
    {
        $order = Order::with(['orderProducts.status', 'status'])->findOrFail($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $currentStatus = $order->status->slug;

        switch ($currentStatus) {
            case 'pending':
                $nextStatusSlug = 'confirmed';
                break;
            case 'confirmed':
                $nextStatusSlug = 'processing';
                break;
            case 'processing':
                $nextStatusSlug = 'shipped';
                break;
            case 'shipped':
                $nextStatusSlug = 'delivered';
                break;
            case 'delivered':
                return response()->json(['error' => 'Order is already delivered'], 400);
            case 'denied':
                return response()->json(['error' => 'Order is denied'], 400);
            default:
                return response()->json(['error' => 'Invalid order status'], 400);
        }

        $nextStatus = OrderStatus::where('slug', $nextStatusSlug)->firstOrFail();

        if (!$this->areAllOrderProductsStatus($order->orderProducts, $currentStatus)) {
            return response()->json(['error' => 'Not all order products are in the required status'], 400);
        }

        $order->update(['status_id' => $nextStatus->id]);

        return response()->json($order->load('orderProducts.status', 'status'));
    }

    private function areAllOrderProductsStatus($orderProducts, $currentStatusName)
    {
        foreach ($orderProducts as $orderProduct) {
            if ($orderProduct->status->slug !== $currentStatusName) {
                return false;
            }
        }
        return true;
    }
}
