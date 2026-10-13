<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\ApplicationController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/vacancies', [VacancyController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/recruiter/vacancies', [VacancyController::class, 'myVacancies']);
    Route::get('/recruiter/vacancies/{id}', [VacancyController::class, 'show']);
    Route::post('/recruiter/vacancies', [VacancyController::class, 'store']);
    Route::put('/recruiter/vacancies/{id}', [VacancyController::class, 'update']);
    Route::delete('/recruiter/vacancies/{id}', [VacancyController::class, 'destroy']);
    Route::post('/seeker/apply', [ApplicationController::class, 'apply']);
    Route::get('/seeker/applications', [ApplicationController::class, 'myApplications']);
});