<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
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
})->name('home');

Route::get('/localstorage', [GameController::class, 'localstorage'])->name('localstorage')->middleware('auth');
Route::get('/game', [GameController::class, 'game'])->middleware('auth');

Route::get('/login', [AuthController::class, 'show'])->name('loginView');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'registerView'])->name('registerView');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::get('/profile', [PlayerController::class, 'profile'])->name('profile')->middleware('auth');
Route::get('/highscores', [PlayerController::class, 'highscores'])->name('highscores');
