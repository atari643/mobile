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
  'NAS': { title: 'NAS (Non-Access Stratum)', desc: 'Gère la mobilité (Attach, Tracking Area Update) et l\'établissement des sessions (PDN connectivity). Communique directement avec le MME.', color: 'text-rose-400' },
  'RRC': { title: 'RRC (Radio Resource Control)', desc: 'Gère les ressources radio, la diffusion des informations système, et la configuration des couches inférieures.', color: 'text-orange-400' },
  'PDCP': { title: 'PDCP (Packet Data Convergence Protocol)', desc: 'Compression d\'en-tête (ROHC) et chiffrement/intégrité des données et du contrôle.', color: 'text-blue-400' },
  'RLC': { title: 'RLC (Radio Link Control)', desc: 'Segmentation, concaténation et correction d\'erreurs (ARQ). Garantit l\'ordre de livraison.', color: 'text-purple-400' },
  'MAC': { title: 'MAC (Medium Access Control)', desc: 'Ordonnancement (Scheduling) et correction d\'erreurs rapide (HARQ). Mappage des canaux.', color: 'text-pink-400' },
  'PHY': { title: 'PHY (Couche Physique)', desc: 'Accès OFDMA (DL) / SC-FDMA (UL). Modulation adaptative et MIMO.', color: 'text-emerald-400' },
  'S1-AP': { title: 'S1-AP (S1 Application Protocol)', desc: 'Protocole de signalisation entre l\'eNodeB et le MME pour la gestion de l\'interface S1.', color: 'text-amber-400' },
  'SCTP': { title: 'SCTP (Stream Control Transmission Protocol)', desc: 'Transport fiable pour la signalisation, garantissant la livraison des messages sans perte.', color: 'text-slate-400' },
  'GTP-U': { title: 'GTP-U (GPRS Tunnelling Protocol - User Plane)', desc: 'Encapsule les paquets IP utilisateur dans des tunnels entre l\'eNodeB et le S-GW.', color: 'text-cyan-400' },
  'UDP/IP': { title: 'UDP/IP', desc: 'Couche de transport standard pour acheminer les tunnels GTP.', color: 'text-slate-400' },
};

export default function LteProtocols({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [view, setView] = useState<'user' | 'control'>('user');

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
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-4">
            <Layers size={16} />
            Architecture LTE
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Piles Protocolaires LTE (4G)</h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Le LTE simplifie l'architecture en supprimant le RNC. Les fonctions radio sont désormais concentrées dans l'eNodeB.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setView('user')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              view === 'user' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Activity size={16} />
            Plan Utilisateur
          </button>
          <button
            onClick={() => setView('control')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              view === 'control' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldCheck size={16} />
            Plan de Contrôle
          </button>
        </div>
      </header>

      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Info Header */}
        <div className="bg-slate-800/50 border-b border-slate-700 p-6 min-h-[120px] flex items-start gap-4">
          <div className="p-3 bg-slate-700 rounded-2xl text-cyan-400 shadow-inner">
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
          <div className={`min-w-[900px] grid ${view === 'user' ? 'grid-cols-[1fr_64px_1fr_64px_1fr_64px_1fr]' : 'grid-cols-[1fr_64px_1fr_64px_1fr]'} items-stretch`}>
            
            {/* Headers Row */}
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tl-xl text-slate-200 font-bold border-l border-t border-slate-700 h-14">
              <Smartphone size={18} className="text-cyan-400" />
              UE
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              <RadioTower size={18} className="text-cyan-400" />
              eNodeB
            </div>
            <div className="border-t border-slate-700 h-14"></div>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 text-slate-200 font-bold border-t border-slate-700 h-14">
              {view === 'user' ? <Server size={18} className="text-cyan-400" /> : <Network size={18} className="text-orange-400" />}
              {view === 'user' ? 'S-GW' : 'MME'}
            </div>
            {view === 'user' && (
              <>
                <div className="border-t border-slate-700 h-14"></div>
                <div className="flex items-center justify-center gap-2 p-3 bg-slate-800 rounded-tr-xl text-slate-200 font-bold border-r border-t border-slate-700 h-14">
                  <Globe size={18} className="text-rose-400" />
                  P-GW
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-t border-slate-700 rounded-tr-xl h-14 bg-slate-800"></div>}

            {/* Row 1: NAS / S1-AP / GTP-U */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              {view === 'control' ? (
                <Layer name="NAS" className="text-rose-300 border-rose-500/30 h-12" />
              ) : (
                <div className="h-12 flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold">App Data</div>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              {view === 'control' ? (
                <>
                  <div className="flex-1 h-12 flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold">Relay</div>
                  <Layer name="S1-AP" className="flex-1 text-amber-300 border-amber-500/30 h-12" />
                </>
              ) : (
                <>
                  <div className="flex-1 h-12 flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold">Relay</div>
                  <Layer name="GTP-U" className="flex-1 text-cyan-300 border-cyan-500/30 h-12" />
                </>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              {view === 'control' ? (
                <Layer name="S1-AP" className="flex-1 text-amber-300 border-amber-500/30 h-12" />
              ) : (
                <>
                  <Layer name="GTP-U" className="flex-1 text-cyan-300 border-cyan-500/30 h-12" />
                  <div className="flex-1 h-12 flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold">Relay</div>
                </>
              )}
            </div>
            {view === 'user' && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-y-0 w-px bg-slate-700"></div>
                </div>
                <div className="p-2 border-r border-slate-700 bg-slate-800/10">
                  <Layer name="GTP-U" className="text-cyan-300 border-cyan-500/30 h-12" />
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-slate-700 bg-slate-800/10"></div>}

            {/* Row 2: RRC / SCTP/UDP */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              {view === 'control' ? (
                <Layer name="RRC" className="text-orange-300 border-orange-500/30 h-12" />
              ) : (
                <div className="h-12"></div>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              {view === 'control' ? (
                <>
                  <Layer name="RRC" className="flex-1 text-orange-300 border-orange-500/30 h-12" />
                  <Layer name="SCTP" className="flex-1 h-12" />
                </>
              ) : (
                <>
                  <div className="flex-1 h-12"></div>
                  <Layer name="UDP/IP" className="flex-1 h-12" />
                </>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              {view === 'control' ? (
                <Layer name="SCTP" className="flex-1 h-12" />
              ) : (
                <>
                  <Layer name="UDP/IP" className="flex-1 h-12" />
                  <div className="flex-1 h-12"></div>
                </>
              )}
            </div>
            {view === 'user' && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-y-0 w-px bg-slate-700"></div>
                </div>
                <div className="p-2 border-r border-slate-700 bg-slate-800/10">
                  <Layer name="UDP/IP" className="h-12" />
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-slate-700 bg-slate-800/10"></div>}

            {/* Row 3: PDCP / IP */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="PDCP" className="text-blue-300 border-blue-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block whitespace-nowrap">LTE-Uu</span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="PDCP" className="flex-1 text-blue-300 border-blue-500/30 h-12" />
              <Layer name="UDP/IP" className="flex-1 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
              <div className="bg-slate-900 px-2 py-1 z-10">
                <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block whitespace-nowrap">
                  {view === 'user' ? 'S1-U' : 'S1-MME'}
                </span>
              </div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="UDP/IP" className="flex-1 h-12" />
              <div className="flex-1 h-12"></div>
            </div>
            {view === 'user' && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-y-0 w-px bg-slate-700"></div>
                  <div className="bg-slate-900 px-2 py-1 z-10">
                    <span className="text-slate-500 font-mono text-[10px] font-bold rotate-90 block whitespace-nowrap">S5 / S8</span>
                  </div>
                </div>
                <div className="p-2 border-r border-slate-700 bg-slate-800/10">
                  <Layer name="IP" className="text-cyan-300 border-cyan-500/30 h-12" />
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-slate-700 bg-slate-800/10"></div>}

            {/* Row 4: RLC / L2 */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="RLC" className="text-purple-300 border-purple-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="RLC" className="flex-1 text-purple-300 border-purple-500/30 h-12" />
              <div className="flex-1 h-12 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">L2</div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <div className="flex-1 h-12 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">L2</div>
              <div className="flex-1 h-12"></div>
            </div>
            {view === 'user' && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-y-0 w-px bg-slate-700"></div>
                </div>
                <div className="p-2 border-r border-slate-700 bg-slate-800/10">
                  <div className="h-12 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">L2</div>
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-slate-700 bg-slate-800/10"></div>}

            {/* Row 5: MAC / L1 */}
            <div className="p-2 border-l border-slate-700 bg-slate-800/10">
              <Layer name="MAC" className="text-pink-300 border-pink-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <Layer name="MAC" className="flex-1 text-pink-300 border-pink-500/30 h-12" />
              <div className="flex-1 h-12 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">L1</div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 flex gap-1">
              <div className="flex-1 h-12 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">L1</div>
              <div className="flex-1 h-12"></div>
            </div>
            {view === 'user' && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-y-0 w-px bg-slate-700"></div>
                </div>
                <div className="p-2 border-r border-slate-700 bg-slate-800/10">
                  <div className="h-12 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">L1</div>
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-slate-700 bg-slate-800/10"></div>}

            {/* Row 6: PHY */}
            <div className="p-2 border-l border-b border-slate-700 bg-slate-800/10 rounded-bl-xl">
              <Layer name="PHY" className="text-emerald-300 border-emerald-500/30 h-12" />
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 border-b border-slate-700 flex gap-1">
              <Layer name="PHY" className="flex-1 text-emerald-300 border-emerald-500/30 h-12" />
              <div className="flex-1 h-12"></div>
            </div>
            <div className="relative flex items-center justify-center border-b border-slate-700">
              <div className="absolute inset-y-0 w-px bg-slate-700"></div>
            </div>
            <div className="p-2 bg-slate-800/10 border-b border-slate-700 flex gap-1">
              <div className="flex-1 h-12"></div>
              <div className="flex-1 h-12"></div>
            </div>
            {view === 'user' && (
              <>
                <div className="relative flex items-center justify-center border-b border-slate-700">
                  <div className="absolute inset-y-0 w-px bg-slate-700"></div>
                </div>
                <div className="p-2 border-r border-b border-slate-700 bg-slate-800/10 rounded-br-xl">
                  <div className="h-12 flex items-center justify-center text-cyan-400 text-[10px] font-bold border border-slate-700 rounded bg-slate-800/40">IP Gi/SGi</div>
                </div>
              </>
            )}
            {view === 'control' && <div className="border-r border-b border-slate-700 bg-slate-800/10 rounded-br-xl"></div>}

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="text-rose-600" size={20} />
            NAS
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le protocole <strong>NAS</strong> est le plus élevé du plan de contrôle. Il gère l'authentification et la sécurité entre le mobile et le cœur de réseau.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Zap className="text-amber-600" size={20} />
            SCTP
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Contrairement au TCP, le <strong>SCTP</strong> est multi-flux et multi-hébergement, ce qui le rend idéal pour la signalisation critique des réseaux mobiles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Activity className="text-cyan-600" size={20} />
            GTP-U
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le tunnel <strong>GTP-U</strong> permet de transporter les paquets IP de l'utilisateur tout en gérant sa mobilité sans changer son adresse IP.
          </p>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
