import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Info, Cpu, Zap, Activity, ShieldCheck, MousePointerClick, Smartphone, RadioTower, Server, Network, Globe } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

interface LayerInfo {
  title: string;
  desc: string;
  color: string;
}

const layerDetails: Record<string, LayerInfo> = {
  'RRC': { title: 'RRC (Radio Resource Control)', desc: 'Le "cerveau" de l\'interface radio avec une architecture cross-layer : lié directement à PHY, MAC et RLC via des points d\'accès au service non adjacents (non conforme au modèle OSI). Cela permet un échange d\'informations plus rapide entre couches. Il pilote les bearers radio, gère la QoS et la mobilité.', color: 'text-orange-400' },
  'RANAP': { title: 'RANAP (Radio Access Network Application Part)', desc: 'Protocole de signalisation entre l\'UTRAN et le Core Network pour la gestion des connexions et de la mobilité.', color: 'text-yellow-400' },
  'PDCP': { title: 'PDCP (Packet Data Convergence Protocol)', desc: 'Successeur du SNDCP du GPRS. Compression séparée des en-têtes (via ROHC - Robust Header Compression, standardisé par l\'IETF) et des données des paquets IP. Se déroule entre le terminal et le RNC.', color: 'text-blue-400' },
  'GTP-U': { title: 'GTP-U (GPRS Tunneling Protocol - User Plane)', desc: 'Encapsulation et transport des paquets utilisateur entre UTRAN et cœur de réseau paquet.', color: 'text-cyan-400' },
  'RLC': { title: 'RLC (Radio Link Control)', desc: 'Fusion des couches RLC et LLC du GPRS. Se déroule entre le terminal et le RNC. Segmentation, concaténation, chiffrement, reprise sur erreur. Modes : Transparent, Sans acquittement et Avec acquittement.', color: 'text-purple-400' },
  'UDP / IP': { title: 'UDP / IP', desc: 'Transport réseau pour l\'acheminement des flux utilisateur et de signalisation dans le domaine paquet.', color: 'text-slate-300' },
  'MAC': { title: 'MAC (Medium Access Control)', desc: 'Mappage des canaux logiques sur les canaux de transport. Gestion des priorités.', color: 'text-pink-400' },
  'ATM / IP': { title: 'ATM / IP', desc: 'Transport de l\'interface Iub/Iur, historiquement ATM puis migration progressive vers IP.', color: 'text-slate-400' },
  'PHY': { title: 'PHY (W-CDMA)', desc: 'Accès CDMA. Codage canal, entrelacement, modulation et étalement de spectre.', color: 'text-emerald-400' },
  'L1': { title: 'L1 (Layer 1)', desc: 'Couche physique côté cœur pour l\'interface de transport.', color: 'text-emerald-300' },
  'PHY (W-CDMA)': { title: 'PHY (Couche Physique)', desc: 'Accès CDMA. Codage canal, entrelacement, modulation et étalement de spectre.', color: 'text-emerald-400' },
  'Transport (ATM / IP)': { title: 'Transport (ATM / IP)', desc: 'Couche de transport pour les interfaces Iub et Iur.', color: 'text-slate-400' },
  'MAC-b/c': { title: 'MAC-b/c', desc: 'Entités MAC pour les canaux de diffusion (broadcast) et communs, situées dans le Node B.', color: 'text-pink-400' },
  'MAC-d': { title: 'MAC-d', desc: 'Entité MAC dédiée aux flux utilisateur, située dans le RNC.', color: 'text-pink-400' },
};

export default function UmtsProtocols({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const activeLayerInfo = activeLayer ? layerDetails[activeLayer] : null;

  const handleHover = (layer: string) => setActiveLayer(layer);
  const handleLeave = () => setActiveLayer(null);

  const Layer = ({ name, className = "", height = "h-12" }: { name: string, className?: string, height?: string }) => {
    const isHovered = activeLayer === name;
    
    return (
      <div 
        onMouseEnter={() => handleHover(name)}
        onMouseLeave={handleLeave}
        className={`${height} flex items-center justify-center p-2 rounded border transition-all duration-200 cursor-help text-center font-mono text-[10px] leading-tight ${
          isHovered 
            ? 'bg-white/20 border-white/50 scale-[1.02] shadow-lg z-10' 
            : 'bg-slate-800/40 border-slate-700 text-slate-300'
        } ${className}`}
      >
        {name}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
          <Layers size={16} />
          Protocoles 3G
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Piles Protocolaires UMTS</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          L'UMTS introduit de nouveaux protocoles sur l'interface radio (Uu) pour gérer la qualité de service et la compression d'en-tête.
        </p>
      </header>

      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Info Header */}
        <div className="bg-slate-800/50 border-b border-slate-700 p-6 min-h-[120px] flex items-start gap-4">
          <div className="p-3 bg-slate-700 rounded-2xl text-indigo-400 shadow-inner">
            <Info size={24} />
          </div>
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeLayerInfo ? (
                <motion.div
                  key={activeLayerInfo.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className={`text-xl font-bold ${activeLayerInfo.color}`}>
                    {activeLayerInfo.title}
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    {activeLayerInfo.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 italic flex items-center gap-2 mt-4"
                >
                  <MousePointerClick size={20} />
                  Survolez une couche pour explorer son rôle technique.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Diagram Area */}
        <div className="p-8 overflow-x-auto">
          <div className="min-w-[900px] grid grid-cols-[1fr_64px_1fr_64px_1fr] items-stretch">
            
            {/* Headers Row */}
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tl-xl text-slate-200 font-bold border-l border-t border-slate-700 h-14">
              <Smartphone size={18} className="text-emerald-400" />
              UE
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              <RadioTower size={18} className="text-blue-400" />
              Node B / RNC
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tr-xl text-slate-200 font-bold border-r border-t border-slate-700 h-14">
              <Server size={18} className="text-indigo-400" />
              CN (SGSN/GGSN)
            </div>

            {/* Row 1: RRC / RANAP */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="RRC" className="text-orange-300 border-orange-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="RRC" className="flex-1 text-orange-300 border-orange-500/30 h-12" />
              <Layer name="RANAP" className="flex-1 text-yellow-300 border-yellow-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="RANAP" className="text-yellow-300 border-yellow-500/30 h-12" />
            </div>

            {/* Row 2: PDCP / GTP-U */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="PDCP" className="text-blue-300 border-blue-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="PDCP" className="flex-1 text-blue-300 border-blue-500/30 h-12" />
              <Layer name="GTP-U" className="flex-1 text-cyan-300 border-cyan-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="GTP-U" className="text-cyan-300 border-cyan-500/30 h-12" />
            </div>

            {/* Row 3: RLC / UDP/IP */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="RLC" className="text-purple-300 border-purple-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Uu</span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="RLC" className="flex-1 text-purple-300 border-purple-500/30 h-12" />
              <Layer name="UDP / IP" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Iu-PS</span>
              </div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="UDP / IP" className="h-12" />
            </div>

            {/* Row 4: MAC / ATM/IP */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="MAC" className="text-pink-300 border-pink-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="MAC" className="flex-1 text-pink-300 border-pink-500/30 h-12" />
              <Layer name="ATM / IP" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="ATM / IP" className="h-12" />
            </div>

            {/* Row 5: PHY / L1 */}
            <div className="p-2 border-l border-b border-slate-700 bg-slate-800/10 rounded-bl-xl">
              <Layer name="PHY" className="text-emerald-300 border-emerald-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 border-b border-slate-700 flex gap-1">
              <Layer name="PHY" className="flex-1 text-emerald-300 border-emerald-500/30 h-12" />
              <Layer name="L1" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-b border-slate-700 bg-slate-800/10 rounded-br-xl">
              <Layer name="L1" className="h-12" />
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-600" />
            Le Débat du Transport : ATM vs IP
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Pour relier le Node B au RNC (Iub), il a fallu choisir une technologie capable de gérer la voix et les données avec une QoS stricte.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Le choix initial : ATM (AAL-2)</h4>
            <p className="text-sm text-slate-600 mb-3">
              L'ATM a été choisi dans les premières versions (R99). L'AAL-2 a été redéfinie spécialement pour l'UMTS avec deux fonctions clés :
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• <strong>Multiplexage :</strong> Plusieurs flux (voix, données) sur la même connexion ATM-AAL2</li>
              <li>• <strong>Concaténation :</strong> Remplissage optimal des cellules ATM avec des échantillons de voix de plusieurs communications</li>
              <li>• <strong>Frame Protocols :</strong> Un protocole FP par type de canal de transport (RACH, DSCH, PCH…)</li>
              <li>• <strong>Signalisation :</strong> Nouveau protocole Q.2630.1 pour gérer les connexions AAL-2 avec multiplexage</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" />
            La Couche RRC : Le Chef d'Orchestre
          </h3>
          <p className="text-sm text-indigo-800 mb-4">
            Le protocole <strong>RRC</strong> est la pièce maîtresse du plan de contrôle. Il est responsable de l'établissement des connexions et de la gestion des Radio Access Bearers (RAB).
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Activity className="text-rose-500" />
          Gestion de la QoS et des Bearers en UMTS
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed">
              L'UMTS a été conçu pour supporter une grande variété de services avec des exigences de performance différentes. Pour garantir cela, le réseau définit quatre classes de <strong>Qualité de Service (QoS)</strong> :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Conversational :</span> Pour la voix en temps réel (latence très faible, gigue minimale).
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Streaming :</span> Pour la vidéo (flux continu, tolère une certaine latence mais pas de gigue).
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Interactive :</span> Pour le web (requête/réponse, priorité à l'intégrité des données).
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Background :</span> Pour les emails/SMS (basse priorité, pas de contrainte de temps).
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Network size={120} />
            </div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" size={18} />
              Le concept de "Bearer"
            </h4>
            <p className="text-sm leading-relaxed mb-4">
              Un <strong>Bearer</strong> est un canal logique avec des caractéristiques de QoS définies. Pour fournir un service de bout en bout, l'UMTS établit une chaîne de porteurs :
            </p>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-400">UE</div>
                <div className="h-px flex-1 bg-slate-700 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">Radio Bearer</div>
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-blue-400">UTRAN</div>
                <div className="h-px flex-1 bg-slate-700 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">Iu Bearer</div>
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-indigo-400">CN</div>
              </div>
              <div className="pt-4 text-center">
                <div className="inline-block px-4 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-indigo-300">
                  Radio Access Bearer (RAB)
                </div>
              </div>
            </div>
            <p className="text-xs mt-6 text-slate-400 italic">
              Le <strong>RAB</strong> combine le Radio Bearer et le Iu Bearer pour garantir que le niveau de service demandé par l'application est maintenu depuis le mobile jusqu'au cœur de réseau.
            </p>
          </div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
