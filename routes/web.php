<?php

use App\Http\Controllers\ProfileController;
;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Landing\SettingsController;
use App\Http\Controllers\LandingTemplateController;
use App\Http\Controllers\Landing\GlobalProductController;
use App\Http\Controllers\Landing\AdvantageController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductDataController;
use App\Http\Controllers\Product\ProductImageController;
use App\Http\Controllers\Product\ProductFeatureController;
use App\Http\Controllers\Product\ProductVariantController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::domain('{landingName}.' . env('APP_URL'))->group(function () {
  Route::get('/', [LandingController::class, 'getForDomain']);
});

Route::get('/', function () {
  return Inertia::render('welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::middleware('auth')->group(function () {
  Route::get('/api/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/api/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/api/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/landings', function () {
    return Inertia::render('landings');
  })->name('landings');

  Route::post(
    '/api/landings',
    [LandingController::class, 'store']
  )->name('api.landings.store');

  Route::get(
    '/api/landings',
    [LandingController::class, 'index']
  )->name('api.landings.all');

  Route::get(
    '/api/landings/{landingId}',
    [LandingController::class, 'fetchWithAllData']
  )->name('api.landingData.index');
});

Route::middleware(['auth', 'verified', 'check_landing_access'])->group(function () {
  Route::get('/landings/{landingId}', function ($landingId) {
    return Inertia::render('landing', ['landingId' => $landingId]);
  })->name('landing.admin');

  Route::get('/landings/{landingId}/{productId}', function ($landingId, $productId) {
    return Inertia::render(
      'product',
      ['landingId' => $landingId, 'productId' => $productId]
    );
  })->name('product.admin');

  Route::delete(
    '/api/landings/{landingId}',
    [LandingController::class, 'destroy']
  )->name('api.landing.destroy');

  Route::put(
    '/api/landings/{landingId}',
    [LandingController::class, 'rename']
  )->name('api.landing.rename');

  Route::post(
    '/api/landing/{landingId}/settings',
    [SettingsController::class, 'update']
  )->name('api.settings.update');

  Route::post(
    '/api/landing/{landingId}/global_product',
    [GlobalProductController::class, 'update']
  )->name('api.globalProduct.update');

  Route::post(
    '/api/landing/{landingId}/advantages',
    [AdvantageController::class, 'update']
  )->name('api.advantages.update');

  Route::get(
    '/api/landings/{landingId}/product/{productId}',
    [ProductController::class, 'fetchWithAllData']
  )->name('api.product.index');

  Route::post(
    '/api/landing/{landingId}/product',
    [ProductController::class, 'store']
  )->name('api.products.store');

  Route::delete(
    '/api/landings/{landingId}/product/{productId}',
    [ProductController::class, 'destroy']
  )->name('api.product.destroy');

  Route::post(
    '/api/landing/{landingId}/product/{productId}/product_data',
    [ProductDataController::class, 'update']
  )->name('api.productData.update');

  Route::post(
    '/api/landing/{landingId}/product/{productId}/product_images',
    [ProductImageController::class, 'update']
  )->name('api.productImages.update');

  Route::post(
    '/api/landing/{landingId}/product/{productId}/product_features',
    [ProductFeatureController::class, 'update']
  )->name('api.productFeatures.update');

  Route::post(
    '/api/landing/{landingId}/product/{productId}/product_variants',
    [ProductVariantController::class, 'update']
  )->name('api.productVariants.update');
});

Route::get(
  '/api/templates',
  [LandingTemplateController::class, 'getAllThemes']
)->name('api.templates.all');

Route::get(
  '/api/templates/{id}',
  [LandingTemplateController::class, 'getThemeById']
)->name('api.templates.single');

require __DIR__ . '/auth.php';