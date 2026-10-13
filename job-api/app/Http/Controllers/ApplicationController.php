<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    // POST /api/seeker/apply
    public function apply(Request $request)
    {
        $request->validate(['vacancy_id' => 'required|exists:vacancies,id']);

        $exists = Application::where('user_id', Auth::id())
            ->where('vacancy_id', $request->vacancy_id)
            ->exists();

        if ($exists) {
            return response()->json(['success' => false, 'message' => 'Anda sudah melamar pekerjaan ini.'], 400);
        }

        Application::create([
            'user_id' => Auth::id(),
            'vacancy_id' => $request->vacancy_id,
            'status' => 'Terkirim'
        ]);

        return response()->json(['success' => true, 'message' => 'Berhasil melamar pekerjaan!']);
    }

    // GET /api/seeker/applications
    public function myApplications()
    {
        $applications = Application::with('vacancy')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json(['success' => true, 'data' => $applications]);
    }
}
