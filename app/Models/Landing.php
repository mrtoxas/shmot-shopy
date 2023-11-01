<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Landing extends Model
{
    use HasFactory;

    protected $table = 'landings';

    protected $fillable = [
        'name',
        'created_by'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function landingSettings()
    {
        return $this->hasOne(LandingSettings::class, 'landing_id');
    }

    public function globalProduct()
    {
       return $this->hasOne(GlobalProduct::class, 'landing_id');
    }

    //TODO: поменять на advantages
    public function advantage()
    {
        return $this->hasMany(Advantage::class, 'landing_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'landing_id');
    }
}