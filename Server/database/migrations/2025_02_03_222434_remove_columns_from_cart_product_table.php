<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveColumnsFromCartProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop the foreign key constraint
        Schema::table('carts', function (Blueprint $table) {
            $table->dropForeign(['product_id']); // Drop the foreign key constraint
            $table->dropColumn(['product_id', 'quantity']); // Drop the columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Re-add the foreign key constraint and columns if you need to roll back
        Schema::table('carts', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity');

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }
}
