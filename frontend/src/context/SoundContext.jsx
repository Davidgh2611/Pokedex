import React, { createContext, useContext, useState, useEffect } from 'react';
import { Howl } from 'howler';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [muted, setMuted] = useState(() => {
        const saved = localStorage.getItem('sound_muted');
        return saved === 'true';
    });

    const [sounds] = useState({
        click: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], volume: 0.5 }),
        hover: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'], volume: 0.2 }),
        whoosh: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'], volume: 0.4 }),
    });

    useEffect(() => {
        localStorage.setItem('sound_muted', muted);
    }, [muted]);

    const playSound = (name) => {
        if (!muted && sounds[name]) {
            sounds[name].play();
        }
    };

    const toggleMute = () => setMuted(prev => !prev);

    return (
        <SoundContext.Provider value={{ muted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error('useSound must be used within a SoundProvider');
    return context;
};
