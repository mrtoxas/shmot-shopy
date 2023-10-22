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

  public function store(Request $request)
  {
    $request->validate([
      'landing_id'        => 'required|unique:landing_settings',
      'is_pub'            => 'boolean',
      'meta_title'        => 'nullable|string',
      'meta_description'  => 'nullable|string',
      'fb_pixel_key'      => 'nullable|string',
      'telegram_chat_id'  => 'nullable|string',
      'crm_api_key'       => 'nullable|string',
      'telegram_token'    => 'nullable|string',
    ]);

    try {  
        $user = Auth::user()->id;
        $landingSettings = LandingSettings::firstOrNew(['landing_id' => $landing_id]);

        $landingSettings->update($request->all());
        
        return response()->json($landingSettings, 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при збереженнi Загальних налаштувань, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}