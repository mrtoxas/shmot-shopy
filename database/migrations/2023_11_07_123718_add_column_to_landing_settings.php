<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::table('landing_settings', function (Blueprint $table) {
      $table->boolean('use_global_product')->default(1)->after('is_pub');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('landing_settings', function (Blueprint $table) {
      //
    });
  }
};
