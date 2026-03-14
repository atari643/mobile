import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, RadioTower, Server, Database, Network, Globe, MousePointerClick, Info } from 'lucide-react';

import NavigationButtons from '../NavigationButtons';

export default function Architecture({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const elements = {
    ms: { title: "MS (Mobile Station)", desc: "Le terminal mobile de l'utilisateur." },
    bts: { title: "BTS (Base Transceiver Station)", desc: "L'antenne relais qui communique avec le mobile via l'interface radio Um." },
    bsc: { title: "BSC (Base Station Controller)", desc: "Contrôle plusieurs BTS. Gère l'allocation des ressources radio." },
    pcu: { title: "PCU (Packet Control Unit)", desc: "Ajout matériel/logiciel au BSC pour séparer le trafic paquet (GPRS) du trafic circuit (GSM)." },
    sgsn: { title: "SGSN (Serving GPRS Support Node)", desc: "Gère la mobilité, l'authentification et le routage des paquets dans sa zone." },
    ggsn: { title: "GGSN (Gateway GPRS Support Node)", desc: "Passerelle vers les réseaux IP externes (Internet). Attribue les adresses IP." },
    hlr: { title: "HLR (Home Location Register)", desc: "Base de données centrale contenant les profils des abonnés." },
    bg: { title: "BG (Border Gateway)", desc: "Passerelle sécurisée pour l'itinérance (roaming) entre opérateurs." }
  };

  const interfaces = {
    um: { title: "Interface Um", desc: "Interface radio entre le mobile et la BTS." },
    abis: { title: "Interface Abis", desc: "Lien entre la BTS et le BSC." },
    gb: { title: "Interface Gb", desc: "Lien (souvent Frame Relay) entre le PCU et le SGSN." },
    gn: { title: "Interface Gn", desc: "Réseau IP interne transportant les tunnels GTP entre SGSN et GGSN." },
    gi: { title: "Interface Gi", desc: "Point de sortie vers les réseaux IP externes (Internet)." },
    gr: { title: "Interface Gr", desc: "Lien entre le SGSN et le HLR pour l'authentification." },
    gc: { title: "Interface Gc", desc: "Lien entre le GGSN et le HLR." }
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
          <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          Architecture 2.5G
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Architecture Réseau GPRS</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Le réseau GPRS introduit de nouveaux équipements dans le cœur de réseau (Core Network) pour gérer la commutation de paquets, tout en réutilisant le réseau d'accès radio (BSS) du GSM.
        </p>
      </header>

      {/* Architecture Diagram */}
      <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="relative w-full aspect-[16/9] min-h-[500px] max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-inner p-4">
          
          {/* Background Areas */}
          <div className="absolute top-4 bottom-4 left-[15%] w-[25%] bg-blue-50/50 rounded-xl border border-blue-100/50 flex flex-col items-center pt-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">BSS (Accès Radio)</span>
          </div>
          <div className="absolute top-4 bottom-4 left-[45%] right-[15%] bg-emerald-50/30 rounded-xl border border-emerald-100/50 flex flex-col items-center pt-2">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">GPRS Core Network</span>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <defs>
              <marker id="arrowhead-gprs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
              <marker id="arrowhead-radio" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>

            {/* Lines */}
            <path d="M 13% 50% L 17% 50%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6,4" fill="none" className="transition-all duration-300" opacity={activeElement === 'um' || !activeElement ? 1 : 0.2} />
            <path d="M 23% 50% L 32% 50%" stroke="#3b82f6" strokeWidth="3" fill="none" className="transition-all duration-300" opacity={activeElement === 'abis' || !activeElement ? 1 : 0.2} />
            <path d="M 38% 50% L 52% 50%" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-gprs)" className="transition-all duration-300" opacity={activeElement === 'gb' || !activeElement ? 1 : 0.2} />
            <path d="M 58% 50% L 72% 50%" stroke="#10b981" strokeWidth="4" fill="none" markerEnd="url(#arrowhead-gprs)" className="transition-all duration-300" opacity={activeElement === 'gn' || !activeElement ? 1 : 0.2} />
            <path d="M 78% 50% L 87% 50%" stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-gprs)" className="transition-all duration-300" opacity={activeElement === 'gi' || !activeElement ? 1 : 0.2} />
            
            {/* HLR Lines */}
            <path d="M 55% 44% Q 55% 20% 62% 20%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,4" fill="none" className="transition-all duration-300" opacity={activeElement === 'gr' || !activeElement ? 1 : 0.2} />
            <path d="M 75% 44% Q 75% 20% 68% 20%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,4" fill="none" className="transition-all duration-300" opacity={activeElement === 'gc' || !activeElement ? 1 : 0.2} />
            
            {/* BG Line */}
            <path d="M 65% 50% L 65% 72%" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" fill="none" className="transition-all duration-300" opacity={activeElement === 'bg' || !activeElement ? 1 : 0.2} />
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0" style={{ zIndex: 20 }}>
            {/* MS */}
            <div 
              className={`absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'ms' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('ms')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-slate-700 text-white">
                <Smartphone size={28} />
              </div>
              <span className="mt-2 font-bold text-slate-700 text-sm">MS</span>
            </div>

            {/* BTS */}
            <div 
              className={`absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'bts' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('bts')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-400 text-blue-700">
                <RadioTower size={28} />
              </div>
              <span className="mt-2 font-bold text-blue-800 text-sm">BTS</span>
            </div>

            {/* BSC/PCU */}
            <div 
              className={`absolute top-[50%] left-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'bsc' || activeElement === 'pcu' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('bsc')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-20 bg-blue-100 rounded-xl flex flex-col items-center justify-center shadow-lg border-2 border-blue-400 text-blue-800 relative">
                <Server size={24} className="mb-1" />
                <span className="font-bold text-sm">BSC</span>
                <div 
                  className="absolute -bottom-3 bg-emerald-100 border-2 border-emerald-500 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm"
                  onMouseEnter={(e) => { e.stopPropagation(); setActiveElement('pcu'); }}
                >
                  PCU
                </div>
              </div>
            </div>

            {/* SGSN */}
            <div 
              className={`absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'sgsn' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('sgsn')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-emerald-300 text-white">
                <Network size={32} />
              </div>
              <span className="mt-2 font-bold text-emerald-700 text-sm">SGSN</span>
            </div>

            {/* GGSN */}
            <div 
              className={`absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'ggsn' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('ggsn')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-emerald-400 text-white">
                <Network size={32} />
              </div>
              <span className="mt-2 font-bold text-emerald-800 text-sm">GGSN</span>
            </div>

            {/* HLR */}
            <div 
              className={`absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'hlr' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('hlr')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-purple-400 text-white">
                <Database size={28} />
              </div>
              <span className="mt-2 font-bold text-purple-700 text-sm">HLR</span>
            </div>

            {/* BG */}
            <div 
              className={`absolute top-[75%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'bg' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('bg')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-400 text-white">
                <Globe size={20} />
              </div>
              <span className="mt-2 font-bold text-slate-600 text-xs">BG</span>
            </div>

            {/* Internet */}
            <div className="absolute top-[50%] left-[92%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center shadow-inner border-2 border-orange-300 text-orange-600">
                <Globe size={32} />
              </div>
              <span className="mt-2 font-bold text-orange-600 text-sm">PDN / Internet</span>
            </div>

            {/* Interface Labels */}
            <div 
              className="absolute top-[47%] left-[15%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-50"
              onMouseEnter={() => setActiveElement('um')}
              onMouseLeave={() => setActiveElement(null)}
            >Um</div>
            <div 
              className="absolute top-[47%] left-[27.5%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-50"
              onMouseEnter={() => setActiveElement('abis')}
              onMouseLeave={() => setActiveElement(null)}
            >Abis</div>
            <div 
              className="absolute top-[47%] left-[45%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-emerald-600 border border-emerald-200 cursor-pointer hover:bg-emerald-50"
              onMouseEnter={() => setActiveElement('gb')}
              onMouseLeave={() => setActiveElement(null)}
            >Gb</div>
            <div 
              className="absolute top-[47%] left-[65%] -translate-x-1/2 -translate-y-1/2 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 border border-emerald-200 cursor-pointer hover:bg-emerald-100"
              onMouseEnter={() => setActiveElement('gn')}
              onMouseLeave={() => setActiveElement(null)}
            >Gn (GTP)</div>
            <div 
              className="absolute top-[47%] left-[82.5%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-orange-600 border border-orange-200 cursor-pointer hover:bg-orange-50"
              onMouseEnter={() => setActiveElement('gi')}
              onMouseLeave={() => setActiveElement(null)}
            >Gi</div>
            <div 
              className="absolute top-[32.5%] left-[58%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-purple-600 border border-purple-200 cursor-pointer hover:bg-purple-50"
              onMouseEnter={() => setActiveElement('gr')}
              onMouseLeave={() => setActiveElement(null)}
            >Gr</div>
            <div 
              className="absolute top-[32.5%] left-[72%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-purple-600 border border-purple-200 cursor-pointer hover:bg-purple-50"
              onMouseEnter={() => setActiveElement('gc')}
              onMouseLeave={() => setActiveElement(null)}
            >Gc</div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[140px]">
          <AnimatePresence mode="wait">
            {activeElement ? (
              <motion.div
                key={activeElement}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      {elements[activeElement as keyof typeof elements]?.title || interfaces[activeElement as keyof typeof interfaces]?.title}
                    </h4>
                    <p className="text-slate-600 mt-2 font-medium">
                      {elements[activeElement as keyof typeof elements]?.desc || interfaces[activeElement as keyof typeof interfaces]?.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-slate-400 py-6"
              >
                <MousePointerClick size={32} className="mb-3 opacity-50" />
                <p>Survolez un équipement ou une interface pour voir les détails</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-700 mb-3 border-b border-slate-100 pb-2">SGSN (Serving GPRS Support Node)</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Gère la mobilité (Routing Area Updates) des MS dans sa zone.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Authentification et chiffrement (via le HLR).</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Routage et transfert des paquets de données.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Gestion des contextes PDP (Packet Data Protocol).</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-700 mb-3 border-b border-slate-100 pb-2">GGSN (Gateway GPRS Support Node)</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Passerelle vers les réseaux externes (PDN - Internet, X.25).</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Attribution des adresses IP dynamiques aux mobiles.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Encapsulation GTP (GPRS Tunneling Protocol) vers le SGSN.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Filtrage, sécurité (Firewall) et facturation.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-blue-700 mb-3 border-b border-slate-100 pb-2">PCU (Packet Control Unit)</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Ajouté au BSC (Base Station Controller) du réseau GSM.</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Sépare le trafic "Circuit" (Voix -&gt; MSC) du trafic "Paquet" (Data -&gt; SGSN).</li>
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Gère les protocoles RLC/MAC sur l'interface radio.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-purple-700 mb-3 border-b border-slate-100 pb-2">Interfaces & Passerelles</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2"><strong className="font-mono text-slate-800">Gb:</strong> Entre BSC/PCU et SGSN. Utilise historiquement <strong>Frame Relay</strong> car ATM n'était pas assez mûr et IP trop lourd.</li>
            <li className="flex items-start gap-2"><strong className="font-mono text-slate-800">Gn:</strong> Entre SGSN et GGSN. Réseau IP transportant des tunnels GTP.</li>
            <li className="flex items-start gap-2"><strong className="font-mono text-slate-800">BG:</strong> Border Gateway. Permet l'itinérance (roaming) via un réseau inter-opérateur.</li>
            <li className="flex items-start gap-2"><strong className="font-mono text-slate-800">Gr/Gc:</strong> Vers le HLR. Le GGSN n'ayant pas de pile SS7, il nécessite une passerelle applicative IP/SS7 pour dialoguer avec le HLR.</li>
          </ul>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
