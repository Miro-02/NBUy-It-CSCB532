<?php

namespace App\Services;

use App\Models\Cart;

class CartService
{
    public function addProductToCart($userId, $productId, $quantity)
    {
        // Find or create the cart for the user
        $cart = Cart::firstOrCreate(['user_id' => $userId]);

        // Check if the product already exists in the cart
        $existingProduct = $cart->products()->where('product_id', $productId)->first();

        if ($existingProduct) {
            // If quantity is provided, set it to the given quantity
            // If quantity is not provided (0), increment the existing quantity by 1
            $newQuantity = $quantity > 0 ? $quantity : $existingProduct->pivot->quantity + 1;
        } else {
            // If product does not exist in the cart, treat the quantity as 1
            $newQuantity = $quantity > 0 ? $quantity : 1;
        }

        // Attach or update the product with the new quantity
        $cart->products()->sync([$productId => ['quantity' => $newQuantity]], false);

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
        return Cart::with('products.productImages')->firstOrCreate(['user_id' => $userId]);
    }
}