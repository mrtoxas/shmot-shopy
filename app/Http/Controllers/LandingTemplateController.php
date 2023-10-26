<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LandingTemplate;

class LandingTemplateController extends Controller
{
    public function getAllThemes()
    {
      try {
        $templates = LandingTemplate::all();
        return response()->json($templates);
      } catch (\Exception $e) {
        $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні шаблонiв, зверніться до адміністратора.';
        return response()->json([
          'message' => $errorMessage,
        ], 500);
      }  
    }

    public function getTemplateById(Request $request)
    {
      try {
        $template = LandingTemplate::find($request->templateId);
        return $template;
      } catch (\Exception $e) {
        $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка завантаження шаблону, зверніться до адміністратора.';
        return response()->json([
          'message' => $errorMessage,
        ], 500);
      }  
    }
}

