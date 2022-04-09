<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function show() {
        return view('login');
    }

    public function login(Request $request) {
        validator($request->all(), [
            'username' => ['required'],
            'password' => ['required'],
        ])->validate();

        if(auth()->attempt($request->only(['username', 'password']))) {
            return redirect()->route('home');
        }

        return redirect()->back()->withErrors(['username' => 'Invalid Credentials']);
    }

    public function logout() {
        auth()->logout();

        return redirect()->route('home');
    }
}
