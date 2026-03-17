import { useState, useEffect } from 'react';
import { pokemonService } from '../services/api';

export function usePokemonDetail(id) {
    const [pokemon, setPokemon] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                // Get from DB
                const data = await pokemonService.getById(id);

                if (!isMounted) return;
                setPokemon(data);

                // Fetch image from PokéAPI
                const image = await pokemonService.getImageUrl(data.nombre);
                if (isMounted) {
                    setImageUrl(image);
                }

            } catch (err) {
                if (!isMounted) return;
                console.error(err);
                setError(err.response?.data?.message || 'Error al cargar el Pokémon');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return { pokemon, imageUrl, loading, error };
}
