<?php

use App\Http\Controllers\Api\V1\LocationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api.key', 'throttle:60,1'])->prefix('v1')->group(function () {
    Route::get('locations', [LocationController::class, 'index']);
    Route::post('locations', [LocationController::class, 'store']);
});
