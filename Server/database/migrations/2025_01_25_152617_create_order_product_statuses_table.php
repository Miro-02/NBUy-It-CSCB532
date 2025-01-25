<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('order_product_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });
        DB::table('order_product_statuses')->insert([
            ['name' => 'Pending', 'slug' => 'pending'],
            ['name' => 'Confirmed', 'slug' => 'confirmed'],
            ['name' => 'Processing', 'slug' => 'processing'],
            ['name' => 'Shipped', 'slug' => 'shipped'],
            ['name' => 'Delivered', 'slug' => 'delivered'],
            ['name' => 'Cancelled', 'slug' => 'cancelled'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_product_statuses');
    }
};
