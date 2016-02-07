<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePictureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('picture', function (Blueprint $table) {
            $table->increments('pictureid');
            $table->integer('itemid')->unsigned();
            $table->foreign('itemid')
                  ->references('itemid')->on('item')
                  ->onUpdate('cascade');
            $table->string('front', 90)->nullable();
            $table->string('back', 90)->nullable();
            $table->string('left', 90)->nullable();
            $table->string('right', 90)->nullable();
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
        Schema::drop('picture');
    }
}
