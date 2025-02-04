<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Services\RoleService;
use Illuminate\Http\Request;

class RoleController
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index()
    {
        $roles = $this->roleService->getAll();
        return RoleResource::collection($roles);
    }

    public function show($id)
    {
        $role = $this->roleService->getById($id);
        return new RoleResource($role);
    }

    /* public function store(RoleRequest $request)
    {
        $role = $this->roleService->create($request->validated());
        return new RoleResource($role);
    } */

    /* public function update(RoleRequest $request, $id)
    {
        $role = $this->roleService->update($id, $request->validated());
        return new RoleResource($role);
    }

    public function destroy($id)
    {
        $this->roleService->delete($id);
        return response()->noContent();
    } */
}
