import React, { useState } from 'react';
import { pokemonService } from '../services/api';
import StatRadar from './StatRadar';
import SearchBar from './SearchBar';
import { X, Sword, Shield } from 'lucide-react';

export default function CompareTool() {
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);
    const [results, setResults] = useState([]);
    const [selectingFor, setSelectingFor] = useState(null); // 'left' or 'right'

    const handleSearch = async (q) => {
        if (q.length < 2) {
            setResults([]);
            return;
        }
        const data = await pokemonService.search(q);
        setResults(data);
    };

    const selectPokemon = (pokemon) => {
        if (selectingFor === 'left') setP1(pokemon);
        else setP2(pokemon);
        setSelectingFor(null);
        setResults([]);
    };

    return (
        <div className="glass p-8 rounded-[40px] border-white/20 dark:border-white/5 space-y-8 max-w-5xl mx-auto shadow-2xl">
            <h2 className="font-cyber font-bold text-xl text-center uppercase tracking-[0.2em] dark:text-white">
                Nexus <span className="text-pokemon-red">Comparator</span>
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Pokemon 1 */}
                <div className="flex-1 w-full space-y-4">
                    {!p1 ? (
                        <button
                            onClick={() => setSelectingFor('left')}
                            className="w-full aspect-square rounded-3xl border-2 border-dashed border-white/10 dark:border-white/5 flex flex-col items-center justify-center text-gray-500 hover:border-pokemon-red hover:text-pokemon-red transition-all bg-white/5"
                        >
                            <span className="font-cyber text-[10px] uppercase">Select Subject A</span>
                        </button>
                    ) : (
                        <div className="relative group overflow-hidden rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 p-6 flex flex-col items-center shadow-lg transition-all hover:border-pokemon-red">
                            <button onClick={() => setP1(null)} className="absolute top-4 right-4 text-gray-400 hover:text-pokemon-red transition-colors"><X size={18} /></button>
                            <img src={pokemonService.getFallbackImageUrl(p1.id)} className="w-40 h-40 object-contain drop-shadow-2xl animate-float" alt={p1.nombre} />
                            <span className="font-cyber font-bold uppercase tracking-widest mt-6 text-lg dark:text-white">{p1.nombre}</span>
                            <div className="flex gap-2 mt-2">
                                <span className="text-[10px] font-cyber text-pokemon-red border border-pokemon-red/30 px-2 py-0.5 rounded">ID: {p1.id}</span>
                                <span className="text-[10px] font-cyber text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded">LVL: {p1.nivel}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Radar Chart Middle */}
                <div className="flex-[2] w-full min-h-[300px] flex items-center justify-center relative">
                    {p1 && p2 ? (
                        <StatRadar stats1={p1} stats2={p2} name1={p1.nombre} name2={p2.nombre} />
                    ) : (
                        <div className="text-center text-gray-400 font-cyber text-[10px] uppercase animate-pulse border-2 border-white/5 rounded-full p-20 aspect-square flex items-center justify-center">
                            Awaiting full data set...
                        </div>
                    )}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-pokemon-red/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Pokemon 2 */}
                <div className="flex-1 w-full space-y-4">
                    {!p2 ? (
                        <button
                            onClick={() => setSelectingFor('right')}
                            className="w-full aspect-square rounded-3xl border-2 border-dashed border-white/10 dark:border-white/5 flex flex-col items-center justify-center text-gray-500 hover:border-pokemon-red hover:text-pokemon-red transition-all bg-white/5"
                        >
                            <span className="font-cyber text-[10px] uppercase">Select Subject B</span>
                        </button>
                    ) : (
                        <div className="relative group overflow-hidden rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 p-6 flex flex-col items-center shadow-lg transition-all hover:border-blue-500">
                            <button onClick={() => setP2(null)} className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 transition-colors"><X size={18} /></button>
                            <img src={pokemonService.getFallbackImageUrl(p2.id)} className="w-40 h-40 object-contain drop-shadow-2xl animate-float" alt={p2.nombre} />
                            <span className="font-cyber font-bold uppercase tracking-widest mt-6 text-lg dark:text-white">{p2.nombre}</span>
                            <div className="flex gap-2 mt-2">
                                <span className="text-[10px] font-cyber text-pokemon-red border border-pokemon-red/30 px-2 py-0.5 rounded">ID: {p2.id}</span>
                                <span className="text-[10px] font-cyber text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded">LVL: {p2.nivel}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Selection Modal */}
            {selectingFor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                    <div className="glass w-full max-w-2xl p-10 rounded-[48px] border-white/20 shadow-[-10px_-10px_30px_rgba(255,255,255,0.05),10px_10px_30px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="font-cyber font-bold text-xl uppercase text-pokemon-red tracking-widest">Select Combatant</h3>
                                <p className="text-[10px] font-cyber text-gray-500 uppercase mt-1">Locate target data in nexus</p>
                            </div>
                            <button onClick={() => setSelectingFor(null)} className="p-3 rounded-full hover:bg-white/5 transition-colors"><X className="text-white hover:text-pokemon-red" /></button>
                        </div>

                        <SearchBar onChange={handleSearch} />

                        <div className="mt-8 max-h-[400px] overflow-y-auto space-y-3 pr-4 custom-scrollbar">
                            {results.length > 0 ? (
                                results.map(r => (
                                    <button
                                        key={r.id}
                                        onClick={() => selectPokemon(r)}
                                        className="w-full p-6 rounded-2xl bg-white/5 hover:bg-pokemon-red/20 border border-white/5 hover:border-pokemon-red/50 flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center space-x-6">
                                            <img src={pokemonService.getFallbackImageUrl(r.id)} className="w-12 h-12 object-contain" alt="" />
                                            <div className="text-left">
                                                <span className="block font-cyber font-bold uppercase tracking-widest text-white">{r.nombre}</span>
                                                <span className="text-[8px] font-cyber text-gray-500">RANK: {r.nivel} | ID: {r.id}</span>
                                            </div>
                                        </div>
                                        <Sword size={16} className="text-pokemon-red opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                                    <Shield className="mx-auto text-gray-700 w-12 h-12 mb-4" />
                                    <p className="font-cyber text-[10px] text-gray-600 uppercase tracking-widest">Input search parameters</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
