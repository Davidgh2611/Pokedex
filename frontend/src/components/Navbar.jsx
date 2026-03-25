import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sword, Trophy, Timer } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 dark:border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-pokemon-red rounded-full flex items-center justify-center border-2 border-pokemon-dark dark:border-white group-hover:rotate-180 transition-transform duration-700 shadow-lg">
              <div className="w-full h-0.5 bg-pokemon-dark dark:bg-white absolute top-1/2 -translate-y-1/2"></div>
              <div className="w-4 h-4 rounded-full border-2 border-pokemon-dark dark:border-white bg-white z-10"></div>
            </div>
            <span className="font-cyber font-bold text-2xl tracking-tighter text-gray-900 dark:text-white">
              POKÉDEX <span className="text-pokemon-red">2026</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-8 text-[10px] font-cyber font-bold tracking-[0.2em] uppercase">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">{t('common.nexus')}</Link>
              <Link to="/compare" className="text-gray-400 hover:text-pokemon-red transition-colors flex items-center">
                <Sword size={12} className="mr-2" />
                {t('common.laboratory')}
              </Link>
              <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">
                {t('common.favorites')}
              </Link>
              <Link to="/team-builder" className="text-gray-400 hover:text-white transition-colors">
                Squad
              </Link>
              <Link to="/my-pokemon" className="text-gray-400 hover:text-white transition-colors">
                My Pokémon
              </Link>
              <Link to="/hall-of-fame" className="text-gray-400 hover:text-yellow-500 transition-colors flex items-center">
                <Trophy size={12} className="mr-2" />
                Hall of Fame
              </Link>
              <Link to="/benchmark" className="text-gray-400 hover:text-pokemon-red transition-colors flex items-center">
                <Timer size={12} className="mr-2" />
                Benchmark
              </Link>
              <Link to="/admin" className="text-gray-400 hover:text-emerald-500 transition-colors">
                Admin
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <div className="h-6 w-px bg-white/10 hidden md:block"></div>
              <SoundToggle />
              <ThemeToggle />
              
              <div className="h-6 w-px bg-white/10 mx-2"></div>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-[10px] font-cyber font-bold text-white uppercase tracking-tighter">{user?.username}</span>
                    <span className="text-[8px] font-cyber text-pokemon-red uppercase tracking-widest">{user?.role}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-pokemon-red/20 text-gray-400 hover:text-pokemon-red transition-all group"
                    title="Logout"
                  >
                    <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-pokemon-red text-white font-cyber font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(239,68,68,0.2)]"
                >
                  <LogIn size={14} />
                  Access
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
