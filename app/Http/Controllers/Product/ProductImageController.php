<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\App;

class ProductImageController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
    try {
      $request->validate([
        'images' => 'array',
        'images.*' => 'file|mimes:jpeg,png,gif,jpg',
        'deleted' => 'array',
        'deleted.*' => 'exists:product_images,id',
      ]);

      $newImages = $request->file('images');
      $deleted = $request->deleted;

      if (!empty($newImages)){
        foreach ($newImages as $newImage) {
          $extension = $newImage->getClientOriginalExtension();
          $uniqueImageName = 'product_'. $landingId . '_' . $productId . '_' . Uuid::uuid4()->toString() . '.' . $extension;

          $newImage->storeAs(env('IMG_DIR'), $uniqueImageName);

          ProductImage::create(['product_id' => $productId, 'img_name' => $uniqueImageName]);
        }
      }

      if (!empty($deleted)){
        $imagesToDelete = ProductImage::whereIn('id', $deleted)->get();

        foreach ($imagesToDelete as $image) {
          Storage::delete(env('IMG_DIR') . '/' . $image->img_name);
        }

        ProductImage::destroy($deleted);
      }

      $productImages = ProductImage::where('product_id', $productId)->get();

      return response()->json([
        'data' => $productImages,
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
