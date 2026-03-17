import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pokemon-accent"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 text-red-100 group-hover:text-white transition-colors" />
            ) : (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors animate-pulse-glow" />
            )}
        </button>
    );
}
