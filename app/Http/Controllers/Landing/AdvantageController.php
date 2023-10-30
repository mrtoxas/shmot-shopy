<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Advantage;
use Illuminate\Support\Facades\Storage;

class AdvantageController extends Controller
{
  public function update(Request $request, $id)
  {

    // TODO: сделать валидацию files
    $request->validate([
      'caption.*' => 'required|string',
    ]);    

    try {
      $captions = $request->caption;
      $files = $request->file;

      $advantages = Advantage::where('landing_id', $id)->get();

      $fileNames = [];

      foreach ($files as $index => $file) {
        $oldImgName = $advantages[$index]->img_name ?? null;

        if (is_object($file) && $file->isValid()) {
          $extension = $file->getClientOriginalExtension();
          $fileName = 'advantage' . $id . '_' . $index . '.' . $extension;

          if ($oldImgName) {
            Storage::disk('public')->delete($oldImgName);
          }

          $file->storeAs('public', $fileName);
          $fileNames[$index] = $fileName;
        } else {
          $fileNames[$index] = $oldImgName;
        }
      }

      if ($advantages->isEmpty()) {
        $data = [];

        for ($i = 0; $i < count($captions); $i++) {
          $data[] = [
            'landing_id' => $id,
            'caption' => $captions[$i],
            'img_name' => $fileNames[$i],
          ];
        }

        Advantage::insert($data);

      } else {
        $advantages->each(function ($advantage, $index) use ($captions, $fileNames) {
          $advantage->caption = $captions[$index];
          $advantage->img_name = $fileNames[$index];
          $advantage->save();
        });
      }

      return response()->json([
        'message' => 'Переваги успішно збережено!'
      ], 200);

    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка при збереженнi даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}
