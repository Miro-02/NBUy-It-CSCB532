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
            OrderProduct::create([
                'product_id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'seller_id' => $product->seller_id,
                'quantity' => $product->quantity,
                'popularity' => $product->popularity,
                'order_product_status_id' => $orderProductsStatus->id,
            ]);
        }

        $cart->products()->delete();

        return response()->json($order->load('orderProducts'), 201);
    }

    public function myOrders()
    {
        $user = Auth::user();
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

    public function update(Request $request, OrderProduct $orderProduct)
    {
        $validated = $request->validate([
            'status_id' => 'sometimes|exists:order_statuses,id',
            'quantity' => 'sometimes|integer|min:1',
        ]);

        $orderProduct->update($validated);

        return response()->json($orderProduct);
    }

    public function destroy(OrderProduct $orderProduct)
    {
        $orderProduct->delete();

        return response()->json(['message' => 'Order product deleted successfully']);
    }
}