<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Location;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\User;

class LocationTest extends TestCase
{
    use RefreshDatabase;

    protected $apiKey;

    protected function setUp(): void
    {
        parent::setUp();
        
        User::factory()->create();
        $this->apiKey = env("API_KEY");
    }

    #[Test]
    public function puede_crear_una_sede()
    {
        $data = [
            'name' => 'Baranoa',
            'code' => 'OVASFI'
        ];

        $response = $this->withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Accept' => 'application/json'
        ])->postJson('/api/v1/locations', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'Baranoa']);

        $this->assertDatabaseHas('locations', $data);
    }

    #[Test]
    public function puede_listar_sedes()
    {
        Location::factory()->count(5)->create();

        $response = $this->withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Accept' => 'application/json'
        ])->getJson('/api/v1/locations');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data', 'links', 'meta']);
    }

    #[Test]
    public function puede_filtrar_sedes_por_name()
    {
        Location::factory()->create(['name' => 'Bogota']);
        Location::factory()->create(['name' => 'Medellin']);

        $response = $this->withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Accept' => 'application/json'
        ])->getJson('/api/v1/locations?name=Bogota');

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Bogota'])
                 ->assertJsonMissing(['name' => 'Medellin']);
    }

    #[Test]
    public function puede_filtrar_sedes_por_code()
    {
        Location::factory()->create(['code' => 'ABC123']);
        Location::factory()->create(['code' => 'XYZ999']);

        $response = $this->withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Accept' => 'application/json'
        ])->getJson('/api/v1/locations?code=ABC123');

        $response->assertStatus(200)
                 ->assertJsonFragment(['code' => 'ABC123'])
                 ->assertJsonMissing(['code' => 'XYZ999']);
    }

    #[Test]
    public function la_paginacion_funciona_correctamente()
    {
        Location::factory()->count(15)->create();

        $response = $this->withHeaders([
            'X-API-KEY' => $this->apiKey,
            'Accept' => 'application/json'
        ])->getJson('/api/v1/locations?page=1');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data',
                     'links' => ['first', 'last', 'prev', 'next'],
                     'meta'  => ['current_page', 'last_page', 'per_page', 'total']
                 ]);
    }
}