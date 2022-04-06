<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\NameHighscoreController;
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
    return view('home');
});

Route::get('/game', [GameController::class, 'game']);
Route::get('/names', [NameController::class]);
