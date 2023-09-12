<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'page1']);

Route::get('/docs', [HomeController::class, 'page2']);

Route::get('/contact', [HomeController::class, 'page3']);

Route::get('/signin', [HomeController::class, 'page4']);

Route::get('/signup', [HomeController::class, 'page5']);

Route::get('/sEngine', [HomeController::class, 'page6']);

Route::get('/inputData', [HomeController::class, 'page7']);