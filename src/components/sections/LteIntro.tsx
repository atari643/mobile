import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Gauge, PhoneCall, Play, MousePointerClick, Download, AlertTriangle, Zap, Layers, Server, RadioTower } from 'lucide-react';

export default function LteIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-4">
          <span className="flex h-2 w-2 rounded-full bg-rose-500"></span>
          Évolution 4G
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Introduction au LTE (4G)</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Le <strong className="text-rose-600">LTE (Long Term Evolution)</strong> marque une rupture majeure. Face à la saturation des réseaux 3G+ et à l'explosion du trafic de données, le 3GPP a repensé l'architecture pour offrir des débits massifs, une latence réduite et une architecture simplifiée "Tout IP".
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" />
            Le Constat (Limites 3G)
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>Saturation :</strong> Malgré les améliorations (HSDPA/3G+), l'accès radio et l'intégralité du réseau d'accès ont commencé à saturer face à la multiplication du trafic (x10 en 2007, x50 en 2008).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>Complexité :</strong> L'architecture UMTS (avec l'ATM/AAL2) était brillante pour la QoS mais extrêmement lourde en signalisation et complexe à gérer.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>Nouveaux usages :</strong> Explosion du streaming vidéo et multiplication des terminaux (smartphones).</span>
            </li>
          </ul>
        </div>

        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 shadow-sm">
          <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center gap-2">
            <Zap className="text-rose-500" />
            Objectifs du LTE (TR 25.913)
          </h3>
          <ul className="space-y-3 text-sm text-rose-800">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">•</span>
              <span><strong>Haut Débit :</strong> 100 Mbit/s en voie descendante (DL), 50 Mbit/s en voie montante (UL).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">•</span>
              <span><strong>Faible Latence :</strong> Temps de transit &lt; 10ms (U-Plane) et mise en place des connexions &lt; 100ms (C-Plane).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">•</span>
              <span><strong>Simplification :</strong> Baisse drastique de la complexité du réseau d'accès (RAN) et rationalisation du cœur de réseau (Tout IP).</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden text-white">
        <div className="p-6 border-b border-slate-800 bg-slate-800/50">
          <h3 className="text-xl font-bold text-rose-400 flex items-center gap-2">
            <Layers className="text-rose-500" />
            Ruptures Architecturales Majeures
          </h3>
          <p className="text-sm text-slate-300 mt-2">
            Le LTE n'est pas qu'une simple évolution radio, c'est une refonte complète de la philosophie du réseau mobile.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-700">
          <div className="p-6 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
              <PhoneCall size={24} />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">Fin du Mode Circuit</h4>
            <p className="text-sm text-slate-400">
              Le LTE supprime le raccordement direct au Réseau Téléphonique Commuté (RTC). La voix n'est plus gérée en mode circuit mais passe obligatoirement sur IP (VoLTE). Dans un premier temps, les appels basculaient sur la 2G/3G (CSFB).
            </p>
          </div>

          <div className="p-6 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30">
              <RadioTower size={24} />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">Fusion BTS / BSC</h4>
            <p className="text-sm text-slate-400">
              La station de base et son contrôleur (Node B + RNC en 3G) fusionnent en un seul équipement ultra-intelligent : l'<strong>eNodeB</strong>. Cela supprime l'interface complexe Iub et réduit drastiquement la latence.
            </p>
          </div>

          <div className="p-6 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30">
              <Server size={24} />
            </div>
            <h4 className="font-bold text-slate-100 mb-2">Cœur "Tout IP" (EPC)</h4>
            <p className="text-sm text-slate-400">
              Le cœur de réseau devient l'<strong>Evolved Packet Core (EPC)</strong>. Il est entièrement basé sur IP, abandonnant l'ATM. Il sépare clairement le plan de contrôle (MME) du plan de données (S-GW / P-GW).
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
