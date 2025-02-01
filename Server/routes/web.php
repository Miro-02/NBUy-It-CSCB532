<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\OrderProductStatusController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CartController;

Auth::shouldUse('auth0-api');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    return response()->json(['message' => 'Test route accessed successfully']);
});

Route::get('/test2', function () {
    dump("nice2");
    return response("NICE");

})->middleware('auth');

// UserController routes
Route::resource('users', UserController::class);

// RoleController routes
Route::resource('roles', RoleController::class)->only(['index']);

// ProductController routes
Route::resource('products', ProductController::class);

// ProductCategoryController routes
Route::resource('product-categories', ProductCategoryController::class);

// OrderStatusController routes
Route::resource('order-statuses', OrderStatusController::class);

// OrderProductStatusController routes
Route::resource('order-product-statuses', OrderProductStatusController::class);

// OrderProductController routes
Route::resource('order-products', OrderProductController::class);

// FileController routes
Route::resource('files', FileController::class)->only(['store', 'show']);

// CartController routes
Route::post('/cart', [CartController::class, 'addProductToCart']);
Route::delete('/cart/{id}', [CartController::class, 'removeProductFromCart']);
Route::get('/cart', [CartController::class, 'getUserCart']);
