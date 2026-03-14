import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Info } from 'lucide-react';

export default function AnimationDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetState, setPacketState] = useState(0);
  const [activeInfo, setActiveInfo] = useState<{title: string, desc: string} | null>(null);

  const handleHover = (title: string, desc: string) => {
    setActiveInfo({ title, desc });
  };
  const handleLeave = () => {
    setActiveInfo(null);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (packetState < 5) {
        timer = setTimeout(() => setPacketState(p => p + 1), 1500);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, packetState]);

  const handlePlay = () => {
    if (packetState === 5) setPacketState(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setPacketState(0);
  };

  const getPacketPosition = () => {
    switch (packetState) {
      case 0: return { left: '10%', top: '50%', opacity: 0 }; // Hidden at MS
      case 1: return { left: '10%', top: '50%', opacity: 1 }; // At MS
      case 2: return { left: '35%', top: '50%', opacity: 1 }; // At BSS
      case 3: return { left: '60%', top: '50%', opacity: 1 }; // At SGSN
      case 4: return { left: '85%', top: '50%', opacity: 1 }; // At GGSN
      case 5: return { left: '100%', top: '50%', opacity: 0 }; // To Internet
      default: return { left: '10%', top: '50%', opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Démonstration Animée</h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Visualisation du trajet d'un paquet IP (Ping) depuis le terminal mobile vers Internet.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 rounded-lg font-medium text-slate-600 bg-slate-200 hover:bg-slate-300 transition-colors flex items-center gap-2"
          >
            <RotateCcw size={18} /> Réinitialiser
          </button>
          <button 
            onClick={handlePlay}
            disabled={isPlaying && packetState < 5}
            className="px-6 py-2 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <Play size={18} /> {packetState === 5 ? 'Rejouer' : 'Démarrer'}
          </button>
        </div>
      </header>

      <div className="bg-slate-900 rounded-2xl p-8 relative h-[450px] overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        {/* Info Panel for Animation Nodes */}
        <div className="absolute top-4 left-4 right-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-3 shadow-sm min-h-[70px] z-30 flex items-start gap-3">
          <div className="mt-0.5 text-emerald-400"><Info size={20} /></div>
          <div className="flex-1">
            {activeInfo ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h5 className="font-bold text-white text-sm">{activeInfo.title}</h5>
                <p className="text-xs text-slate-300 mt-1">{activeInfo.desc}</p>
              </motion.div>
            ) : (
              <div className="text-xs text-slate-400 italic mt-1">
                Survolez les nœuds du réseau pour voir leur rôle dans ce transfert.
              </div>
            )}
          </div>
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 mt-20"></div>

        {/* Nodes */}
        <div className="absolute inset-0 flex items-center justify-between px-12 z-10 mt-20">
          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-32 bg-slate-800 border-2 border-slate-600 rounded-xl flex items-center justify-center shadow-lg relative cursor-help hover:border-slate-400 transition-colors"
              onMouseEnter={() => handleHover('Mobile Station (MS)', 'Génère le paquet IP initial (ex: requête web). Il a déjà activé un contexte PDP et obtenu l\'adresse IP 10.0.0.42.')}
              onMouseLeave={handleLeave}
            >
              <span className="font-bold text-slate-300">MS</span>
              {packetState >= 1 && <div className="absolute -top-8 text-xs text-emerald-400 font-mono bg-slate-800 px-2 py-1 rounded">IP: 10.0.0.42</div>}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div 
              className="w-24 h-24 bg-blue-900/50 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] cursor-help hover:bg-blue-800/50 transition-colors"
              onMouseEnter={() => handleHover('Base Station Subsystem (BSS)', 'Reçoit les blocs radio, les réassemble (RLC/MAC) et transfère les trames LLC vers le SGSN via le protocole BSSGP.')}
              onMouseLeave={handleLeave}
            >
              <span className="font-bold text-blue-300">BSS</span>
            </div>
            <span className="text-xs text-slate-500 mt-2 font-mono">PCU</span>
          </div>

          <div className="flex flex-col items-center">
            <div 
              className="w-24 h-24 bg-emerald-900/50 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] cursor-help hover:bg-emerald-800/50 transition-colors"
              onMouseEnter={() => handleHover('Serving GPRS Support Node (SGSN)', 'Point d\'entrée du Core Network. Il désencapsule les protocoles d\'accès (LLC/SNDCP) et encapsule le paquet IP pur dans un tunnel GTP vers le GGSN.')}
              onMouseLeave={handleLeave}
            >
              <span className="font-bold text-emerald-300">SGSN</span>
            </div>
            <span className="text-xs text-slate-500 mt-2 font-mono">Routing</span>
          </div>

          <div className="flex flex-col items-center">
            <div 
              className="w-24 h-24 bg-emerald-900/50 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] cursor-help hover:bg-emerald-800/50 transition-colors"
              onMouseEnter={() => handleHover('Gateway GPRS Support Node (GGSN)', 'Passerelle Internet. Il termine le tunnel GTP, extrait le paquet IP original du mobile et le route vers le réseau externe.')}
              onMouseLeave={handleLeave}
            >
              <span className="font-bold text-emerald-300">GGSN</span>
            </div>
            <span className="text-xs text-slate-500 mt-2 font-mono">Gateway</span>
          </div>

          <div className="flex flex-col items-center">
            <div 
              className="w-20 h-20 bg-orange-900/50 border-2 border-orange-500 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.2)] cursor-help hover:bg-orange-800/50 transition-colors"
              onMouseEnter={() => handleHover('Packet Data Network (PDN)', 'Le réseau de destination (Internet). Il voit le paquet arriver avec l\'adresse IP source 10.0.0.42 (ou l\'IP publique après NAT).')}
              onMouseLeave={handleLeave}
            >
              <span className="font-bold text-orange-300">Web</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-1 -translate-y-1/2 flex z-0 mt-10">
          <div 
            className="flex-1 border-t-2 border-dashed border-slate-600 relative cursor-help hover:border-slate-400 transition-colors"
            onMouseEnter={() => handleHover('Interface Um', 'Interface radio entre le MS et le BSS. Utilise les protocoles RLC/MAC pour l\'accès au canal partagé.')}
            onMouseLeave={handleLeave}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono">Um</span>
          </div>
          <div 
            className="flex-1 border-t-2 border-slate-600 relative cursor-help hover:border-slate-400 transition-colors"
            onMouseEnter={() => handleHover('Interface Gb', 'Interface entre le BSS et le SGSN. Utilise Frame Relay et le protocole BSSGP pour transporter les trames LLC.')}
            onMouseLeave={handleLeave}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono">Gb</span>
          </div>
          <div 
            className="flex-1 border-t-2 border-emerald-800 relative cursor-help hover:border-emerald-500 transition-colors"
            onMouseEnter={() => handleHover('Interface Gn', 'Interface IP entre SGSN et GGSN. Les paquets utilisateurs sont encapsulés dans des tunnels GTP-U.')}
            onMouseLeave={handleLeave}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-emerald-600 font-mono">Gn (GTP Tunnel)</span>
            <div className="absolute top-[-10px] left-0 right-0 h-5 bg-emerald-900/30 rounded-full blur-sm"></div>
          </div>
          <div 
            className="flex-1 border-t-2 border-slate-600 relative cursor-help hover:border-slate-400 transition-colors"
            onMouseEnter={() => handleHover('Interface Gi', 'Point de référence entre le GGSN et le réseau externe (PDN). Le paquet IP y circule sans encapsulation GPRS.')}
            onMouseLeave={handleLeave}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono">Gi</span>
          </div>
        </div>

        {/* Animated Packet */}
        <motion.div
          animate={getPacketPosition()}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-8 h-6 bg-white rounded shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mt-10"
        >
          <div className="w-full h-full border border-slate-300 rounded flex items-center justify-center bg-slate-100">
            <span className="text-[8px] font-bold text-slate-800">IP</span>
          </div>
          
          {/* Encapsulation indicators based on position */}
          <AnimatePresence>
            {(packetState === 2) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-2 border-2 border-blue-400 rounded-lg flex items-end justify-center pb-1"
              >
                <span className="absolute -bottom-5 text-[10px] text-blue-400 font-mono whitespace-nowrap">LLC/BSSGP</span>
              </motion.div>
            )}
            {(packetState === 3 || packetState === 4) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-3 border-2 border-emerald-400 rounded-lg flex items-end justify-center pb-1 bg-emerald-500/10"
              >
                <span className="absolute -bottom-5 text-[10px] text-emerald-400 font-bold font-mono whitespace-nowrap">GTP-U Encapsulation</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Explanation Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[120px]">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">État de la transmission</h3>
        <p className="text-slate-800 font-medium">
          {packetState === 0 && "En attente de transmission. Cliquez sur Démarrer."}
          {packetState === 1 && "Le Mobile génère un paquet IP (ex: requête HTTP) destiné à Internet."}
          {packetState === 2 && "Le paquet traverse l'interface radio (Um) et le BSS. Il est encapsulé dans les protocoles LLC et BSSGP."}
          {packetState === 3 && "Le SGSN reçoit le paquet, retire l'en-tête BSSGP/LLC, et l'encapsule dans un tunnel GTP-U vers le GGSN."}
          {packetState === 4 && "Le paquet voyage dans le tunnel GTP sur l'interface Gn. Le GGSN le reçoit et désencapsule le GTP."}
          {packetState === 5 && "Le GGSN route le paquet IP natif vers Internet via l'interface Gi. Succès !"}
        </p>
      </div>
    </motion.div>
  );
}
