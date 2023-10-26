<?php

namespace App\Services;

use App\Models\Landing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LandingService
{
    public function cloneLanding($clone, $name)
    {
      try {
        
        $existingLanding = Landing::where('name', $clone)->first();

        $newLanding = $existingLanding->replicate();
        $newLanding->name = $name;
        $newLanding->save();

        $existingSettings = $existingLanding->landingSettings()->first();

        $newSettings = $existingSettings->replicate();
        $newSettings->landing_id = $newLanding->id;
        $newSettings->save();
        $newLanding->landingSettings()->save($newSettings);

        return $newLanding;
      } catch (Exception $e) {
          throw new Exception($e->getMessage());
      }
    }

    public function createLanding($name)
    {
      try {
        $landing = Landing::create([
          'name' => $name,
          'created_by' => Auth::user()->id,
        ]);
        return $landing;
      } catch (Exception $e) {
          throw new Exception($e->getMessage());
      }
    }
}