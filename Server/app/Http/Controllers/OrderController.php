<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Cart;
use App\Models\OrderProductStatus;
use App\Models\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        // Get user's cart items
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart || $cart->products->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        // Get default order status (e.g., 'pending')
        $status = OrderStatus::where('name', 'pending')->firstOrFail();

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'status_id' => $status->id,
        ]);

        $orderProductsStatus = OrderProductStatus::where('name', 'pending')->firstOrFail();

        foreach ($cart->products as $product) {
            $orderProduct = OrderProduct::create([
                'product_id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'seller_id' => $product->seller_id,
                'quantity' => $cart->products()->where('product_id', $product->id)->first()->pivot->quantity,
                'popularity' => $product->popularity,
                'order_product_status_id' => $orderProductsStatus->id,
            ]);

            $order->orderProducts()->attach(
                $orderProduct->id
            );
        }

        $cart->products()->detach();

        return response()->json($order->load('orderProducts'), 201);
    }

    public function myOrders(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)
            ->with(['orderProducts', 'status'])
            ->get();

        return response()->json($orders);
    }

    public function myOrder($id)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->with(['orderProducts', 'status'])
            ->findOrFail($id);
        return response()->json($order);
    }

    public function index()
    {
        $orders = Order::with(['user', 'orderProducts', 'status'])
            ->get();

        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'orderProducts', 'status'])
            ->findOrFail($id);

        return response()->json($order);
    }

    public function advanceStatus($id)
    {
        $order = Order::with(['orderProducts.status', 'status'])
            ->findOrFail($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Get current order status
        $currentStatus = $order->status->slug;
        dump($order->orderProducts);
        // Check if all order products have the same status as the order
        /* $allSameStatus = collect($order->orderProducts)
            ->every(fn($product) => $product->status->slug === $currentStatus);

        if (!$allSameStatus) {
            return response()->json(['error' => 'Not all order products have the same status'], 400);
        }

        // Define the status transition flow
        $statusFlow = [
            'pending' => 'confirmed',
            'confirmed' => 'processing',
            'processing' => 'shipped',
            'shipped' => 'delivered',
        ]; */

        // Check if there's a next status available
        /* if (isset($statusFlow[$currentStatus])) {
            // Update the order status
            $newStatus = OrderStatus::where('slug', $statusFlow[$currentStatus])->firstOrFail();
            $order->status()->associate($newStatus);
            $order->save();

            return response()->json(['message' => "Order advanced to {$newStatus->slug}"], 200);
        }

        return response()->json(['error' => 'Order cannot be advanced further'], 400); */
    }

}