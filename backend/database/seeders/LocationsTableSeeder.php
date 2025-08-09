<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            'Barranquilla',
            'Cartagena',
            'Bogota',
            'Medellin',
            'Pereira',
            'Berlin',
            'Yopal',
            'Soledad',
            'Malambo',
            'Barcelona',
            'Roma',
            'Monteria',
        ];
        $locations = [];

        for ($i = 0; $i < 12; $i++) {
            $locations[] = [
                'code' => Str::upper(Str::random(6)),
                'name' => $cities[$i],
                'image' => 'https://picsum.photos/400/300?random='.($i + 1),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('locations')->insert($locations);
    }
}
