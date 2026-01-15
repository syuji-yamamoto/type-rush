import { Link } from "react-router-dom";
import { AudioControl } from "../AudioControl";

export function GameHeader() {
  return (
    <>
      {/* ヘッダー */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-gray-300 hover:text-white">
          ← ホームに戻る
        </Link>
      </div>

      {/* 音量コントロール */}
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>
    </>
  );
}
