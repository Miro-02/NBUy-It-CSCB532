<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserContactDetailsRequest;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserUpdateRoleRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController 

{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /* public function store(UserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $this->userService->updateUser($user, $request->validated());
        return new UserResource($user);
    } */

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return response()->json(null, 204);
    }

    public function updateRole(UserUpdateRoleRequest $request, User $user)
    {
        $data = $request->validated();
        $user->role_id = $data['role_id'];
        $user->save();
        return response()->json(null, 200);
    }

    public function becomeSeller(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('buyer')) {
            $user->removeRole('buyer');
            $user->assignRole('seller');
            return response()->json([
                'message' => 'User is now a seller.',
                'user' => $user
                ,
                200
            ]);
        }
        return response()->json([
            'message' => 'User already has a different role.',
        ], 400);
    }

    public function updateContactDetails(UpdateUserContactDetailsRequest $request)
    {
        $user = $request->user();
    
        $data = $request->validated();
    
        $user->update($data);
    
        return response()->json([
            'message' => 'User updated.'
        ], 200);
    }
    
    
}
