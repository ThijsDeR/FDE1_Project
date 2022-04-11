<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\User;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function highscores()
    {
        $players = Player::orderBy('highscore', 'desc')->paginate(15);
        return view('players.highscores', compact('players'));
    }

    public function profile()
    {
        $user = auth()->user();

        return view('players.profile', compact('user'));
    }

    public function update(Request $request, $token) {
        Player::where('token', $token)->update($request->only(['highscore', 'upgrades']));
        return response('Succesfull update', 204);
    }

    public function info($token) {
        return Player::where('token', $token)->first();
    }
}
