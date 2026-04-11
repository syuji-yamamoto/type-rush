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

        // 日本語サンプルテキスト
        $japaneseTexts = $this->getJapaneseTexts();

        // データを挿入
        foreach ($japaneseTexts as $text) {
            SampleText::create($text);
        }
    }

    /**
     * 日本語テキストを取得
     */
    private function getJapaneseTexts(): array
    {
        return [
            // 初級（beginner）- 2 ~ 4文字
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
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'yoru', 'text_variants' => ['yoru'], 'display_text' => '夜', 'reading' => 'よる'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'haru', 'text_variants' => ['haru'], 'display_text' => '春', 'reading' => 'はる'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'natsu', 'text_variants' => ['natsu'], 'display_text' => '夏', 'reading' => 'なつ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'aki', 'text_variants' => ['aki'], 'display_text' => '秋', 'reading' => 'あき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'fuyu', 'text_variants' => ['fuyu'], 'display_text' => '冬', 'reading' => 'ふゆ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kusa', 'text_variants' => ['kusa'], 'display_text' => '草', 'reading' => 'くさ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ishi', 'text_variants' => ['ishi', 'isi'], 'display_text' => '石', 'reading' => 'いし'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'tsuchi', 'text_variants' => ['tsuchi', 'tuchi'], 'display_text' => '土', 'reading' => 'つち'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kuni', 'text_variants' => ['kuni'], 'display_text' => '国', 'reading' => 'くに'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'machi', 'text_variants' => ['machi', 'mati'], 'display_text' => '町', 'reading' => 'まち'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mura', 'text_variants' => ['mura'], 'display_text' => '村', 'reading' => 'むら'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ie', 'text_variants' => ['ie'], 'display_text' => '家', 'reading' => 'いえ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'heya', 'text_variants' => ['heya'], 'display_text' => '部屋', 'reading' => 'へや'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mado', 'text_variants' => ['mado'], 'display_text' => '窓', 'reading' => 'まど'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'to', 'text_variants' => ['to'], 'display_text' => '戸', 'reading' => 'と'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'oto', 'text_variants' => ['oto'], 'display_text' => '音', 'reading' => 'おと'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'koe', 'text_variants' => ['koe'], 'display_text' => '声', 'reading' => 'こえ'],
            // 追加: 日常語彙
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kumo', 'text_variants' => ['kumo'], 'display_text' => '雲', 'reading' => 'くも'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'niji', 'text_variants' => ['niji', 'nizi'], 'display_text' => '虹', 'reading' => 'にじ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'shinrin', 'text_variants' => ['shinrin', 'sinrin', 'shinnrinn', 'sinnrinn'], 'display_text' => '森林', 'reading' => 'しんりん'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'koori', 'text_variants' => ['koori', 'kouri'], 'display_text' => '氷', 'reading' => 'こおり'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'eki', 'text_variants' => ['eki'], 'display_text' => '駅', 'reading' => 'えき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mise', 'text_variants' => ['mise'], 'display_text' => '店', 'reading' => 'みせ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'niwa', 'text_variants' => ['niwa'], 'display_text' => '庭', 'reading' => 'にわ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'daidokoro', 'text_variants' => ['daidokoro'], 'display_text' => '台所', 'reading' => 'だいどころ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ongaku', 'text_variants' => ['ongaku', 'onngaku'], 'display_text' => '音楽', 'reading' => 'おんがく'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'e', 'text_variants' => ['e'], 'display_text' => '絵', 'reading' => 'え'],

            // 中級（intermediate）- 5 ~ 7文字
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nekogasuki', 'text_variants' => ['nekogasuki'], 'display_text' => '猫が好き', 'reading' => 'ねこがすき'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'soragaaoi', 'text_variants' => ['soragaaoi', 'solagaaoi'], 'display_text' => '空が青い', 'reading' => 'そらがあおい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'honwoyomu', 'text_variants' => ['honwoyomu'], 'display_text' => '本を読む', 'reading' => 'ほんをよむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'mizuwonomu', 'text_variants' => ['mizuwonomu', 'miduwonomu'], 'display_text' => '水を飲む', 'reading' => 'みずをのむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hanagakirei', 'text_variants' => ['hanagakirei'], 'display_text' => '花がきれい', 'reading' => 'はながきれい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'gakkouniiku', 'text_variants' => ['gakkouniiku', 'gakkooniiku'], 'display_text' => '学校に行く', 'reading' => 'がっこうにいく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tomodachitoasobu', 'text_variants' => ['tomodachitoasobu', 'tomodatitoasobu'], 'display_text' => '友達と遊ぶ', 'reading' => 'ともだちとあそぶ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ongakuwokiku', 'text_variants' => ['ongakuwokiku', 'onngakuwokiku'], 'display_text' => '音楽を聴く', 'reading' => 'おんがくをきく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'eigawomiru', 'text_variants' => ['eigawomiru'], 'display_text' => '映画を見る', 'reading' => 'えいがをみる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ryourisuru', 'text_variants' => ['ryourisuru', 'ryorisuru'], 'display_text' => '料理する', 'reading' => 'りょうりする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'undousuru', 'text_variants' => ['undousuru', 'undosuru', 'unndousuru', 'unndosuru'], 'display_text' => '運動する', 'reading' => 'うんどうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'benkyousuru', 'text_variants' => ['benkyousuru', 'benkyosuru', 'bennkyousuru', 'bennkyosuru'], 'display_text' => '勉強する', 'reading' => 'べんきょうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'asagohan', 'text_variants' => ['asagohan'], 'display_text' => '朝ごはん', 'reading' => 'あさごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hirugohan', 'text_variants' => ['hirugohan'], 'display_text' => '昼ごはん', 'reading' => 'ひるごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'yorugohan', 'text_variants' => ['yorugohan'], 'display_text' => '夜ごはん', 'reading' => 'よるごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tenkiyohou', 'text_variants' => ['tenkiyohou', 'tenkiyoho', 'tennkiyohou', 'tennkiyoho'], 'display_text' => '天気予報', 'reading' => 'てんきよほう'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nihongomanabu', 'text_variants' => ['nihongomanabu', 'nihonngomanabu'], 'display_text' => '日本語学ぶ', 'reading' => 'にほんごまなぶ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kouenwoaruku', 'text_variants' => ['kouenwoaruku', 'kouennwoaruku', 'koenwoaruku', 'koennwoaruku'], 'display_text' => '公園を歩く', 'reading' => 'こうえんをあるく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'denshaninoru', 'text_variants' => ['denshaninoru', 'densyaninoru', 'dennshaninoru', 'dennsyaninoru'], 'display_text' => '電車に乗る', 'reading' => 'でんしゃにのる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kazokugasuki', 'text_variants' => ['kazokugasuki'], 'display_text' => '家族が好き', 'reading' => 'かぞくがすき'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'shigotoniiku', 'text_variants' => ['shigotoniiku', 'sigotoniiku'], 'display_text' => '仕事に行く', 'reading' => 'しごとにいく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kaimonosuru', 'text_variants' => ['kaimonosuru'], 'display_text' => '買い物する', 'reading' => 'かいものする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'soujisuru', 'text_variants' => ['soujisuru', 'souzisuru', 'sojisuru'], 'display_text' => '掃除する', 'reading' => 'そうじする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'sentakusuru', 'text_variants' => ['sentakusuru', 'senntakusuru'], 'display_text' => '洗濯する', 'reading' => 'せんたくする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'samposuru', 'text_variants' => ['samposuru', 'sanposuru'], 'display_text' => '散歩する', 'reading' => 'さんぽする'],
            // 追加
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ryokouniiku', 'text_variants' => ['ryokouniiku', 'ryokoniiku'], 'display_text' => '旅行に行く', 'reading' => 'りょこうにいく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hanabiwomiru', 'text_variants' => ['hanabiwomiru'], 'display_text' => '花火を見る', 'reading' => 'はなびをみる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'onsennihairu', 'text_variants' => ['onsennihairu', 'onnsennnihairu'], 'display_text' => '温泉に入る', 'reading' => 'おんせんにはいる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'baguwoshuuseisuru', 'text_variants' => ['baguwoshuuseisuru', 'baguwosyuuseisuru', 'baguwoshuseisuru'], 'display_text' => 'バグを修正する', 'reading' => 'ばぐをしゅうせいする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ko-dowokaku', 'text_variants' => ['ko-dowokaku', 'koudowokaku'], 'display_text' => 'コードを書く', 'reading' => 'こーどをかく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tesutowojikkousuru', 'text_variants' => ['tesutowojikkousuru', 'tesutowozikkousuru', 'tesutowojikkosuru'], 'display_text' => 'テストを実行する', 'reading' => 'てすとをじっこうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'shiryouwosoufusuru', 'text_variants' => ['shiryouwosoufusuru', 'siryouwosoufusuru', 'shiryowosoufusuru'], 'display_text' => '資料を送付する', 'reading' => 'しりょうをそうふする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'yoteiwokakuninsuru', 'text_variants' => ['yoteiwokakuninsuru', 'yoteiwokakuninnsuru'], 'display_text' => '予定を確認する', 'reading' => 'よていをかくにんする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'sarumokikaraochiru', 'text_variants' => ['sarumokikaraochiru', 'sarumokikaraotiru'], 'display_text' => '猿も木から落ちる', 'reading' => 'さるもきからおちる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'isogabamaware', 'text_variants' => ['isogabamaware'], 'display_text' => '急がば回れ', 'reading' => 'いそがばまわれ'],
        ];
    }
}
