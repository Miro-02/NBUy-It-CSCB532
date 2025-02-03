<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\OrderProductStatusController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use Spatie\Permission\Middlewares\RoleMiddleware;

use Spatie\Permission\Models\Role;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/product-categories', [ProductCategoryController::class, 'index']);
Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // CartController routes
    Route::post('/cart', [CartController::class, 'addProductToCart']);
    Route::delete('/cart/{id}', [CartController::class, 'removeProductFromCart']);
    Route::get('/cart', [CartController::class, 'getUserCart']);

    Route::post('/order', [OrderController::class, 'store']);
    Route::get('/my-orders', [OrderController::class, 'myOrders']);
    Route::get('/my-orders/{id}', [OrderController::class, 'myOrder']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::put('/users/{user}/update-role', [UserController::class, 'updateRole']);

    // RoleController routes
    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
});

Route::get('/test', function () {
    return 'Test route';
})->middleware(['auth:sanctum', 'role:buyer', 'role:seller', 'role:admin', 'role:order-manager']);


Route::middleware(['auth:sanctum', 'role:admin|order-manager'])->group(function () {
    // ProductController routes
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // ProductCategoryController routes
    Route::post('/product-categories', [ProductCategoryController::class, 'store']);
    Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update']);
    Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy']);

    Route::put('/order/{orderProduct}', [OrderController::class, 'update']);
    Route::delete('/order/{orderProduct}', [OrderController::class, 'destroy']);
    Route::get('/order', [OrderController::class, 'index']);
    Route::get('/order/{id}', [OrderController::class, 'show']);
});