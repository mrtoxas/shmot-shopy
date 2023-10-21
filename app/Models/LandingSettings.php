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
    'theme',
    'meta_title',
    'meta_description',
    'fb_pixel_key',
    'telegram_chat_id',
    'crm_api_key',
    'telegram_token',
    'vendor_name',
    'theme_settings'
  ];

  public function landing()
  {
    return $this->belongsTo(Landing::class);
  }
}
