import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Shield, Activity, Info, Smartphone, RadioTower, Server, Globe, MousePointerClick } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

interface LayerInfo {
  title: string;
  desc: string;
  color: string;
}

const layerDetails: Record<string, LayerInfo> = {
  'GMM / SM': { title: 'GMM / SM', desc: 'GPRS Mobility Management / Session Management. Protocoles de signalisation de bout en bout entre le mobile et le SGSN.', color: 'text-orange-400' },
  'LLC': { title: 'LLC (Logical Link Control)', desc: 'Transporte la signalisation (GMM/SM) de manière fiable entre le MS et le SGSN.', color: 'text-blue-400' },
  'RLC / MAC': { title: 'RLC / MAC', desc: 'Radio Link Control / Medium Access Control. Gère l\'interface radio Um.', color: 'text-purple-400' },
  'BSSGP': { title: 'BSSGP (BSS GPRS Protocol)', desc: 'Transporte la signalisation LLC et les informations de QoS entre le BSS et le SGSN.', color: 'text-pink-400' },
  'GTP-C': { title: 'GTP-C (GPRS Tunneling Protocol - Control)', desc: 'Signalisation entre SGSN et GGSN pour la gestion des contextes PDP.', color: 'text-yellow-400' },
  'UDP / IP': { title: 'UDP / IP', desc: 'Transport de la signalisation GTP-C sur le réseau cœur.', color: 'text-cyan-400' },
  'Frame Relay': { title: 'Frame Relay', desc: 'Technologie de transport historique pour l\'interface Gb.', color: 'text-slate-400' },
  'GSM RF': { title: 'GSM RF', desc: 'Couche physique radio GSM.', color: 'text-slate-400' },
  'L2 / L1': { title: 'L2 / L1', desc: 'Couches basses standards (Ethernet, etc.) pour l\'interface Gn.', color: 'text-slate-400' },
};

export default function ControlPlane({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
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
          <Shield size={16} />
          Signalisation
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Plan de Contrôle (Control Plane)</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Le plan de contrôle gère la signalisation nécessaire pour établir, maintenir et libérer les connexions de données. Il est séparé du plan utilisateur (User Plane) qui transporte les données réelles.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-600" />
            GMM (GPRS Mobility Management)
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            GMM gère l'attachement au réseau, l'authentification et le suivi de la localisation du mobile (Routing Area Updates).
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">GPRS Attach / Detach</strong>
                Procédure pour s'enregistrer ou se désenregistrer du réseau GPRS. Le SGSN contacte le HLR pour vérifier les droits.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">Routing Area Update (RAU)</strong>
                Le mobile signale son changement de zone de routage (RA) au SGSN pour que le réseau sache où lui envoyer des données.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">Paging</strong>
                Si le réseau a des données pour un mobile en état STANDBY, il diffuse un message de Paging dans toute la Routing Area pour le réveiller.
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="text-blue-600" />
            SM (Session Management)
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            SM gère l'établissement, la modification et la libération des contextes PDP (Packet Data Protocol) pour permettre le transfert de données.
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">PDP Context Activation</strong>
                Demande d'une adresse IP et établissement d'un tunnel GTP entre SGSN et GGSN.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">PDP Context Modification</strong>
                Changement des paramètres de la session, comme la Qualité de Service (QoS).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">PDP Context Deactivation</strong>
                Fermeture de la session de données et libération de l'adresse IP et des ressources.
              </div>
            </li>
          </ul>
        </div>
      </div>

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
          <div className="min-w-[1000px] grid grid-cols-[1fr_1fr_48px_1fr_1fr_48px_1fr_1fr_48px_1fr_1fr] items-stretch">
            
            {/* Headers Row */}
            <div className="col-span-2 flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tl-xl text-slate-200 font-bold border-l border-t border-slate-700 h-14">
              <Smartphone size={18} className="text-emerald-400" />
              MS
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="col-span-2 flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              <RadioTower size={18} className="text-blue-400" />
              BSS
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="col-span-2 flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              <Server size={18} className="text-indigo-400" />
              SGSN
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="col-span-2 flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tr-xl text-slate-200 font-bold border-r border-t border-slate-700 h-14">
              <Globe size={18} className="text-rose-400" />
              GGSN
            </div>

            {/* Row 1: GMM/SM */}
            <div className="col-span-2 p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="GMM / SM" className="text-orange-300 border-orange-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="GMM / SM" className="text-orange-300 border-orange-500/30 h-12" />
            </div>
            <div className="p-2 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-r border-slate-700 bg-slate-800/10"></div>

            {/* Row 2: LLC */}
            <div className="col-span-2 p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="LLC" className="text-blue-300 border-blue-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="LLC" className="text-blue-300 border-blue-500/30 h-12" />
            </div>
            <div className="p-2 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-r border-slate-700 bg-slate-800/10"></div>

            {/* Row 3: RLC/MAC | BSSGP | GTP-C */}
            <div className="col-span-2 p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="RLC / MAC" className="text-purple-300 border-purple-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Um</span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="RLC / MAC" className="text-purple-300 border-purple-500/30 h-12" />
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="BSSGP" className="text-pink-300 border-pink-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Gb</span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="BSSGP" className="text-pink-300 border-pink-500/30 h-12" />
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="GTP-C" className="text-yellow-300 border-yellow-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block">Gn</span>
              </div>
            </div>
            <div className="col-span-2 p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="GTP-C" className="text-yellow-300 border-yellow-500/30 h-12" />
            </div>

            {/* Row 4: GSM RF | Frame Relay | UDP/IP */}
            <div className="col-span-2 p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="GSM RF" className="h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="GSM RF" className="h-12" />
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="Frame Relay" className="h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="Frame Relay" className="h-12" />
            </div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="UDP / IP" className="text-cyan-300 border-cyan-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="UDP / IP" className="text-cyan-300 border-cyan-500/30 h-12" />
            </div>

            {/* Row 5: L2 / L1 */}
            <div className="col-span-2 p-2 border-l border-slate-700 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10"></div>
            <div className="p-2 bg-slate-800/10">
              <Layer name="L2 / L1" className="h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-r border-slate-700 bg-slate-800/10">
              <Layer name="L2 / L1" className="h-12" />
            </div>

            {/* Row 6: Bottom Border */}
            <div className="col-span-2 p-2 border-l border-b border-slate-700 bg-slate-800/10 rounded-bl-xl"></div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-b border-slate-700 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-b border-slate-700 bg-slate-800/10"></div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="col-span-2 p-2 border-r border-b border-slate-700 bg-slate-800/10 rounded-br-xl"></div>

          </div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
