import React from 'react';
import { motion } from 'motion/react';

import NavigationButtons from '../NavigationButtons';

export default function GsmVsGprs({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Évolution : GSM vers GPRS</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Comprendre le GPRS nécessite de saisir ses différences fondamentales avec le GSM, notamment au niveau de l'allocation des ressources radio et de la technique de commutation.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-900">Caractéristique</th>
              <th className="p-4 font-semibold text-slate-900 border-l border-slate-200">GSM (2G)</th>
              <th className="p-4 font-semibold text-emerald-700 border-l border-slate-200 bg-emerald-50/50">GPRS (2.5G)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-4 font-medium text-slate-900">Technique de commutation</td>
              <td className="p-4 text-slate-600 border-l border-slate-200">Commutation de circuits (Circuit Switched)</td>
              <td className="p-4 text-emerald-800 border-l border-slate-200 bg-emerald-50/30">Commutation de paquets (Packet Switched)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">Allocation des ressources</td>
              <td className="p-4 text-slate-600 border-l border-slate-200">Dédiée (1 Time Slot fixe par appel)</td>
              <td className="p-4 text-emerald-800 border-l border-slate-200 bg-emerald-50/30">Dynamique (Partage des Time Slots, agrégation possible)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">Facturation</td>
              <td className="p-4 text-slate-600 border-l border-slate-200">À la durée (Temps de connexion)</td>
              <td className="p-4 text-emerald-800 border-l border-slate-200 bg-emerald-50/30">Au volume (Quantité de données transférées)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">Débit de données</td>
              <td className="p-4 text-slate-600 border-l border-slate-200">9.6 kbps (jusqu'à 14.4 kbps)</td>
              <td className="p-4 text-emerald-800 border-l border-slate-200 bg-emerald-50/30">Jusqu'à 171.2 kbps théorique (CS-4, 8 TS)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">Type de trafic optimal</td>
              <td className="p-4 text-slate-600 border-l border-slate-200">Temps réel (Voix, Vidéo)</td>
              <td className="p-4 text-emerald-800 border-l border-slate-200 bg-emerald-50/30">Bursty / Sporadique (Web, Email, Télémétrie)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">Nœuds Cœur de Réseau</td>
              <td className="p-4 text-slate-600 border-l border-slate-200">MSC, VLR, HLR</td>
              <td className="p-4 text-emerald-800 border-l border-slate-200 bg-emerald-50/30">SGSN, GGSN (en plus du HLR)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-emerald-400">Concept Clé :</span> L'agrégation de Time Slots
        </h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          En GSM, une trame TDMA (Time Division Multiple Access) est divisée en 8 Time Slots (TS). Un appel vocal occupe 1 TS. Le GPRS permet à un mobile d'utiliser plusieurs TS simultanément pour augmenter son débit.
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm font-mono text-slate-400">GSM</span>
            <div className="flex-1 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={`gsm-${i}`} className={`h-10 flex-1 rounded ${i === 2 ? 'bg-blue-500' : 'bg-slate-700'} flex items-center justify-center text-xs font-mono`}>
                  {i === 2 ? 'Voix' : `TS${i}`}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm font-mono text-slate-400">GPRS</span>
            <div className="flex-1 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={`gprs-${i}`} className={`h-10 flex-1 rounded ${[1, 2, 3, 4].includes(i) ? 'bg-emerald-500' : 'bg-slate-700'} flex items-center justify-center text-xs font-mono`}>
                  {[1, 2, 3, 4].includes(i) ? 'Data' : `TS${i}`}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center italic">Exemple d'un mobile multislot class utilisant 4 TS en voie descendante.</p>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
