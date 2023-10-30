<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advantage extends Model
{
    use HasFactory;

    protected $table = 'advantages';

    protected $fillable = [
        'landing_id',
        'img_name',
        'caption'
    ];
   
    public function landing()
    {
        return $this->belongsTo(Landing::class, 'landing_id');
    }
}
