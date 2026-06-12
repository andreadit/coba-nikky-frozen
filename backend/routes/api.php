<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BranchController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/payments/midtrans/notification', [PaymentController::class, 'handleMidtransNotification']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('/products', ProductController::class);
    Route::apiResource('/inventories', InventoryController::class);
    Route::apiResource('/transactions', TransactionController::class);
    Route::apiResource('/users', UserController::class);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/branches', [BranchController::class, 'index']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/finance', [FinanceController::class, 'index']);
    Route::post('/payments/midtrans/snap/{transaction}', [PaymentController::class, 'createMidtransSnap']);
});
