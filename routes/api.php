<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TanamanController;
use App\Http\Controllers\ZatController;
use App\Http\Controllers\BioController;
use App\Http\Controllers\SearchController;
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

Route::post('/users/register', [\App\Http\Controllers\UserController::class, 'register']);

Route::post('/users/login', [\App\Http\Controllers\UserController::class, 'login']);

Route::get('/search/parameter', [\App\Http\Controllers\SearchController::class, 'showlist']);

Route::get('/search/search', [\App\Http\Controllers\SearchController::class, 'searchApi']);
Route::get('/search/{id}/{searchBy}', [SearchController::class, 'showDetail']);
