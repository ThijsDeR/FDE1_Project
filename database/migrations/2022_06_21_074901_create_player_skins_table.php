<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_skins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('player_id');
            $table->string('ownedBicycleSkins', 4000)->default('[
                {"id": "1", "name": "normal bicycle", "src": "/assets/img/players/cycles/fiets1normal.png"}

            ]');
            $table->string('ownedStaminaSkins', 4000)->default('[
                {"id": "1", "name": "frikandelbroodje", "src": "/assets/img/objects/frikandelbroodje.png", "baseStamina": "2"}
            ]');
            $table->unsignedBigInteger('currentBicycleSkin')->default(1);
            $table->unsignedBigInteger('currentStaminaSkin')->default(1);

            $table->timestamps();

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_skins');
    }
};
