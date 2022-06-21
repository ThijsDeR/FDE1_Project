<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BicycleSkin extends Model
{
    use HasFactory;


    public function ownedByPlayer(Player $player) {
        $playerSkins = json_decode($player->skins->ownedBicycleSkins);
        
        if(!empty($playerSkins)) {
            foreach($playerSkins as $playerSkin) {
                if ($playerSkin->id === $this->id) return true;
            }
        }

        return false;
    }
}
