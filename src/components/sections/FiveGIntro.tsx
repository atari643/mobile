import React from 'react';
import { motion } from 'motion/react';
import { Zap, Network, Cpu, Globe, ArrowRight } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

export default function FiveGIntro({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const concepts = [
    {
      title: "Beamforming",
      icon: Zap,
      desc: "Technique de focalisation du signal radio vers un utilisateur spécifique plutôt que de diffuser dans toutes les directions, augmentant l'efficacité et le débit.",
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Network Slicing",
      icon: Network,
      desc: "Découpage du réseau physique en plusieurs réseaux virtuels optimisés pour des usages spécifiques (ex: un slice pour l'IoT, un pour le streaming 4K).",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Massive MIMO",
      icon: Cpu,
      desc: "Utilisation d'un très grand nombre d'antennes au niveau de la station de base pour gérer simultanément de nombreux flux de données.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Architecture SBA",
      icon: Globe,
      desc: "Service Based Architecture. Le cœur de réseau est conçu comme un ensemble de micro-services communiquant via des APIs (HTTP/2).",
      color: "bg-emerald-100 text-emerald-700"
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-4">
          <Zap size={16} />
          Le Futur : 5G NR
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">L'Évolution vers la 5G (New Radio)</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          La 5G n'est pas seulement une version plus rapide de la 4G. C'est une refonte complète de l'architecture réseau pour supporter des millions d'objets connectés, une latence ultra-faible et des débits multi-gigabits.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl ${concept.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <concept.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{concept.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {concept.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-rose-400" />
            Les 3 piliers de la 5G
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">eMBB</div>
              <div className="text-lg font-bold">Enhanced Mobile Broadband</div>
              <p className="text-slate-400 text-sm">Débits jusqu'à 20 Gbps. Streaming 8K, VR/AR en mobilité.</p>
            </div>
            <div className="space-y-2">
              <div className="text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">uRLLC</div>
              <div className="text-lg font-bold">Ultra-Reliable Low Latency</div>
              <p className="text-slate-400 text-sm">Latence &lt; 1ms. Véhicules autonomes, chirurgie à distance.</p>
            </div>
            <div className="space-y-2">
              <div className="text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">mMTC</div>
              <div className="text-lg font-bold">Massive Machine Type Comm.</div>
              <p className="text-slate-400 text-sm">1 million d'objets par km². Smart Cities, industrie 4.0.</p>
            </div>
          </div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
