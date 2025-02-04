<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderProductController;
use Spatie\Permission\Models\Role;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/product-categories', [ProductCategoryController::class, 'index']);
Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);

Route::middleware(['auth:sanctum', 'role:buyer'])->group(function () {
    Route::post('/become-seller', [UserController::class, 'becomeSeller']);
});

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

    Route::put('/user/contact-details', [UserController::class, 'updateContactDetails']);
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

Route::middleware(['auth:sanctum', 'role:admin|order-manager|seller'])->group(function () {
    // ProductController routes
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    Route::get('/my-products', [ProductController::class, 'myProducts']);
    Route::get('/my-products/{id}', [ProductController::class, 'myProduct']);

    // ProductCategoryController routes
    Route::post('/product-categories', [ProductCategoryController::class, 'store']);
    Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update']);
    Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy']);

});

Route::middleware(['auth:sanctum', 'role:admin|order-manager'])->group(function () {
    Route::get('/order', [OrderController::class, 'index']);
    Route::get('/order/{id}', [OrderController::class, 'show']);
    Route::post('/order/{id}/advance-status', [OrderController::class, 'advanceStatus']);
    Route::post('/order-product/{id}/advance-status', [OrderProductController::class, 'advanceStatus']);
});