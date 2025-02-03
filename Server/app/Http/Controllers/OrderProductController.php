<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderProductRequest;
use App\Http\Resources\OrderProductResource;
use App\Models\OrderProduct;
use App\Services\OrderProductService;
use Illuminate\Http\JsonResponse;

class OrderProductController extends Controller
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
}