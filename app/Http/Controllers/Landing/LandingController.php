<?php

namespace App\Http\Controllers\Landing;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\LandingService;
use App\Models\Landing;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

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

  public function fetchWithAllData(Request $request)
  {
    try {
      $landing_data = Landing::where('created_by', Auth::user()->id)->find($request->landingId);

      if ($landing_data === null) {
        return response()->json(['message' => 'Лендинг не знайдено!'], 404);
      }

      $landing_data->load('globalProduct');
      $landing_data->load('landingSettings');
      $landing_data->load('advantage');
      $landing_data->load('products');      
      $landing_data->load('reviews');      

      return response()->json(['data' => $landing_data], 200);

    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request, LandingService $landingService)
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

    $name = $request->input('name');
    $clone = $request->input('clone');    

    try {
      if ($clone) {
        $landing = $landingService->cloneLanding($clone, $name);
      } else {
        $landing = $landingService->createLanding($name);
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
   * Remove the specified resource from storage.
   */
  public function destroy($id, LandingService $landingService)
  {
    try {
      DB::beginTransaction();
      $landing = Landing::find($id);

      if (!$landing || $landing->created_by != Auth::user()->id) {
        DB::rollBack();
        throw new \Exception('Ви не можете видалити цей сайт', 403);
      }

      $directoryPath = public_path('images/landings/' . $id);

      if (File::exists($directoryPath)) {
        File::deleteDirectory($directoryPath); 
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
      $landing = Landing::with([
        'landingSettings',
        'globalProduct',
        'advantage',
        'products',        
        'reviews',        
      ])->where('name', $landingName)->first();


      if ($landing === null) throw new \Exception('Лендiнг не знайдено', 404);

      if (!isset($landing->landingSettings->template_name)) throw new \Exception('Шаблон не знайдено', 404);

      $templateName = $landing->landingSettings->template_name;      

      return view('landing.' . $templateName . '.landing', [
        'landingId' => $landing["id"],
        'templateName' => $templateName,
        'landingSettings' => $landing->landingSettings,
        'globalProduct' => $landing->globalProduct,
        'advantage' => $landing->advantage,
        'products' => $landing->products,        
        'reviews' => $landing->reviews,
      ]);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка, зверніться до адміністратора!';
      return view('error', ['message' => $errorMessage]);     
    }
  }

  public function rename(Request $request)
  {
    $request->validate([
      'name' => 'required',
    ], [
      'name.required' => 'Поле "Назва сайту" обов\'язкове!',
    ]);

    $name = $request->input('name');
    $id = $request->landingId;

    try {
      $landing = Landing::find($id);
      $landing->name = $name;
      $landing->save();
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при видалені сайту, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }

  public function getLandingIdByName($landingName, $tables=[])
  {
    try {
      $landing = Landing::with($tables)->where('name', $landingName)->first();

      if ($landing === null) {
        throw new RecordNotFoundException('Запись не найдена');
      } else {
        return response()->json($landing, 200);
      }
    } catch (RecordNotFoundException $e) {
      return response()->json([
        'message' => 'Запись не найдена'
      ], 404);
    }
  }
}

