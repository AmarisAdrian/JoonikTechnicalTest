<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @method static self create(array<string, mixed> $attributes = [])
 */
class Location extends Model
{
    protected $fillable = ['name', 'code', 'image', 'created_at', 'updated_at'];
}
