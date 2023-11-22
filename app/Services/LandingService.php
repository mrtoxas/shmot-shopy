<?php

namespace App\Services;

use App\Models\Landing;
use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class LandingService
{
  public function cloneLanding($clone, $name)
  {
    try {

      DB::beginTransaction();      

      $landing = Landing::with(
        'landingSettings', 
        'globalProduct',        
        'advantage',
        'reviews',
        'products',
        'products.productData',
        'products.productImages',
        'products.productFeatures',
        'products.productVariants',
      )->where('name', $clone)->first();      

      $newLanding = $landing->replicate();
      $newLanding->name = $name;
      $newLanding->save();

      foreach (['landingSettings', 'globalProduct', 'advantage', 'reviews'] as $relation) {
        $items = $landing->$relation()->get()->map(function ($item) use ($newLanding) {
            return $item->replicate(['landing_id'])->setRelation('landing', $newLanding);
        });
    
        $newLanding->$relation()->saveMany($items);
      }      

      foreach ($landing->products as $product) {
        $newProduct = $product->replicate();
        $newProduct->landing_id = $newLanding->id;
        $newProduct->save();
            
        foreach (['productData', 'productImages', 'productFeatures', 'productVariants'] as $relation) {
            $items = $product->$relation()->get()->map(function ($item) use ($newProduct) {
                $newItem = $item->replicate(['product_id'])->setRelation('product', $newProduct);
                $newItem->product_id = $newProduct->id;
                return $newItem;
            });
    
            $newProduct->$relation()->saveMany($items);
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