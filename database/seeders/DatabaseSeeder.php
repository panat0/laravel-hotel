<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Customer;
use App\Models\RoomType;
use App\Models\Room;
use App\Models\Booking;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Customer::factory(10)->create();
        RoomType::factory(3)->create()->each(function ($roomType) {
            $roomType->rooms()->saveMany(Room::factory(10)->make());
        });
        Booking::factory(20)->create();
    }
}
