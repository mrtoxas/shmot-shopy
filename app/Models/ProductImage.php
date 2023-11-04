<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
  use HasFactory;

  protected $table = "product_images";

  protected $dates = ['deleted_at'];

  protected $fillable = [
    'product_id',
    'img_name'
  ];

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }
}