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
    public function up()
    {
        Schema::create('sbt', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('biokId');
            $table->foreign('biokId')->references('id')->on('bioaktivitas')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('snywId');
            $table->foreign('snywId')->references('id')->on('senyawa')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('tanId');
            $table->foreign('tanId')->references('id')->on('tanaman')->onDelete('cascade')->onUpdate('cascade');   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sbt');
    }
};
