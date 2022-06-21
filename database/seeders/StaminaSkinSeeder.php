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
            'name' => 'apple',
            'src' => '/assets/img/objects/apple_1.png',
            'price' => 10000,
            'baseStamina' => 10
        ]);

        \App\Models\StaminaSkin::create([
            'id' => '3',
            'name' => 'energy',
            'src' => '/assets/img/objects/energy_drink_1.png',
            'price' => 10000,
            'baseStamina' => 10
        ]);
    }
}
