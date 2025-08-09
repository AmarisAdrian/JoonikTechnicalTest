<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LocationService
{
    public function getLocations(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        $query = Location::query();

        if (!empty($filters['name'])) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }

        if (!empty($filters['code'])) {
            $query->where('code', 'like', '%' . $filters['code'] . '%');
        }

        return $query->paginate($perPage);
    }

    public function createLocation(array $data): Location
    {
        return Location::create($data);
    }
}
