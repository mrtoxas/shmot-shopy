<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductData;

class ProductDataController extends Controller
{
  public function update(Request $request, $landingId, $productId)
  {
     $request->validate([
      'sizes' => 'nullable|string',
      'price' => 'nullable|number',
      'discount' => 'nullable|number',
      'rest' => 'nullable|number',
    ]);

    try {
      $productData = ProductData::firstOrCreate(['product_id' => $productId]);

      $productData->update($request->data);

      return response()->json([
        'data' => $productData,
        'message' => 'Данi продукту успішно збережено!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка при збереженнi даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}