import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AudioProvider } from "./contexts/AudioContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import { useBasicAuth } from "./hooks/useBasicAuth";
import { BasicAuthDialog } from "./components/BasicAuthDialog";

function App() {
  const { isAuthenticated, showAuthDialog, authenticate } = useBasicAuth();

  return (
    <AudioProvider>
      <AuthProvider>
        <Router>
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
              </Routes>
            )}
          </div>
        </Router>
      </AuthProvider>
    </AudioProvider>
  );
}

export default App;
