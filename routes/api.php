<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TanamanController;
use App\Http\Controllers\ZatController;
use App\Http\Controllers\BioController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
//
//Route::prefix('v1')->group(function () {
//    Route::apiResource('tanaman', TanamanController::class);
//    Route::apiResource('zat', ZatController::class);
//    Route::apiResource('bio', BioController::class);
//});

Route::post('/users', [\App\Http\Controllers\UserController::class, 'register']);
