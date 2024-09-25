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
        Schema::create('chartvalues', function (Blueprint $table) {
            $table->id();
            $table->string('kode_chart');
            $table->bigInteger('chart_id');
            $table->bigInteger('aplikasi_id');
            $table->bigInteger('nama_device_id');
            $table->bigInteger('sub_nama_device_id');
            $table->bigInteger('nilai_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chartvalues');
    }
};
