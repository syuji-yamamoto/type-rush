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
        Schema::create('sample_texts', function (Blueprint $table) {
            $table->id();
            $table->enum('language', ['english', 'japanese'])->comment('言語（英語/日本語）');
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])->comment('難易度（初級/中級/上級）');
            $table->text('text')->comment('英語テキストまたはローマ字');
            $table->text('display_text')->nullable()->comment('日本語表示用テキスト（漢字含む）');
            $table->text('reading')->nullable()->comment('読み仮名（ひらがな）');
            $table->timestamps();

            // インデックス
            $table->index(['language', 'difficulty']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sample_texts');
    }
};
