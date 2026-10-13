<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class VacancyController extends Controller
{
    public function index(Request $request)
    {
        $vacancies = Vacancy::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $vacancies
        ]);
    }

    //GET
    public function myVacancies(Request $request)
    {
        $vacancies = Vacancy::where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $vacancies
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $vacancy = Vacancy::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$vacancy) {
            return response()->json(['success' => false, 'message' => 'Lowongan tidak ditemukan atau Anda tidak memiliki akses.'], 403);
        }

        $vacancy->delete();

        return response()->json(['success' => true, 'message' => 'Lowongan berhasil dihapus.']);
    }

    //POST
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'position' => 'required|string',
            'job_type' => 'required|string',
            'candidates_required' => 'required|integer|min:1',
            'active_until' => 'required|date|after_or_equal:today',
            'location' => 'required|string',
            'is_remote' => 'boolean',
            'description' => 'required|string',
            'min_salary' => 'nullable|numeric',
            'max_salary' => 'nullable|numeric',
            'show_salary' => 'boolean',
            'min_experience' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $vacancy = Vacancy::create([
            'user_id' => Auth::id(),
            'company_name' => 'Dicoding Indonesia',
            'title' => $request->title,
            'position' => $request->position,
            'job_type' => $request->job_type,
            'candidates_required' => $request->candidates_required,
            'active_until' => $request->active_until,
            'location' => $request->location,
            'is_remote' => $request->is_remote ?? false,
            'description' => $request->description,
            'min_salary' => $request->min_salary,
            'max_salary' => $request->max_salary,
            'show_salary' => $request->show_salary ?? false,
            'experience' => $request->min_experience,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lowongan pekerjaan berhasil dibuat.',
            'data' => $vacancy
        ], 201);
    }

    public function show($id)
    {
        $vacancy = Vacancy::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$vacancy) {
            return response()->json(['success' => false, 'message' => 'Lowongan tidak ditemukan.'], 404);
        }

        return response()->json(['success' => true, 'data' => $vacancy]);
    }

    // PUT/PATCH /api/recruiter/vacancies/{id}
    public function update(Request $request, $id)
    {
        $vacancy = Vacancy::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$vacancy) {
            return response()->json(['success' => false, 'message' => 'Lowongan tidak ditemukan atau Anda tidak memiliki akses.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'position' => 'required|string',
            'job_type' => 'required|string',
            'candidates_required' => 'required|integer|min:1',
            'active_until' => 'required|date',
            'location' => 'required|string',
            'is_remote' => 'boolean',
            'description' => 'required|string',
            'min_salary' => 'nullable|numeric',
            'max_salary' => 'nullable|numeric',
            'show_salary' => 'boolean',
            'min_experience' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $vacancy->update([
            'title' => $request->title,
            'position' => $request->position,
            'job_type' => $request->job_type,
            'candidates_required' => $request->candidates_required,
            'active_until' => $request->active_until,
            'location' => $request->location,
            'is_remote' => $request->is_remote ?? false,
            'description' => $request->description,
            'min_salary' => $request->min_salary,
            'max_salary' => $request->max_salary,
            'show_salary' => $request->show_salary ?? false,
            'experience' => $request->min_experience,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lowongan berhasil diperbarui.',
            'data' => $vacancy
        ]);
    }
}