<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GlobalProduct;

class GlobalProductController extends Controller
{
  public function update(Request $request, $id)
  {

    $request->validate([
      'sizes' => 'nullable|string',
      'price' => 'nullable|number',
      'discount' => 'nullable|number',
      'rest' => 'nullable|number',
      'drop_price' => 'nullable|number'
    ]);

    try {
      $globalProduct = GlobalProduct::firstOrCreate(['landing_id' => $id]);

      $globalProduct->update($request->data);

      return response()->json([
        'data' => $globalProduct,
        'message' => 'Голобальний продукт успішно збережено!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка при збереженнi даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }

  public function fetchGlobalProduct(Request $request)
  {
    try {
      $globalProduct = GlobalProduct::where('landing_id', $request->landing_id)->get();
      return response()->json($globalProduct, 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Помилка при завантаженні даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}
