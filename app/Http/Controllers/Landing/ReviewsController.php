<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewsController extends Controller
{
  public function update(Request $request, $landingId)
  {
    $request->validate([
      '*.name' => 'required|string',
      '*.img' => 'required|string',
      '*.info' => 'required|string',
      '*.review' => 'required|string',
    ], [
      '*.name.required' => 'Ім\'я відгуку обов\'язкове!',
      '*.img.required' => 'Зображення відгуку обов\'язкова!',
      '*.info.required' => 'Інформация відгуку обов\'язкова!',
      '*.review.required' => 'Текст відгуку обов\'язковий!',
    ]);

    $reviews = $request->all();    

    try {
      DB::beginTransaction();
      Review::whereNotIn('id', array_column($reviews, 'id'))->delete();

      foreach ($reviews as $item) {
        if (isset($item['id'])) {
          Review::updateOrCreate(['id' => $item['id']], $item);
        } else {
          $item["landing_id"] = $landingId;
          Review::create($item);
        }
      }
      DB::commit();

      return response()->json([
        'message' => 'Відгуки успішно збережені!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при оновлені відгуків, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }
}
