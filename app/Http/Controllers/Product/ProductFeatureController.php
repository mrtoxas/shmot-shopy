<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ProductFeature;
use Illuminate\Validation\Rule;

class ProductFeatureController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
    $request->validate([
      '*.name' => 'required|string',
      '*.value' => 'required|string',
    ], [
      '*.name.unique' => 'Кожна назва повинна мати унікальна в межах продукту!',
      '*.name.required' => 'Назва переваги обов\'язкова!',
      '*.name.string' => 'Невірний формат данних, зверніться до админістратора!',
      '*.value.required' => 'Значення переваги обов\'язкове!',
      '*.value.string' => 'Невірний формат данних, зверніться до админістратора!',
    ]);

    $features = $request->all();

    $collection = collect($features);

    if ($collection->duplicates('name')->isNotEmpty()) {
      throw new \Exception('Кожна назва повинна мати унікальна в межах продукту!');
    }

    try {
      DB::beginTransaction();
      ProductFeature::whereNotIn('id', array_column($features, 'id'))->delete();

      foreach ($features as $item) {
        if (isset($item['id'])) {
          ProductFeature::updateOrCreate(['id' => $item['id']], $item);
        } else {
          $item["product_id"] = $productId;
          ProductFeature::create($item);
        }
      }
      DB::commit();

      return response()->json([       
        'message' => 'Переваги успішно змінені!'
      ], 200);
     
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при створені лендингу, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }


  }
}
