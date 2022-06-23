<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ToSController extends Controller
{
    public function terms_of_service() {
        return view('auth.terms_of_service');
    }
}
