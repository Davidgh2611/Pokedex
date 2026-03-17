import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
export default function StatRadar({ stats1, stats2, name1, name2 }) {
    const data = [
        { subject: 'HP', A: stats1.hp || 50, B: stats2.hp || 50, fullMark: 255 },
        { subject: 'ATK', A: stats1.ataque, B: stats2.ataque, fullMark: 255 },
        { subject: 'DEF', A: stats1.defensa, B: stats2.defensa, fullMark: 255 },
        { subject: 'SPD', A: stats1.velocidad, B: stats2.velocidad, fullMark: 255 },
        { subject: 'LVL', A: stats1.nivel, B: stats2.nivel, fullMark: 100 },
    ];

    return (
        <div className="w-full h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#4B5563" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar
                        name={name1}
                        dataKey="A"
                        stroke="#EE1515"
                        fill="#EE1515"
                        fillOpacity={0.5}
                    />
                    <Radar
                        name={name2}
                        dataKey="B"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
