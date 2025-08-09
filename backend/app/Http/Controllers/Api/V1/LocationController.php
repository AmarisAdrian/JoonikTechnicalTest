<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationIndexRequest;
use App\Http\Requests\LocationStoreRequest;
use App\Http\Resources\LocationResource;
use App\Services\LocationService;

class LocationController extends Controller
{
    protected LocationService $service;

    public function __construct(LocationService $service)
    {
        $this->service = $service;
    }

    public function index(LocationIndexRequest $request)
    {
        $filters = $request->only(['name', 'code']);
        $perPage = $request->input('per_page', 10);

        $locations = $this->service->getLocations($filters, $perPage);

        return LocationResource::collection($locations);
    }

    public function store(LocationStoreRequest $request)
    {
        $location = $this->service->createLocation($request->validated());

        return new LocationResource($location);
    }
}
