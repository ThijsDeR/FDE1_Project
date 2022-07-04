<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerSkin extends Model
{
    use HasFactory;
    protected $fillable = ['player_id', 'ownedBicycleSkins', 'ownedStaminaSkins', 'currentSkinBicycleSkin', 'currentStaminaSkin'];

    public function buy_skin($skin_type, $skin_id) {
        if ($skin_type === 'bicycle') {
            $bicycle = BicycleSkin::where('id', intval($skin_id))->first();
            if ($this->player->vp >= $bicycle->price) {
                $playerBicycleSkins = json_decode($this->ownedBicycleSkins);
                $owned = false;
                if(!empty($playerBicycleSkins)) {
                    foreach($playerBicycleSkins as $playerBicycleSkin) {
                        if ($playerBicycleSkin->id === $bicycle->id) $owned = true;
                    }
                }

                if (!$owned) {
                    array_push($playerBicycleSkins, ["id" => $bicycle->id, "name" => $bicycle->name, "src" => $bicycle->src]);
                    $this->ownedBicycleSkins = json_encode($playerBicycleSkins);
                    $this->player->vp -= $bicycle->price;
                    $this->save();
                    $this->player->save();
                    return response('Updated', 200);
                }

                return response('already owned', 400);

            }

            return response('Not enough money', 400);
        }
        else if ($skin_type === 'stamina') {
            $stamina = StaminaSkin::where('id', intval($skin_id))->first();
            if ($this->player->vp >= $stamina->price) {
                $playerStaminaSkins = json_decode($this->ownedStaminaSkins);
                $owned = false;

                if(!empty($playerStaminaSkins)) {
                    foreach($playerStaminaSkins as $playerStaminaSkin) {
                        if ($playerStaminaSkin->id === $stamina->id) $owned = true;
                    }
                }

                if (!$owned) {
                    array_push($playerStaminaSkins, ["id" => $stamina->id, "name" => $stamina->name, "src" => $stamina->src, "baseStamina" => $stamina->baseStamina]);


                    $this->ownedStaminaSkins = json_encode($playerStaminaSkins);
                    $this->player->vp -= $stamina->price;
                    $this->save();
                    $this->player->save();
                    return response('Updated', 200);
                }

                return response('already owned', 400);

            }

            return response('Not enough money', 400);
        };
    }

    public function player() {
        return $this->belongsTo(Player::class);
    }

    public function getCurrentBicycleSkin() {
        foreach(json_decode($this->ownedBicycleSkins) as $index => $skin) {
            if ($index + 1 === $this->currentBicycleSkin) return $skin;
        }
    }

    public function getCurrentStaminaSkin() {
        foreach(json_decode($this->ownedStaminaSkins) as $index => $skin) {
            if ($index + 1 === $this->currentStaminaSkin) return $skin;
        }
    }

    public function changeCurrentBicycleSkin($amount) {
        $length = count(json_decode($this->ownedBicycleSkins));
        if ($amount > 0) {
            if ($this->currentBicycleSkin + $amount > $length) $this->currentBicycleSkin = 1;
            else $this->currentBicycleSkin += $amount;
        } else {
            if ($this->currentBicycleSkin + $amount < 1) $this->currentBicycleSkin = $length;
            else $this->currentBicycleSkin += $amount;
        }

        $this->save();

    }

    public function changeCurrentStaminaSkin($amount) {
        $length = count(json_decode($this->ownedStaminaSkins));
        if ($amount > 0) {
            if ($this->currentStaminaSkin + $amount > $length) $this->currentStaminaSkin = 1;
            else $this->currentStaminaSkin += $amount;
        } else {
            if ($this->currentStaminaSkin + $amount < 1) $this->currentStaminaSkin = $length;
            else $this->currentStaminaSkin += $amount;
        }

        $this->save();

    }
}
