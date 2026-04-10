import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AudioProvider, useAudioContext } from "./contexts/AudioContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import About from "./pages/About";
import { useBasicAuth } from "./hooks/useBasicAuth";
import { BasicAuthDialog } from "./components/BasicAuthDialog";

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
  const { isAuthenticated, showAuthDialog, authenticate } = useBasicAuth();

  return (
    <AudioProvider>
      <AuthProvider>
        <Router>
          <RouteBGMManager />
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {showAuthDialog && !isAuthenticated && (
              <BasicAuthDialog onAuthenticate={authenticate} />
            )}
            {isAuthenticated && (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
              </Routes>
            )}
          </div>
        </Router>
      </AuthProvider>
    </AudioProvider>
  );
}

export default App;
