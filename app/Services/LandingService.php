<?php

namespace App\Services;

use App\Models\Landing;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Exceptions\InvalidOrderException;

class LandingService
{
  public function cloneLanding($clone, $name)
  {
    try {

      $existingLanding = Landing::where('name', $clone)->first();

      $newLanding = $existingLanding->replicate();
      $newLanding->name = $name;
      $newLanding->save();


      // Clone Landing Settings
      $existingSettings = $existingLanding->landingSettings()->first();
      if ($existingSettings) {
        $newSettings = $existingSettings->replicate();
        $newSettings->landing_id = $newLanding->id;
        $newSettings->save();
      }


      // Clone Global Product
      $existingGlobalProduct = $existingLanding->globalProduct()->first();
      if ($existingGlobalProduct) {
        $newGlobalProduct = $existingGlobalProduct->replicate();
        $newGlobalProduct->landing_id = $newLanding->id;
        $newGlobalProduct->save();
      }

      // Clone Advantages
      $existingAdvantages = $existingLanding->advantage()->get();
      if ($existingAdvantages->isNotEmpty()) {
        foreach ($existingAdvantages as $existingAdvantage) {
          $newAdvantage = $existingAdvantage->replicate();
          $newAdvantage->landing_id = $newLanding->id;
          $newAdvantage->save();
        }
      }


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