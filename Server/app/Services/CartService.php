<?php

namespace App\Services;

use App\Models\Cart;

class CartService
{
    public function addProductToCart($userId, $productId)
    {
        return Cart::create([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);
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
