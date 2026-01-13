<?php

namespace Database\Seeders;

use App\Models\Score;
use Illuminate\Database\Seeder;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 本番環境ではシーダーを実行しない
        // if (app()->environment('production')) {
        //     $this->command->warn('⚠️ Seeder is disabled in production environment.');
        //     return;
        // }

        $scores = [
            [
                'user_id' => 1,
                'wpm' => 65,
                'accuracy' => 94,
                'correct_chars' => 325,
                'words_completed' => 12,
                'language' => 'english',
                'difficulty' => 'advanced',
                'played_at' => now()->subDays(4),
            ],
            [
                'user_id' => 1,
                'wpm' => 72,
                'accuracy' => 96,
                'correct_chars' => 360,
                'words_completed' => 14,
                'language' => 'english',
                'difficulty' => 'advanced',
                'played_at' => now()->subDays(3),
            ],
            [
                'user_id' => 1,
                'wpm' => 58,
                'accuracy' => 91,
                'correct_chars' => 290,
                'words_completed' => 10,
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'played_at' => now()->subDays(2),
            ],
            [
                'user_id' => 1,
                'wpm' => 68,
                'accuracy' => 93,
                'correct_chars' => 340,
                'words_completed' => 13,
                'language' => 'english',
                'difficulty' => 'advanced',
                'played_at' => now()->subDays(1),
            ],
            [
                'user_id' => 1,
                'wpm' => 75,
                'accuracy' => 97,
                'correct_chars' => 375,
                'words_completed' => 15,
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'played_at' => now(),
            ],
            [
                'user_id' => 2,
                'wpm' => 12,
                'accuracy' => 36,
                'correct_chars' => 89,
                'words_completed' => 4,
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'played_at' => now()->subDays(3),
            ],
            [
                'user_id' => 2,
                'wpm' => 32,
                'accuracy' => 39,
                'correct_chars' => 101,
                'words_completed' => 6,
                'language' => 'english',
                'difficulty' => 'advanced',
                'played_at' => now()->subDays(1),
            ],
            [
                'user_id' => 2,
                'wpm' => 57,
                'accuracy' => 79,
                'correct_chars' => 200,
                'words_completed' => 12,
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'played_at' => now(),
            ],
        ];

        foreach ($scores as $score) {
            Score::create($score);
        }
    }
}
