import React, { useEffect, useState } from 'react';
import { Target, Sword, Shield, Zap, CircleDashed, Repeat } from 'lucide-react';
import { userPokemonService, pokemonService } from '../services/api';

export default function MyPokemonPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [tradeData, setTradeData] = useState({ pokemonId1: null, trainerId2: '', pokemonId2: '' });

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await userPokemonService.getMyPokemon();
            
            // Add images from pokeapi using service
            const withImages = await Promise.all(
                data.map(async (p) => {
                    const imageUrl = await pokemonService.getImageUrl(p.nombre) || pokemonService.getFallbackImageUrl(p.pokemon_id);
                    return { ...p, imageUrl };
                })
            );
            
            setPokemonList(withImages);
        } catch (err) {
            console.error('Error loading my pokemon:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleTrain = async (id) => {
        try {
            await userPokemonService.train(id);
            alert('¡Pokémon entrenado!');
            loadData(); // Refresh stats
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const handleRelease = async (id) => {
        if (!window.confirm('¿Seguro que quieres liberar este Pokémon?')) return;
        try {
            await userPokemonService.release(id);
            setPokemonList(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-pokemon-red border-t-transparent rounded-full animate-spin"></div>
                <span className="font-cyber text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">Loading Caught Pokemon...</span>
            </div>
        );
    }

    const handleTradeSubmit = async (e) => {
        e.preventDefault();
        try {
            await userPokemonService.trade(tradeData.pokemonId1, tradeData.trainerId2, tradeData.pokemonId2);
            alert('¡Intercambio realizado con éxito!');
            setShowTradeModal(false);
            loadData();
        } catch (err) {
            alert('Error en el intercambio: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative animate-fade-in w-full">
            <h1 className="text-4xl md:text-5xl font-cyber font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-8">
                My <span className="text-pokemon-red">Squad</span>
            </h1>

            {pokemonList.length === 0 ? (
                <div className="glass rounded-[40px] p-12 text-center border-white/10 dark:border-white/5">
                    <p className="font-cyber text-gray-500 uppercase tracking-widest text-sm">
                        You have not captured any Pokémon yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pokemonList.map((p) => (
                        <div key={p.id} className="glass rounded-3xl p-6 relative group border-white/10 dark:border-white/5 hover:border-pokemon-red/50 transition-colors">
                            <span className="absolute top-4 right-4 bg-pokemon-red/10 text-pokemon-red px-3 py-1 rounded-full text-xs font-cyber font-bold tracking-widest">
                                Lvl {p.nivel}
                            </span>
                            
                            <div className="mb-4 aspect-square rounded-2xl bg-white/50 dark:bg-black/20 flex items-center justify-center p-4">
                                <img src={p.imageUrl} alt={p.nombre} className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            
                            <h3 className="text-xl font-cyber font-bold mb-4 text-center dark:text-white capitalize">{p.nombre}</h3>
                            
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <div className="bg-gray-100 dark:bg-white/5 px-2 py-1.5 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center text-xs font-cyber font-bold text-red-500"><Sword className="w-3 h-3 justify-center mr-1" /> ATK</div>
                                    <span className="text-sm font-cyber dark:text-white">{p.ataque}</span>
                                </div>
                                <div className="bg-gray-100 dark:bg-white/5 px-2 py-1.5 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center text-xs font-cyber font-bold text-emerald-500"><Shield className="w-3 h-3 justify-center mr-1" /> DEF</div>
                                    <span className="text-sm font-cyber dark:text-white">{p.defensa}</span>
                                </div>
                                <div className="bg-gray-100 dark:bg-white/5 px-2 py-1.5 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center text-xs font-cyber font-bold text-amber-500"><Zap className="w-3 h-3 justify-center mr-1" /> SPD</div>
                                    <span className="text-sm font-cyber dark:text-white">{p.velocidad}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleTrain(p.id)}
                                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-cyber text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center"
                                >
                                    <Target className="w-3 h-3 mr-1" /> Train
                                </button>
                                <button
                                    onClick={() => {
                                        setTradeData({ ...tradeData, pokemonId1: p.id });
                                        setShowTradeModal(true);
                                    }}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl"
                                    title="Intercambiar"
                                >
                                    <Repeat className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleRelease(p.id)}
                                    className="px-4 bg-pokemon-red hover:bg-red-600 text-white py-2 rounded-xl font-cyber text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center"
                                >
                                    <CircleDashed className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Trade Modal */}
            {showTradeModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <form onSubmit={handleTradeSubmit} className="glass rounded-[32px] p-8 max-w-md w-full border-white/10 animate-scale-in">
                        <h2 className="text-2xl font-cyber font-bold text-white mb-6 uppercase tracking-tighter">Secure <span className="text-emerald-500">Trade</span></h2>
                        
                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-[10px] font-cyber font-bold text-gray-500 uppercase tracking-widest mb-2">Trainer ID 2</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Enter peer Trainer ID..."
                                    value={tradeData.trainerId2}
                                    onChange={e => setTradeData({...tradeData, trainerId2: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-cyber font-bold text-gray-500 uppercase tracking-widest mb-2">Peer Pokémon ID (DB ID)</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Enter their Pokémon's ID..."
                                    value={tradeData.pokemonId2}
                                    onChange={e => setTradeData({...tradeData, pokemonId2: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="button"
                                onClick={() => setShowTradeModal(false)}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-white font-cyber text-xs uppercase tracking-widest hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-cyber text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                            >
                                Confirm Trade
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
