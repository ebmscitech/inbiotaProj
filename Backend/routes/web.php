<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DataInbiotaController;
use App\Http\Controllers\DataSenyawaController;
use App\Http\Controllers\QuestionsubController;
use App\Http\Controllers\EmailsubController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\BioController;
use App\Http\Controllers\ZatController; 

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

// Route::get('/signup', [HomeController::class, 'page5']);

Route::get('/sEngine', [HomeController::class, 'page6']);

Route::get('/searchEngine', [SearchController::class, 'search']);

//Detail Search Data
Route::get('/searchEngine/{data}', [SearchController::class, 'show']);

//Create Email Message

Route::post('/sendBForm', [HomeController::class, 'pageBForm']);

//Data Inbiota Subscriber
Route::post('/subsForm', [HomeController::class, 'subsForm']);

Route::post('/accSignin', [HomeController::class, 'accSignin']);

Route::post('/accSignup', [HomeController::class, 'accSignup']);

//CRUD Plant Data Inbiota

//Create Data Inbiota
Route::get('/inputData', [HomeController::class, 'page7']);
//Kirim ke database
Route::post('/sendPData', [DataInbiotaController::class, 'pageInputData']);

//Read sEngine (belum)
//List Data
Route::get('/listDatabase', [DataSenyawaController::class, 'pageList']);
//Detail Data
Route::get('/listDatabase/{data}', [DataSenyawaController::class, 'show']);

//Form Data Inbiota
Route::get('/listDatabase/{data}/edit', [DataSenyawaController::class, 'edit']);
//Update Data Inbiota
Route::put('/listDatabase/{data}', [DataSenyawaController::class, 'update']);

//Delete Data
// Delete berdasarkan id
Route::delete('/listDatabase/{data}', [DataSenyawaController::class, 'destroy']);

//Read Data Message
Route::get('/listQuestSub', [QuestionsubController::class, 'index']);
//Delete Data Message
Route::delete('/listQuestSub/{data}', [QuestionsubController::class, 'destroy']);

//Read Data Subscription
Route::get('/listSubscriber', [EmailsubController::class, 'indexS']);
//Delete Data Subscription
Route::delete('/listSubscriber/{data}', [EmailsubController::class, 'destroyS']);

Route::get('/indexadmin', [HomeController::class, 'indexadmin']);

// CRUD Substance Data
Route::resource('zat', ZatController::class);


// CRUD Bioactivities Data
Route::resource('Bio', BioController::Class);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index']);
