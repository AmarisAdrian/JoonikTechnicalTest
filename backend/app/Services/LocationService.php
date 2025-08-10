<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LocationService
{
    /**
     * @param array<string, string> $filters
     * @param int $perPage
     * @return LengthAwarePaginator<int, Location>
     */
    public function getLocations(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        $query = Location::query();

        if (!empty($filters['name'])) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }


        if (! empty($filters['code'])) {
            $query->where('code', 'like', '%' . $filters['code'] . '%');
        }

        return $query->paginate($perPage);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function createLocation(array $data): Location
    {
        $randomImageId = rand(1, 99);
        $data['image'] = 'https://picsum.photos/400/300?random=' . $randomImageId;
        return Location::create($data);
    }
}
