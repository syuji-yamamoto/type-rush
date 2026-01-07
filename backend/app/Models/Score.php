<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Score extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'wpm',
        'accuracy',
        'correct_chars',
        'words_completed',
        'language',
        'difficulty',
        'played_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'played_at' => 'datetime',
    ];

    /**
     * ユーザーとのリレーション
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * ユーザーの統計情報を取得
     *
     * @param int $userId
     * @return array
     */
    public static function getUserStats(int $userId): array
    {
        $scores = self::where('user_id', $userId)->get();

        if ($scores->isEmpty()) {
            return [
                'best_wpm' => 0,
                'avg_wpm' => 0,
                'avg_accuracy' => 0,
                'total_games' => 0,
            ];
        }

        return [
            'best_wpm' => $scores->max('wpm'),
            'avg_wpm' => round($scores->avg('wpm')),
            'avg_accuracy' => round($scores->avg('accuracy')),
            'total_games' => $scores->count(),
        ];
    }

    /**
     * ユーザーのスコア履歴を取得
     *
     * @param int $userId
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getUserHistory(int $userId, int $limit = 20)
    {
        return self::where('user_id', $userId)
            ->orderBy('played_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
