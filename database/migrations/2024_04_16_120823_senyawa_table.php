<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('senyawa', function (Blueprint $table) {
            $table->id();
            $table->string('Phytochemical');
            $table->string('compoundClass');
            $table->string('CAS_Number');
            $table->string('Chemical_Formula');
            $table->int('Molecular_Mass');
            $table->string('IUPAC_Name');
            $table->string('SynonymZ');
            $table->string('Description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('senyawa');
    }
};
