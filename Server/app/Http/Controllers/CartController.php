<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddProductToCartRequest;
use App\Http\Resources\CartResource;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function addProductToCart(AddProductToCartRequest $request)
    {
        $data = $request->validated();

        // If no quantity is provided, set to 0 (indicating to increment by 1)
        $quantity = $data['quantity'] ?? 0;

        $cart = $this->cartService->addProductToCart(
            $request->user()->id,
            $data['product_id'],
            $quantity
        );

        return new CartResource($cart);
    }



    public function removeProductFromCart(Request $request, $productId)
    {
        $this->cartService->removeProductFromCart(
            $request->user()->id,
            $productId
        );
        return response()->json(null, 204);
    }

    public function getUserCart(Request $request)
    {
        $cart = $this->cartService->getUserCart($request->user()->id);
        return new CartResource($cart);
    }
}