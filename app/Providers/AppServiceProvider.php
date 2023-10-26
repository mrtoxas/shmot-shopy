<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\LandingService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(LandingService::class, function ($app) {
            return new LandingService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
