<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/docs', function(){
    return view('halaman.docs');
});

Route::get('/contact', function(){
    return view('halaman.contact');
});

Route::get('/signin', function(){
    return view('halaman.signin');
});

Route::get('/signup', function(){
    return view('halaman.signup');
});

Route::get('/sEngine', function(){
    return view('halaman.sEngine');
});