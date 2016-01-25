<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBidTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bid', function (Blueprint $table) {
            $table->increments('bidid');
            $table->integer('itemid')->unsigned();
            $table->integer('userid')->unsigned();
            $table->foreign('itemid')
                  ->references('itemid')->on('item')
                  ->onUpdate('cascade');
            $table->foreign('userid')
                  ->references('userid')->on('users')
                  ->onUpdate('cascade');
            $table->decimal('amount', 10, 2);
            $table->enum('status',['1','0']);
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
        Schema::drop('bid');
    }
}
