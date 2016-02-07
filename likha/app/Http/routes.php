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
Route::get('user/{id}/portfolio', 'UserController@portfolioData');
// Route::resource('photo', 'PhotoController', ['only' => ['store']]);
Route::post('editing/{id}', 'ItemController@editing');
Route::post('editphoto/{id}', 'ItemController@multiPhoto');
Route::get('finding/{id}', 'ItemController@finditem');
Route::post('photo/{id}', 'PhotoController@store');
Route::post('upload/{id}', 'PhotoController@update');
Route::post('picture/{id}', 'PhotoController@multiSave');
Route::post('transaction/{id}', 'TransactionController@store');
Route::resource('authen', 'AuthenController', ['only' => ['index', 'store' , 'create']]);
Route::resource('item', 'ItemController', ['only' => ['index', 'store','show','edit','destroy','update' ]]);
Route::resource('transaction', 'TransactionController', ['only' => ['update','show','edit']]);
Route::resource('category', 'CategoryController', ['only' => ['index']]);
Route::resource('message', 'MessageController', ['only' => [ 'store','show','destroy','update' ]]);
Route::resource('admin', 'AdminController', ['only' => [ 'store','show']]);
Route::resource('feedback', 'FeedbackController', ['only' => [ 'index','store','show','destroy','update','edit']]);
Route::resource('bid', 'BidController', ['only' => [ 'store','show','destroy','update','edit']]);
Route::resource('cancel', 'CancelController', ['only' => ['update','show','store','edit']]);
