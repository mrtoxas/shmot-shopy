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
            
        foreach (['productData', 'productFeatures', 'productVariants'] as $relation) {
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

  public function getTemplateVariables($templateName, $userSettings){

    try {

      $userVariables = [];
      $templateVariables = [];

      $file_path = base_path('resources/views/landing/' . $templateName . '/template.json');
      $templateJson = file_get_contents($file_path);
      
      if ($templateJson === false) {
        throw new Exception("Помилка завантаження налаштувань шаблону");
      }

      $templateData = json_decode($templateJson, true);
      $templateVariables = $templateData["variables"];

      if ($userSettings){
        $userVariables = json_decode($userSettings, true);
      }

      if(!count($userVariables) && !count($templateVariables)){
        throw new \Exception('Налаштування шаблону не знайдено', 403);
      }
      
      $landingThemeVariables = $userVariables ?: $templateVariables;

      return $landingThemeVariables;

    } catch (\Exception $e) {
        throw $e;
    }
  }
}