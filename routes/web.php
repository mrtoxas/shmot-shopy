<?php

use App\Http\Controllers\ProfileController;;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Landing\SettingsController;
use App\Http\Controllers\LandingTemplateController;
use App\Http\Controllers\Landing\GlobalProductController;
use App\Http\Controllers\Landing\AdvantageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckLandingAccess;

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

Route::get('/landings', function () {
    return Inertia::render('landings');
})->middleware(['auth', 'verified'])->name('landings');

Route::get('/landings/{landingId}', function ($landingId) {
    return Inertia::render('landing', ['landingId' => $landingId]);
})
    ->name('landing.admin')
    ->middleware(['auth', 'verified'])
    ->middleware(CheckLandingAccess::class);

Route::middleware('auth')->group(function () {
    Route::get('/api/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/api/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/api/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/api/landings', [LandingController::class, 'store'])->name('api.landings.store');    
    Route::get('/api/landings', [LandingController::class, 'index'])->name('api.landings.all');
    Route::get('/api/landings/{landingId}', [LandingController::class, 'fetchWithAllData'])->name('api.landingData.index');
});

Route::middleware(['auth', 'check_landing_access'])->group(function () {
    Route::delete('/api/landings/{landingId}', [LandingController::class, 'destroy'])->name('api.landing.destroy');
    Route::post('/api/landing/{landingId}/settings', [SettingsController::class, 'update'])->name('api.settings.update');
    Route::post('/api/landing/{landingId}/product', [GlobalProductController::class, 'update'])->name('api.product.update');
    Route::post('/api/landing/{landingId}/advantages', [AdvantageController::class, 'update'])->name('api.advantages.update');
});


Route::get('/api/templates', [LandingTemplateController::class, 'getAllThemes'])->name('api.templates.all');
Route::get('/api/templates/{id}', [LandingTemplateController::class, 'getThemeById'])->name('api.templates.single');

require __DIR__ . '/auth.php';