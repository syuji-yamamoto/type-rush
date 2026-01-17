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
        Schema::table('sample_texts', function (Blueprint $table) {
            $table->json('text_variants')->nullable()->after('text')->comment('ローマ字入力の複数バリエーション（JSON配列）');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sample_texts', function (Blueprint $table) {
            $table->dropColumn('text_variants');
        });
    }
};
