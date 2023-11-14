<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductData extends Model
{
  use HasFactory;

  protected $table = 'product_data';

  protected $fillable = [
    'product_id',
    'sizes',
    'price',
    'discount',
    'discounted_price',
    'rest'
  ];

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }
}