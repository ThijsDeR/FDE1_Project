<?php

namespace App\Http\Controllers;

use App\Models\BicycleSkin;
use App\Models\Player;
use App\Models\StaminaSkin;
use App\Models\User;
use Exception;
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
        $bicycleSkins = BicycleSkin::all();
        $staminaSkins = StaminaSkin::all();
        $user = auth()->user();
        return view('players.skins', compact('user', 'bicycleSkins', 'staminaSkins'));
    }


    public function buySkin(Request $request, $token) {
        $result = Player::where('token', $token)->first()->skins->buy_skin($request->skin_type, $request->skin_id);
        return $result;
    }

    public function getSkin($type, $token) {
        $player = Player::where('token', $token)->first();
        if ($type === 'bicycle') {
            return $player->skins->getCurrentBicycleSkin();
        } 
        if ($type === 'stamina') {
            return $player->skins->getCurrentStaminaSkin();
        }
    }

    public function changeSkin(Request $request, $type, $token) {
        $player = Player::where('token', $token)->first();
        if ($type === 'bicycle') {
            $player->skins->changeCurrentBicycleSkin($request->amount);
        } 
        if ($type === 'stamina') {
            $player->skins->changeCurrentStaminaSkin($request->amount);
        }
    }

    public function addVP(Request $request, $token) {
        $token = "E7Lzb2md84P8qt8mi0uHLu3DWL2rCsmsrEKlGdaATJRMKZ3C";
        try {
            $player = Player::where('token', $token)->first();
            $player->vp += $request->vp;
            $player->save();
            return response('Succesfull update', 200);
        } catch (Exception $e) {
            return response($e, 400);
        }
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
