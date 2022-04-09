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
            'email' => ['required', 'email'],
            'password' => ['required'],
        ])->validate();

        if(auth()->attempt($request->only(['email', 'password']))) {
            return redirect()->route('home');
        }

        return redirect()->back()->withErrors(['email' => 'Invalid Credentials']);
    }

    public function logout() {
        auth()->logout();

        return redirect()->route('home');
    }
}
