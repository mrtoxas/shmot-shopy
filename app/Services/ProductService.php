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
      $productImages = ProductImage::where('product_id', $productId)->pluck('img_name');

      Storage::delete($productImages->map(function ($imgName) {
          return 'public/images/' . $imgName;
      })->all());

    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }
}