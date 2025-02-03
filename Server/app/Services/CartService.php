<?php

namespace App\Services;

use App\Models\Cart;

class CartService
{
    public function addProductToCart($userId, $productId, $quantity)
    {
        $cart = Cart::firstOrCreate(['user_id' => $userId]); // Assuming you have a `user_id` field on `carts` table

        // Add product to the cart with quantity
        $cart->products()->syncWithoutDetaching([
            $productId => ['quantity' => $quantity]
        ]);

        return $cart; // Return the updated cart
    }

    public function removeProductFromCart($cartId)
    {
        $cart = Cart::findOrFail($cartId);
        $cart->delete();
    }

    public function getUserCart($userId)
    {
        return Cart::where('user_id', $userId)->with('product')->get();
    }
}
