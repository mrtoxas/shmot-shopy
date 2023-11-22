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
      'variants.*.name' => 'required|string',
      'variants.*.value' => 'required|string',
      'deleted.*.id' => 'required|integer',
    ], [
      '*.name.required' => 'Назва варіанту обов\'язкова!',
      '*.name.string' => 'Невірний формат данних, зверніться до админістратора!',
      '*.value.required' => 'Значення варіанту обов\'язкове!',
      '*.value.string' => 'Невірний формат данних, зверніться до админістратора!',
    ]);

    $variants = $request->variants;
    $deletedVariants = $request->deleted;

    $collection = collect($variants);

    try {
      DB::beginTransaction();

      foreach ($deletedVariants as $deletedItem) {
        $deletedId = $deletedItem['id'] ?? null;

        if ($deletedId !== null) {
          ProductVariant::where('id', $deletedId)->delete();
        }
      }

      if ($collection->duplicates('name')->isNotEmpty()) {
        throw new \Exception('Кожна назва варіанту повинна мати унікальна в межах продукту!');
      }

      foreach ($variants as $variant) {
        $variantId = $variant['id'] ?? null;

        $variantData = [
          'name' => $variant['name'],
          'value' => $variant['value'],
          'product_id' => $productId,
        ];

        ProductVariant::updateOrCreate(['id' => $variantId], $variantData);
      }

      $allFeatures = ProductVariant::where('product_id', $productId)->get();

      DB::commit();

      return response()->json([
        'data' => $allFeatures,
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
