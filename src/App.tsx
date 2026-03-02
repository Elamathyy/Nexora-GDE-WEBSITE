import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import CursorAndCoords from './components/CursorAndCoords';
import Home from './pages/Home';
import Events from './pages/Events';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Vault from './pages/Vault';
import Resources from './pages/Resources';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <Home />
          </PageWrapper>
        } />
        <Route path="/vault" element={
          <PageWrapper>
            <Vault />
          </PageWrapper>
        } />
        <Route path="/events" element={
          <PageWrapper>
            <Events />
          </PageWrapper>
        } />
        <Route path="/leaderboard" element={
          <PageWrapper>
            <Leaderboard />
          </PageWrapper>
        } />
        <Route path="/resources" element={
          <PageWrapper>
            <Resources />
          </PageWrapper>
        } />
        <Route path="/profile/:id" element={
          <PageWrapper>
            <Profile />
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.8, z: -500 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.8, z: -500 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#00FF41] selection:text-black overflow-x-hidden">
        <CursorAndCoords />
        <Navbar />
        
        <AnimatedRoutes />

        {/* Global Overlay Effects */}
        <div className="fixed inset-0 pointer-events-none z-[9998] bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.02)_0%,transparent_100%)]" />
        <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </Router>
  );
}
