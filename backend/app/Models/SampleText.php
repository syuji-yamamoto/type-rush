<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleText extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'language',
        'difficulty',
        'text',
        'text_variants',
        'display_text',
        'reading',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'text_variants' => 'array',
    ];

    /**
     * 言語の定数
     */
    public const LANGUAGE_ENGLISH = 'english';
    public const LANGUAGE_JAPANESE = 'japanese';

    /**
     * 難易度の定数
     */
    public const DIFFICULTY_BEGINNER = 'beginner';
    public const DIFFICULTY_INTERMEDIATE = 'intermediate';
    public const DIFFICULTY_ADVANCED = 'advanced';

    /**
     * 言語と難易度でランダムに1件取得
     *
     * @param string $language
     * @param string $difficulty
     * @return SampleText|null
     */
    public static function getRandomByLanguageAndDifficulty(string $language, string $difficulty): ?SampleText
    {
        return self::where('language', $language)
            ->where('difficulty', $difficulty)
            ->inRandomOrder()
            ->first();
    }

    /**
     * 言語と難易度で複数件取得（シャッフル）
     *
     * @param string $language
     * @param string $difficulty
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getRandomListByLanguageAndDifficulty(string $language, string $difficulty, int $limit = 10)
    {
        return self::where('language', $language)
            ->where('difficulty', $difficulty)
            ->inRandomOrder()
            ->limit($limit)
            ->get();
    }
}
