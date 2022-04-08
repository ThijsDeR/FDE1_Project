<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Name>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "token" => $this->faker->regexify('[A-Za-z0-9]{48}'),
            "name" => $this->faker->name(),
            "highscore" => $this->faker->numberBetween(),
            "upgrades" => '{
                "bike" => []
            }'
        ];
    }
}
