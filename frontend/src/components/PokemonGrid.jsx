import React from 'react';
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function PokemonGrid({ data, loading }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
        );
    }

    if (!data?.length) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 glass rounded-3xl"
            >
                <div className="animate-pulse flex flex-col items-center opacity-50">
                    <div className="w-16 h-16 border-4 border-dashed border-gray-400 dark:border-gray-600 rounded-full mb-4"></div>
                    <p className="font-cyber font-bold text-gray-500 tracking-widest uppercase">No data found in current parameters</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
            {data.map(pokemon => (
                <motion.div key={pokemon.id} variants={itemVariants}>
                    <PokemonCard pokemon={pokemon} />
                </motion.div>
            ))}
        </motion.div>
    );
}
