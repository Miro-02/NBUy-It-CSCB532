<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    return response()->json(['message' => 'Test route accessed successfully']);
});

Route::get('/test2', function () {

    return response()->json(['message' => 'Test route accessed successfully']);

})->middleware('auth');