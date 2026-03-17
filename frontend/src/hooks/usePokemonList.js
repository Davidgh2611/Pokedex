import { useState, useEffect, useCallback } from 'react';
import { pokemonService } from '../services/api';

// Custom debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export function usePokemonList() {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');
    const [sort, setSort] = useState('id'); // id, nombre, etc.

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [types, setTypes] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Fetch Types once
    useEffect(() => {
        pokemonService.getTypes()
            .then(res => setTypes(res))
            .catch(err => console.error('Failed to get types:', err));
    }, []);

    // Fetch Data
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await pokemonService.getList({
                page,
                limit,
                name: debouncedSearchTerm,
                type,
                sort
            });
            setData(res.data);
            setMeta(res.meta);
        } catch (err) {
            console.error(err);
            setError('Error al obtener los Pokémon desde el servidor.');
        } finally {
            setLoading(false);
        }
    }, [page, limit, debouncedSearchTerm, type, sort]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm, type, sort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        meta,
        types,
        loading,
        error,
        filters: {
            searchTerm,
            setSearchTerm,
            type,
            setType,
            sort,
            setSort
        },
        pagination: {
            page,
            setPage,
            nextPage: () => setPage(p => Math.min(p + 1, meta.totalPages)),
            prevPage: () => setPage(p => Math.max(p - 1, 1))
        }
    };
}
