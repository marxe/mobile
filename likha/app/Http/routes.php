<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::resource('user', 'UserController', ['except' => ['create']]);
// Route::resource('photo', 'PhotoController', ['only' => ['store']]);
Route::post('photo/{id}', 'PhotoController@store');
Route::post('transaction/{id}', 'TransactionController@store');
Route::resource('authen', 'AuthenController', ['only' => ['index', 'store' , 'create']]);
Route::resource('item', 'ItemController', ['only' => ['index', 'store','show','edit','destroy','update' ]]);
Route::resource('transaction', 'TransactionController', ['only' => ['update']]);
Route::resource('message', 'MessageController', ['only' => [ 'store','show','destroy','update' ]]);
Route::resource('feedback', 'FeedbackController', ['only' => [ 'index','store','show','destroy','update','edit']]);
Route::resource('bid', 'BidController', ['only' => [ 'store','show','destroy','update','edit']]);
