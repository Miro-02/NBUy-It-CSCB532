<?php

use Illuminate\Support\Facades\Route;

Route::get('/test4', function () {
    dump("nice3");
    return response()->json(['message' => 'Test3 route accessed successfully']);
});

Route::middleware('auth0.authenticate')->group(function () {
    Route::get('/test3', function () {
        dump("nice3");
        return response()->json(['message' => 'Test3 route accessed successfully']);
    });
});
