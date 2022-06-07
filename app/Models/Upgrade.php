<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upgrade extends Model
{
    use HasFactory;
    protected $fillable = ['player_id', 'stamina_resistance', 'stamina_gain'];

    public function player() {
        return $this->belongsTo(Player::class);
    }

    public function upgrade_cost($upgrade_name) {
        return round(($this->$upgrade_name ** 1.1 )) * 1000;
    }

    public function level_up($upgrade_name) {
        if ($this->player->vp >= $this->upgrade_cost($upgrade_name)) {
            $this->player->vp -= $this->upgrade_cost($upgrade_name);
            $this->$upgrade_name += 1;
            $this->save();
            $this->player->save();
            return response('Updated', 200);
        }

        return response('Not enough money', 400);
    }
}
