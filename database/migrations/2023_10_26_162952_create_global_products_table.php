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
        Schema::create('global_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('landing_id')->unique();
            $table->string('sizes')->nullable();
            $table->float('price')->nullable();
            $table->integer('discount')->nullable();
            $table->float('discounted_price')->nullable();
            $table->integer('description')->nullable();
            $table->integer('rest')->nullable();            
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
        Schema::dropIfExists('global_products');
    }
};