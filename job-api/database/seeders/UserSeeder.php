<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'John Seeker',
            'username' => 'jobseeker',
            'password' => Hash::make('D1c0dingJOBS!'),
            'role' => 'seeker'
        ]);

        User::create([
            'name' => 'HR Dicoding',
            'username' => 'recruiter',
            'password' => Hash::make('D1c0dingJOBS!'),
            'role' => 'recruiter'
        ]);
    }
}