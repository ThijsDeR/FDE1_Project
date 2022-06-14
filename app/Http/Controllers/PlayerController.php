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
        $players = Player::orderBy('highscore', 'desc')->simplePaginate(10);
        return view('players.highscores', compact('players'));
    }

    public function profile()
    {
        $user = auth()->user();

        return view('players.profile', compact('user'));
    }

    public function upgrades()
    {
        return view('players.upgrades');
    }

    public function skins()
    {
        return view('players.skins');
    }

    public function addVP(Request $request, $token) {
        $player = Player::where('token', $token)->first();
        $player->vp += $request->vp;
        $player->save();
        return response('Succesfull update', 200);
    }

    public function update(Request $request, $token) {
        Player::where('token', $token)->update($request->only(['highscore', 'vp']));
        return response('Succesfull update', 200);
    }

    public function info($token) {
        return Player::where('token', $token)->first();
    }

    public function upgrade(Request $request, $token) {
        $result = Player::where('token', $token)->first()->upgrade->level_up($request->upgrade_type);
        return $result;
    }

    public function getUpgrade($name, $token) {
        $upgrade = Player::where('token', $token)->first()->upgrade;
        $upgradeArray = array();
        $upgradeArray['price'] = $upgrade->upgrade_cost($name);
        $upgradeArray['level'] = $upgrade->$name;
        
        return $upgradeArray;
    }
}
