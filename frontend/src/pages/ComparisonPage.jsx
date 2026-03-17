import React from 'react';
import { useTranslation } from 'react-i18next';
import CompareTool from '../components/CompareTool';

export default function ComparisonPage() {
    const { t } = useTranslation();
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="mb-12 flex flex-col items-center text-center space-y-2 animate-fade-in">
                <h1 className="text-4xl lg:text-5xl font-cyber font-bold text-gray-900 dark:text-white tracking-widest uppercase">
                    Combat <span className="text-pokemon-red">Simulation</span>
                </h1>
                <p className="text-[10px] font-cyber font-bold text-gray-500 uppercase tracking-[0.5em]">{t('comparator.title')}</p>
            </div>

            <div className="animate-fade-in delay-200">
                <CompareTool />
            </div>

            <div className="mt-20 glass p-10 rounded-[40px] border-white/10 text-center animate-fade-in delay-500">
                <p className="font-cyber text-xs text-gray-500 uppercase tracking-[0.2em] leading-loose">
                    This module calculates direct stat deltas between subjects.
                    <br />Data retrieved from the global Dex infrastructure.
                </p>
            </div>
        </main>
    );
}
