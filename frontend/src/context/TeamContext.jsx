import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSound } from './SoundContext';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const { playSound } = useSound();
    const [team, setTeam] = useState(() => {
        const saved = localStorage.getItem('pokedex_strike_team');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('pokedex_strike_team', JSON.stringify(team));
    }, [team]);

    const addToTeam = (pokemon) => {
        if (team.length >= 6) return false;
        if (team.some(p => p.id === pokemon.id)) return false;
        playSound('click');
        setTeam([...team, pokemon]);
        return true;
    };

    const removeFromTeam = (id) => {
        playSound('hover');
        setTeam(team.filter(p => p.id !== id));
    };

    return (
        <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) throw new Error('useTeam must be used within a TeamProvider');
    return context;
};
