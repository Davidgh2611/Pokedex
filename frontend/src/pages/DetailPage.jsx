import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import ErrorMessage from '../components/ErrorMessage';
import EvolutionFlow from '../components/EvolutionFlow';
import { ArrowLeft, Shield, Sword, Zap, List, Target } from 'lucide-react';

const typeThemeColors = {
    Fuego: 'from-red-500/20 to-orange-500/20',
    Agua: 'from-blue-500/20 to-cyan-500/20',
    Planta: 'from-green-500/20 to-emerald-500/20',
    Eléctrico: 'from-yellow-400/20 to-amber-500/20',
    Veneno: 'from-purple-500/20 to-indigo-500/20',
    Normal: 'from-gray-400/20 to-slate-500/20',
};

const StatBar = ({ icon: Icon, label, value, color, maxStat = 255 }) => (
    <div className="flex items-center group/stat">
        <div className={`p-2 rounded-lg bg-gray-100 dark:bg-white/5 mr-4 group-hover/stat:scale-110 transition-transform`}>
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between mb-1.5">
                <span className="text-xs font-cyber font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-cyber font-bold dark:text-white">{value}</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-1.5 p-0.5">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)] ${color.replace('text-', 'bg-')}`}
                    style={{ width: `${(value / maxStat) * 100}%` }}
                ></div>
            </div>
        </div>
    </div>
);

export default function DetailPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const { pokemon, imageUrl, loading, error } = usePokemonDetail(id);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-pokemon-red border-t-transparent rounded-full animate-spin"></div>
                <span className="font-cyber text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">Establishing Nexus...</span>
            </div>
        );
    }

    if (error || !pokemon) {
        return <ErrorMessage message={error || 'No se encontró el Pokémon.'} />;
    }

    const bgGradient = typeThemeColors[pokemon.tipo_principal] || 'from-pokemon-red/10 to-transparent';

    return (
        <main className="min-h-[calc(100vh-5rem)] relative py-8 px-4 overflow-hidden flex items-center">
            {/* Immersive Background Decor */}
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${bgGradient} blur-3xl -z-10 opacity-60`}></div>

            <div className="max-w-5xl mx-auto w-full animate-fade-in relative z-10">
                <Link to="/" className="inline-flex items-center font-cyber text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-pokemon-red transition-colors mb-10 border-b border-transparent hover:border-pokemon-red pb-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('common.back_to_terminal')}
                </Link>

                <div className="glass rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border-white/20 dark:border-white/5">

                    {/* Left: Holographic Stage */}
                    <div className="relative flex-1 p-12 lg:p-20 flex flex-col items-center justify-center bg-white/50 dark:bg-black/20">
                        <div className="absolute top-10 left-10 font-cyber font-bold text-8xl text-gray-200/50 dark:text-white/5 select-none tracking-tighter">
                            #{String(pokemon.id).padStart(3, '0')}
                        </div>

                        <div className="relative">
                            {/* Spinning background effect */}
                            <div className="absolute inset-0 bg-pokemon-red/10 blur-[100px] rounded-full animate-pulse-glow"></div>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={pokemon.nombre}
                                    className="relative w-full max-w-[320px] h-auto object-contain z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] scale-110 hover:scale-125 transition-transform duration-700 animate-float"
                                />
                            ) : (
                                <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse-glow"></div>
                            )}
                        </div>

                        <div className="mt-12 text-center z-10">
                            <TypeBadge type={pokemon.tipo_principal} />
                        </div>
                    </div>

                    {/* Right: Technical Data */}
                    <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/20 dark:border-white/10 bg-white/30 dark:bg-transparent">
                        <h1 className="text-5xl lg:text-6xl font-cyber font-bold text-gray-900 dark:text-white capitalize mb-4 tracking-tighter">
                            {pokemon.nombre}
                        </h1>

                        <div className="mb-12 flex space-x-6 text-[10px] font-cyber font-bold text-gray-400 tracking-[0.2em] uppercase">
                            <span className="flex items-center"><Target className="w-3 h-3 mr-1.5 text-pokemon-red" /> Rank Classified</span>
                            <span className="flex items-center"><Shield className="w-3 h-3 mr-1.5 text-blue-400" /> Secure Protocol</span>
                        </div>

                        <div className="space-y-8">
                            <StatBar icon={List} label={t('common.nexus_rank')} value={pokemon.nivel} color="text-indigo-400" maxStat={100} />
                            <StatBar icon={Sword} label={t('common.strike_force')} value={pokemon.ataque} color="text-red-500" />
                            <StatBar icon={Shield} label={t('common.defense_core')} value={pokemon.defensa} color="text-emerald-500" />
                            <StatBar icon={Zap} label={t('common.response_velocity')} value={pokemon.velocidad} color="text-amber-400" />
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5">
                            <button className="w-full py-4 rounded-2xl bg-pokemon-red text-white font-cyber font-bold text-xs uppercase tracking-[0.3em] shadow-[0_10px_20px_rgba(238,21,21,0.3)] hover:shadow-[0_15px_30px_rgba(238,21,21,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                                {t('common.deploy_to_team')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Evolution Chain Section */}
                <EvolutionFlow pokemonId={id} />
            </div>
        </main>
    );
}
