import React from 'react';
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';

export default function PokemonGrid({ data, loading }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">No se encontraron Pokémon con esos filtros. ¡Sigue buscando!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {data.map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}
