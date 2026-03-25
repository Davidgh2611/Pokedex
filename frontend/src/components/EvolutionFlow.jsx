import React, { useEffect, useState } from 'react';
import { pokemonService } from '../services/api';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

export default function EvolutionFlow({ pokemonId }) {
    const { t } = useTranslation();
    const [evolutions, setEvolutions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvolutions = async () => {
            try {
                const data = await pokemonService.getEvolutionChain(pokemonId);
                setEvolutions(data);
            } catch (error) {
                console.error('Error fetching evolution chain:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvolutions();
    }, [pokemonId]);

    if (loading) return <div className="h-20 animate-pulse bg-gray-100 dark:bg-white/5 rounded-2xl w-full"></div>;
    if (evolutions.length <= 1) return null;

    return (
        <div className="mt-12 glass p-8 rounded-[32px] border-white/20 dark:border-white/5">
            <h3 className="font-cyber font-bold text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center">
                <span className="w-8 h-px bg-pokemon-red mr-3"></span>
                {t('common.evolution_protocol')}
            </h3>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-wrap items-center justify-center gap-6 lg:gap-12"
            >
                {evolutions.map((evo, index) => (
                    <React.Fragment key={evo.id}>
                        <motion.div variants={itemVariants}>
                            <Link
                                to={`/pokemon/${evo.id}`}
                                className={`group relative flex flex-col items-center transition-all duration-500 hover:scale-110 ${evo.id === parseInt(pokemonId) ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden flex items-center justify-center border-2 transition-colors ${evo.id === parseInt(pokemonId) ? 'border-pokemon-red bg-pokemon-red/5' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                                    <img
                                        src={evo.image}
                                        alt={evo.name}
                                        className="w-20 h-20 lg:w-28 lg:h-28 object-contain z-10 drop-shadow-lg group-hover:rotate-12 transition-transform duration-500"
                                    />
                                </div>
                                <span className="mt-4 font-cyber font-bold text-[10px] uppercase tracking-widest dark:text-white">
                                    {evo.name}
                                </span>
                            </Link>
                        </motion.div>

                        {index < evolutions.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (index * 0.2), repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                            >
                                <ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/20 hidden sm:block" />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
}
