import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, Activity, Layers, Repeat, ArrowDownUp, CheckCircle2, XCircle, BarChart3 } from 'lucide-react';

export default function LtePhyMac() {
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
          Couches Basses & Radio
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Couche Physique, MAC et QoS</h2>
        <p className="text-slate-600 mt-4 leading-relaxed max-w-3xl">
          Le LTE abandonne le CDMA (utilisé en 3G) au profit de l'OFDMA, offrant une meilleure efficacité spectrale et une bande passante flexible. La gestion de la QoS et de la correction d'erreurs (HARQ/ARQ) est également repensée pour minimiser la latence.
        </p>
      </header>

      {/* OFDMA vs SC-FDMA Diagram */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl text-white">
        <h3 className="text-2xl font-bold text-amber-400 mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
          <BarChart3 className="text-amber-500" size={28} />
          Accès Multiple : OFDMA (DL) vs SC-FDMA (UL)
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* OFDMA Side */}
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-inner">
            <h4 className="text-lg font-bold text-blue-400 mb-6 text-center uppercase tracking-wider">Lien Descendant (DL) : OFDMA</h4>
            
            <div className="relative h-[200px] w-full flex items-end justify-center gap-1 pb-8">
              {/* Y Axis */}
              <div className="absolute left-4 top-4 bottom-8 w-px bg-slate-600"></div>
              <div className="absolute left-2 top-4 text-xs text-slate-400 -rotate-90 origin-left">Puissance</div>
              
              {/* X Axis */}
              <div className="absolute left-4 right-4 bottom-8 h-px bg-slate-600"></div>
              <div className="absolute right-4 bottom-2 text-xs text-slate-400">Fréquence</div>

              {/* Subcarriers */}
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={`ofdma-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${40 + Math.random() * 60}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`w-6 rounded-t-sm ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-emerald-500' : 'bg-rose-500'} opacity-80`}
                  style={{ transformOrigin: 'bottom' }}
                >
                  <div className="w-full h-full border-x border-white/20"></div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-slate-300 space-y-3 bg-slate-900/50 p-4 rounded-lg">
              <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▪</span> <strong>Orthogonal Frequency Division Multiple Access.</strong></p>
              <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▪</span> Le spectre est divisé en de multiples sous-porteuses orthogonales.</p>
              <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▪</span> L'ordonnancement est sélectif en fréquence, allouant les meilleures sous-porteuses à chaque utilisateur (représenté par les couleurs).</p>
              <p className="flex items-start gap-2"><span className="text-rose-400 mt-0.5">⚠</span> Inconvénient : Fort PAPR (Peak-to-Average Power Ratio), nécessitant des amplificateurs linéaires coûteux (gérable pour l'eNodeB).</p>
            </div>
          </div>

          {/* SC-FDMA Side */}
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-inner">
            <h4 className="text-lg font-bold text-emerald-400 mb-6 text-center uppercase tracking-wider">Lien Montant (UL) : SC-FDMA</h4>
            
            <div className="relative h-[200px] w-full flex items-end justify-center gap-1 pb-8">
              {/* Y Axis */}
              <div className="absolute left-4 top-4 bottom-8 w-px bg-slate-600"></div>
              <div className="absolute left-2 top-4 text-xs text-slate-400 -rotate-90 origin-left">Puissance</div>
              
              {/* X Axis */}
              <div className="absolute left-4 right-4 bottom-8 h-px bg-slate-600"></div>
              <div className="absolute right-4 bottom-2 text-xs text-slate-400">Fréquence</div>

              {/* Single Carrier Block */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1 }}
                className="h-[60%] bg-emerald-500/80 rounded-t-sm relative overflow-hidden"
              >
                {/* Internal divisions to show it's spread */}
                <div className="absolute inset-0 flex">
                  {[...Array(12)].map((_, i) => (
                    <div key={`scfdma-${i}`} className="flex-1 border-r border-white/20 h-full"></div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="mt-4 text-sm text-slate-300 space-y-3 bg-slate-900/50 p-4 rounded-lg">
              <p className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">▪</span> <strong>Single Carrier - Frequency Division Multiple Access.</strong></p>
              <p className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">▪</span> Similaire à l'OFDMA mais avec un pré-codage (DFT) qui étale le signal sur toutes les sous-porteuses allouées.</p>
              <p className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">▪</span> Le signal apparaît comme une porteuse unique ("Single Carrier").</p>
              <p className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Avantage majeur : Faible PAPR, ce qui permet d'utiliser des amplificateurs moins coûteux et économise la batterie du terminal (UE).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flexibilité */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Zap className="text-blue-500" />
            Flexibilité et Modulation
          </h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <ul className="text-sm text-blue-800 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span><strong>Bande passante adaptable :</strong> Le LTE peut opérer dans des canaux de 1.4, 3, 5, 10, 15 ou 20 MHz, offrant une grande flexibilité de déploiement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span><strong>Duplexage :</strong> Supporte le FDD (Frequency Division Duplex - fréquences séparées pour UL/DL) et le TDD (Time Division Duplex - temps partagé sur la même fréquence).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span><strong>Modulation adaptative (AMC) :</strong> QPSK (conditions difficiles), 16-QAM, 64-QAM (bonnes conditions radio pour maximiser le débit).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* HARQ et ARQ */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Repeat className="text-indigo-500" />
            Correction d'Erreurs : HARQ + ARQ
          </h3>
          
          <p className="text-sm text-slate-600 mb-4">
            Le LTE combine deux mécanismes pour assurer une transmission fiable et rapide, répartis entre les couches MAC et RLC.
          </p>

          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <Zap size={16} /> HARQ (Couche MAC)
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• <strong>Rapide :</strong> Géré directement par l'eNodeB (MAC/PHY).</li>
                <li>• <strong>Principe :</strong> Combine FEC (Forward Error Correction) et ARQ (Stop-and-Wait).</li>
                <li>• <strong>Parallélisme :</strong> Utilise N processus "Stop-and-Wait" en parallèle pour ne pas bloquer la transmission en attendant un ACK/NACK.</li>
                <li>• <strong>Limité :</strong> Nombre de retransmissions limité (synchrones en UL, asynchrones en DL).</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                <ShieldCheck size={16} /> ARQ (Couche RLC)
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>Fiable :</strong> Fenêtre glissante classique (Sliding Window).</li>
                <li>• <strong>Rôle :</strong> Retransmet les paquets (RLC SDUs) que le HARQ n'a pas réussi à corriger.</li>
                <li>• <strong>Interaction :</strong> L'ARQ utilise les informations du HARQ (état de transmission) pour déclencher ses propres retransmissions plus intelligemment.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* QoS et Bearers */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl text-white">
        <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-2">
          <Activity className="text-rose-500" />
          Qualité de Service (QoS) & EPS Bearers
        </h3>
        
        <p className="text-slate-300 mb-6 max-w-3xl">
          Contrairement à l'UMTS qui offrait des garanties strictes (et complexes) pour tous les flux, le LTE adopte une approche plus pragmatique. Un utilisateur dispose d'un "tuyau" standard par défaut, et des "tuyaux" spécifiques (bearers) sont créés uniquement pour les flux très contraints (ex: VoLTE).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="font-bold text-slate-100 mb-3 text-lg">EPS Bearer</h4>
            <p className="text-sm text-slate-400">
              Un "tuyau" logique (tunnel) entre l'UE et le P-GW. Tous les paquets IP circulant dans un même bearer reçoivent le même traitement (ordonnancement, priorité) dans le réseau EPS.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 mb-3 text-lg flex items-center gap-2">
              <CheckCircle2 size={20} /> GBR (Guaranteed Bit Rate)
            </h4>
            <p className="text-sm text-slate-400">
              Bearers dédiés avec un débit garanti. Ils ne subissent pas la congestion ni les pertes. Utilisés pour les flux temps réel (Voix, Vidéo). Ils sont établis à la demande et fermés dès qu'ils ne sont plus nécessaires.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="font-bold text-amber-400 mb-3 text-lg flex items-center gap-2">
              <XCircle size={20} /> Non-GBR
            </h4>
            <p className="text-sm text-slate-400">
              Bearers sans garantie de débit (Best Effort). Utilisés pour la navigation web, les emails, etc. Un bearer Non-GBR "par défaut" est toujours actif pour chaque utilisateur connecté.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-slate-800 p-5 rounded-xl border border-slate-700">
          <h4 className="font-bold text-slate-200 mb-3">Paramètres de QoS clés :</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
            <li><strong className="text-rose-300">QCI (QoS Class Identifier) :</strong> Un entier (1 à 9) indiquant la classe de service (priorité, délai, taux d'erreur attendu).</li>
            <li><strong className="text-rose-300">ARP (Allocation and Retention Priority) :</strong> Utilisé par le plan de contrôle pour décider quels flux préempter ou rejeter en cas de congestion réseau.</li>
            <li><strong className="text-rose-300">MBR (Maximum Bit Rate) :</strong> Débit maximum autorisé (souvent égal au GBR pour les bearers GBR).</li>
            <li><strong className="text-rose-300">AMBR (Aggregate MBR) :</strong> Débit maximum global autorisé pour l'ensemble des bearers Non-GBR d'un utilisateur.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
