import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Battery, Signal, Wifi, ArrowRight, Info } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

export default function IotFocus({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const tech = [
    {
      name: "NB-IoT",
      fullName: "Narrowband IoT",
      focus: "Ultra-basse consommation",
      desc: "Conçu pour les capteurs simples (compteurs d'eau, parkings) qui envoient peu de données mais doivent durer 10 ans sur pile.",
      stats: ["Débit: 250 Kbps", "Autonomie: 10+ ans", "Couverture: Excellente (indoor)"]
    },
    {
      name: "LTE-M",
      fullName: "LTE for Machines",
      focus: "Mobilité & Voix",
      desc: "Plus performant que le NB-IoT, il supporte la mobilité et la voix. Idéal pour le suivi de flottes ou les bracelets de santé.",
      stats: ["Débit: 1 Mbps", "Autonomie: 5-10 ans", "Couverture: Très bonne"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
          <Cpu size={16} />
          Internet des Objets
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Focus sur l'IoT Cellulaire</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Le réseau des objets n'a pas les mêmes besoins que celui des humains. Alors que nous cherchons le débit, les objets cherchent l'autonomie et la pénétration dans les bâtiments.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tech.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
            <div className="p-8 bg-slate-900 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-3xl font-bold">{item.name}</h3>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  {item.focus}
                </div>
              </div>
              <div className="text-slate-400 font-medium">{item.fullName}</div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-slate-600 mb-8 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-auto space-y-3">
                {item.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
          <Battery className="text-emerald-600" />
          Pourquoi des protocoles spécifiques ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="font-bold text-emerald-800">Économie d'énergie</div>
            <p className="text-sm text-emerald-700/80">Utilisation du mode PSM (Power Saving Mode) pour laisser le modem dormir pendant des jours.</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-emerald-800">Pénétration Indoor</div>
            <p className="text-sm text-emerald-700/80">Répétitions des messages pour atteindre les compteurs dans les caves ou sous-sols.</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-emerald-800">Coût réduit</div>
            <p className="text-sm text-emerald-700/80">Simplification du modem (une seule antenne, pas de duplex intégral) pour baisser le prix du module.</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-slate-200 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">Le saviez-vous ?</h4>
          <p className="text-sm text-slate-600">
            Le NB-IoT et le LTE-M font partie intégrante des spécifications 5G. Ils sont considérés comme les technologies de base pour le pilier <strong>mMTC</strong> (Massive Machine Type Communications).
          </p>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
