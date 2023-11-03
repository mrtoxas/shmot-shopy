<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
    try {
      $newImages = $request->file('images');

      foreach ($newImages as $newImage) {
        $extension = $newImage->getClientOriginalExtension();
        $uniqueImageName = 'product_'. $productId . '_' . Uuid::uuid4()->toString() . '.' . $extension;
        $newImage->storeAs('public', $uniqueImageName);

        ProductImage::create(['product_id' => $productId, 'img_name' => $uniqueImageName]);
      }

      return response()->json([
        'message' => 'Данi успішно збережено!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка при збереженнi даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}
