<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('userid');
            $table->string('username', 45);
            $table->string('first_name', 45);
            $table->string('middle_name', 25);
            $table->string('last_name', 25);
            $table->string('email', 40)->unique();
            $table->string('password', 60);
            $table->date('birthday');
            $table->string('contact_number',90);
            $table->string('profilepicture',90)->default('default-profile-pic.png');
            $table->enum('user_type',['a','d','s']);
            $table->enum('status',['a','d']);
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
