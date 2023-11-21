<?php

namespace App\Http\Controllers\Landing;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;

class LandingTemplateController extends Controller
{
  public function getAllThemes()
  {
    try {
      $templateFiles = File::glob(resource_path('views/landing/*/template.json'));

      $templates = [];
      foreach ($templateFiles as $templateFile) {
        $content = file_get_contents($templateFile);
        $template = json_decode($content);
        $templates[] = $template;
      }

      return response()->json($templates);

    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні шаблонiв, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }


  public function getTemplateByName(Request $request)
  {
    $request->validate([
      'name' => 'required|string',
    ]);

    $name = $request->name;

    try {
      $templatePath = resource_path("views/landing/{$name}/template.json");
      if (File::exists($templatePath)) {
        $content = File::get($templatePath);
        $template = json_decode($content);

        return response()->json($template);
      }

    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка завантаження шаблону, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}

