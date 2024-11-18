<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('train_info', function (Blueprint $table) {
            $table->increments('train_id');
            $table->string('train_name',);
            $table->string('starting_station',200);
            $table->string('final_station',200);


            $table->timestamps();
        });
        DB::statement('ALTER TABLE train_info AUTO_INCREMENT=700;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('train_info');
    }
};
