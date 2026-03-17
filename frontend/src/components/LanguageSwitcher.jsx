import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useSound } from '../context/SoundContext';

const languages = [
    { code: 'es', label: 'ESP', flag: '🇪🇸' },
    { code: 'en', label: 'ENG', flag: '🇺🇸' },
    { code: 'jp', label: 'JPN', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const { playSound } = useSound();

    const changeLanguage = (lng) => {
        playSound('click');
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 group">
            <div className="p-1 px-3 hidden lg:flex items-center text-[8px] font-cyber font-bold text-gray-500 uppercase tracking-widest border-r border-white/10 mr-1">
                <Languages size={10} className="mr-2" />
                Lang
            </div>
            <div className="flex space-x-1">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        onMouseEnter={() => playSound('hover')}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-cyber font-bold transition-all duration-300 ${i18n.language === lang.code
                                ? 'bg-pokemon-red text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
