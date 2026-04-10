import { Link } from "react-router-dom";
import { AudioControl } from "../components/AudioControl";
import { Footer } from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-16">
      {/* 音量コントロール */}
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>

      <div className="w-full max-w-2xl bg-slate-800 rounded-lg p-8 space-y-8">
        {/* アプリの説明 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">
            TypeRushについて
          </h2>
          <p className="text-gray-300 leading-relaxed">
            TypeRushは、1分間のタイピングチャレンジを通じてタイピング速度と
            正確性を測定できるWebアプリケーションです。
            日本語（ローマ字入力）と英語の両方に対応し、
            3段階の難易度で練習できます。
          </p>
        </section>

        {/* ポートフォリオとしての目的 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">
            ポートフォリオ作品
          </h2>
          <p className="text-gray-300 leading-relaxed">
            このアプリは、Webアプリケーション開発のスキルを示すための
            ポートフォリオ作品として制作しました。
            商用サービスではありません。
          </p>
        </section>

        {/* 使用技術 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">使用技術</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">
                フロントエンド
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>React + TypeScript</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
                <li>React Router</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">バックエンド</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>Laravel 12 (PHP)</li>
                <li>MySQL</li>
                <li>Laravel Sanctum</li>
                <li>Docker</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">インフラ</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>AWS (S3, CloudFront, Lightsail)</li>
                <li>GitHub Actions CI/CD</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">その他</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>Web Audio API</li>
                <li>レスポンシブデザイン</li>
                <li>多言語対応</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 個人情報の取り扱い */}
        <section className="bg-slate-700/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-3">
            個人情報の取り扱いについて
          </h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>
              ・本アプリは
              <strong className="text-white">
                個人情報の収集を目的としていません
              </strong>
            </li>
            <li>
              ・登録時にメールアドレスは不要です（ニックネームのみ）
            </li>
            <li>
              ・保存されるデータはニックネーム、パスワード（暗号化済み）、
              ゲームスコアのみです
            </li>
            <li>
              ・登録データはポートフォリオ公開終了時に全て削除されます
            </li>
            <li>
              ・データを第三者に提供・販売することはありません
            </li>
          </ul>
        </section>

        {/* 開発者情報 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">開発者</h2>
          <div>
            <p className="text-white font-semibold">Yamamoto Shuuji</p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://github.com/shuuuuuji"
                className="text-cyan-400 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ホームに戻るリンク */}
        <div className="text-center pt-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            ← ホームに戻る
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
