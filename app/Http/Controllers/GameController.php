<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function localstorage() {
        return view('localstorage');
    }

    public function game() {
        return view('game');
    }
}
