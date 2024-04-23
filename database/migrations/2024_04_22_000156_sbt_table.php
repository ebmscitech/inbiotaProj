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
        Schema::table('sbt', function (Blueprint $table) {
            $table->foreignId('senyawa_id')->constrained(
                table: 'senyawa', indexName: 'senyawa_id'
            );
            $table->foreignId('bioaktivitas_id')->constrained(
                table: 'bioaktivitas', indexName: 'bioaktivitas_id'
            );
            $table->foreignId('tanaman_id')->constrained(
                table: 'tanaman', indexName: 'tanaman_id'
            );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
