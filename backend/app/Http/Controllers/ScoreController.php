<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    /**
     * スコアを保存（全難易度で保存可能）
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'kpm' => 'required|integer|min:0',
            'accuracy' => 'required|integer|min:0|max:100',
            'correct_chars' => 'required|integer|min:0',
            'words_completed' => 'required|integer|min:0',
            'language' => 'required|in:english,japanese',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
        ]);

        $score = Score::create([
            'user_id' => $request->user()->id,
            'kpm' => $request->kpm,
            'accuracy' => $request->accuracy,
            'correct_chars' => $request->correct_chars,
            'words_completed' => $request->words_completed,
            'language' => $request->language,
            'difficulty' => $request->difficulty,
            'played_at' => now(),
        ]);

        return response()->json([
            'message' => 'スコアを保存しました',
            'score' => [
                'id' => $score->id,
                'kpm' => $score->kpm,
                'accuracy' => $score->accuracy,
                'correct_chars' => $score->correct_chars,
                'words_completed' => $score->words_completed,
                'language' => $score->language,
                'difficulty' => $score->difficulty,
                'played_at' => $score->played_at->format('Y-m-d H:i'),
            ],
        ], 201);
    }

    /**
     * ユーザーのスコア統計を取得
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function stats(Request $request): JsonResponse
    {
        $stats = Score::getUserStats($request->user()->id);

        return response()->json($stats);
    }

    /**
     * ユーザーのスコア履歴を取得
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function history(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 20);
        $scores = Score::getUserHistory($request->user()->id, $limit);

        return response()->json([
            'data' => $scores->map(function ($score) {
                return [
                    'id' => $score->id,
                    'kpm' => $score->kpm,
                    'accuracy' => $score->accuracy,
                    'correct_chars' => $score->correct_chars,
                    'words_completed' => $score->words_completed,
                    'language' => $score->language,
                    'difficulty' => $score->difficulty,
                    'played_at' => $score->played_at->format('Y-m-d H:i'),
                ];
            }),
            'total' => $scores->count(),
        ]);
    }
}
