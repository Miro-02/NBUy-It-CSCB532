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
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        DB::table('roles')->insert([
            ['name' => 'Buyer', 'slug' => 'buyer'],
            ['name' => 'Seller', 'slug' => 'seller'],
            ['name' => 'Admin', 'slug' => 'admin'],
            ['name' => 'Order Manager', 'slug' => 'order_manager'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
