<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStatusRequest;
use App\Http\Resources\OrderStatusResource;
use App\Services\OrderStatusService;
use Illuminate\Http\Response;

class OrderStatusController extends Controller
{
    protected $orderStatusService;

    public function __construct(OrderStatusService $orderStatusService)
    {
        $this->orderStatusService = $orderStatusService;
    }

    public function index()
    {
        $orderStatuses = $this->orderStatusService->getAll();
        return OrderStatusResource::collection($orderStatuses);
    }

    public function show($id)
    {
        $orderStatus = $this->orderStatusService->getById($id);
        return new OrderStatusResource($orderStatus);
    }

    public function store(OrderStatusRequest $request)
    {
        $orderStatus = $this->orderStatusService->create($request->validated());
        return new OrderStatusResource($orderStatus);
    }

    public function update(OrderStatusRequest $request, $id)
    {
        $orderStatus = $this->orderStatusService->update($id, $request->validated());
        return new OrderStatusResource($orderStatus);
    }

    public function destroy($id)
    {
        $this->orderStatusService->delete($id);
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
