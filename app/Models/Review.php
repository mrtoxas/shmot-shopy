<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
  use HasFactory;
  protected $table = 'reviews';

  protected $fillable = [
    'landing_id',
    'name',
    'img',
    'info',
    'review'
  ];

  public function landing()
  {
    return $this->belongsTo(Landing::class, 'landing_id');
  }
}
