<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\PlayerSkin;
use App\Models\Skin;
use App\Models\Upgrade;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function show() {
        return view('auth.login');
    }

    public function login(Request $request) {
        validator($request->all(), [
            'username' => ['required'],
            'password' => ['required'],
        ])->validate();

        if(auth()->attempt($request->only(['username', 'password']))) {
            return redirect('./localstorage?token=' . auth()->user()->player->token);
        }

        return redirect()->back()->withErrors(['username' => 'Invalid Credentials']);
    }

    public function logout() {
        auth()->logout();

        return redirect()->route('home');
    }

    public function registerView() {
        return view('auth.register');
    }

    public function register(Request $request) {
        validator($request->all(), [
            'username' => ['required', 'profanity'],
            'password' => ['required'],
        ])->validate();

        try {
            $user = User::create([
                'username' => $request->username,
                'password' => Hash::make($request->password),
            ]);


        } catch (Exception $e){
            return redirect()->back()->withErrors(['username' => $e]);
        }

        $player = Player::create([
            'user_id' => $user->id,
            'token' => Str::random(48),
        ]);

        $upgrade = Upgrade::create([
            'player_id' => $player->id,
        ]);

        $skins = PlayerSkin::create([
            'player_id' => $player->id,
        ]);



        $this->login($request);



        return redirect('./localstorage?token=' . auth()->user()->player->token);
    }
    public function edit(User $user)
    {
        return view('login-edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->validate([
            "username" => "required",
            "password" => "required",
        ]));
        return redirect(route('login.show', $user));
    }
    public function destroy(User $user)
    {
        $user->username = request('username');
        $user->password = request('password');
        $user->delete();
        return redirect(route('login.show', $user));
    }

}
