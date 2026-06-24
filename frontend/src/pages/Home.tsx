import { Link } from "react-router-dom";
import { AudioControl } from "../components/AudioControl";
import { Footer } from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 音量コントロール */}
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Type<span className="text-cyan-400">Rush</span>
        </h1>
        <p className="text-gray-300 text-xl mb-2">
          1分間のタイピングチャレンジ
        </p>

        <div className="space-y-4">
          <Link
            to="/game"
            className="block w-64 mx-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            ゲームを始める
          </Link>

          {/* このアプリについてリンク */}
          <div className="mt-8">
            <Link
              to="/about"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              このアプリについて
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
