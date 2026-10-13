<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Vacancy;

class VacancyUnitTest extends TestCase
{
    public function test_it_can_instantiate_vacancy_model()
    {
        $data = [
            'title' => 'Backend Developer',
            'company_name' => 'Dicoding Indonesia',
            'location' => 'Bandung',
            'job_type' => 'Full-Time',
        ];

        // Action
        $vacancy = new Vacancy($data);

        // Assert
        $this->assertEquals('Backend Developer', $vacancy->title);
        $this->assertEquals('Dicoding Indonesia', $vacancy->company_name);
        $this->assertEquals('Bandung', $vacancy->location);
    }
}