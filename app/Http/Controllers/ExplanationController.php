<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExplanationController extends Controller
{
    public function localstorage() {
        return view('localstorage');
    }

    public function explanation() {
        return view('explantion');
    }
}
