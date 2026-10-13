<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Vacancy;
use App\Models\User;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase; 

    public function test_it_can_fetch_and_search_vacancies_from_db()
    {
        $user = User::forceCreate([
            'name' => 'Test HR',
            'username' => 'hr_dicoding',
            'email' => 'hr_test@dicoding.com',
            'password' => bcrypt('rahasia123'),
            'role' => 'recruiter',
        ]);
        
        Vacancy::create([
            'user_id' => $user->id,
            'title' => 'Product Engineer',
            'company_name' => 'Dicoding',
            'location' => 'Jakarta',
            'job_type' => 'Full-Time',
            'experience' => '1-3 tahun',
            'active_until' => '2026-12-31',
            'description' => 'Desc'
        ]);

        Vacancy::create([
            'user_id' => $user->id,
            'title' => 'Marketing Specialist',
            'company_name' => 'Dicoding',
            'location' => 'Jakarta',
            'job_type' => 'Full-Time',
            'experience' => '1-3 tahun',
            'active_until' => '2026-12-31',
            'description' => 'Desc'
        ]);

        $response = $this->getJson('/api/vacancies?search=Product');

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonCount(1, 'data') 
                 ->assertJsonFragment(['title' => 'Product Engineer'])
                 ->assertJsonMissing(['title' => 'Marketing Specialist']);
    }
}