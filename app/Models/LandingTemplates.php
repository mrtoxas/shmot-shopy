<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingThemes extends Model
{
    use HasFactory;

    protected $table = 'landing_templates';

    protected $fillable = [
        'name',
    ];
}