<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("shifts")->insert([
            [
                'name' => 'Pagi',
                'work_time' => '11:00:00',
                'home_time' => '12:00:00',
            ],
            [
                'name' => 'Siang',
                'work_time' => '13:00:00',
                'home_time' => '14:00:00',
            ]
        ]);
    }
}
