<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Models\Landing;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Landing\LandingController;

class PrivacyController extends Controller
{
  public function privacy(Request $request){

    $host = explode(".", $request->getHost())[0];

    $landing = app(LandingController::class)->getLandingIdByName( $host, [
      'landingSettings',
      'globalProduct'
    ]);

    $landingData = $landing->getData();

    $landingSettings = $landingData->landing_settings;
    $templateName = $landingSettings->template_name;

    return view('landing.' . $templateName . '.privacy', [
      'templateName' => $templateName
    ]);
  }
}