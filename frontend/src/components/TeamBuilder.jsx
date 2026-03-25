import React, { useState, useEffect } from 'react';
import { pokemonService } from '../services/api';
import { Trash2, ShieldAlert, Zap, Sword, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSound } from '../context/SoundContext';

export default function TeamBuilder() {
    const { t } = useTranslation();
    const { playSound } = useSound();
    const [team, setTeam] = useState(() => {
        const saved = localStorage.getItem('pokedex_strike_team');
        return saved ? JSON.parse(saved) : [];
    });
    const [analysis, setAnalysis] = useState({ weaknesses: [], strengths: [] });

    // Save team to persistence whenever it changes
    useEffect(() => {
        localStorage.setItem('pokedex_strike_team', JSON.stringify(team));
    }, [team]);

    const addToTeam = (pokemon) => {
        if (team.length >= 6) return;
        if (team.some(p => p.id === pokemon.id)) return;
        playSound('click');
        setTeam([...team, pokemon]);
    };

    const removeFromTeam = (id) => {
        playSound('hover');
        setTeam(team.filter(p => p.id !== id));
    };

    useEffect(() => {
        // Simple type coverage analysis logic
        const analyzeTypeCoverage = () => {
            const types = team.map(p => p.tipo_principal);
            const counts = {};
            types.forEach(t => counts[t] = (counts[t] || 0) + 1);

            const weaknesses = [];
            if (!types.includes('Agua') && !types.includes('Planta')) weaknesses.push('Vulnerable to Fire');
            if (!types.includes('Eléctrico') && !types.includes('Tierra')) weaknesses.push('Low Speed Coverage');

            setAnalysis({ weaknesses, counts });
        };
        analyzeTypeCoverage();
    }, [team]);

    return (
        <div className="glass p-10 rounded-[48px] border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Team Grid */}
                <div className="flex-[2] space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="font-cyber font-bold text-xl uppercase tracking-widest dark:text-white">
                            Strike <span className="text-pokemon-red">Squad</span>
                        </h2>
                        <span className="font-cyber text-[10px] text-gray-500 uppercase tracking-widest">{team.length} / 6 Deployed</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-square rounded-3xl border-2 border-dashed border-white/5 bg-white/5 flex flex-col items-center justify-center relative group overflow-hidden">
                                {team[i] ? (
                                    <>
                                        <button
                                            onClick={() => removeFromTeam(team[i].id)}
                                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        <img src={pokemonService.getFallbackImageUrl(team[i].id)} className="w-20 h-20 object-contain drop-shadow-xl" alt="" />
                                        <span className="mt-2 font-cyber font-bold text-[8px] uppercase tracking-widest dark:text-white">{team[i].nombre}</span>
                                    </>
                                ) : (
                                    <span className="font-cyber text-[8px] text-gray-700 uppercase">Awaiting Intel</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Analysis Panel */}
                <div className="flex-1 glass bg-white/5 p-8 rounded-[32px] border-white/5 space-y-6">
                    <h3 className="font-cyber font-bold text-xs uppercase text-pokemon-red tracking-[0.3em] flex items-center">
                        <Activity size={14} className="mr-3" />
                        Coverage Reports
                    </h3>

                    <div className="space-y-4">
                        {team.length === 0 ? (
                            <p className="text-[10px] font-cyber text-gray-500 uppercase leading-loose">Initialize deployment to generate holographic analysis.</p>
                        ) : (
                            <>
                                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                                    <div className="flex items-center text-blue-400 mb-2">
                                        <Zap size={14} className="mr-2" />
                                        <span className="font-cyber font-bold text-[10px] uppercase">Active Synergy</span>
                                    </div>
                                    <p className="text-[9px] font-cyber text-gray-400 uppercase">Diversity index: {Object.keys(analysis.counts || {}).length} types detected.</p>
                                </div>

                                {analysis.weaknesses.map((w, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                        <div className="flex items-center text-amber-400 mb-2">
                                            <ShieldAlert size={14} className="mr-2" />
                                            <span className="font-cyber font-bold text-[10px] uppercase">Strategic Gap</span>
                                        </div>
                                        <p className="text-[9px] font-cyber text-gray-400 uppercase">{w}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-pokemon-red text-white font-cyber font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30" disabled={team.length < 1}>
                        Finalize Deployment
                    </button>
                </div>

            </div>
        </div>
    );
}
