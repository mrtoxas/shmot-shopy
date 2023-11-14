<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GlobalProduct extends Model
{
    use HasFactory;

    protected $table = 'global_products';

    protected $fillable = [
        'landing_id',
        'sizes',
        'price',
        'discount',
        'rest',
        'discounted_price',
        'description'
    ];

    public function landing()
    {
        return $this->belongsTo(Landing::class, 'landing_id');
    }
}