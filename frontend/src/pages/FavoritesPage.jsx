import React, { useEffect, useState } from 'react';
import { pokemonService } from '../services/api';
import PokemonCard from '../components/PokemonCard';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await pokemonService.getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-pokemon-red border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-cyber font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center justify-center">
                    <Heart className="mr-4 text-pokemon-red fill-pokemon-red animate-pulse" />
                    {t('common.favorites')}
                </h1>
                <p className="text-[10px] font-cyber text-gray-500 uppercase mt-2 tracking-[0.4em]">Personal Collection Sync Active</p>
            </div>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
                    {favorites.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 glass rounded-[40px] border-white/5">
                    <p className="font-cyber text-gray-500 uppercase text-xs tracking-widest">No data stored in favorites nexus.</p>
                </div>
            )}
        </main>
    );
}
