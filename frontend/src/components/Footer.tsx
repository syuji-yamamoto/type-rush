import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 py-3 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-1">
        <span>Typing Game Portfolio by Yamamoto Shuji</span>
        <span>
          個人情報の収集は行っておりません /{"  "}
          <Link to="/about" className="text-cyan-500 hover:underline">
            このアプリについて
          </Link>
        </span>
      </div>
    </footer>
  );
}
