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
            // 初級（beginner）- 短くてシンプルな文 20問
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the cat sat on the mat'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i like to eat apples'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the dog runs fast'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'she has a red car'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'we go to school'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the sun is hot'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i can see the moon'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'birds fly in the sky'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'he plays the piano'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'my name is tom'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the book is on the desk'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i drink water every day'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'she likes to read books'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the flower is beautiful'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i have two hands'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the sky is blue today'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'we eat lunch at noon'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the baby is sleeping'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'i love my family'],
            ['language' => 'english', 'difficulty' => 'beginner', 'text' => 'the fish swims in water'],

            // 中級（intermediate）- 一般的な文 20問
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'the quick brown fox jumps over the lazy dog'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'programming is the art of telling a computer what to do'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'practice makes perfect when it comes to typing'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'react is a javascript library for building user interfaces'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'typescript adds static type checking to javascript'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'learning new skills requires dedication and patience'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'the internet has changed how we communicate'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'good software design is essential for maintainability'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'debugging code can be challenging but rewarding'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'version control helps teams collaborate effectively'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'clean code is easy to read and understand'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'testing ensures your application works correctly'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'documentation helps others understand your code'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'algorithms are step by step procedures to solve problems'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'databases store and organize data efficiently'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'security should be considered from the start'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'user experience is key to successful products'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'agile methodology promotes iterative development'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'continuous integration improves code quality'],
            ['language' => 'english', 'difficulty' => 'intermediate', 'text' => 'cloud computing provides scalable infrastructure'],

            // 上級（advanced）- 長くて複雑な文 20問
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'the implementation of machine learning algorithms requires a deep understanding of mathematics and statistics'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'microservices architecture enables organizations to develop and deploy applications more efficiently'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'containerization with docker has revolutionized how developers package and distribute applications'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'asynchronous programming patterns help applications remain responsive during long operations'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'the principles of object oriented programming include encapsulation inheritance and polymorphism'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'functional programming emphasizes immutability and pure functions for predictable code behavior'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'distributed systems require careful consideration of network latency and partial failures'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'cryptographic protocols ensure secure communication between parties over untrusted networks'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'performance optimization often involves profiling identifying bottlenecks and refactoring code'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'the solid principles guide developers in creating maintainable and scalable software systems'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'reactive programming provides elegant solutions for handling asynchronous data streams'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'infrastructure as code allows teams to manage and provision resources through configuration files'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'graph databases excel at representing and querying highly connected data structures'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'event driven architecture enables loose coupling between components and better scalability'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'domain driven design focuses on modeling software to match business domain complexity'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'observability encompasses monitoring logging and tracing to understand system behavior'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'api design best practices include versioning consistent naming and comprehensive documentation'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'load balancing distributes incoming traffic across multiple servers to ensure high availability'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'caching strategies can significantly improve application performance and reduce database load'],
            ['language' => 'english', 'difficulty' => 'advanced', 'text' => 'continuous deployment pipelines automate the process of releasing software to production environments'],
        ];
    }

    /**
     * 日本語テキストを取得
     */
    private function getJapaneseTexts(): array
    {
        return [
            // 初級（beginner）- 短くてシンプルな文 20問
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'nekogasuki', 'display_text' => '猫が好き', 'reading' => 'ねこがすき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kyouhaiitenki', 'display_text' => '今日はいい天気', 'reading' => 'きょうはいいてんき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'asagohanwotabeta', 'display_text' => '朝ごはんを食べた', 'reading' => 'あさごはんをたべた'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ohayougozaimasu', 'display_text' => 'おはようございます', 'reading' => 'おはようございます'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'arigatougozaimasu', 'display_text' => 'ありがとうございます', 'reading' => 'ありがとうございます'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'inugahashiru', 'display_text' => '犬が走る', 'reading' => 'いぬがはしる'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'mizuwonomu', 'display_text' => '水を飲む', 'reading' => 'みずをのむ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'honwoyomu', 'display_text' => '本を読む', 'reading' => 'ほんをよむ'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'gakkouniiku', 'display_text' => '学校に行く', 'reading' => 'がっこうにいく'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'soragaaoi', 'display_text' => '空が青い', 'reading' => 'そらがあおい'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'hanagakirei', 'display_text' => '花がきれい', 'reading' => 'はながきれい'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'oyasuminasai', 'display_text' => 'おやすみなさい', 'reading' => 'おやすみなさい'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'tomodachigairu', 'display_text' => '友達がいる', 'reading' => 'ともだちがいる'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'ongakuwokiku', 'display_text' => '音楽を聴く', 'reading' => 'おんがくをきく'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'eikigatanoshii', 'display_text' => '映画が楽しい', 'reading' => 'えいががたのしい'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kazokugadaisuki', 'display_text' => '家族が大好き', 'reading' => 'かぞくがだいすき'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kurumadenoboru', 'display_text' => '車で登る', 'reading' => 'くるまでのぼる'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'denshadekuru', 'display_text' => '電車で来る', 'reading' => 'でんしゃでくる'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'kouenaruku', 'display_text' => '公園を歩く', 'reading' => 'こうえんをあるく'],
            ['language' => 'japanese', 'difficulty' => 'beginner', 'text' => 'morigaatui', 'display_text' => '森が暑い', 'reading' => 'もりがあつい'],

            // 中級（intermediate）- 一般的な文 20問
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'puroguraminguhatanoshii', 'display_text' => 'プログラミングは楽しい', 'reading' => 'ぷろぐらみんぐはたのしい'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'renshuusurebajotatusimasu', 'display_text' => '練習すれば上達します', 'reading' => 'れんしゅうすればじょうたつします'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'taipusukuriputowotsukaou', 'display_text' => 'タイプスクリプトを使おう', 'reading' => 'たいぷすくりぷとをつかおう'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nihongonobunpouwobenkyousuru', 'display_text' => '日本語の文法を勉強する', 'reading' => 'にほんごのぶんぽうをべんきょうする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'mainichidoryokusurukotogadaiji', 'display_text' => '毎日努力することが大事', 'reading' => 'まいにちどりょくすることがだいじ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'shigotogaowattarakaerimasu', 'display_text' => '仕事が終わったら帰ります', 'reading' => 'しごとがおわったらかえります'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'atarashiigijutsuwomanabou', 'display_text' => '新しい技術を学ぼう', 'reading' => 'あたらしいぎじゅつをまなぼう'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'kaikinotenkiwoyosoushimasu', 'display_text' => '会議の天気を予想します', 'reading' => 'かいぎのてんきをよそうします'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'konoakatanowahayakuarukeru', 'display_text' => 'この辺りは早く歩ける', 'reading' => 'このあたりははやくあるける'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'denwadetaisetsunahanashiwosuru', 'display_text' => '電話で大切な話をする', 'reading' => 'でんわでたいせつなはなしをする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'ryouriwotsukurunogasuki', 'display_text' => '料理を作るのが好き', 'reading' => 'りょうりをつくるのがすき'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'undousurutokekounitaru', 'display_text' => '運動すると健康になる', 'reading' => 'うんどうするとけんこうになる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'nihonnoryokouwotanoshimu', 'display_text' => '日本の旅行を楽しむ', 'reading' => 'にほんのりょこうをたのしむ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'eikinonakadenemuru', 'display_text' => '映画の中で眠る', 'reading' => 'えいがのなかでねむる'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'konpyuutanosoufutowearuwokaihatsu', 'display_text' => 'コンピュータのソフトウェアを開発', 'reading' => 'こんぴゅーたのそふとうぇあをかいはつ'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'intaanetodesaabisuwoteikyo', 'display_text' => 'インターネットでサービスを提供', 'reading' => 'いんたーねっとでさーびすをていきょう'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'deetabeesunijouhouwhohozon', 'display_text' => 'データベースに情報を保存', 'reading' => 'でーたべーすにじょうほうをほぞん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'yuuzaainterfeesuwosekkeisuru', 'display_text' => 'ユーザーインターフェースを設計する', 'reading' => 'ゆーざーいんたーふぇーすをせっけいする'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'tesutowojikkousitekekkawokakunin', 'display_text' => 'テストを実行して結果を確認', 'reading' => 'てすとをじっこうしてけっかをかくにん'],
            ['language' => 'japanese', 'difficulty' => 'intermediate', 'text' => 'koodoworibyuushitehinshitsuwoageru', 'display_text' => 'コードをレビューして品質を上げる', 'reading' => 'こーどをれびゅーしてひんしつをあげる'],

            // 上級（advanced）- 長くて複雑な文 20問
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'kikaikushugounoarugorizumuwojissousurunitahameikakuzousuurigakunochishikigahituyou', 'display_text' => '機械学習のアルゴリズムを実装するには明確な数理学の知識が必要', 'reading' => 'きかいがくしゅうのあるごりずむをじっそうするにはめいかくなすうりがくのちしきがひつよう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'maikurosaabisukookyotekuchahakouritutekiniapurikeeshonwokaihatsusuruniyuukoudosu', 'display_text' => 'マイクロサービスアーキテクチャは効率的にアプリケーションを開発するのに有効です', 'reading' => 'まいくろさーびすあーきてくちゃはこうりつてきにあぷりけーしょんをかいはつするのにゆうこうです'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'konntenakanihokideapurikeeshonwopakkeejikasurutaikeiwohenkoushita', 'display_text' => 'コンテナ化によりアプリケーションをパッケージ化する体系を変更した', 'reading' => 'こんてなかによりあぷりけーしょんをぱっけーじかするたいけいをへんこうした'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'hiidoukipuroguramingupatannhaaburikeeshonnonourekuoijisuru', 'display_text' => '非同期プログラミングパターンはアプリケーションの応答を維持する', 'reading' => 'ひどうきぷろぐらみんぐぱたーんはあぷりけーしょんのおうとうをいじする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'oburujiekutoshikorupuroguramingnihakapuserukakeishouporimorfizumugafukumaremasu', 'display_text' => 'オブジェクト指向プログラミングにはカプセル化継承ポリモーフィズムが含まれます', 'reading' => 'おぶじぇくとしこうぷろぐらみんぐにはかぷせるかけいしょうぽりもーふぃずむがふくまれます'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'kanshuupuroguraminguhafuhenkouseijinkansunoyosokukanoukoudouozyuushisuru', 'display_text' => '関数型プログラミングは不変性と純関数の予測可能な行動を重視する', 'reading' => 'かんすうがたぷろぐらみんぐはふへんせいとじゅんかんすうのよそくかのうなこうどうをじゅうしする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'bunnsannshisutemunihanetowaakuciennshitohubunntekieshippainochuuibukaitsuuyoudesu', 'display_text' => '分散システムにはネットワーク遅延と部分的故障の注意深い考慮が必要です', 'reading' => 'ぶんさんしすてむにはねっとわーくちえんとぶぶんてきこしょうのちゅういぶかいこうりょがひつようです'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'angoupurorokoruhashinraideshinainetowaakujonoanzennatsuushinwokakuhosuru', 'display_text' => '暗号プロトコルは信頼できないネットワーク上の安全な通信を確保する', 'reading' => 'あんごうぷろとこるはしんらいできないねっとわーくじょうのあんぜんなつうしんをかくほする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'pafoomansunosuitekikahaputororirunguboturonekkunotokuteitorihuakutaringuwofukumu', 'display_text' => 'パフォーマンスの最適化はプロファイリングボトルネックの特定とリファクタリングを含む', 'reading' => 'ぱふぉーまんすのさいてきかはぷろふぁいりんぐぼとるねっくのとくていとりふぁくたりんぐをふくむ'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'solidnogensokuhaijikanonasukeeruburnnasofutoueashisutemunokouchikuwoanzaisuru', 'display_text' => 'SOLIDの原則は維持可能なスケーラブルなソフトウェアシステムの構築を案内する', 'reading' => 'そりっどのげんそくはいじかのうなすけーらぶるなそふとうぇあしすてむのこうちくをあんないする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'riakutibupuroguraminguhadhidoukideetasuturiimuwoatukaunoniereganntonahouhouwoteikyou', 'display_text' => 'リアクティブプログラミングは非同期データストリームを扱うのにエレガントな方法を提供', 'reading' => 'りあくてぃぶぷろぐらみんぐはひどうきでーたすとりーむをあつかうのにえれがんとなほうほうをていきょう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'infurasutorakuchahakoodonitohiimuhasetteihuairuderisoosuwokanrisuru', 'display_text' => 'インフラストラクチャをコードとしてチームは設定ファイルでリソースを管理する', 'reading' => 'いんふらすとらくちゃをこーどとしてちーむはせっていふぁいるでりそーすをかんりする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'gurahudeetabeesuhakouitunihizentakushitadeetakouzouwohyougennshikuerrisuru', 'display_text' => 'グラフデータベースは高度に相互接続されたデータ構造を表現しクエリする', 'reading' => 'ぐらふでーたべーすはこうどにそうごせつぞくされたでーたこうぞうをひょうげんしくえりする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'ibentodoriebunaakyitekuchahakonpoonentokannnosouketsugoutozoukateikyou', 'display_text' => 'イベント駆動アーキテクチャはコンポーネント間の疎結合とスケーラビリティを提供', 'reading' => 'いべんとくどうあーきてくちゃはこんぽーねんとかんのそけつごうとすけーらびりてぃをていきょう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'domennkuudousekkeihabizinsedomennnohukazatsuseinitaiousurusofutouearuwomoderunihukoukasu', 'display_text' => 'ドメイン駆動設計はビジネスドメインの複雑性に対応するソフトウェアをモデルに焦点する', 'reading' => 'どめいんくどうせっけいはびじねすどめいんのふくざつせいにたいおうするそふとうぇあをもでるにしょうてんする'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'kannsokunouhariokuhamonitarinnguroginngutsureisingudeshisuteimunikoudouworiekai', 'display_text' => '可観測性はモニタリングロギングトレーシングでシステムの行動を理解', 'reading' => 'かかんそくせいはもにたりんぐろぎんぐとれーしんぐでしすてむのこうどうをりかい'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'apisekeinobesutopurakutisuhabaajoninnikuikkanshitaneiminngutohokutsutekinadokyumenteshon', 'display_text' => 'API設計のベストプラクティスはバージョニング一貫した命名と包括的なドキュメンテーション', 'reading' => 'えーぴーあいせっけいのべすとぷらくてぃすはばーじょにんぐいっかんしためいめいとほうかつてきなどきゅめんてーしょん'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'roudobarannsinguhayuunyuutraffuikuwohukusuusaabaanibunnpaishitekoukayouseiwokakuho', 'display_text' => 'ロードバランシングは流入トラフィックを複数サーバーに分配して高可用性を確保', 'reading' => 'ろーどばらんしんぐはりゅうにゅうとらふぃっくをふくすうさーばーにぶんぱいしてこうかようせいをかくほ'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'kyasshingusenryakuhaapurikeeshonpahuoomansuwokaizenshideetabeesuhuukawogenshou', 'display_text' => 'キャッシング戦略はアプリケーションパフォーマンスを改善しデータベース負荷を減少', 'reading' => 'きゃっしんぐせんりゃくはあぷりけーしょんぱふぉーまんすをかいぜんしでーたべーすふかをげんしょう'],
            ['language' => 'japanese', 'difficulty' => 'advanced', 'text' => 'keizokutekinahokeppupaipurainhasohuotouearuwopurodakushonkannkyounirisuusupurosesuwojidouka', 'display_text' => '継続的デプロイパイプラインはソフトウェアを本番環境にリリースするプロセスを自動化', 'reading' => 'けいぞくてきでぷろいぱいぷらいんはそふとうぇあをほんばんかんきょうにりりーすするぷろせすをじどうか'],
        ];
    }
}
