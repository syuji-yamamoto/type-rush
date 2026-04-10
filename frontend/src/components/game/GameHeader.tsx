import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AudioControl } from "../AudioControl";

export function GameHeader() {
  return (
    <>
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center gap-1 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          ホームに戻る
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <AudioControl />
      </div>
    </>
  );
}
