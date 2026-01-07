<?php

namespace App\Http\Controllers;

use App\Models\SampleText;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SampleTextController extends Controller
{
    /**
     * 言語と難易度に基づいてランダムなサンプルテキストを取得
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getRandom(Request $request): JsonResponse
    {
        $request->validate([
            'language' => 'required|in:english,japanese',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
        ]);

        $language = $request->query('language');
        $difficulty = $request->query('difficulty');

        // 認証状態による難易度制限
        if (in_array($difficulty, ['intermediate', 'advanced']) && !$request->user()) {
            return response()->json([
                'message' => '中級・上級のテキストを取得するにはログインが必要です。',
            ], 403);
        }

        $text = SampleText::getRandomByLanguageAndDifficulty($language, $difficulty);

        if (!$text) {
            return response()->json([
                'message' => 'No sample text found for the given criteria',
            ], 404);
        }

        return response()->json([
            'id' => $text->id,
            'text' => $text->text,
            'display_text' => $text->display_text,
            'reading' => $text->reading,
            'language' => $text->language,
            'difficulty' => $text->difficulty,
        ]);
    }

    /**
     * 言語と難易度に基づいて複数のサンプルテキストを取得
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getRandomList(Request $request): JsonResponse
    {
        $request->validate([
            'language' => 'required|in:english,japanese',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'limit' => 'nullable|integer|min:1|max:50',
        ]);

        $language = $request->query('language');
        $difficulty = $request->query('difficulty');
        $limit = $request->query('limit', 10);

        // 認証状態による難易度制限
        if (in_array($difficulty, ['intermediate', 'advanced']) && !$request->user()) {
            return response()->json([
                'message' => '中級・上級のテキストを取得するにはログインが必要です。',
            ], 403);
        }

        $texts = SampleText::getRandomListByLanguageAndDifficulty($language, $difficulty, $limit);

        return response()->json([
            'data' => $texts->map(function ($text) {
                return [
                    'id' => $text->id,
                    'text' => $text->text,
                    'display_text' => $text->display_text,
                    'reading' => $text->reading,
                    'language' => $text->language,
                    'difficulty' => $text->difficulty,
                ];
            }),
            'total' => $texts->count(),
        ]);
    }

    /**
     * 利用可能な難易度リストを取得
     *
     * @return JsonResponse
     */
    public function getDifficulties(): JsonResponse
    {
        return response()->json([
            'difficulties' => [
                ['value' => 'beginner', 'label' => '初級'],
                ['value' => 'intermediate', 'label' => '中級'],
                ['value' => 'advanced', 'label' => '上級'],
            ],
        ]);
    }
}
