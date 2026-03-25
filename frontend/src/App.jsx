import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { TeamProvider } from './context/TeamContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ComparisonPage from './pages/ComparisonPage';
import FavoritesPage from './pages/FavoritesPage';
import TeamBuilderPage from './pages/TeamBuilderPage';
import AdminPage from './pages/AdminPage';
import MyPokemonPage from './pages/MyPokemonPage';
import HallOfFamePage from './pages/HallOfFamePage';
import SearchBenchmarkPage from './pages/SearchBenchmarkPage';
import LoginPage from './pages/LoginPage';
import { AnimatePresence, motion } from 'framer-motion';

// Creando un componente contenedor de transiciones
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Componente que maneja las rutas con AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/pokemon/:id" element={<PageTransition><DetailPage /></PageTransition>} />
        <Route path="/compare" element={<PageTransition><ComparisonPage /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><FavoritesPage /></PageTransition>} />
        <Route path="/team-builder" element={<PageTransition><TeamBuilderPage /></PageTransition>} />
        <Route path="/my-pokemon" element={<PageTransition><MyPokemonPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
        <Route path="/hall-of-fame" element={<PageTransition><HallOfFamePage /></PageTransition>} />
        <Route path="/benchmark" element={<PageTransition><SearchBenchmarkPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SoundProvider>
          <TeamProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] transition-colors duration-500 flex flex-col cyber-grid">
                <Navbar />
                <div className="flex-grow flex flex-col relative z-10 w-full overflow-hidden">
                  <AnimatedRoutes />
                </div>
              </div>
            </Router>
          </TeamProvider>
        </SoundProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
