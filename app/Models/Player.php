<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'token'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function upgrade() {
        return $this->hasOne(Upgrade::class);
    }

    public function skins() {
        return $this->hasOne(PlayerSkin::class);
    }
}
