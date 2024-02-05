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
    'use_global_product',
    'fb_pixel_key',
    'telegram_chat_id',
    'crm_api_key',
    'telegram_token',
    'g_tag_id',
    'template_name',
    'template_settings',
    'collection_name',
    'collection_description',
    'title_1',
    'title_2',
    'title_3',
    'title_4',
    'title_5',
    'title_6',
  ];

  public function landing()
  {
    return $this->belongsTo(Landing::class, 'landing_id');
  }
}
