<?php

namespace App\Services;

use App\Models\Landing;
use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Exceptions\InvalidOrderException;
use Illuminate\Support\Facades\Storage;

class LandingService
{
  public function cloneLanding($clone, $name)
  {
    try {

      DB::beginTransaction();

      $existingLanding = Landing::where('name', $clone)->first();

      $newLanding = $existingLanding->replicate();
      $newLanding->name = $name;
      $newLanding->save();


      // Clone Landing Settings
      $existingSettings = $existingLanding->landingSettings()->first();
      if ($existingSettings) {
        $newSettings = $existingSettings->replicate();
        $newSettings->landing_id = $newLanding->id;
        $newSettings->save();
      }


      // Clone Global Product
      $existingGlobalProduct = $existingLanding->globalProduct()->first();
      if ($existingGlobalProduct) {
        $newGlobalProduct = $existingGlobalProduct->replicate();
        $newGlobalProduct->landing_id = $newLanding->id;
        $newGlobalProduct->save();
      }

      // Clone Advantages
      $existingAdvantages = $existingLanding->advantage()->get();
      if ($existingAdvantages->isNotEmpty()) {
        foreach ($existingAdvantages as $existingAdvantage) {
          $newAdvantage = $existingAdvantage->replicate();
          $newAdvantage->landing_id = $newLanding->id;
          $newAdvantage->save();
        }
      }

      // Clone Products
      $existingProducts = $existingLanding->products()->get();
      if ($existingProducts->isNotEmpty()) {
        foreach ($existingProducts as $existingProduct) {
          $newProduct = $existingProduct->replicate();
          $newProduct->landing_id = $newLanding->id;
          $newProduct->save();

          // Clone ProductData
          $existingProductData = $existingProduct->productData()->get();
          if ($existingProductData->isNotEmpty()) {
            foreach ($existingProductData as $existingData) {
                $newData = $existingData->replicate();
                $newData->product_id = $newProduct->id;
                $newData->save();
            }
          }

          // Clone ProductImages
          // $existingProductImages = $existingProduct->productImages()->get();
          // if ($existingProductImages->isNotEmpty()) {
          //   foreach ($existingProductImages as $existingImages) {
          //       $newData = $existingImages->replicate();
          //       $newData->product_id = $newProduct->id;
          //       $newData->save();
          //   }
          // }

          // Clone ProductFeatures
          $existingProductFeatures = $existingProduct->productFeatures()->get();
          if ($existingProductFeatures->isNotEmpty()) {
            foreach ($existingProductFeatures as $existingFeatures) {
                $newData = $existingFeatures->replicate();
                $newData->product_id = $newProduct->id;
                $newData->save();
            }
          }

          // Clone ProductAdvantages
          $existingProductAdvantages = $existingProduct->productAdvantages()->get();
          if ($existingProductAdvantages->isNotEmpty()) {
            foreach ($existingProductAdvantages as $existingAdvantages) {
                $newData = $existingAdvantages->replicate();
                $newData->product_id = $newProduct->id;
                $newData->save();
            }
          }
        }
      }

      DB::commit();
      
      return $newLanding;
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception($e->getMessage());
    }
  }

  public function createLanding($name)
  {
    try {
      $landing = Landing::create([
        'name' => $name,
        'created_by' => Auth::user()->id,
      ]);
      return $landing;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  public function removeAllLandingImages($landingId)
  {
    $productIds = Product::where('landing_id', $landingId)->pluck('id');
    $imageNames = ProductImage::whereIn('product_id', $productIds)->pluck('img_name');
    Storage::delete($imageNames->map(function ($imgName) {
        return env('IMG_DIR') . '/' . $imgName;
    })->all());
  }
}