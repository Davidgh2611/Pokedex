import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative w-full lg:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pokemon-red transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl leading-5 font-cyber text-xs tracking-widest placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pokemon-red/50 focus:border-pokemon-red transition-all dark:text-white"
                placeholder="SEARCH POKÉMON DATA..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
