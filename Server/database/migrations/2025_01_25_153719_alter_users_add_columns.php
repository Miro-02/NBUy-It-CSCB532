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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->boolean('is_banned')->default(false);
            $table->foreignId('cart_id')->nullable()->constrained('carts')->onDelete('set null');
            $table->unsignedInteger('age')->nullable();
            $table->string('address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['cart_id']);
            $table->dropColumn(['phone', 'is_banned', 'cart_id', 'age', 'address']);
        });
    }
};
