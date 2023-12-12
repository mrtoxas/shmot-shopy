<?php

namespace App\Services;

use App\Models\Landing;
use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductService{
  public function cloneProduct($clone, $name, $article)
  {
    try {
      DB::beginTransaction();      

      $product = Product::with(
        'productVariants', 
        'productFeatures',        
        'productData',        
      )->where('id', $clone)->first();      

      $newProduct = $product->replicate();
      $newProduct->name = $name;
      $newProduct->article = $article;
      $newProduct->save();

      foreach (['productVariants', 'productFeatures', 'productData'] as $relation) {
        $items = $product->$relation()->get()->map(function ($item) use ($newProduct) {
            return $item->replicate(['product_id'])->setRelation('product', $newProduct);
        });
    
        $newProduct->$relation()->saveMany($items);
      }          

      DB::commit();
      
      return $newProduct;
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception($e->getMessage());
    }
  }
  public function createProduct($id, $name, $article)
  {
    try {
      $product = Product::create([
        'landing_id' => $id,
        'name' => $name,
        'article' => $article
      ]);
      return $product;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }
}