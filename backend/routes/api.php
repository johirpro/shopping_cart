<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);

Route::middleware('auth.firebase')->group(function () {

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/sync', [CartController::class, 'sync']);

});
