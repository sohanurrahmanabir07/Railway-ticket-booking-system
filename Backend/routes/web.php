<?php

use App\Http\Controllers\Api_Controller;
use App\Http\Controllers\Fetching_Controller;
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

Route::get('/show',[Fetching_Controller::class,'get_train_compartment_class_details']);
Route::get('/practice',[Fetching_Controller::class,'add_ticket']);

Route::get('/problem',[Fetching_Controller::class,'solving']);


