<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LandingSettings;

class SettingsController extends Controller
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
      'telegram_token' => 'nullable|string',
      'template_name' => 'string',
      'template_settings' => 'nullable|json',
      'use_global_product' => 'boolean',
    ]);    

    try {      
      $landingSettings = LandingSettings::updateOrCreate(
        ['landing_id' => $id],
        ['template_name' => $request->template_name]
    );

      $landingSettings->update($request->all());
      
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