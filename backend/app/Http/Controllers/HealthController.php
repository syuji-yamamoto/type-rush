<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * ヘルスチェックエンドポイント
     * デプロイ後にアプリケーションが正常に動作しているか確認する
     */
    public function check(): JsonResponse
    {
        $health = [
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'service' => 'type-rush-api',
        ];

        // データベース接続の確認（オプション）
        try {
            DB::connection()->getPdo();
            $health['database'] = 'connected';
        } catch (\Exception $e) {
            $health['database'] = 'disconnected';
            $health['status'] = 'degraded';
        }

        return response()->json($health);
    }
}
