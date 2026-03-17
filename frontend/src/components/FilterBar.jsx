import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function FilterBar({ types, selectedType, onTypeChange, sort, onSortChange }) {
    const selectStyles = "block w-full pl-10 pr-10 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl font-cyber text-[10px] tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-pokemon-red/50 transition-all dark:text-white appearance-none cursor-pointer";

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-48 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400 group-focus-within:text-pokemon-red transition-colors" />
                </div>
                <select
                    className={selectStyles}
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}
                >
                    <option value="" className="bg-white dark:bg-gray-900">ALL TYPES</option>
                    {types.map((type) => (
                        <option key={type} value={type} className="bg-white dark:bg-gray-900 uppercase">
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="relative flex-1 sm:w-48 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SlidersHorizontal className="h-4 w-4 text-gray-400 group-focus-within:text-pokemon-red transition-colors" />
                </div>
                <select
                    className={selectStyles}
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="id" className="bg-white dark:bg-gray-900">ID ASCENDING</option>
                    <option value="nombre" className="bg-white dark:bg-gray-900">NAME A-Z</option>
                    <option value="nivel" className="bg-white dark:bg-gray-900">LEVEL HIGH</option>
                </select>
            </div>
        </div>
    );
}
