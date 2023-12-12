<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use App\Models\ProductImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\App;
use Intervention\Image\Facades\Image;

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

      if (!empty($newImages)) {
          foreach ($newImages as $newImage) {
              $extension = $newImage->getClientOriginalExtension();
              $unique = Uuid::uuid4()->toString();
              $uniqueImageName = $unique . '.' . $extension;
              $uniqueImageThumbName = $unique . '_thumb.' . $extension;

              $image = Image::make($newImage);
              $image->resize(840, 840, function ($constraint) {
                  $constraint->aspectRatio();
                  $constraint->upsize();
              });

              $thumbImage = Image::make($newImage);
              $thumbImage->resize(400, 400, function ($constraint) {
                  $constraint->aspectRatio();
                  $constraint->upsize();
              });

              $destinationPath = public_path('images/landings/' . $landingId . '/products/' . $productId);

              if (!File::exists($destinationPath)) {
                  File::makeDirectory($destinationPath, $mode = 0777, true, true);
              }
              
              $image->save($destinationPath . '/' . $uniqueImageName);
              $thumbImage->save($destinationPath . '/' . $uniqueImageThumbName);

              ProductImage::create(['product_id' => $productId, 'img_name' => $uniqueImageName]);
          }
      }

      if (!empty($deleted)) {
          $imagesToDelete = ProductImage::whereIn('id', $deleted)->get();
          $destinationPath = 'images/landings/' . $landingId . '/products/' . $productId;

          foreach ($imagesToDelete as $image) {
              $imagePath = public_path($destinationPath . '/' . $image->img_name);
              
              $extension = pathinfo($image->img_name, PATHINFO_EXTENSION);
              $thumb_filename = pathinfo($image->img_name, PATHINFO_FILENAME) . '_thumb.' . $extension;
              $thumbPath = public_path($destinationPath . '/' . $thumb_filename);

              if (File::exists($imagePath)) {
                  File::delete([$imagePath, $thumbPath]);
              }
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
