<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ProductAdvantage;

class ProductAdvantageController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
    $request->validate([
      '*.name' => 'required|string',
      '*.value' => 'required|string',
    ], [      
      '*.name.required' => 'Назва переваги обов\'язкова!',
      '*.name.string' => 'Невірний формат данних, зверніться до админістратора!',
      '*.value.required' => 'Значення переваги обов\'язкове!',
      '*.value.string' => 'Невірний формат данних, зверніться до админістратора!',
    ]);

    $advantages = $request->all();

    $collection = collect($advantages);

    if ($collection->duplicates('name')->isNotEmpty()) {
      throw new \Exception('Кожна назва переваги повинна мати унікальна в межах продукту!');
    }

    try {
      DB::beginTransaction();
      ProductAdvantage::whereNotIn('id', array_column($advantages, 'id'))->delete();

      foreach ($advantages as $item) {
        if (isset($item['id'])) {
          ProductAdvantage::updateOrCreate(['id' => $item['id']], $item);
        } else {
          $item["product_id"] = $productId;
          ProductAdvantage::create($item);
        }
      }
      DB::commit();

      return response()->json([       
        'message' => 'Переваги успішно змінені!'
      ], 200);
     
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при оновлені переваг, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }
}
