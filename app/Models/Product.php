<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  use HasFactory;

  protected $table = 'products';

  protected $fillable = [
    'landing_id',
    'name',
    'article'
  ];

  public function landing()
  {
    return $this->belongsTo(Landing::class, 'landing_id');
  }

  public function productData()
  {
    return $this->hasOne(ProductData::class, 'product_id');
  }

  public function productImages()
  {
    return $this->hasMany(ProductImage::class, 'product_id');
  }

  public function productFeatures()
  {
    return $this->hasMany(ProductFeature::class, 'product_id');
  }

  public function productVariants()
  {
    return $this->hasMany(ProductVariant::class, 'product_id');
  }
}
