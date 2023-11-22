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
      'reviews.*.name' => 'required|string',
      'reviews.*.img' => 'required|string',
      'reviews.*.info' => 'required|string',
      'reviews.*.review' => 'required|string',
      'deleted.*.id' => 'required|integer',
    ], [
      'reviews.*.name.required' => 'Ім\'я відгуку обов\'язкове!',
      'reviews.*.img.required' => 'Зображення відгуку обов\'язкова!',
      'reviews.*.info.required' => 'Інформация відгуку обов\'язкова!',
      'reviews.*.review.required' => 'Текст відгуку обов\'язковий!',
    ]);

    $reviews = $request->reviews;
    $deletedReviews = $request->deleted;

    try {
      DB::beginTransaction();

      foreach ($deletedReviews as $deletedItem) {
        $deletedId = $deletedItem['id'] ?? null;

        if ($deletedId !== null) {
          Review::where('id', $deletedId)->delete();
        }
      }

      foreach ($reviews as $review) {
        $reviewId = $review['id'] ?? null;

        $reviewData = [
          'name' => $review['name'],
          'img' => $review['img'],
          'info' => $review['info'],
          'review' => $review['review'],
          'landing_id' => $landingId,
        ];

        Review::updateOrCreate(['id' => $reviewId], $reviewData);
      }

      $allReviews = Review::where('landing_id', $landingId)->get();

      DB::commit();

      return response()->json([
        'data' => $allReviews,
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
