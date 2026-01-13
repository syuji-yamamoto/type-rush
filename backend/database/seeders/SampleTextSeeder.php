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

            // 上級（advanced）- 9 ~ 12単語 20問
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'machine learning algorithms require extensive training data to achieve accurate results'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'software architecture decisions have long term impacts on system maintainability'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'effective communication among team members is crucial for successful project completion'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'database optimization techniques can significantly improve application performance and user experience'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'understanding user needs is essential for designing intuitive and functional interfaces'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'continuous integration and deployment pipelines automate software delivery processes efficiently'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'security vulnerabilities must be addressed proactively to protect sensitive data from attacks'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'agile methodologies promote flexibility adaptability and rapid response to changing requirements'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'code reviews help maintain quality standards and spread knowledge across development teams'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'cloud infrastructure provides scalability reliability and cost efficiency for modern applications'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'data visualization tools transform complex information into easily understandable graphical representations'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'artificial intelligence is revolutionizing industries by automating complex decision making processes'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'version control systems enable teams to collaborate effectively and track code changes'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'responsive design ensures websites function properly across various devices and screen sizes'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'testing frameworks provide automated validation to ensure software reliability and correctness'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'microservices architecture allows independent development deployment and scaling of application components'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'performance monitoring tools help identify bottlenecks and optimize system resource utilization'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'encryption protocols protect confidential information during transmission across insecure networks'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'documentation practices facilitate knowledge transfer and reduce onboarding time for new developers'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'api design principles ensure consistent reliable and developer friendly interfaces for applications'],
        ];
    }

    /**
     * 日本語テキストを取得
     */
    private function getJapaneseTexts(): array
    {
        return [
            // 初級（beginner）- 2 ~ 4文字 20問
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'neko', 'display_text' => '猫', 'reading' => 'ねこ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'inu', 'display_text' => '犬', 'reading' => 'いぬ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hana', 'display_text' => '花', 'reading' => 'はな'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'sora', 'display_text' => '空', 'reading' => 'そら'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mizu', 'display_text' => '水', 'reading' => 'みず'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kaze', 'display_text' => '風', 'reading' => 'かぜ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'umi', 'display_text' => '海', 'reading' => 'うみ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'yama', 'display_text' => '山', 'reading' => 'やま'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kawa', 'display_text' => '川', 'reading' => 'かわ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hi', 'display_text' => '日', 'reading' => 'ひ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'tsuki', 'display_text' => '月', 'reading' => 'つき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hoshi', 'display_text' => '星', 'reading' => 'ほし'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ki', 'display_text' => '木', 'reading' => 'き'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mori', 'display_text' => '森', 'reading' => 'もり'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ame', 'display_text' => '雨', 'reading' => 'あめ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'yuki', 'display_text' => '雪', 'reading' => 'ゆき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'tori', 'display_text' => '鳥', 'reading' => 'とり'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'sakana', 'display_text' => '魚', 'reading' => 'さかな'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hon', 'display_text' => '本', 'reading' => 'ほん'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'asa', 'display_text' => '朝', 'reading' => 'あさ'],

            // 中級（intermediate）- 5 ~ 7文字 20問
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nekogasuki', 'display_text' => '猫が好き', 'reading' => 'ねこがすき'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'soragaaoi', 'display_text' => '空が青い', 'reading' => 'そらがあおい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'honwoyomu', 'display_text' => '本を読む', 'reading' => 'ほんをよむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'mizuwonomu', 'display_text' => '水を飲む', 'reading' => 'みずをのむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hanagakirei', 'display_text' => '花がきれい', 'reading' => 'はながきれい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'gakkouniiku', 'display_text' => '学校に行く', 'reading' => 'がっこうにいく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tomodachito', 'display_text' => '友達と', 'reading' => 'ともだちと'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ongakukiku', 'display_text' => '音楽聴く', 'reading' => 'おんがくきく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'eigamiru', 'display_text' => '映画見る', 'reading' => 'えいがみる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ryourisuru', 'display_text' => '料理する', 'reading' => 'りょうりする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'undousuru', 'display_text' => '運動する', 'reading' => 'うんどうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'benkyousuru', 'display_text' => '勉強する', 'reading' => 'べんきょうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'asagohan', 'display_text' => '朝ごはん', 'reading' => 'あさごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'hirugohan', 'display_text' => '昼ごはん', 'reading' => 'ひるごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'yorugohan', 'display_text' => '夜ごはん', 'reading' => 'よるごはん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tenkinoyohou', 'display_text' => '天気の予報', 'reading' => 'てんきのよほう'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nihongogaku', 'display_text' => '日本語学', 'reading' => 'にほんごがく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kouenaruku', 'display_text' => '公園歩く', 'reading' => 'こうえんあるく'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'denshanoru', 'display_text' => '電車乗る', 'reading' => 'でんしゃのる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kazokusuki', 'display_text' => '家族好き', 'reading' => 'かぞくすき'],

            // 上級（advanced）- 8 ~ 10文字以上 20問
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'puroguraminguwobenkyousuru', 'display_text' => 'プログラミングを勉強する', 'reading' => 'ぷろぐらみんぐをべんきょうする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'mainichirenshuusurukotogadaiji', 'display_text' => '毎日練習することが大事', 'reading' => 'まいにちれんしゅうすることがだいじ'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'taipingunosukuiruwotakameru', 'display_text' => 'タイピングのスキルを高める', 'reading' => 'たいぴんぐのすきるをたかめる'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'nihongonobunpouwomanabou', 'display_text' => '日本語の文法を学ぼう', 'reading' => 'にほんごのぶんぽうをまなぼう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'atarashiigijutsuwobenkyoushiteiru', 'display_text' => '新しい技術を勉強している', 'reading' => 'あたらしいぎじゅつをべんきょうしている'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'konpyuutaanosougouwokaihatsusuru', 'display_text' => 'コンピューターの操作を開発する', 'reading' => 'こんぴゅーたーのそうさをかいはつする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'deetabeesunijouhouwotouroku', 'display_text' => 'データベースに情報を登録', 'reading' => 'でーたべーすにじょうほうをとうろく'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'yuuzaaintaafeesuwosekkeisuru', 'display_text' => 'ユーザーインターフェースを設計する', 'reading' => 'ゆーざーいんたーふぇーすをせっけいする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'tesutowojikkoushinagakakuninsuru', 'display_text' => 'テストを実行しながら確認する', 'reading' => 'てすとをじっこうしながらかくにんする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'koudomorebyuuwoteineinisusumerou', 'display_text' => 'コードレビューを丁寧に進めよう', 'reading' => 'こーどれびゅーをていねいにすすめよう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'arugorizmunokouritsuwokousatsusuru', 'display_text' => 'アルゴリズムの効率を考察する', 'reading' => 'あるごりずむのこうりつをこうさつする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'sekuritinohoshouwojuushisuru', 'display_text' => 'セキュリティの保証を重視する', 'reading' => 'せきゅりてぃのほしょうをじゅうしする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'kurawudokonpyuuteinguwokatsuyou', 'display_text' => 'クラウドコンピューティングを活用', 'reading' => 'くらうどこんぴゅーてぃんぐをかつよう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'sofutoueanohinshitsuwokanrisuru', 'display_text' => 'ソフトウェアの品質を管理する', 'reading' => 'そふとうぇあのひんしつをかんりする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'ajiairuhouhoronidounyuushiteiru', 'display_text' => 'アジャイル方法論に導入している', 'reading' => 'あじゃいるほうほうろんにどうにゅうしている'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'pafoomansunosaitakikatajuuyouda', 'display_text' => 'パフォーマンスの最適化が重要だ', 'reading' => 'ぱふぉーまんすのさいてきかがじゅうようだ'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'apinosetteitoserubaawokaihatsusuru', 'display_text' => 'APIの設定とサーバーを開発する', 'reading' => 'えーぴーあいのせっていとさーばーをかいはつする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'dokyumenteeshonwosakuseishiteikou', 'display_text' => 'ドキュメンテーションを作成していこう', 'reading' => 'どきゅめんてーしょんをさくせいしていこう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'chiimudenokyouryokugataisetsudearu', 'display_text' => 'チームでの協力が大切である', 'reading' => 'ちーむでのきょうりょくがたいせつである'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'jizokutekinakaizengajissennkoushi', 'display_text' => '持続的な改善が実践向上', 'reading' => 'じぞくてきなかいぜんがじっせんこうじょう'],
        ];
    }
}
