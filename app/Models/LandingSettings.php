<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingSettings extends Model
{
  use HasFactory;

  protected $table = 'landing_settings';

  protected $fillable = [
    'landing_id',
    'is_pub',
    'meta_title',
    'meta_description',
    'fb_pixel_key',
    'telegram_chat_id',
    'crm_api_key',
    'telegram_token',
    'template_id',
    'template_settings',
    'use_global_product'
  ];

  public function landing()
  {
    return $this->belongsTo(Landing::class, 'landing_id');
  }
}
