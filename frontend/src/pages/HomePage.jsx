import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePokemonList } from '../hooks/usePokemonList';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import PokemonGrid from '../components/PokemonGrid';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
    const { t } = useTranslation();
    const {
        data,
        meta,
        types,
        loading,
        error,
        filters,
        pagination
    } = usePokemonList();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">

            {/* Header & Controls */}
            <div className="mb-12 space-y-8 animate-fade-in">
                <div className="flex flex-col items-center text-center space-y-2">
                    <h1 className="text-4xl lg:text-5xl font-cyber font-bold text-gray-900 dark:text-white tracking-widest uppercase">
                        {t('common.nexus')} <span className="text-pokemon-red">Terminus</span>
                    </h1>
                    <p className="text-[10px] font-cyber font-bold text-gray-500 uppercase tracking-[0.5em]">{t('common.global_db') || 'Global Pokemon Database 2026'}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 justify-between items-center p-8 glass rounded-3xl">
                    <SearchBar
                        value={filters.searchTerm}
                        onChange={filters.setSearchTerm}
                    />
                    <FilterBar
                        types={types}
                        selectedType={filters.type}
                        onTypeChange={filters.setType}
                        sort={filters.sort}
                        onSortChange={filters.setSort}
                    />
                </div>
            </div>

            <ErrorMessage message={error} />

            {/* Grid */}
            <div className="animate-fade-in delay-200">
                <PokemonGrid data={data} loading={loading} />
            </div>

            {/* Pagination */}
            {!loading && !error && meta.totalPages > 0 && (
                <Pagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onNext={pagination.nextPage}
                    onPrev={pagination.prevPage}
                />
            )}

        </main>
    );
}
