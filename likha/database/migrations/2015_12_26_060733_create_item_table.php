<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item', function (Blueprint $table) {
            $table->increments('itemid');
            $table->integer('userid')->unsigned();
            $table->integer('progress')->unsigned()->nullable();
            $table->foreign('userid')
                  ->references('userid')->on('users')
                  ->onUpdate('cascade');
            $table->string('item_name', 90);
            $table->string('item_picture', 90);
            $table->text('comment')->nullable();
            $table->decimal('minimum_price',10,2);
            $table->decimal('maximum_price',10,2);
            $table->date('date_to_finish');
            $table->string('receipt', 90)->nullable();
            $table->string('tracking_number', 90)->nullable();
            $table->enum('category',['c','f','ab','o']);
            $table->integer('qty');
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
        Schema::drop('item');
    }
}
