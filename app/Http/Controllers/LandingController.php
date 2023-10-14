<?php

namespace App\Http\Controllers;

use App\Models\Landing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LandingController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      $landings = Landing::where('created_by', Auth::user()->id)
        ->orderBy('created_at', 'desc')
        ->get();

      return Inertia::render('Dashboard', [
        'landings' => $landings
      ]);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Не удалось загрузить сайт';
      $errorMessageWithCode = $errorMessage . ' (Код ошибки: ' . $e->getCode() . ')';
      return redirect()->back()->with('error', $errorMessageWithCode);
    }
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|unique:landings|min:3|max:50',
      'clone' => 'nullable|string',
    ], [
      'name.required' => 'Поле "Назва сайту" обов\'язкове!',
      'name.unique' => 'Сайт с такою назвою вже існує!',
      'name.min' => 'Занадто коротка назва! Мiнiмум 3 символи.',
      'name.max' => 'Занадто довга назва! Максимум 50 символiв.',
    ]);

    try {
      Landing::create([
        'name' => $request->input('name'),
        'created_by' => Auth::user()->id,
      ]);

      return redirect()->route('dashboard')->with('success', 'Лендінг успішно створенно!');
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при створенні лендингу, зверніться до адміністратора.';
      return redirect()->back()->with('error', $errorMessage);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Landing $landing)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Landing $landing)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Landing $landing)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Landing $landing)
  {
    //
  }
}