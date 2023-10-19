<?php

namespace App\Http\Controllers;

use App\Models\Landing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

      return response()->json($landings, 200);

    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні списку сайтів, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
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
      if (!$request->clone) {
        $landing = Landing::create([
          'name' => $request->input('name'),
          'created_by' => Auth::user()->id,
        ]);
      }

      return response()->json([
        'data' => $landing,
        'message' => 'Сайт успішно створено!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при створені лендингу, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
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
  public function destroy($id)
  {
    try {
      DB::beginTransaction();
      $landing = Landing::find($id);

      if (!$landing || $landing->created_by != Auth::user()->id) {
        DB::rollBack();
        throw new \Exception('Ви не можете видалити цей сайт', 403);
      }

      $landing->delete();

      DB::commit();

      return response()->json([
        'message' => 'Сайт успішно видалено!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при видалені лендингу, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }

  public function getForDomain(Request $request, $landingName)
  {    
    try {      
      return view('landing.default.index');
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при видалені лендингу, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }
}