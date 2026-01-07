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
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('wpm')->comment('Words Per Minute');
            $table->integer('accuracy')->comment('精度（%）');
            $table->integer('correct_chars')->comment('正確な文字数');
            $table->integer('words_completed')->comment('完了した文章数');
            $table->enum('language', ['english', 'japanese'])->comment('言語');
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])->comment('難易度');
            $table->timestamp('played_at')->comment('プレイ日時');
            $table->timestamps();

            // インデックス
            $table->index(['user_id', 'played_at']);
            $table->index(['user_id', 'wpm']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
