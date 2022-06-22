<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ExplanationController;
use App\Models\Player;
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
Route::get('/game', [GameController::class, 'game'])->name('game')->middleware('auth');
Route::get('/explanation', [ExplanationController::class, 'explanation'])->name('explantion')->middleware('auth');

Route::get('/login', [AuthController::class, 'show'])->name('loginView');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'registerView'])->name('registerView');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::get('/profile', [PlayerController::class, 'profile'])->name('profile')->middleware('auth');
Route::get('/profile/skins', [PlayerController::class, 'skins'])->name('skins')->middleware('auth');
Route::get('/profile/upgrades', [PlayerController::class, 'upgrades'])->name('upgrades')->middleware('auth');
Route::get('/highscores', [PlayerController::class, 'highscores'])->name('highscores');

Route::get('/players/{token}', [PlayerController::class, 'info'])->name('playerInfo');
Route::put('/players/{token}', [PlayerController::class, 'update'])->name('update');
Route::put('/players/addVP/{token}', [PlayerController::class, 'addVP'])->name('player.addVP');
Route::get('/players/addVP/{token}', [PlayerController::class, 'addVP'])->name('player.addVP');

Route::put('/profile/upgrade/{token}', [PlayerController::class, 'upgrade'])->name('player.upgrade');
Route::get('/profile/getUpgrade/{name}/{token}', [PlayerController::class, 'getUpgrade'])->name('player.getUpgrade');

Route::get('/profile/getSkin/{type}/{token}', [PlayerController::class, 'getSkin'])->name('player.getSkin');
Route::put('/profile/skins/{token}', [PlayerController::class, 'buySkin'])->name('player.buySkin');
Route::get('/profile/skins/{token}', [PlayerController::class, 'buySkin'])->name('player.buySkin');
Route::put('/profile/changeSkin/{type}/{token}', [PlayerController::class, 'changeSkin'])->name('player.changeSkin');
Route::get('/profile/changeSkin/{type}/{token}', [PlayerController::class, 'changeSkin'])->name('player.changeSkin');
