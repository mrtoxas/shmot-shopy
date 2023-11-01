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
}
