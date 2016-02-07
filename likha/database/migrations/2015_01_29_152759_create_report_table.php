<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report', function (Blueprint $table) {
            $table->increments('reportid');
            $table->integer('userid')->unsigned();
            $table->foreign('userid')
                  ->references('userid')->on('users')
                  ->onUpdate('cascade');
            $table->string('subject');
            $table->text('report');
            $table->enum('sender',['a','c']);
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
        Schema::drop('report');
    }
}
