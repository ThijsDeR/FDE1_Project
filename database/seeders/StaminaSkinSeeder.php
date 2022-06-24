<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaminaSkinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\StaminaSkin::create([
            'id' => '2',
            'name' => 'Apple',
            'src' => '/assets/img/objects/apple_1.png',
            'price' => 5000,
            'baseStamina' => 15
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '3',
            'name' => 'Energy Drink',
            'src' => '/assets/img/objects/energy_drink_1.png',
            'price' => 10000,
            'baseStamina' => 20
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '4',
            'name' => 'Burger',
            'src' => '/assets/img/objects/AmongUsBurger.png',
            'price' => 100000,
            'baseStamina' => 50
        ]);
    }
}
