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
    'rest'
  ];

  public function product()
    {
      return $this->belongsTo(Landing::class, 'product_id');
    }
}