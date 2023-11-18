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
        Schema::create('landing_collections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('landing_id')->unique();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('head')->nullable();
            $table->string('subhead')->nullable();
            $table->string('description')->nullable();
            $table->string('action_title')->nullable();
            $table->string('action_subtitle')->nullable();
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
        Schema::dropIfExists('landing_collections');
    }
};