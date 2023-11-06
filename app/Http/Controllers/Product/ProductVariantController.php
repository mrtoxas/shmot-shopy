<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ProductVariant;

class ProductVariantController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
    $request->validate([
      '*.name' => 'required|string',
      '*.value' => 'required|string',
    ], [      
      '*.name.required' => 'Назва варіанту обов\'язкова!',
      '*.name.string' => 'Невірний формат данних, зверніться до админістратора!',
      '*.value.required' => 'Значення варіанту обов\'язкове!',
      '*.value.string' => 'Невірний формат данних, зверніться до админістратора!',
    ]);

    $variants = $request->all();

    $collection = collect($variants);

    if ($collection->duplicates('name')->isNotEmpty()) {
      throw new \Exception('Кожна назва варіанту повинна мати унікальна в межах продукту!');
    }

    try {
      DB::beginTransaction();
      ProductVariant::whereNotIn('id', array_column($variants, 'id'))->delete();

      foreach ($variants as $item) {
        if (isset($item['id'])) {
          ProductVariant::updateOrCreate(['id' => $item['id']], $item);
        } else {
          $item["product_id"] = $productId;
          ProductVariant::create($item);
        }
      }
      DB::commit();

      return response()->json([       
        'message' => 'Варіанти успішно змінені!'
      ], 200);
     
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при оновлені варіантів, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }
}
