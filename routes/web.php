<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LandingSettingsController;
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

    Route::get('/api/landings', [LandingController::class, 'index'])->name('landings.index');
    Route::post('/api/landings', [LandingController::class, 'store'])->name('landings.store');
    Route::delete('/api/landings/{landingId}', [LandingController::class, 'destroy'])->name('landing.destroy');
    Route::get('/api/landings/{landingId}', [LandingController::class, 'fetchWithAllData'])->name('landing.data.index');
    Route::post('/api/landing/{landingId}/settings', [LandingSettingsController::class, 'update'])
        ->name('landing.settings.update')
        ->middleware(CheckLandingAccess::class);
});

require __DIR__ . '/auth.php';