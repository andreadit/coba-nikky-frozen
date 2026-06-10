<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\UserController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('/products', ProductController::class);
    Route::apiResource('/inventories', InventoryController::class);
    Route::apiResource('/transactions', TransactionController::class);
    Route::apiResource('/users', UserController::class);

    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/finance', [FinanceController::class, 'index']);
});