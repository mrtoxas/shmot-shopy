<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingCollection extends Model
{
    use HasFactory;

    protected $table = 'landing_collections';

    protected $fillable = [
        'landing_id',
        'title',
        'subtitle',
        'head',
        'subhead',
        'description',
        'action_title',
        'action_subtitle'
    ];
}