<?php

namespace Database\Factories;
use Database\Factories\RoomTypeFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use app\Models\RoomType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'room_number' => $this->faker->unique()->numerify('Room ###'),
            'room_type_id' => RoomType::factory(),
        ];
    }
}
