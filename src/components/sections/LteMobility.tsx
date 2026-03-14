import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeftRight, Server, Smartphone, RadioTower, Network, Zap, Clock, ShieldAlert, Wifi, Globe } from 'lucide-react';

import NavigationButtons from '../NavigationButtons';

export default function LteMobility({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
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
          Mobilité & Évolutions
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Handover Intra-LTE et Évolutions</h2>
        <p className="text-slate-600 mt-4 leading-relaxed max-w-3xl">
          La gestion de la mobilité est grandement optimisée en LTE. Le handover est piloté localement par l'eNodeB source, réduisant drastiquement les délais d'interruption. De plus, le LTE a été conçu dès le départ pour évoluer vers la 4G (LTE-Advanced) et s'interconnecter avec d'autres réseaux.
        </p>
      </header>

      {/* Handover Intra-LTE */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ArrowLeftRight className="text-blue-500" />
          Handover Intra-LTE (via X2)
        </h3>
        
        <p className="text-slate-600 mb-6 max-w-3xl">
          Contrairement à la 3G où le RNC gérait le handover (Soft Handover), en LTE, c'est l'<strong>eNodeB source</strong> qui prend la décision. Le processus est un "Hard Handover" (Break before make), mais optimisé pour être extrêmement rapide (interruption ~30ms).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Diagramme de Séquence Simplifié */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center">
            <h4 className="font-bold text-slate-800 mb-4 text-center">Séquence de Handover (X2)</h4>
            
            <div className="relative w-full max-w-md mx-auto h-[300px] flex justify-between">
              {/* Lignes verticales */}
              <div className="absolute left-[10%] top-0 bottom-0 w-0.5 bg-slate-300"></div>
              <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-300"></div>
              <div className="absolute left-[90%] top-0 bottom-0 w-0.5 bg-slate-300"></div>
              
              {/* Entités */}
              <div className="absolute left-[10%] -translate-x-1/2 -top-4 bg-white px-2 font-bold text-slate-700 text-sm">UE</div>
              <div className="absolute left-[50%] -translate-x-1/2 -top-4 bg-white px-2 font-bold text-blue-700 text-sm text-center">eNodeB<br/>Source</div>
              <div className="absolute left-[90%] -translate-x-1/2 -top-4 bg-white px-2 font-bold text-emerald-700 text-sm text-center">eNodeB<br/>Cible</div>

              {/* Messages */}
              <div className="absolute top-[15%] left-[10%] right-[50%] flex flex-col items-center">
                <span className="text-[10px] text-slate-500 mb-1">1. Mesures (Measurement Report)</span>
                <div className="w-full h-0.5 bg-slate-400 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45"></div>
                </div>
              </div>

              <div className="absolute top-[30%] left-[50%] right-[10%] flex flex-col items-center">
                <span className="text-[10px] text-blue-600 font-bold mb-1">2. Décision HO & Requête (X2)</span>
                <div className="w-full h-0.5 bg-blue-500 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-500 rotate-45"></div>
                </div>
              </div>

              <div className="absolute top-[45%] left-[10%] right-[50%] flex flex-col items-center">
                <span className="text-[10px] text-emerald-600 font-bold mb-1">3. HO Command (RRC)</span>
                <div className="w-full h-0.5 bg-emerald-500 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-b-2 border-l-2 border-emerald-500 rotate-45"></div>
                </div>
              </div>

              {/* Interruption Zone */}
              <div className="absolute top-[55%] bottom-[25%] left-0 w-4 border-l-2 border-y-2 border-rose-400 rounded-l-lg flex items-center justify-center">
                <span className="text-[10px] text-rose-500 font-bold -rotate-90 whitespace-nowrap absolute -left-6">Interruption (~30ms)</span>
              </div>

              {/* Forwarding */}
              <div className="absolute top-[60%] left-[50%] right-[10%] flex flex-col items-center">
                <div className="bg-amber-100 border border-amber-300 px-3 py-1 rounded text-[10px] font-bold text-amber-700 z-10 flex items-center gap-1">
                  <ArrowRight size={12} /> Data Forwarding (X2)
                </div>
                <div className="w-full h-4 bg-amber-200/50 absolute top-1/2 -translate-y-1/2 -z-10"></div>
              </div>

              <div className="absolute top-[80%] left-[10%] right-[10%] flex flex-col items-center">
                <span className="text-[10px] text-emerald-600 font-bold mb-1">4. HO Complete (RRC)</span>
                <div className="w-full h-0.5 bg-emerald-500 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-emerald-500 rotate-45"></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Le cœur de réseau (MME/S-GW) n'est impliqué qu'<strong>après</strong> l'exécution du handover (Path Switch) pour mettre à jour les tunnels GTP.
            </p>
          </div>

          {/* Explications des phases */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <Clock size={16} /> 1. Préparation (Sans le Cœur)
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• L'UE envoie ses mesures radio à l'eNodeB source.</li>
                <li>• L'eNodeB source décide du handover et choisit la cible.</li>
                <li>• Il envoie le contexte de l'UE directement à l'eNodeB cible via l'interface <strong>X2</strong>.</li>
                <li>• Le MME et le S-GW ne sont pas impliqués à ce stade.</li>
              </ul>
            </div>

            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
              <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                <Zap size={16} /> 2. Exécution (Break before make)
              </h4>
              <ul className="text-sm text-rose-700 space-y-1">
                <li>• L'UE se détache de la source et se synchronise avec la cible (Interruption courte).</li>
                <li>• <strong>Data Forwarding :</strong> L'eNodeB source relaie temporairement les paquets de données (U-Plane) en attente vers l'eNodeB cible via X2 pour éviter les pertes.</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                <Network size={16} /> 3. Achèvement (Path Switch)
              </h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Une fois l'UE connecté à la cible, l'eNodeB cible informe le MME.</li>
                <li>• Le MME demande au S-GW de basculer le tunnel GTP (Path Switch) vers le nouvel eNodeB.</li>
                <li>• L'ancien eNodeB libère les ressources.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Évolutions et Scénarios */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl text-white">
        <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-2">
          <Globe className="text-rose-500" />
          Scénarios de Déploiement & Évolutions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="font-bold text-slate-100 mb-3 text-lg flex items-center gap-2">
              <ShieldAlert className="text-amber-500" /> Interopérabilité (CSFB)
            </h4>
            <p className="text-sm text-slate-400 mb-3">
              Au lancement du LTE, la VoLTE n'était pas prête. Les opérateurs ont utilisé le <strong>CSFB (Circuit Switched FallBack)</strong> : lors d'un appel vocal, le terminal basculait automatiquement sur le réseau 2G/3G sous-jacent.
            </p>
            <p className="text-sm text-slate-400">
              Le LTE a été conçu pour s'interconnecter facilement avec les réseaux 3GPP (UMTS, GSM) et non-3GPP (Wi-Fi, CDMA2000), gérés par l'EPC via des passerelles spécifiques (ePDG).
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 mb-3 text-lg flex items-center gap-2">
              <Wifi className="text-emerald-500" /> Vers la 4G (LTE-Advanced)
            </h4>
            <p className="text-sm text-slate-400 mb-3">
              Le LTE (Release 8) était une étape vers la "vraie" 4G (IMT-Advanced, 1 Gb/s). Les évolutions majeures incluent :
            </p>
            <ul className="text-sm text-slate-400 space-y-2">
              <li><strong className="text-emerald-300">MIMO :</strong> Systèmes multi-antennes massifs pour démultiplier les débits.</li>
              <li><strong className="text-emerald-300">Carrier Aggregation :</strong> Agrégation de plusieurs bandes de fréquences (porteuses) pour créer des "tuyaux" plus larges.</li>
              <li><strong className="text-emerald-300">Relay Nodes / Femtocells :</strong> Amélioration de la couverture locale.</li>
              <li><strong className="text-emerald-300">D2D (Device-to-Device) :</strong> Communication directe entre terminaux sous contrôle du réseau.</li>
            </ul>
          </div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
