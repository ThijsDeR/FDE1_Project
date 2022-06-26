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
            'name' => 'Appel',
            'src' => '/assets/img/objects/apple_1.png',
            'price' => 5000,
            'baseStamina' => 5
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '3',
            'name' => 'Energy Drink',
            'src' => '/assets/img/objects/energy_drink_1.png',
            'price' => 10000,
            'baseStamina' => 8
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '4',
            'name' => 'Chocolade',
            'src' => '/assets/img/objects/chocolade.png',
            'price' => 15000,
            'baseStamina' => 10
        ]);


        \App\Models\StaminaSkin::create([
            'id' => '5',
            'name' => 'Spaghetti',
            'src' => '/assets/img/objects/spaghetti.png',
            'price' => 35000,
            'baseStamina' => 15
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '6',
            'name' => 'Prickle',
            'src' => '/assets/img/objects/prickle.png',
            'price' => 50000,
            'baseStamina' => 18
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '7',
            'name' => 'Hamburger',
            'src' => '/assets/img/objects/AmongUsBurger.png',
            'price' => 200000,
            'baseStamina' => 30
        ]);
    }
}
