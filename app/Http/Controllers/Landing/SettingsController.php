<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Landing;
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
      'g_tag_id' => 'nullable|string',
      'template_name' => 'string',
      'template_settings' => 'nullable|json',
      'use_global_product' => 'boolean',
      'collection_name' => 'nullable|string',
      'collection_description' => 'nullable|string',
      'title_1' => 'nullable|string',
      'title_2' => 'nullable|string',
      'title_3' => 'nullable|string',
      'title_4' => 'nullable|string',
      'title_5' => 'nullable|string',
      'title_6' => 'nullable|string',
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

  public function updateThemeVariables(Request $request, $id)
  {
    try {
      $json = $request->except('_url'); 
      $data = json_encode($json, true); 
      $landingSettings = LandingSettings::where('landing_id', $id)->first();     

      if ($landingSettings) {
          $landingSettings->template_settings = $data;
          $landingSettings->save();
      }
      return response()->json([
        'data' => $data,
        'message' => 'Налаштування успішно збережено!'
      ], 200);  
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні Загальних налаштувань, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }   
  }
}