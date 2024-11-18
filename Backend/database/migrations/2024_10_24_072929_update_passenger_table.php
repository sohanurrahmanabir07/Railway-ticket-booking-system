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
        Schema::table('passenger', function (Blueprint $table) {
            // Drop unique constraints if they exist
            $table->dropUnique('passenger_phone_unique');
            $table->dropUnique('passenger_nid_unique');
    
            // Then, add the unique constraint as required
            $table->string('phone')->unique()->change();
            $table->string('nid')->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('passenger', function (Blueprint $table) {
            if (Schema::hasColumn('passenger', 'phone')) {
                $table->dropUnique(['phone']);
            }
            if (Schema::hasColumn('passenger', 'nid')) {
                $table->dropUnique(['nid']);
            }
        });
    }
};
