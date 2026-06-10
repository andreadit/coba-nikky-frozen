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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->unique();
            $table->foreignId('branch_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->unsignedInteger('subtotal');
            $table->unsignedInteger('discount')->default(0);
            $table->unsignedInteger('tax')->default(0);
            $table->unsignedInteger('total');
            $table->unsignedInteger('paid_amount');
            $table->unsignedInteger('change_amount')->default(0);
            $table->string('payment_method')->default('cash');
            $table->string('status')->default('completed');
            $table->timestamp('transaction_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
