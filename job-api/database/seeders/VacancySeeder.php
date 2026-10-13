<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vacancy;
use Carbon\Carbon;

class VacancySeeder extends Seeder
{
    public function run(): void
    {
        $vacancies = [
            [
                'user_id' => 1,
                'title' => 'Product Engineer',
                'company_name' => 'Dicoding Indonesia',
                'location' => 'Bandung',
                'job_type' => 'Full-Time',
                'experience' => '1 - 3 tahun',
                'active_until' => Carbon::now()->addDays(15),
                'description' => 'Sebagai Product Engineer, Anda akan bergabung dengan tim Product & Engineering dalam membangun produk yang berdampak bagi pengguna.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'title' => 'Android Developer',
                'company_name' => 'Dicoding Indonesia',
                'location' => 'Jakarta',
                'job_type' => 'Full-Time',
                'experience' => '4 - 5 tahun',
                'active_until' => Carbon::now()->addDays(20),
                'description' => 'Kami mencari Android Developer berpengalaman untuk mengembangkan aplikasi mobile native.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],            
            [
                'user_id' => 1,
                'title' => 'Web Developer',
                'company_name' => 'Dicoding Indonesia',
                'location' => 'Jakarta',
                'job_type' => 'Full-Time',
                'experience' => '4 - 5 tahun',
                'active_until' => Carbon::now()->addDays(20),
                'description' => 'Kami mencari Web Developer berpengalaman untuk mengembangkan Web App.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],            
            [
                'user_id' => 1,
                'title' => 'AI Engineer',
                'company_name' => 'Dicoding Indonesia',
                'location' => 'Jakarta',
                'job_type' => 'Full-Time',
                'experience' => '4 - 5 tahun',
                'active_until' => Carbon::now()->addDays(20),
                'description' => 'Kami mencari AI Engineer berpengalaman untuk mengembangkan LLM yang kami miliki.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'title' => 'iOS Developer',
                'company_name' => 'Dicoding Indonesia',
                'location' => 'Bandung',
                'job_type' => 'Full-Time',
                'experience' => '1 - 3 tahun',
                'active_until' => Carbon::now()->addDays(10),
                'description' => 'Membangun aplikasi iOS yang smooth dan responsif.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];

        foreach ($vacancies as $vacancy) {
            Vacancy::create($vacancy);
        }
    }
}