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
        Schema::create('tanaman', function (Blueprint $table) {
            $table->id();
            $table->string('Plant_Name');
            $table->string('Local_Name');
            $table->string('English_Name');
            $table->string('Kingdom');
            $table->string('SubKingdom');
            $table->string('Infrakingdom');
            $table->string('Superdivision');
            $table->string('Class');
            $table->string('Order');
            $table->string('Superorder');
            $table->string('Family');
            $table->string('Genus');
            $table->string('Species');
            $table->string('Synonym');
            $table->string('Geographical_Distribution');
            $table->text('Traditional_Uses');
            $table->text('BaTanRelated');
            $table->text('Reference');
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
        Schema::dropIfExists('tanaman');
    }
};
