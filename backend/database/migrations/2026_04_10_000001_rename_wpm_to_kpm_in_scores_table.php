<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * WPM（Words Per Minute）からKPM（Keystrokes Per Minute）へスコア指標を変更
     */
    public function up(): void
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->renameColumn('wpm', 'kpm');
        });

        // インデックスの再作成（カラム名変更に伴い）
        Schema::table('scores', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'wpm']);
            $table->index(['user_id', 'kpm']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scores', function (Blueprint $table) {
            $table->renameColumn('kpm', 'wpm');
        });

        Schema::table('scores', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'kpm']);
            $table->index(['user_id', 'wpm']);
        });
    }
};
