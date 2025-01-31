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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("username", 100)->nullable(false)->unique("users_username_unique");
            $table->string("password", 100)->nullable(false);
            $table->string("completeName", 200)->nullable();
            $table->string("homeTown", 100)->nullable();
            $table->string("phoneNo", 100)->nullable();
            $table->string("email", 100)->nullable();
            $table->string("birthDate", 200)->nullable();
            $table->string("address", 300)->nullable();
            $table->string("token", 100)->nullable()->unique("users_token_unique");
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
        Schema::dropIfExists('users');
    }
};
