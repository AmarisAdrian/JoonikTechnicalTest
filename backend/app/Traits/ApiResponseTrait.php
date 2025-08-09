<?php

namespace App\Traits;

use App\Http\Resources\LocationResource;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

trait ApiResponseTrait
{
    public function noContentResponse(string $message): JsonResponse
    {
        return response()->json([
            'status_code' => 204,
            'success' => true,
            'message' => $message,
            'data' => [],
        ], 204);
    }

    /**
     * @param LengthAwarePaginator<int, \App\Models\Location> $data
     */
    public function successPaginatedResponse(LengthAwarePaginator $data, string $message): JsonResponse
    {
        return response()->json([
            'status_code' => 200,
            'success' => true,
            'message' => $message,
            'data' => LocationResource::collection($data)->resolve(),
            'links' => [
                'first' => $data->url(1),
                'last' => $data->url($data->lastPage()),
                'prev' => $data->previousPageUrl(),
                'next' => $data->nextPageUrl(),
            ],
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ],
        ], 200);
    }

    public function createdResponse(mixed $data, string $message): JsonResponse
    {
        return response()->json([
            'status_code' => 201,
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], 201);
    }

    public function deletedResponse(string $message): JsonResponse
    {
        return response()->json([
            'status_code' => 200,
            'success' => true,
            'message' => $message,
            'data' => null,
        ], 200);
    }

    public function errorResponse(string $message, int $statusCode = 400, mixed $errors = null): JsonResponse
    {
        return response()->json([
            'status_code' => $statusCode,
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }
}
