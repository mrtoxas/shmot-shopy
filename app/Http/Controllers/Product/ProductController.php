<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Product;
use App\Models\Landing;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Services\ProductService;

class ProductController extends Controller
{
  public function store(Request $request, $id, ProductService $productService)
  {
    $request->validate([
      'name' => 'required|string',
      'article' => [
        'required',
        'string',
        Rule::unique('products')->where(function ($query) use ($request, $id) {
          return $query->where('landing_id', $id);
        })
      ]
    ], [
      'name.required' => 'Поле "Назва товару" обов\'язкове!',
      'article.required' => 'Поле "Назва товару" обов\'язкове!',
      'article.unique' => 'Такий артикул вже icнує! Артикули повиннi бути унiкальними в межах сайту.'
    ]);

    $name = $request->input('name');
    $article = $request->input('article');
    $clone = $request->input('clone');

    try {
      if ($clone) {
        $product = $productService->cloneProduct($clone, $name, $article);
      } else {
        $product = $productService->createProduct($id, $name, $article);
      }

      return response()->json([
        'data' => $product,
        'message' => 'Продукт успішно додано!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при створені лендингу, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }

  public function destroy($landingId, $productId)
  {    
    try {
      $landing = Landing::find($landingId);

      if (!$landing || $landing->created_by != Auth::user()->id) {
        throw new \Exception('Ви не можете видалити цей товар', 403);
      }

      $product = Product::find($productId);      

      if ($product) {
        $product->delete();       
      }

      $directoryPath = public_path('images/landings/' . $landingId . '/products/' . $productId);
      File::deleteDirectory($directoryPath); 

      return response()->json([
        'message' => 'Товар успішно видалено!'
      ], 200);
    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при видалені товару, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage
      ], 500);
    }
  }

  public function fetchWithAllData(Request $request)
  {
    try {
      $product = Product::find($request->productId);

      if ($product === null) {
        return response()->json(['message' => 'Товар не знайдено!'], 404);
      }

      $product->load('ProductData');
      $product->load('ProductImages');
      $product->load('ProductFeatures');
      $product->load('ProductVariants');

      return response()->json(['data' => $product], 200);

    } catch (\Exception $e) {
      $errorMessage = config('app.debug') ? $e->getMessage() : 'Виникла помилка при завантаженні даних, зверніться до адміністратора.';
      return response()->json([
        'message' => $errorMessage,
      ], 500);
    }
  }
}
