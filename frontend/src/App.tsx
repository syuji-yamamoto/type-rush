import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AudioProvider, useAudioContext } from "./contexts/AudioContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import About from "./pages/About";

/**
 * ルーティングに基づいてBGMシーンを管理
 * /game以外のルートではメニューBGMを設定
 * /gameはuseGameLogicが直接BGMを管理
 */
function RouteBGMManager() {
  const location = useLocation();
  const { setBGMScene } = useAudioContext();

  useEffect(() => {
    if (location.pathname !== "/game") {
      setBGMScene("menu");
    }
  }, [location.pathname, setBGMScene]);

  return null;
}

function App() {
  return (
    <AudioProvider>
      <Router>
        <RouteBGMManager />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
