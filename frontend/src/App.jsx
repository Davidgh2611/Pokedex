import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ComparisonPage from './pages/ComparisonPage';
import FavoritesPage from './pages/FavoritesPage';
import TeamBuilderPage from './pages/TeamBuilderPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] transition-colors duration-500 flex flex-col cyber-grid">
            <Navbar />
            <div className="flex-grow relative z-10 w-full overflow-x-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:id" element={<DetailPage />} />
                <Route path="/compare" element={<ComparisonPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/team-builder" element={<TeamBuilderPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
