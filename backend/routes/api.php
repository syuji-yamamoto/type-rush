<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SampleTextController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// 認証不要のルート
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// サンプルテキスト関連（認証不要）
Route::get('/sample-texts/random', [SampleTextController::class, 'getRandom']);
Route::get('/sample-texts/random-list', [SampleTextController::class, 'getRandomList']);
Route::get('/sample-texts/difficulties', [SampleTextController::class, 'getDifficulties']);

// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});
