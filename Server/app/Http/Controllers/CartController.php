<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddProductToCartRequest;
use App\Http\Resources\CartResource;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function addProductToCart(AddProductToCartRequest $request)
    {
        // Validate that the product ID exists and the quantity is a valid number
        $validated = $request->validated();
    
        // Pass the validated data to the service
        $cart = $this->cartService->addProductToCart(
            $request->user()->id,
            $validated['product_id'],
            $validated['quantity']
        );
    
        // Return the updated cart resource
        return new CartResource($cart);
    }

    public function removeProductFromCart($id)
    {
        $this->cartService->removeProductFromCart($id);
        return response()->json(null, 204);
    }

    public function getUserCart(Request $request)
    {
        $cart = $this->cartService->getUserCart($request->user()->id);
        return CartResource::collection($cart);
    }
}
