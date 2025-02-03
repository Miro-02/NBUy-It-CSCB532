<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\OrderProductStatusController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Admin-only route example
    Route::middleware('role:admin')->get('/admin', function () {
        return response()->json(['message' => 'Admin access granted']);
    });
});

// UserController routes
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);

Route::put('/users/{user}/update-role', [UserController::class, 'updateRole']);

// RoleController routes
Route::get('/roles', [RoleController::class, 'index']);
Route::get('/roles/{id}', [RoleController::class, 'show']);

// ProductController routes
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// ProductCategoryController routes
Route::get('/product-categories', [ProductCategoryController::class, 'index']);
Route::post('/product-categories', [ProductCategoryController::class, 'store']);
Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);
Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update']);
Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy']);

// OrderStatusController routes
Route::get('/order-statuses', [OrderStatusController::class, 'index']);
Route::post('/order-statuses', [OrderStatusController::class, 'store']);
Route::get('/order-statuses/{id}', [OrderStatusController::class, 'show']);
Route::put('/order-statuses/{id}', [OrderStatusController::class, 'update']);
Route::delete('/order-statuses/{id}', [OrderStatusController::class, 'destroy']);

// OrderProductStatusController routes
Route::get('/order-product-statuses', [OrderProductStatusController::class, 'index']);
Route::post('/order-product-statuses', [OrderProductStatusController::class, 'store']);
Route::get('/order-product-statuses/{id}', [OrderProductStatusController::class, 'show']);
Route::put('/order-product-statuses/{id}', [OrderProductStatusController::class, 'update']);
Route::delete('/order-product-statuses/{id}', [OrderProductStatusController::class, 'destroy']);

// OrderProductController routes
Route::post('/order-products', [OrderProductController::class, 'store']);
Route::put('/order-products/{orderProduct}', [OrderProductController::class, 'update']);
Route::delete('/order-products/{orderProduct}', [OrderProductController::class, 'destroy']);

// CartController routes
Route::post('/cart', [CartController::class, 'addProductToCart']);
Route::delete('/cart/{id}', [CartController::class, 'removeProductFromCart']);
Route::get('/cart', [CartController::class, 'getUserCart']);
// });
