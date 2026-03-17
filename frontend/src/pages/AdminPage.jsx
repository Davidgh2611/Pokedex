import React, { useEffect, useState } from 'react';
import { pokemonService } from '../services/api';
import { Plus, Edit2, Trash2, Database, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPokemon, setEditingPokemon] = useState(null);

    const loadData = async () => {
        try {
            const data = await pokemonService.getList({ limit: 1000 });
            setPokemon(data.data);
        } catch (err) {
            console.error('Failed to load admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
            // await pokemonService.delete(id); // To be implemented in api.js
            console.log('Deleting', id);
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse">Loading System Data...</div>;

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                        <ShieldCheck className="text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-cyber font-bold dark:text-white uppercase tracking-tighter">Nexus <span className="text-emerald-500">Admin</span></h1>
                        <p className="text-[10px] font-cyber text-gray-500 uppercase tracking-widest">Master Database Control</p>
                    </div>
                </div>

                <button
                    onClick={() => { setEditingPokemon(null); setShowForm(true); }}
                    className="flex items-center px-6 py-3 bg-pokemon-red text-white font-cyber font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                    <Plus size={16} className="mr-2" /> Insert New Entity
                </button>
            </div>

            <div className="glass rounded-[32px] overflow-hidden border-white/5 shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr className="text-[10px] font-cyber font-bold text-gray-400 uppercase tracking-[0.2em]">
                            <th className="p-6">ID</th>
                            <th className="p-6 text-emerald-500">Name</th>
                            <th className="p-6">Type</th>
                            <th className="p-6">Stats (A/D/S)</th>
                            <th className="p-6 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {pokemon.map(p => (
                            <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6 font-cyber text-gray-500">#{String(p.id).padStart(3, '0')}</td>
                                <td className="p-6 font-cyber font-bold text-white uppercase tracking-widest">{p.nombre}</td>
                                <td className="p-6">
                                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-cyber text-gray-400 border border-white/10 uppercase">{p.tipo_principal}</span>
                                </td>
                                <td className="p-6 font-cyber text-[10px] text-gray-500">
                                    <span className="text-red-400">{p.ataque}</span> / <span className="text-emerald-400">{p.defensa}</span> / <span className="text-amber-400">{p.velocidad}</span>
                                </td>
                                <td className="p-6 text-right space-x-2">
                                    <button className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-12 flex items-center justify-between p-8 glass bg-white/5 rounded-[32px] border-white/5">
                <div className="flex items-center space-x-6">
                    <Database className="text-gray-700" size={24} />
                    <div>
                        <p className="text-[10px] font-cyber text-white leading-tight uppercase">System Status: Optimal</p>
                        <p className="text-[10px] font-cyber text-gray-500 uppercase">Records synchronized with MySQL Docker instance.</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/10"></div>
                </div>
            </div>
        </main>
    );
}
