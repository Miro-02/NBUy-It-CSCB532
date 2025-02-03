<?php

namespace App\Services;

use App\Models\Cart;

class CartService
{
    public function addProductToCart($userId, $productId, $quantity)
    {
        $cart = Cart::firstOrCreate(['user_id' => $userId]);

        // Attach or update the product with the given quantity
        $cart->products()->sync([$productId => ['quantity' => $quantity]], false);

        return $cart->load('products');
    }

    public function removeProductFromCart($userId, $productId)
    {
        $cart = Cart::where('user_id', $userId)->first();

        if ($cart) {
            $cart->products()->detach($productId);
        }
    }

    public function getUserCart($userId)
    {
        return Cart::with('products')->firstOrCreate(['user_id' => $userId]);
    }
}