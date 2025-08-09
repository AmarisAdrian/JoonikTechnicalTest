<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationIndexRequest;
use App\Http\Requests\LocationStoreRequest;
use App\Http\Resources\LocationResource;
use App\Services\LocationService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;

class LocationController extends Controller
{
    use ApiResponseTrait;

    protected LocationService $service;
    public function __construct(LocationService $service)
    {
        $this->service = $service;
    }

    public function index(LocationIndexRequest $request): JsonResponse
    {
        $filters = $request->only(['name', 'code']);
        /** @var array<string, string> $filters */
        $filters = array_map(fn($v) => is_string($v) ? $v : '', $filters);
        $perPage = filter_var($request->input('per_page'), FILTER_VALIDATE_INT) ?: 10;
        $locations = $this->service->getLocations($filters, $perPage);

        if ($locations->isEmpty()) {
            return $this->noContentResponse('No se encontraron ubicaciones. ');
        }

        return $this->successPaginatedResponse($locations, 'Lista de ubicaciones cargados. ');
    }

    public function store(LocationStoreRequest $request): JsonResponse
    {
        /** @var array<string, mixed> $validatedData */
        $validatedData = $request->validated();

        $location = $this->service->createLocation($validatedData);

        return $this->createdResponse(
            (new LocationResource($location))->resolve(),
            'Ubicación creada correctamente.'
        );
    }
}
