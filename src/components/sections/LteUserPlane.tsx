import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Smartphone, RadioTower, Server, Globe, Info, ArrowRight, Shield, Activity, Cpu } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

interface LayerInfo {
  title: string;
  desc: string;
  color: string;
}

const layerDetails: Record<string, LayerInfo> = {
  'NAS': { title: 'NAS (Non-Access Stratum)', desc: 'Protocole de plus haut niveau du plan de contrôle. Gère l\'authentification, la sécurité et la gestion de la mobilité entre l\'UE et le MME.', color: 'text-rose-400' },
  'RRC': { title: 'RRC (Radio Resource Control)', desc: 'Gère la connexion radio entre l\'UE et l\'eNodeB. Responsable de l\'établissement, du maintien et de la libération de la connexion RRC.', color: 'text-orange-400' },
  'PDCP': { title: 'PDCP (Packet Data Convergence Protocol)', desc: 'Présent dans les plans utilisateur ET contrôle. Compression d\'en-tête (ROHC), chiffrement et protection de l\'intégrité.', color: 'text-blue-400' },
  'RLC': { title: 'RLC (Radio Link Control)', desc: 'Segmentation, concaténation et correction d\'erreurs via ARQ. Retransmissions plus rapides qu\'en 3G grâce à la fusion BTS+RNC dans l\'eNodeB.', color: 'text-purple-400' },
  'MAC': { title: 'MAC (Medium Access Control)', desc: 'Gère l\'ordonnancement (scheduling) des ressources radio et la correction d\'erreurs rapide via HARQ.', color: 'text-pink-400' },
  'PHY': { title: 'PHY (Physical Layer)', desc: 'Couche physique gérant la modulation (OFDMA/SC-FDMA), le codage canal et les antennes MIMO.', color: 'text-emerald-400' },
  'GTP-U': { title: 'GTP-U (GPRS Tunnelling Protocol)', desc: 'Encapsule les paquets IP utilisateur dans des tunnels entre les nœuds du cœur de réseau (eNodeB, S-GW, P-GW).', color: 'text-cyan-400' },
  'UDP/IP': { title: 'UDP/IP', desc: 'Couche de transport et réseau standard utilisée pour acheminer les tunnels GTP-U.', color: 'text-slate-400' },
  'L2': { title: 'L2 (Data Link Layer)', desc: 'Couche de liaison de données standard (Ethernet, etc.) pour le transport terrestre.', color: 'text-slate-500' },
  'L1': { title: 'L1 (Physical Layer)', desc: 'Couche physique terrestre (Fibre, Cuivre) reliant les équipements du réseau.', color: 'text-slate-600' },
  'IP': { title: 'IP (Internet Protocol)', desc: 'Paquets IP de l\'utilisateur final (trafic Internet, Voix, etc.).', color: 'text-indigo-400' },
};

export default function LteUserPlane({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const LayerBox = ({ name, colorClass = "bg-slate-800/60", textColor = "text-slate-300", height = "h-10" }: { name: string, colorClass?: string, textColor?: string, height?: string }) => (
    <div 
      onMouseEnter={() => setHoveredLayer(name)}
      onMouseLeave={() => setHoveredLayer(null)}
      className={`${height} ${colorClass} border border-slate-700 rounded flex items-center justify-center p-1 cursor-help transition-all hover:scale-[1.02] hover:border-slate-500 group`}
    >
      <span className={`text-[10px] font-mono font-bold ${textColor} group-hover:text-white transition-colors`}>{name}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
          <Layers size={16} />
          Protocol Stacks
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Plan Utilisateur & Contrôle LTE</h2>
        <p className="text-lg text-slate-600 mt-4 max-w-3xl">
          Visualisation détaillée des piles protocolaires LTE, montrant le cheminement des données utilisateur (User Plane) et de la signalisation (Control Plane).
        </p>
      </header>

      <div className="bg-slate-950 rounded-3xl p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        {/* Info Panel */}
        <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 min-h-[100px] flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
            <Info size={24} />
          </div>
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {hoveredLayer ? (
                <motion.div
                  key={hoveredLayer}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <h4 className={`text-lg font-bold ${layerDetails[hoveredLayer]?.color || 'text-white'}`}>
                    {layerDetails[hoveredLayer]?.title || hoveredLayer}
                  </h4>
                  <p className="text-slate-400 text-sm mt-1">
                    {layerDetails[hoveredLayer]?.desc || 'Détails de la couche protocolaire.'}
                  </p>
                </motion.div>
              ) : (
                <p className="text-slate-500 italic">Survolez une couche pour voir les détails techniques...</p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Diagram Container */}
        <div className="relative z-10 overflow-x-auto pb-4">
          <div className="min-w-[1000px]">
            {/* Nodes Row */}
            <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr_180px] gap-4 mb-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/5">
                  <Smartphone size={32} />
                </div>
                <span className="font-bold text-white tracking-widest text-sm">UE</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-px w-full bg-slate-800 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">LTE-Uu (Radio)</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/5">
                  <RadioTower size={32} />
                </div>
                <span className="font-bold text-white tracking-widest text-sm">eNodeB</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-px w-full bg-slate-800 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">S1-U</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/5">
                  <Server size={32} />
                </div>
                <span className="font-bold text-white tracking-widest text-sm">S-GW</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-px w-full bg-slate-800 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">S5/S8</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/5">
                  <Globe size={32} />
                </div>
                <span className="font-bold text-white tracking-widest text-sm">P-GW</span>
              </div>
            </div>

            {/* Stacks Grid */}
            <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr_180px] gap-4">
              {/* UE Stack */}
              <div className="flex flex-col gap-1">
                <LayerBox name="NAS" colorClass="bg-rose-500/20" textColor="text-rose-300" />
                <LayerBox name="RRC" colorClass="bg-orange-500/20" textColor="text-orange-300" />
                <div className="h-2"></div>
                <LayerBox name="IP" colorClass="bg-indigo-500/20" textColor="text-indigo-300" />
                <LayerBox name="PDCP" colorClass="bg-blue-500/20" textColor="text-blue-300" />
                <LayerBox name="RLC" colorClass="bg-purple-500/20" textColor="text-purple-300" />
                <LayerBox name="MAC" colorClass="bg-pink-500/20" textColor="text-pink-300" />
                <LayerBox name="PHY" colorClass="bg-emerald-500/20" textColor="text-emerald-300" />
              </div>

              {/* Spacer */}
              <div className="flex flex-col justify-end pb-5">
                <div className="h-px w-full bg-slate-800 border-t border-dashed border-slate-700"></div>
              </div>

              {/* eNodeB Stack */}
              <div className="flex flex-col gap-1">
                <div className="h-10 flex items-center justify-center text-[10px] text-slate-600 font-bold uppercase">Relay</div>
                <LayerBox name="RRC" colorClass="bg-orange-500/20" textColor="text-orange-300" />
                <div className="h-2"></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex flex-col gap-1">
                    <LayerBox name="PDCP" colorClass="bg-blue-500/20" textColor="text-blue-300" />
                    <LayerBox name="RLC" colorClass="bg-purple-500/20" textColor="text-purple-300" />
                    <LayerBox name="MAC" colorClass="bg-pink-500/20" textColor="text-pink-300" />
                    <LayerBox name="PHY" colorClass="bg-emerald-500/20" textColor="text-emerald-300" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <LayerBox name="GTP-U" colorClass="bg-cyan-500/20" textColor="text-cyan-300" />
                    <LayerBox name="UDP/IP" />
                    <LayerBox name="L2" />
                    <LayerBox name="L1" />
                  </div>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex flex-col justify-end pb-5">
                <div className="h-px w-full bg-slate-800 border-t border-dashed border-slate-700"></div>
              </div>

              {/* S-GW Stack */}
              <div className="flex flex-col gap-1">
                <div className="h-10 flex items-center justify-center text-[10px] text-slate-600 font-bold uppercase">Relay</div>
                <div className="h-10"></div>
                <div className="h-2"></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex flex-col gap-1">
                    <LayerBox name="GTP-U" colorClass="bg-cyan-500/20" textColor="text-cyan-300" />
                    <LayerBox name="UDP/IP" />
                    <LayerBox name="L2" />
                    <LayerBox name="L1" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <LayerBox name="GTP-U" colorClass="bg-cyan-500/20" textColor="text-cyan-300" />
                    <LayerBox name="UDP/IP" />
                    <LayerBox name="L2" />
                    <LayerBox name="L1" />
                  </div>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex flex-col justify-end pb-5">
                <div className="h-px w-full bg-slate-800 border-t border-dashed border-slate-700"></div>
              </div>

              {/* P-GW Stack */}
              <div className="flex flex-col gap-1">
                <div className="h-10 flex items-center justify-center text-[10px] text-slate-600 font-bold uppercase">Relay</div>
                <div className="h-10"></div>
                <div className="h-2"></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex flex-col gap-1">
                    <LayerBox name="GTP-U" colorClass="bg-cyan-500/20" textColor="text-cyan-300" />
                    <LayerBox name="UDP/IP" />
                    <LayerBox name="L2" />
                    <LayerBox name="L1" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <LayerBox name="IP" colorClass="bg-indigo-500/20" textColor="text-indigo-300" />
                    <div className="h-10"></div>
                    <div className="h-10 border border-slate-800 rounded flex items-center justify-center text-[10px] text-slate-600 font-bold">Gi/SGi</div>
                    <div className="h-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h5 className="text-white font-bold flex items-center gap-2">
              <Shield size={18} className="text-blue-400" />
              Access Stratum (AS)
            </h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Comprend les couches RRC, PDCP, RLC, MAC et PHY. C'est la partie du protocole qui gère le transport des données sur l'interface radio entre l'UE et l'eNodeB.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold flex items-center gap-2">
              <Activity size={18} className="text-rose-400" />
              Non-Access Stratum (NAS)
            </h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Couche de signalisation la plus haute qui communique directement entre l'UE et le MME (Cœur de réseau), sans être interprétée par l'eNodeB.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Cpu size={20} className="text-blue-600" />
            Le Tunnel GTP-U
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Le protocole <strong>GTP-U</strong> (GPRS Tunnelling Protocol User Plane) est essentiel. Il permet d'encapsuler les paquets IP de l'utilisateur (qui peuvent avoir n'importe quelle adresse IP) dans un tunnel UDP/IP routable au sein du réseau de l'opérateur. Cela garantit que les données arrivent au bon UE même s'il change d'eNodeB.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ArrowRight size={20} className="text-emerald-600" />
            Cheminement des Données
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              L'UE envoie des données IP via la pile radio (PDCP/RLC/MAC/PHY).
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              L'eNodeB reçoit les trames radio et les encapsule dans un tunnel GTP-U vers le S-GW.
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              Le S-GW relaie le tunnel vers le P-GW, qui finit par extraire le paquet IP original vers Internet.
            </li>
          </ul>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
