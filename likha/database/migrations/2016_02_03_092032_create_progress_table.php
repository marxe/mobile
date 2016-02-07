<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('upprogress', function (Blueprint $table) {
            $table->increments('upprogressid');
            $table->integer('itemid')->unsigned();
            $table->foreign('itemid')
                  ->references('itemid')->on('item')
                  ->onUpdate('cascade');
            $table->string('progress_picture')->nullable();
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
        Schema::drop('upprogress');
    }
}
