import React from 'react';

const typeColors = {
    Planta: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    Veneno: 'bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]',
    Fuego: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
    Volador: 'bg-sky-500/10 text-sky-500 border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]',
    Agua: 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    Bicho: 'bg-lime-500/10 text-lime-500 border-lime-500/20 shadow-[0_0_15px_rgba(132,204,22,0.1)]',
    Normal: 'bg-slate-500/10 text-slate-500 border-slate-500/20 shadow-[0_0_15px_rgba(100,116,139,0.1)]',
    Eléctrico: 'bg-yellow-400/10 text-yellow-500 border-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.1)]',
    Tierra: 'bg-amber-600/10 text-amber-600 border-amber-600/20 shadow-[0_0_15px_rgba(217,119,6,0.1)]',
    Hada: 'bg-pink-400/10 text-pink-400 border-pink-400/20 shadow-[0_0_15px_rgba(244,114,182,0.1)]',
    Lucha: 'bg-orange-700/10 text-orange-700 border-orange-700/20 shadow-[0_0_15px_rgba(194,65,12,0.1)]',
    Psíquico: 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]',
    Roca: 'bg-stone-500/10 text-stone-500 border-stone-500/20 shadow-[0_0_15px_rgba(120,113,108,0.1)]',
    Acero: 'bg-zinc-400/10 text-zinc-500 border-zinc-400/20 shadow-[0_0_15px_rgba(161,161,170,0.1)]',
    Hielo: 'bg-cyan-300/10 text-cyan-400 border-cyan-300/20 shadow-[0_0_15px_rgba(103,232,249,0.1)]',
    Fantasma: 'bg-indigo-700/10 text-indigo-700 border-indigo-700/20 shadow-[0_0_15px_rgba(67,56,202,0.1)]',
    Dragón: 'bg-violet-600/10 text-violet-600 border-violet-600/20 shadow-[0_0_15px_rgba(124,58,237,0.1)]',
};

export default function TypeBadge({ type }) {
    const colorClass = typeColors[type] || 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-transparent';

    return (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-cyber font-bold uppercase tracking-widest border transition-all duration-300 ${colorClass}`}>
            {type}
        </span>
    );
}
