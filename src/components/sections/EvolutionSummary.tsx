import React from 'react';
import { motion } from 'motion/react';
import { GitCompare, Zap, Gauge, Clock, Network, RadioTower, Server } from 'lucide-react';

const comparisonData = [
  {
    gen: "2.5G (GPRS)",
    tech: "GSM / GPRS",
    access: "TDMA / FDMA",
    switching: "Circuit (Voix) + Paquet (Data)",
    throughput: "171 kbit/s (théorique)",
    latency: "~500ms - 1s",
    ran: "BSS (BTS + BSC)",
    core: "SGSN + GGSN",
    color: "emerald"
  },
  {
    gen: "3G (UMTS)",
    tech: "W-CDMA",
    access: "CDMA (Code Division)",
    switching: "Circuit (Voix) + Paquet (Data)",
    throughput: "2 Mbit/s (faible mobilité) -> 42 Mbit/s (HSPA+)",
    latency: "~100ms - 200ms",
    ran: "UTRAN (Node B + RNC)",
    core: "SGSN + GGSN (évolués)",
    color: "indigo"
  },
  {
    gen: "4G (LTE)",
    tech: "OFDMA / SC-FDMA",
    access: "Orthogonal Frequency",
    switching: "Tout IP (Voix via VoLTE)",
    throughput: "100 Mbit/s -> 1 Gbit/s (LTE-A)",
    latency: "< 20ms",
    ran: "E-UTRAN (eNodeB)",
    core: "EPC (MME + S-GW + P-GW)",
    color: "rose"
  }
];

import NavigationButtons from '../NavigationButtons';

export default function EvolutionSummary({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-4">
          <GitCompare size={16} />
          Synthèse Globale
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Comparaison des Générations Mobiles</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Comprendre l'évolution des réseaux mobiles, c'est comprendre comment nous sommes passés d'un système optimisé pour la voix à un système "Tout IP" ultra-rapide et simplifié.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Caractéristique</th>
              {comparisonData.map((col) => (
                <th key={col.gen} className={`p-4 text-center text-sm font-bold text-${col.color}-700 uppercase tracking-wider`}>
                  {col.gen}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Technologie Radio</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm text-slate-600">{col.tech}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Méthode d'Accès</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm text-slate-600">{col.access}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Mode de Commutation</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm text-slate-600">{col.switching}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Débit Max (Typique)</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm font-semibold text-slate-900">
                  <div className="flex items-center justify-center gap-1">
                    <Gauge size={14} className="text-slate-400" />
                    {col.throughput}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Latence (U-Plane)</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm text-slate-600">
                  <div className="flex items-center justify-center gap-1">
                    <Clock size={14} className="text-slate-400" />
                    {col.latency}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Réseau d'Accès (RAN)</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm text-slate-600">
                  <div className="flex flex-col items-center gap-1">
                    <RadioTower size={14} className="text-slate-400" />
                    {col.ran}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-sm font-bold text-slate-700 bg-slate-50/30">Cœur de Réseau (CN)</td>
              {comparisonData.map((col) => (
                <td key={col.gen} className="p-4 text-center text-sm text-slate-600">
                  <div className="flex flex-col items-center gap-1">
                    <Server size={14} className="text-slate-400" />
                    {col.core}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
            <Zap size={18} className="text-emerald-500" />
            L'ère GPRS
          </h3>
          <p className="text-sm text-emerald-800 leading-relaxed">
            On ajoute la data sur un réseau voix. On utilise dynamiquement les slots temporels libres. 4 niveaux de QoS (délai/perte) mais encore limité (un seul contexte PDP).
          </p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Zap size={18} className="text-indigo-500" />
            L'ère UMTS
          </h3>
          <p className="text-sm text-indigo-800 leading-relaxed">
            On crée un nouveau réseau radio (UTRAN) pour gérer la QoS. On sépare les domaines Voix (CS) et Data (PS).
          </p>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <h3 className="font-bold text-rose-900 mb-2 flex items-center gap-2">
            <Zap size={18} className="text-rose-500" />
            L'ère LTE
          </h3>
          <p className="text-sm text-rose-800 leading-relaxed">
            On simplifie tout : un seul domaine (Paquet), une seule interface radio (OFDMA), et une latence record.
          </p>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
