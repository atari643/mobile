import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, MousePointerClick, Smartphone, RadioTower, Server, Network, Globe, Activity, ShieldCheck } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

interface LayerInfo {
  title: string;
  desc: string;
  color: string;
}

const layerDetails: Record<string, LayerInfo> = {
  'Application (IP)': { title: 'Application (IP)', desc: 'Données utilisateur encapsulées dans des paquets IP.', color: 'text-orange-400' },
  'SNDCP': { title: 'SNDCP', desc: 'Subnetwork Dependent Convergence Protocol. Multiplexage, compression d\'en-têtes et de données.', color: 'text-emerald-400' },
  'LLC': { title: 'LLC', desc: 'Logical Link Control. Liaison logique fiable entre le mobile et le SGSN.', color: 'text-blue-400' },
  'RLC / MAC': { title: 'RLC / MAC', desc: 'Radio Link Control / Medium Access Control. Gestion de la ressource radio et retransmissions.', color: 'text-purple-400' },
  'GSM RF': { title: 'GSM RF', desc: 'Couche physique radio (Radio Fréquence) du GSM.', color: 'text-slate-400' },
  'BSSGP': { title: 'BSSGP', desc: 'BSS GPRS Protocol. Achemine le routage et la QoS entre SGSN et BSS.', color: 'text-pink-400' },
  'Frame Relay': { title: 'Frame Relay', desc: 'Technologie de transport de niveau 2 utilisée historiquement sur l\'interface Gb.', color: 'text-slate-400' },
  'GTP-U': { title: 'GTP-U', desc: 'GPRS Tunneling Protocol. Encapsule les données utilisateur entre SGSN et GGSN.', color: 'text-yellow-400' },
  'UDP / IP': { title: 'UDP / IP', desc: 'Protocole de transport standard pour les tunnels GTP.', color: 'text-cyan-400' },
  'L2 (Eth)': { title: 'L2 (Ethernet)', desc: 'Liaison de données locale (souvent Ethernet).', color: 'text-slate-400' },
  'L1': { title: 'L1', desc: 'Couche physique (câblage, fibre, etc.).', color: 'text-slate-400' },
  'IP': { title: 'IP', desc: 'Protocole Internet pour la sortie vers le réseau externe.', color: 'text-cyan-400' },
};

export default function ProtocolStack({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
          <Activity size={16} />
          Piles Protocolaires GPRS
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Architecture des Protocoles</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          L'architecture GPRS sépare le <strong>Plan de Transmission (User Plane)</strong> du <strong>Plan de Contrôle</strong>. Voici la pile du plan utilisateur, montrant comment les données utilisateur transitent du mobile vers Internet.
        </p>
      </header>

      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Info Header */}
        <div className="bg-slate-800/50 border-b border-slate-700 p-6 min-h-[120px] flex items-start gap-4">
          <div className="p-3 bg-slate-700 rounded-2xl text-emerald-400 shadow-inner">
            <Info size={24} />
          </div>
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className={`text-xl font-bold ${layerDetails[activeLayer].color}`}>
                    {layerDetails[activeLayer].title}
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    {layerDetails[activeLayer].desc}
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
          <div className="min-w-[1000px] grid grid-cols-[1fr_64px_1fr_64px_1fr_64px_1fr] items-stretch">
            
            {/* Headers Row */}
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tl-xl text-slate-200 font-bold border-l border-t border-slate-700 h-14">
              <Smartphone size={18} className="text-emerald-400" />
              MS
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              <RadioTower size={18} className="text-blue-400" />
              BSS
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              <Server size={18} className="text-indigo-400" />
              SGSN
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tr-xl text-slate-200 font-bold border-r border-t border-slate-700 h-14">
              <Globe size={18} className="text-rose-400" />
              GGSN
            </div>

            {/* Row 1: Application */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="Application (IP)" className="text-orange-300 border-orange-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <div className="h-12"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <div className="h-12"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="Application (IP)" className="text-orange-300 border-orange-500/30 h-12" />
            </div>

            {/* Row 2: SNDCP / GTP-U */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="SNDCP" className="text-emerald-300 border-emerald-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <div className="h-12"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="SNDCP" className="flex-1 text-emerald-300 border-emerald-500/30 h-12" />
              <Layer name="GTP-U" className="flex-1 text-yellow-300 border-yellow-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="GTP-U" className="text-yellow-300 border-yellow-500/30 h-12" />
            </div>

            {/* Row 3: LLC / UDP/IP */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="LLC" className="text-blue-300 border-blue-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <div className="h-12"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="LLC" className="flex-1 text-blue-300 border-blue-500/30 h-12" />
              <Layer name="UDP / IP" className="flex-1 text-cyan-300 border-cyan-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10 flex gap-1">
              <Layer name="UDP / IP" className="flex-1 text-cyan-300 border-cyan-500/30 h-12" />
              <Layer name="IP" className="flex-1 text-cyan-300 border-cyan-500/30 h-12" />
            </div>

            {/* Row 4: RLC/MAC / BSSGP / L2 */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="RLC / MAC" className="text-purple-300 border-purple-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Um</span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="RLC / MAC" className="flex-1 text-purple-300 border-purple-500/30 h-12" />
              <Layer name="BSSGP" className="flex-1 text-pink-300 border-pink-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Gb</span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="BSSGP" className="flex-1 text-pink-300 border-pink-500/30 h-12" />
              <Layer name="L2 (Eth)" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Gn</span>
              </div>
            </div>
            <div className="p-2 border-r border-slate-700 bg-slate-800/10 flex gap-1">
              <Layer name="L2 (Eth)" className="flex-1 h-12" />
              <Layer name="L2 (Eth)" className="flex-1 h-12" />
            </div>

            {/* Row 5: RF / FR / L1 */}
            <div className="p-2 border-l border-b border-slate-700 bg-slate-800/10 rounded-bl-xl">
              <Layer name="GSM RF" className="h-12" />
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 border-b border-slate-700 flex gap-1">
              <Layer name="GSM RF" className="flex-1 h-12" />
              <Layer name="Frame Relay" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 border-b border-slate-700 flex gap-1">
              <Layer name="Frame Relay" className="flex-1 h-12" />
              <Layer name="L1" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 border-r border-b border-slate-700 bg-slate-800/10 rounded-br-xl flex gap-1">
              <Layer name="L1" className="flex-1 h-12" />
              <Layer name="L1" className="flex-1 h-12" />
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
            <Activity size={18} />
            SNDCP
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Subnetwork Dependent Convergence Protocol. Il compresse séparément les en-têtes et les données via 2 algorithmes distincts. La compression d'en-têtes est la plus efficace car les différences d'un paquet IP (ou X.25) à l'autre sont faibles. Le protocole indique quels algorithmes de compression sont utilisés.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
            <ShieldCheck size={18} />
            LLC (Logical Link Control)
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Inspiré d'HDLC, il propose 3 modes : <br/>
            1. <strong>Sans acquittement</strong> avec FCS sur toute la trame.<br/>
            2. <strong>Sans acquittement</strong> avec protection de l'en-tête seule.<br/>
            3. <strong>Avec acquittement</strong> (trames RR, RNR, ACK, SACK).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-yellow-600 mb-2 flex items-center gap-2">
            <Network size={18} />
            GTP & GMM/SM
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>GTP</strong> encapsule les paquets sur IP/UDP entre SGSN et GGSN. <br/>
            <strong>GMM/SM</strong> gère la mobilité (nomadisme) et l'établissement des sessions (contextes PDP).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-pink-600 mb-2 flex items-center gap-2">
            <RadioTower size={18} />
            BSSGP sur Frame Relay
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            BSSGP achemine les infos de routage et QoS entre SGSN et BSS. Il s'appuie sur <strong>Frame Relay</strong> (connexions permanentes). C'est un choix historique lié à la maturité des technos de l'époque.
          </p>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
