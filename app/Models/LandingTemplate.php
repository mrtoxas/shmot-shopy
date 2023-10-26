<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingTemplate extends Model
{
    use HasFactory;

    protected $table = 'landing_templates';

    protected $fillable = [
        'name',
    ];
}