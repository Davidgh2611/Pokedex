import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export default function SoundToggle() {
    const { muted, toggleMute, playSound } = useSound();

    const handleToggle = () => {
        if (muted) playSound('click');
        toggleMute();
    };

    return (
        <button
            onClick={handleToggle}
            onMouseEnter={() => playSound('hover')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pokemon-red"
            aria-label="Toggle Sound"
        >
            {muted ? (
                <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            ) : (
                <Volume2 className="w-5 h-5 text-pokemon-red group-hover:text-red-400 transition-colors" />
            )}
        </button>
    );
}
