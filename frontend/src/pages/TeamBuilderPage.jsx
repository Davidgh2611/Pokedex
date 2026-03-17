import React from 'react';
import TeamBuilder from '../components/TeamBuilder';
import { useTranslation } from 'react-i18next';

export default function TeamBuilderPage() {
    const { t } = useTranslation();
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 text-center animate-fade-in">
                <h1 className="text-4xl lg:text-5xl font-cyber font-bold text-gray-900 dark:text-white tracking-tighter uppercase">
                    Squad <span className="text-pokemon-red">Architect</span>
                </h1>
                <p className="text-[10px] font-cyber font-bold text-gray-500 uppercase tracking-[0.5em] mt-2">Strategic Deployment & Coverage Analysis</p>
            </div>

            <div className="animate-fade-in delay-200">
                <TeamBuilder />
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[32px] border-white/5 space-y-4">
                    <h4 className="font-cyber font-bold text-[10px] uppercase text-pokemon-red tracking-widest">Protocol Note</h4>
                    <p className="text-[10px] font-cyber text-gray-500 leading-relaxed uppercase">
                        The architect module cross-references your current squad against the global Nexus database to identify strategic vulnerabilities.
                    </p>
                </div>
                <div className="glass p-8 rounded-[32px] border-white/5 space-y-4">
                    <h4 className="font-cyber font-bold text-[10px] uppercase text-blue-400 tracking-widest">Deployment Limit</h4>
                    <p className="text-[10px] font-cyber text-gray-500 leading-relaxed uppercase">
                        Squad sizes are capped at 6 subjects per standardized combat protocol. Data sync is mandatory for finalization.
                    </p>
                </div>
            </div>
        </main>
    );
}
