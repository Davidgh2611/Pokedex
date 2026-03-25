import React, { useState } from 'react';
import { Search, Timer, Database, Zap } from 'lucide-react';
import { pokemonService } from '../services/api';

export default function SearchBenchmarkPage() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const data = await pokemonService.searchBenchmark(query);
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-12 animate-fade-in w-full">
            <h1 className="text-3xl md:text-5xl font-cyber font-bold text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">
                Search <span className="text-pokemon-red">Benchmark</span>
            </h1>

            <div className="glass rounded-[32px] p-8 border-white/10 mb-8">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Search Pokémon to measure time..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-cyber text-sm focus:border-pokemon-red outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="bg-pokemon-red text-white px-8 rounded-2xl font-cyber font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        {loading ? 'Measuring...' : 'Benchmark'}
                    </button>
                </div>

                {result && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                            <Timer className="text-amber-500 w-6 h-6 mb-2" />
                            <span className="text-xs font-cyber text-gray-500 uppercase">Response Time</span>
                            <span className="text-2xl font-cyber font-bold text-white">{result.timeMs} ms</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                            <Database className="text-blue-500 w-6 h-6 mb-2" />
                            <span className="text-xs font-cyber text-gray-500 uppercase">Records Found</span>
                            <span className="text-2xl font-cyber font-bold text-white">{result.count}</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
                            <Zap className="text-emerald-500 w-6 h-6 mb-2" />
                            <span className="text-xs font-cyber text-gray-500 uppercase">Performance</span>
                            <span className="text-2xl font-cyber font-bold text-white">{(1000 / result.timeMs).toFixed(0)} q/s</span>
                        </div>
                    </div>
                )}
            </div>

            {result && result.results.length > 0 && (
                <div className="glass rounded-[32px] p-8 border-white/10 max-h-[400px] overflow-y-auto">
                    <h3 className="font-cyber font-bold text-gray-400 uppercase tracking-widest text-xs mb-4">Results Matrix</h3>
                    <div className="space-y-2">
                        {result.results.map(p => (
                            <div key={p.id} className="flex justify-between items-center py-2 border-b border-white/5 text-sm font-cyber text-gray-300 capitalize">
                                <span>{p.nombre}</span>
                                <span className="text-gray-600">ID: {p.id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
