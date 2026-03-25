import React, { useEffect, useState } from 'react';
import { Trophy, Star, Sword, Shield, Zap } from 'lucide-react';
import { pokemonService } from '../services/api';

export default function HallOfFamePage() {
    const [topPokemon, setTopPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTop = async () => {
            try {
                const data = await pokemonService.getTop10();
                // Add images
                const withImages = await Promise.all(
                    data.map(async (p) => {
                        const imageUrl = await pokemonService.getImageUrl(p.nombre) || pokemonService.getFallbackImageUrl(p.id);
                        return { ...p, imageUrl };
                    })
                );
                setTopPokemon(withImages);
            } catch (err) {
                console.error('Error fetching hall of fame:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTop();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-cyber text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">Entering Hall of Fame...</span>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative animate-fade-in w-full">
            <div className="flex flex-col items-center mb-12">
                <Trophy className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
                <h1 className="text-4xl md:text-6xl font-cyber font-bold text-gray-900 dark:text-white uppercase tracking-tighter text-center">
                    Hall of <span className="text-yellow-500">Fame</span>
                </h1>
                <p className="mt-4 font-cyber text-gray-500 uppercase tracking-widest text-xs text-center max-w-2xl">
                    Top 10 most powerful Pokémon ranked by total base stats (Attack + Defense + Speed).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {topPokemon.map((p, index) => (
                    <div key={p.id} className={`glass rounded-3xl p-6 relative group border-white/10 dark:border-white/5 transition-all duration-500 hover:scale-[1.05] ${index < 3 ? 'border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]' : ''}`}>
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center font-cyber font-bold text-white shadow-lg z-10">
                            #{index + 1}
                        </div>
                        
                        <div className="mb-4 aspect-square rounded-2xl bg-white/50 dark:bg-black/20 flex items-center justify-center p-4 relative overflow-hidden">
                            {index < 3 && <Star className="absolute top-2 right-2 w-4 h-4 text-yellow-500 animate-pulse" />}
                            <img src={p.imageUrl} alt={p.nombre} className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]" />
                        </div>
                        
                        <h3 className="text-lg font-cyber font-bold mb-4 text-center dark:text-white capitalize truncate">{p.nombre}</h3>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-cyber font-bold text-gray-500 uppercase">
                                <span>Total Stats</span>
                                <span className="text-yellow-500 text-sm">{p.stats_totales}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-1">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(p.stats_totales / 780) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="flex flex-col items-center"><Sword className="w-3 h-3 text-red-500" /><span className="text-[10px] font-cyber">{p.ataque}</span></div>
                            <div className="flex flex-col items-center"><Shield className="w-3 h-3 text-blue-500" /><span className="text-[10px] font-cyber">{p.defensa}</span></div>
                            <div className="flex flex-col items-center"><Zap className="w-3 h-3 text-amber-500" /><span className="text-[10px] font-cyber">{p.velocidad}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
