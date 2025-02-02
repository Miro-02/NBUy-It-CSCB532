<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserUpdateRoleRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Auth0\SDK\Auth0;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(UserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $this->userService->updateUser($user, $request->validated());
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return response()->json(null, 204);
    }

    public function updateRole(UserUpdateRoleRequest $request, User $user)
    {
        $data =  $request->validated();
        $user->role_id = $data['role_id'];
        $user->save();
        return response()->json(null, 200);
    }

    /* public function syncUser(Request $request) {
        // Get and validate JWT
        $token = $request->bearerToken();
        
        $auth0 = new Auth0([
            'domain' => config('auth0.domain'),
            'clientId' => config('auth0.client_id'),
            'clientSecret' => config('auth0.client_secret'),
            'audience' => config('auth0.audience'),
        ]);
    
        try {
            // Decode and verify JWT
            $decoded = $auth0->decode($token);
            $auth0User = $decoded->toArray();
    
            // Create/update user in Laravel DB
            $user = User::updateOrCreate(
                ['auth0_id' => $auth0User['sub']],
                [
                    'name' => $auth0User['name'] ?? $auth0User['nickname'],
                    'email' => $auth0User['email'],
                    'email_verified' => $auth0User['email_verified'] ?? false,
                ]
            );
    
            return response()->json($user);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    } */
}
