<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderProductRequest;
use App\Http\Resources\OrderProductResource;
use App\Models\OrderProduct;
use App\Models\OrderProductStatus;
use App\Services\OrderProductService;
use Illuminate\Http\JsonResponse;

class OrderProductController
{
    protected $orderProductService;

    public function __construct(OrderProductService $orderProductService)
    {
        $this->orderProductService = $orderProductService;
    }

    public function index(): JsonResponse
    {
        $orderProducts = $this->orderProductService->getAll();
        return response()->json(OrderProductResource::collection($orderProducts));
    }

    public function store(OrderProductRequest $request): JsonResponse
    {
        $orderProduct = $this->orderProductService->create($request->validated());
        return response()->json(new OrderProductResource($orderProduct), 201);
    }

    public function show(OrderProduct $orderProduct): JsonResponse
    {
        return response()->json(new OrderProductResource($orderProduct));
    }

    public function update(OrderProductRequest $request, OrderProduct $orderProduct): JsonResponse
    {
        $this->orderProductService->update($orderProduct, $request->validated());
        return response()->json(new OrderProductResource($orderProduct));
    }

    public function destroy(OrderProduct $orderProduct): JsonResponse
    {
        $this->orderProductService->delete($orderProduct);
        return response()->json(null, 204);
    }

    public function advanceStatus($id)
    {
        $product = OrderProduct::with(['status'])->findOrFail($id);

        if (!$product) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $currentStatus = $product->status->slug;

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

        $nextStatus = OrderProductStatus::where('slug', $nextStatusSlug)->firstOrFail();

        $product->update(['status_id' => $nextStatus->id]);

        return response()->json("Updated", 200);
    }
}