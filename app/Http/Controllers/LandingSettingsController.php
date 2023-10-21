<?php

namespace App\Http\Controllers;

use App\Models\Landing\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
  public function fetchLandigSettings(Settings $landingSetting)
  {
    try {
      $settings = Settings::where('landing_id', $landingId)->get();
      return response()->json($settings, 200);    
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні Загальних налаштувань, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}