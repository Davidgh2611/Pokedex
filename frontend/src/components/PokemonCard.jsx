import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TypeBadge from './TypeBadge';
import { pokemonService } from '../services/api';
import { Heart } from 'lucide-react';
import { useSound } from '../context/SoundContext';

const typeBorderColors = {
    Fuego: 'group-hover:border-red-500/50',
    Agua: 'group-hover:border-blue-500/50',
    Planta: 'group-hover:border-green-500/50',
    Eléctrico: 'group-hover:border-yellow-400/50',
    Veneno: 'group-hover:border-purple-500/50',
    Normal: 'group-hover:border-gray-400/50',
};

export default function PokemonCard({ pokemon, isFavoriteInitial = false }) {
    const [image, setImage] = useState(pokemonService.getFallbackImageUrl(pokemon.id));
    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
    const { playSound } = useSound();
    const borderColor = typeBorderColors[pokemon.tipo_principal] || 'group-hover:border-pokemon-red/50';

    useEffect(() => {
        let mounted = true;
        pokemonService.getImageUrl(pokemon.nombre).then(url => {
            if (mounted && url) setImage(url);
        });
        return () => mounted = false;
    }, [pokemon.nombre]);

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        playSound('click');
        try {
            if (isFavorite) {
                await pokemonService.removeFavorite(pokemon.id);
                setIsFavorite(false);
            } else {
                await pokemonService.addFavorite(pokemon.id);
                setIsFavorite(true);
            }
        } catch (err) {
            console.error('Favorite toggle failed:', err);
        }
    };

    return (
        <Link to={`/pokemon/${pokemon.id}`} className="block h-full cursor-pointer group animate-fade-in relative">
            <div className={`h-full flex flex-col glass rounded-3xl transition-all duration-500 transform group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] border-2 border-transparent ${borderColor}`}>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="font-cyber font-bold text-xs tracking-widest text-gray-400 dark:text-gray-500 opacity-50">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>
                </div>

                {/* Favorite Toggle */}
                <button
                    onClick={toggleFavorite}
                    onMouseEnter={() => playSound('hover')}
                    className="absolute top-4 right-4 z-[20] p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all group/fav"
                >
                    <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-pokemon-red text-pokemon-red scale-110' : 'text-gray-400 group-hover/fav:text-pokemon-red'}`} />
                </button>

                {/* Image Display */}
                <div className="p-8 pb-4 flex justify-center items-center relative overflow-hidden h-48">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                        src={image}
                        alt={pokemon.nombre}
                        className="w-32 h-32 object-contain z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)] animate-float"
                    />
                </div>

                {/* Info */}
                <div className="p-6 pt-2 flex flex-col items-center flex-grow text-center">
                    <h2 className="text-xl font-cyber font-bold capitalize text-gray-800 dark:text-gray-100 mb-3 tracking-tight group-hover:text-pokemon-red transition-colors">
                        {pokemon.nombre}
                    </h2>
                    <TypeBadge type={pokemon.tipo_principal} />

                    <div className="mt-auto pt-5 w-full">
                        <div className="flex justify-between items-center text-[10px] font-cyber font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-t border-gray-100 dark:border-white/5 pt-4">
                            <span>Level {pokemon.nivel}</span>
                            <span className="text-pokemon-accent group-hover:text-pokemon-red transition-colors">Secure Data</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
