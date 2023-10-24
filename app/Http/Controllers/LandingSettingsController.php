<?php

namespace App\Http\Controllers;

use App\Models\LandingSettings;
use Illuminate\Http\Request;

class LandingSettingsController extends Controller
{
  public function update(Request $request, $id)
  {               
    $request->validate([      
      'is_pub' => 'boolean',
      'meta_title' => 'nullable|string',
      'meta_description' => 'nullable|string',
      'fb_pixel_key' => 'nullable|string',
      'telegram_chat_id' => 'nullable|string',
      'crm_api_key' => 'nullable|string',
      'telegram_token' => 'nullable|string'
    ]);

    try {
      $landingSettings = LandingSettings::firstOrNew(['landing_id' => '1']);
      
      $landingSettings->update($request->data);
      
      return response()->json([
        'data' => $landingSettings,
        'message' => 'Налаштування успішно збережено!'
      ], 200);      
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при збереженнi Загальних налаштувань, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }

  public function fetchLandigSettings(Request $request)
  {
    try {
      $settings = LandingSettings::where('landing_id', $request->landing_id)->get();
      return response()->json($settings, 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні Загальних налаштувань, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}