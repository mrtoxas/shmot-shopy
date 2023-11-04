<?php

namespace App\Services;

use Illuminate\Support\Facades\App;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Exceptions\InvalidOrderException;

class ProductService
{
  public function deleteAllProductImages($productId)
  {
    try {

      $productImages = ProductImage::where('product_id', $productId)->get();

      foreach ($productImages as $image) {
        $imgName = $image->img_name;
        Storage::delete(env('IMG_DIR') . '/' . $imgName);
      }
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }
}