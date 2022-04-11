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
        $player = auth()->user()->player;

        return view('player.profile', compact('player'));
    }
}
