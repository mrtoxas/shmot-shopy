<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ProductFeature;

class ProductFeatureController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
    $request->validate([
      'features.*.name' => 'required|string',
      'features.*.value' => 'required|string',      
      'deleted.*.id' => 'required|integer',
    ], [
      'features.*.name.required' => 'Назва Характеристики обов\'язкова!',
      'features.*.name.string' => 'Невірний формат данних, зверніться до админістратора!',
      'features.*.value.required' => 'Значення Характеристики обов\'язкове!',
      'features.*.value.string' => 'Невірний формат данних, зверніться до админістратора!',
    ]);

    $features = $request->features;
    $deletedFeatures = $request->deleted;

    $collection = collect($features);    

    try {
      DB::beginTransaction();

      foreach ($deletedFeatures as $deletedItem) {        
        $deletedId = $deletedItem['id'] ?? null;

        if ($deletedId !== null) {
          ProductFeature::where('id', $deletedId)->delete();
        }
      }

      if ($collection->duplicates('name')->isNotEmpty()) {
        throw new \Exception('Кожна назва Характеристики повинна мати унікальна в межах продукту!');
      }

      foreach ($features as $feature) {
        $featureId = $feature['id'] ?? null;

        $featureData = [
          'name' => $feature['name'],
          'value' => $feature['value'], 
          'product_id' => $productId,
        ];

        ProductFeature::updateOrCreate(['id' => $featureId], $featureData);
      }

      $allFeatures = ProductFeature::where('product_id', $productId)->get();

      DB::commit();

      return response()->json([
        'data' => $allFeatures,
        'message' => 'Характеристики успішно змінені!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при оновлені характеристик, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }
}
