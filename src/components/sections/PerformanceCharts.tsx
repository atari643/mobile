import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Activity, Zap, TrendingUp, Users } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

const throughputData = [
  { name: 'GPRS (2.5G)', value: 0.171, label: '171 Kbps' },
  { name: 'EDGE (2.75G)', value: 0.384, label: '384 Kbps' },
  { name: 'UMTS (3G)', value: 2, label: '2 Mbps' },
  { name: 'HSPA+ (3.5G)', value: 42, label: '42 Mbps' },
  { name: 'LTE (4G)', value: 150, label: '150 Mbps' },
  { name: 'LTE-A (4G+)', value: 1000, label: '1 Gbps' },
  { name: '5G NR', value: 10000, label: '10 Gbps' },
];

const latencyData = [
  { name: '2G', value: 600 },
  { name: '3G', value: 150 },
  { name: '4G', value: 50 },
  { name: '5G', value: 5 },
];

export default function PerformanceCharts({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
          <Activity size={16} />
          Performances
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Comparaison des Performances</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Visualisez l'évolution exponentielle des capacités des réseaux mobiles au fil des générations.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Throughput Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Zap className="text-amber-500" />
            Débit Maximum Théorique (Log)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis scale="log" domain={[0.1, 20000]} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">Note: L'échelle est logarithmique pour permettre la visualisation de l'écart massif entre 2G et 5G.</p>
        </div>

        {/* Latency Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-rose-500" />
            Latence Moyenne (ms)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorLatency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">La latence est le temps de réponse du réseau. Plus elle est basse, plus le réseau est réactif.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div className="text-3xl font-bold">1M / km²</div>
          <div className="text-sm text-slate-400">Densité d'objets connectés supportée par la 5G.</div>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div className="text-3xl font-bold">500 km/h</div>
          <div className="text-sm text-slate-400">Vitesse de déplacement maximale supportée par le LTE/5G.</div>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div className="text-3xl font-bold">99.999%</div>
          <div className="text-sm text-slate-400">Fiabilité visée pour les services critiques 5G (uRLLC).</div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
