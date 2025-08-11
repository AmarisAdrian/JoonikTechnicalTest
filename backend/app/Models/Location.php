<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\LocationFactory;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @method static self create(array<string, mixed> $attributes = [])
 * @method static LocationFactory factory($count = null, $state = [])
 */
class Location extends Model
{
    /** @use HasFactory<LocationFactory> */
    use HasFactory;

    protected $fillable = ['name', 'code', 'image', 'created_at', 'updated_at'];
}
