<?php

namespace Database\Seeders;

use App\Models\SampleText;
use Illuminate\Database\Seeder;

class SampleTextSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 既存データを削除
        SampleText::truncate();

        // 英語サンプルテキスト
        $englishTexts = $this->getEnglishTexts();

        // 日本語サンプルテキスト
        $japaneseTexts = $this->getJapaneseTexts();

        // データを挿入
        foreach ($englishTexts as $text) {
            SampleText::create($text);
        }

        foreach ($japaneseTexts as $text) {
            SampleText::create($text);
        }
    }

    /**
     * 英語テキストを取得
     */
    private function getEnglishTexts(): array
    {
        return [
            // 初級（beginner）- 3 ~ 5単語 20問
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i like cats'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the sun is bright'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'she reads books daily'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'we play outside'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'he drinks water'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'they eat lunch'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the dog runs fast'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'birds fly high'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i love music'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'she writes letters'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'we learn english'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the sky is blue'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'he plays piano'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'flowers are beautiful'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i walk home'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'she cooks dinner'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'we watch movies'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the cat sleeps'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'they study hard'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i help friends'],

            // 中級（intermediate）- 6 ~ 8単語 20問
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'practice makes perfect in typing skills'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'learning new things is always exciting'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'the weather today is very nice'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'she enjoys reading books every evening'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'we should exercise regularly for health'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'programming requires patience and logical thinking'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'the internet has changed our lives'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'good communication skills are very important'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'they traveled to many different countries'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'time management is essential for success'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'he studies computer science at university'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'teamwork helps us achieve better results'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'the project deadline is next week'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'i need to improve my skills'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'technology advances very quickly these days'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'she works hard to achieve goals'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'reading improves vocabulary and writing skills'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'we discuss ideas during team meetings'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'creativity is important in problem solving'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'daily practice leads to continuous improvement'],

            // 上級（advanced）- 5 ~ 8単語 20問
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'we should practice typing every single day'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'the weather today is really very nice'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'learning new skills requires patience and practice'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'she enjoys reading books in the library'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'good communication is important for teamwork success'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'technology changes our lives in many ways'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'we need to finish this project soon'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'everyone should take care of their health'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'the internet helps us find information quickly'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'creative thinking is useful for solving problems'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'he studies computer science at the university'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'time management helps you achieve your goals'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'traveling abroad is a wonderful learning experience'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'regular exercise keeps your body and mind healthy'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'working together makes difficult tasks much easier'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'learning languages opens doors to new cultures'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'setting clear goals improves your daily productivity'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'daily practice leads to continuous skill improvement'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'taking breaks helps maintain focus and energy'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'asking questions is essential for better understanding'],
        ];
    }

    /**
     * 日本語テキストを取得
     */
    private function getJapaneseTexts(): array
    {
        return [
            // 初級（beginner）- 2 ~ 4文字 20問
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'neko', 'text_variants' => ['neko'], 'display_text' => '猫', 'reading' => 'ねこ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'inu', 'text_variants' => ['inu'], 'display_text' => '犬', 'reading' => 'いぬ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hana', 'text_variants' => ['hana'], 'display_text' => '花', 'reading' => 'はな'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'sora', 'text_variants' => ['sora'], 'display_text' => '空', 'reading' => 'そら'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mizu', 'text_variants' => ['mizu'], 'display_text' => '水', 'reading' => 'みず'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kaze', 'text_variants' => ['kaze'], 'display_text' => '風', 'reading' => 'かぜ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'umi', 'text_variants' => ['umi'], 'display_text' => '海', 'reading' => 'うみ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'yama', 'text_variants' => ['yama'], 'display_text' => '山', 'reading' => 'やま'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kawa', 'text_variants' => ['kawa'], 'display_text' => '川', 'reading' => 'かわ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hi', 'text_variants' => ['hi'], 'display_text' => '日', 'reading' => 'ひ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'tsuki', 'text_variants' => ['tsuki', 'tuki'], 'display_text' => '月', 'reading' => 'つき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hoshi', 'text_variants' => ['hoshi', 'hosi'], 'display_text' => '星', 'reading' => 'ほし'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ki', 'text_variants' => ['ki'], 'display_text' => '木', 'reading' => 'き'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mori', 'text_variants' => ['mori'], 'display_text' => '森', 'reading' => 'もり'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ame', 'text_variants' => ['ame'], 'display_text' => '雨', 'reading' => 'あめ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'yuki', 'text_variants' => ['yuki'], 'display_text' => '雪', 'reading' => 'ゆき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'tori', 'text_variants' => ['tori'], 'display_text' => '鳥', 'reading' => 'とり'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'sakana', 'text_variants' => ['sakana'], 'display_text' => '魚', 'reading' => 'さかな'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hon', 'text_variants' => ['hon'], 'display_text' => '本', 'reading' => 'ほん'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'asa', 'text_variants' => ['asa'], 'display_text' => '朝', 'reading' => 'あさ'],

            // 中級（intermediate）- 5 ~ 7文字 20問
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nekogasuki', 'text_variants' => ['nekogasuki'], 'display_text' => '猫が好き', 'reading' => 'ねこがすき'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'soragaaoi', 'text_variants' => ['soragaaoi', 'solagaaoi'], 'display_text' => '空が青い', 'reading' => 'そらがあおい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'honwoyomu', 'text_variants' => ['honwoyomu'], 'display_text' => '本を読む', 'reading' => 'ほんをよむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'mizuwonomu', 'text_variants' => ['mizuwonomu', 'miduwonomu'], 'display_text' => '水を飲む', 'reading' => 'みずをのむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hanagakirei', 'text_variants' => ['hanagakirei'], 'display_text' => '花がきれい', 'reading' => 'はながきれい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'gakkouniiku', 'text_variants' => ['gakkouniiku', 'gakkooniiku'], 'display_text' => '学校に行く', 'reading' => 'がっこうにいく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tomodachito', 'text_variants' => ['tomodachito', 'tomodatito'], 'display_text' => '友達と', 'reading' => 'ともだちと'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ongakukiku', 'text_variants' => ['ongakukiku', 'onngakukiku'], 'display_text' => '音楽聴く', 'reading' => 'おんがくきく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'eigamiru', 'text_variants' => ['eigamiru'], 'display_text' => '映画見る', 'reading' => 'えいがみる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ryourisuru', 'text_variants' => ['ryourisuru', 'ryorisuru'], 'display_text' => '料理する', 'reading' => 'りょうりする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'undousuru', 'text_variants' => ['undousuru', 'undosuru', 'unndousuru', 'unndosuru'], 'display_text' => '運動する', 'reading' => 'うんどうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'benkyousuru', 'text_variants' => ['benkyousuru', 'benkyosuru', 'bennkyousuru', 'bennkyosuru'], 'display_text' => '勉強する', 'reading' => 'べんきょうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'asagohan', 'text_variants' => ['asagohan'], 'display_text' => '朝ごはん', 'reading' => 'あさごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hirugohan', 'text_variants' => ['hirugohan'], 'display_text' => '昼ごはん', 'reading' => 'ひるごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'yorugohan', 'text_variants' => ['yorugohan'], 'display_text' => '夜ごはん', 'reading' => 'よるごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tenkiyohou', 'text_variants' => ['tenkiyohou', 'tenkiyoho', 'tennkiyohou', 'tennkiyoho'], 'display_text' => '天気予報', 'reading' => 'てんきのよほう'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nihongogaku', 'text_variants' => ['nihongogaku', 'nihonngogaku'], 'display_text' => '日本語学', 'reading' => 'にほんごがく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kouenaruku', 'text_variants' => ['kouenaruku', 'kouennaruku', 'koenaruku', 'koennaruku'], 'display_text' => '公園歩く', 'reading' => 'こうえんあるく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'denshanoru', 'text_variants' => ['denshanoru', 'densyanoru', 'dennshanoru', 'dennsyanoru'], 'display_text' => '電車乗る', 'reading' => 'でんしゃのる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kazokusuki', 'text_variants' => ['kazokusuki'], 'display_text' => '家族好き', 'reading' => 'かぞくすき'],
            // 上級（advanced）- 5 ~ 8単語 20問
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'mainichirenshuusurukotogadaiji',
                'text_variants' => [
                    'mainichirenshuusurukotogadaiji',
                    'mainitirenshuusurukotogadaiji',
                    'mainichirensyuusurukotogadaiji',
                    'mainitirensyuusurukotogadaiji',
                    'mainichirenshuusurukotogadaizi',
                    'mainitirenshuusurukotogadaizi',
                ],
                'display_text' => '毎日練習することが大事',
                'reading' => 'まいにちれんしゅうすることがだいじ'
            ],

            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'atarashiigijutsuwomanandeikou',
                'text_variants' => [
                    'atarashiigijutsuwomanandeikou',
                    'atarasiigijutsuwomanandeikou',
                    'atarashiigijutuwomanandeikou',
                    'atarasiigijutuwomanandeikou',
                    'atarashiigizutsuwomanandeikou',
                    'atarasiigizutsuwomanandeikou',
                    'atarashiigizutuwomanandeikou',
                    'atarasiigizutuwomanandeikou',
                ],
                'display_text' => '新しい技術を学んでいこう',
                'reading' => 'あたらしいぎじゅつをまなんでいこう'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'kyounotenkinitotemoiihi',
                'text_variants' => [
                    'kyounotenkinitotemoiihi',
                    'kyounotennkinitotemoiihi',
                    'kyonotenkinitotemoiihi',
                    'kyonotennkinitotemoiihi',
                ],
                'display_text' => '今日の天気にとても良い日',
                'reading' => 'きょうのてんきにとてもいいひ'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'toshokandemainichihonwoyomu',
                'text_variants' => [
                    'toshokandemainichihonwoyomu',
                    'tosyokandemainichihonwoyomu',
                    'toshokanndemainichihonwoyomu',
                    'tosyokanndemainichihonwoyomu',
                    'toshokandemainitihonwoyomu',
                    'tosyokandemainitihonwoyomu',
                    'toshokanndemainitihonwoyomu',
                    'tosyokanndemainitihonwoyomu',
                ],
                'display_text' => '図書館で毎日本を読む',
                'reading' => 'としょかんでまいにちほんをよむ'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'chiimuwaakugaseikoukagi',
                'text_variants' => [
                    // 通常
                    'chiimuwaakugaseikoukagi',
                    'tiimuwaakugaseikoukagi',

                    // ハイフンあり（外来語区切り）
                    'chiimu-waaku-gaseikou-kagi',
                    'tiimu-waaku-gaseikou-kagi',

                    // ハイフンあり（前半のみ）
                    'chiimu-waakugaseikoukagi',
                    'tiimu-waakugaseikoukagi',
                ],
                'display_text' => 'チームワークが成功の鍵',
                'reading' => 'ちーむわーくがせいこうのかぎ'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'gijutsugaseikatsuwokaeru',
                'text_variants' => [
                    'gijutsugaseikatsuwokaeru',
                    'gijutugaseikatsuwokaeru',
                    'gizutsugaseikatsuwokaeru',
                    'gizutugaseikatsuwokaeru',
                ],
                'display_text' => '技術が生活を変える',
                'reading' => 'ぎじゅつがせいかつをかえる'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'purojekutowosugunikanryousuru',
                'text_variants' => [
                    'purojekutowosugunikanryousuru',
                    'purojekutowosugunikanryosuru',
                    'purojekutowosugunikannryousuru',
                ],
                'display_text' => 'プロジェクトをすぐに完了する',
                'reading' => 'ぷろじぇくとをすぐにかんりょうする'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'minnahokenkounitsukerubekida',
                'text_variants' => [
                    'minnahokenkounitsukerubekida',
                    'minnahokennkounitsukerubekida',
                ],
                'display_text' => 'みんな健康に気をつけるべきだ',
                'reading' => 'みんなけんこうにきをつけるべきだ'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'intanettodetokujouhouwoeru',
                'text_variants' => [
                    // 通常
                    'intanettodetokujouhouwoeru',
                    'intanettodetokujouhowoeru',
                    'intanettodetokuzyouhouwoeru',
                    'intanettodetokuzyouhowoeru',
                    // ハイフンあり（外来語）
                    'intanetto-detokujouhou-woeru',
                    'intanetto-detokujouho-woeru',
                    'intanetto-detokuzyouhou-woeru',
                    'intanetto-detokuzyouho-woeru',
                    // ハイフンあり（インターネットのみ）
                    'intanetto-detokujouhouwoeru',
                    'intanetto-detokuzyouhouwoeru',
                ],
                'display_text' => 'インターネットで情報を得る',
                'reading' => 'いんたーねっとでじょうほうをえる'
            ],

            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'souzouryokugamondaikaiketsuyuuyou',
                'text_variants' => [
                    'souzouryokugamondaikaiketsuyuuyou',
                    'souzouryokugamondaikaiketsuyuyou',
                    'souzouryokugamonndaikaiketsuyuuyou',
                ],
                'display_text' => '創造力が問題解決に有用',
                'reading' => 'そうぞうりょくがもんだいかいけつにゆうよう'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'daigakudekonpyuutaawomanabu',
                'text_variants' => [
                    // 通常
                    'daigakudekonpyuutaawomanabu',
                    'daigakudekomupyuutaawomanabu',
                    // ハイフンあり（外来語）
                    'daigakude-konpyuuta-wo-manabu',
                    'daigakude-komupyuuta-wo-manabu',
                    // ハイフンあり（コンピューターのみ）
                    'daigakude-konpyuutaawomanabu',
                    'daigakude-komupyuutaawomanabu',
                ],
                'display_text' => '大学でコンピューターを学ぶ',
                'reading' => 'だいがくでこんぴゅーたーをまなぶ'
            ],

            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'jikankanrigamokuhyoutassei',
                'text_variants' => [
                    'jikankanrigamokuhyoutassei',
                    'jikannkanrigamokuhyoutassei',
                    'jikankanrigamokuhyotassei',
                ],
                'display_text' => '時間管理が目標達成を助ける',
                'reading' => 'じかんかんりがもくひょうたっせいをたすける'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'ryokougasubarashiigakushuu',
                'text_variants' => [
                    'ryokougasubarashiigakushuu',
                    'ryokogasubarashiigakushuu',
                    'ryokougasubarasiigakushuu',
                    'ryokogasubarasiigakushuu',
                ],
                'display_text' => '旅行がすばらしい学習体験',
                'reading' => 'りょこうがすばらしいがくしゅうたいけん'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'teikiundougakenkoumainten',
                'text_variants' => [
                    'teikiundougakenkoumainten',
                    'teikiundogakenkoumainten',
                    'teikiunndougakenkoumainten',
                    'teikiunndogakenkoumainten',
                ],
                'display_text' => '定期運動が健康を維持する',
                'reading' => 'ていきうんどうがけんこうをいじする'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'kyouryokugakonnnannakototayasuku',
                'text_variants' => [
                    'kyouryokugakonnnannakototayasuku',
                    'kyoryokugakonnnannakototayasuku',
                    'kyouryokugakonnannakototayasuku',
                ],
                'display_text' => '協力が困難なことを易しく',
                'reading' => 'きょうりょくがこんなんなことをやさしく'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'gengogakushuugaatarashibunka',
                'text_variants' => [
                    'gengogakushuugaatarashibunka',
                    'genngogakushuugaatarashibunka',
                    'gengogakusyuugaatarashibunnka',
                    'gengogakusyuugaatarashibunka',
                ],
                'display_text' => '言語学習が新しい文化を開く',
                'reading' => 'げんごがくしゅうがあたらしいぶんかをひらく'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'mokuhyousetteigaseisanseiwoageru',
                'text_variants' => [
                    'mokuhyousetteigaseisanseiwoageru',
                    'mokuhyosetteigaseisanseiwoageru',
                ],
                'display_text' => '目標設定が生産性を上げる',
                'reading' => 'もくひょうせっていがせいさんせいをあげる'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'mainichirenshuugajoutatsu',
                'text_variants' => [
                    'mainichirenshuugajoutatsu',
                    'mainitirenshuugajoutatsu',
                    'mainichirensyuugajoutatsu',
                    'mainitirensyuugajoutatsu',
                    'mainichirenshuugazyoutatsu',
                    'mainitirenshuugazyoutatsu',
                    'mainichirensyuugazyoutatsu',
                    'mainitirensyuugazyoutatsu',
                ],
                'display_text' => '毎日練習が上達につながる',
                'reading' => 'まいにちれんしゅうがじょうたつにつながる'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'kyuukeigasyuuchuuwotamotsu',
                'text_variants' => [
                    'kyuukeigasyuuchuuwotamotsu',
                    'kyuukeigasyuutyuuwotamotsu',
                    'kyukeigasyuuchuuwotamotsu',
                    'kyukeigasyuutyuuwotamotsu',
                ],
                'display_text' => '休憩が集中を保つ',
                'reading' => 'きゅうけいがしゅうちゅうをたもつ'
            ],
            [
                'language' => 'japanese',
                'difficulty' => 'advanced',
                'text' => 'shitsumongayoriyoirikainijuuyou',
                'text_variants' => [
                    'shitsumongayoriyoirikainijuuyou',
                    'sitsumongayoriyoirikainijuuyou',
                    'shitsumongayoriyoirikainijyuyou',
                    'shitsumongayoriyoirikainijuuyou',
                ],
                'display_text' => '質問がより良い理解に重要',
                'reading' => 'しつもんがよりよいりかいにじゅうよう'
            ],
        ];
    }
}
