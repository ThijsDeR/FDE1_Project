<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BicycleSkinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\BicycleSkin::create([
            'id' => '2',
            'name' => 'Blauwe Wielen',
            'src' => '/assets/img/players/cycles/fiets1bluewheels.png',
            'price' => 50000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '3',
            'name' => 'Groene Wielen',
            'src' => '/assets/img/players/cycles/fiets1greenwheels.png',
            'price' => 50000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '4',
            'name' => 'Rode Wielen',
            'src' => '/assets/img/players/cycles/fiets1redwheels.png',
            'price' => 50000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '5',
            'name' => 'Blauw Frame',
            'src' => '/assets/img/players/cycles/fiets1blueframe.png',
            'price' => 10000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '6',
            'name' => 'Rood Frame',
            'src' => '/assets/img/players/cycles/fiets1redframe.png',
            'price' => 10000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '7',
            'name' => 'Groen Frame',
            'src' => '/assets/img/players/cycles/fiets1greenframe.png',
            'price' => 10000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '8',
            'name' => 'Zwart Frame',
            'src' => '/assets/img/players/cycles/fiets1blackframe.png',
            'price' => 10000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '9',
            'name' => 'Paars Frame',
            'src' => '/assets/img/players/cycles/fiets1purpleframe.png',
            'price' => 10000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '10',
            'name' => 'Roze Frame',
            'src' => '/assets/img/players/cycles/fiets1pinkframe.png',
            'price' => 10000,
        ]);

        \App\Models\BicycleSkin::create([
            'id' => '11',
            'name' => 'Regenboog',
            'src' => '/assets/img/players/cycles/fiets1rainbow.png',
            'price' => 200000,
        ]);

       

    }
}
