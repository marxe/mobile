<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCancellingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cancelling', function (Blueprint $table) {
            $table->increments('cancelid');
            $table->integer('itemid')->unsigned();
            $table->foreign('itemid')
                  ->references('itemid')->on('item')
                  ->onUpdate('cascade');
            $table->integer('userid')->unsigned();
            $table->foreign('userid')
                  ->references('userid')->on('users')
                  ->onUpdate('cascade');
            $table->text('resons')->nullable();
            $table->enum('flag_acceptance',['n','a','d']);
            $table->text('refusal_reason')->nullable();
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
        Schema::drop('cancelling');
    }
}
