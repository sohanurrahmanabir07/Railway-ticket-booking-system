<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api_Controller;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Fetching_Controller;
use Spatie\FlareClient\Api;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/add_passenger',[Api_Controller::class,'addpassenger']);
Route::get('/show_passenger',[Api_Controller::class,'show']);
// Route::post('/add_passenger',[Controller::class,'add_passenger']);
Route::get('/test', function () {
    return response()->json(['status' => 'working']);
});
Route::post('/finduser',[Api_Controller::class,'login']);
// Route::post('/check_it',[Api_Controller::class,'check']);
Route::post('/check',[Api_Controller::class,'log']);
Route::post('/add_it',[Controller::class,'add']);
Route::get('/add_stations',[Controller::class,'add_station']);
Route::get('/get_stations',[Api_Controller::class,'get_stations']);
Route::post('/train_details',[Fetching_Controller::class,'get_train_compartment_class_details']);
Route::get('/get_booked_seat/{id}',[Fetching_Controller::class,'get_booked_seat']);


Route::post('/add_ticket',[Fetching_Controller::class,'add_ticket']);


// ___________________JWT Token_________________________

// Route::group([

//     'middleware' => 'api',
//     'namespace' => 'App\Http\Controllers',
//     'prefix' => 'auth'

// ], function ($router) {

//   Route::post('get_token',[Controller::class,'token']);

// });
Route::post('/get_token',[Controller::class,'token']);
// Route::get('/refresh',[Controller::class,'refresh']);
// Route::get('/get_value',[Controller::class,'testing'])->middleware('auth:api');

Route::group([
    'prefix' => 'auth'
],function ($router){
    Route::get('/get_value',[Controller::class,'testing']);
    Route::get('/refresh',[Controller::class,'refresh']);

});

// Route::post('/hel',[Controller::class,'helllo']);

// Route::post('/hel',[Api_Controller::class,'helllo']);