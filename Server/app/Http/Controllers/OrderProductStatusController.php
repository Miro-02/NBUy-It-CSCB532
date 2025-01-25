<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderProductStatusRequest;
use App\Http\Resources\OrderProductStatusResource;
use App\Services\OrderProductStatusService;
use Illuminate\Http\Response;

class OrderProductStatusController extends Controller
{
    protected $orderProductStatusService;

    public function __construct(OrderProductStatusService $orderProductStatusService)
    {
        $this->orderProductStatusService = $orderProductStatusService;
    }

    public function index()
    {
        $statuses = $this->orderProductStatusService->getAllStatuses();
        return OrderProductStatusResource::collection($statuses);
    }

    public function show($id)
    {
        $status = $this->orderProductStatusService->getStatusById($id);
        return new OrderProductStatusResource($status);
    }

    public function store(OrderProductStatusRequest $request)
    {
        $status = $this->orderProductStatusService->createStatus($request->validated());
        return new OrderProductStatusResource($status);
    }

    public function update(OrderProductStatusRequest $request, $id)
    {
        $status = $this->orderProductStatusService->updateStatus($id, $request->validated());
        return new OrderProductStatusResource($status);
    }

    public function destroy($id)
    {
        $this->orderProductStatusService->deleteStatus($id);
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
