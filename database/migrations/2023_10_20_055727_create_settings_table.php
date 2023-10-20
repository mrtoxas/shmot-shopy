<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('landing_id');
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->boolean('is_pub')->default(true);
            $table->string('fb_pixel_key')->nullable();
            $table->string('telegram_chat_id')->nullable();
            $table->string('crm_api_key')->nullable();
            $table->string('telegram_token')->nullable();
            $table->timestamps();

            $table->foreign('landing_id')
              ->references('id')->on('landings')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
