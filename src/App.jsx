import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import RepoDetail from './pages/RepoDetail';
import Explore from './pages/Explore';
import Guide from './pages/Guide';
import './index.css';

function AppContent() {
  const location = useLocation();
  const [introComplete, setIntroComplete] = useState(false);
  
  const isHome = location.pathname === '/';
  const showNav = !isHome || introComplete;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-blue-500/30">
        <div className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-1000 ease-in-out ${showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Navbar />
        </div>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onIntroComplete={() => setIntroComplete(true)} />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/repo/:owner/:name" element={<RepoDetail />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>
        <div className={`transition-opacity duration-1000 ease-in-out ${showNav ? 'opacity-100' : 'opacity-0'}`}>
          <Footer />
        </div>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
