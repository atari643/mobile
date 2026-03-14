import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Info, RadioTower, Server, Smartphone, ArrowRightLeft, GitCompare, MousePointerClick } from 'lucide-react';

export default function UmtsArchitecture() {
  const [activeInfo, setActiveInfo] = useState<{title: string, desc: string} | null>(null);

  const handleHover = (title: string, desc: string) => {
    setActiveInfo({ title, desc });
  };
  const handleLeave = () => {
    setActiveInfo(null);
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
          <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          Architecture 3G
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Architecture Réseau UMTS</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          L'UMTS conserve le cœur de réseau (Core Network) du GPRS (avec quelques évolutions) mais remplace entièrement le réseau d'accès radio par l'<strong className="text-indigo-600">UTRAN (UMTS Terrestrial Radio Access Network)</strong>.
        </p>
      </header>

      {/* Architecture Diagram */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        {/* Info Panel */}
        <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-4 min-h-[100px]">
          <div className="mt-1 text-indigo-600 bg-indigo-100 p-2 rounded-lg"><Info size={24} /></div>
          <div className="flex-1">
            {activeInfo ? (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <h4 className="font-bold text-indigo-900 text-lg">{activeInfo.title}</h4>
                <p className="text-sm text-indigo-800 mt-1 leading-relaxed">{activeInfo.desc}</p>
              </motion.div>
            ) : (
              <div className="text-indigo-400 italic mt-3 flex items-center gap-2">
                <MousePointerClick size={18} />
                Survolez les éléments du schéma pour afficher leurs détails.
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] min-h-[500px] max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-inner p-4">
          
          {/* Background Areas */}
          {/* UTRAN Area */}
          <div 
            className="absolute top-4 bottom-4 left-[15%] w-[35%] border-2 border-indigo-200 bg-indigo-50/50 rounded-xl cursor-help hover:bg-indigo-50 transition-colors z-0"
            onMouseEnter={() => handleHover('UTRAN', 'UMTS Terrestrial Radio Access Network. Le nouveau réseau d\'accès radio de la 3G.')}
            onMouseLeave={handleLeave}
          >
            <span className="absolute top-3 left-4 text-xs font-bold text-indigo-800 uppercase tracking-widest">UTRAN</span>
          </div>

          {/* Core Network Area */}
          <div 
            className="absolute top-4 bottom-4 left-[55%] right-4 border-2 border-slate-200 bg-slate-50/50 rounded-xl cursor-help hover:bg-slate-50 transition-colors z-0"
            onMouseEnter={() => handleHover('Core Network (CN)', 'Le cœur de réseau est divisé en deux domaines : CS (Circuit Switched) pour la voix classique, et PS (Packet Switched) pour les données IP.')}
            onMouseLeave={handleLeave}
          >
            <span className="absolute top-3 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Core Network</span>
            
            {/* CS Domain Background */}
            <div className="absolute top-12 left-4 right-4 h-[40%] bg-slate-200/50 border border-slate-300 rounded-lg">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-slate-500 uppercase">CS Domain</span>
            </div>

            {/* PS Domain Background */}
            <div className="absolute bottom-4 left-4 right-4 h-[40%] bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-emerald-600 uppercase">PS Domain</span>
            </div>
          </div>

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <defs>
              <marker id="arrowhead-umts" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#818cf8" />
              </marker>
              <marker id="arrowhead-cs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-ps" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#34d399" />
              </marker>
            </defs>

            {/* Uu */}
            <path d="M 13% 48% L 22% 35%" stroke="#818cf8" strokeWidth="3" strokeDasharray="6 6" fill="none" markerEnd="url(#arrowhead-umts)" />
            <path d="M 13% 52% L 22% 65%" stroke="#818cf8" strokeWidth="3" strokeDasharray="6 6" fill="none" markerEnd="url(#arrowhead-umts)" />
            
            {/* Iub */}
            <path d="M 28% 35% L 39% 48%" stroke="#818cf8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-umts)" />
            <path d="M 28% 65% L 39% 52%" stroke="#818cf8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-umts)" />

            {/* Iu-CS */}
            <path d="M 46% 48% L 66% 35%" stroke="#94a3b8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-cs)" />
            
            {/* Iu-PS */}
            <path d="M 46% 52% L 66% 65%" stroke="#34d399" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-ps)" />

            {/* Gn */}
            <path d="M 74% 70% L 86% 70%" stroke="#34d399" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-ps)" />

            {/* Gr / D (HLR lines) */}
            <path d="M 72% 35% L 78% 48%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d="M 72% 65% L 78% 52%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          </svg>

          {/* Nodes */}
          {/* UE */}
          <div 
            className="absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-16 h-20 border-2 border-slate-800 rounded-xl flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-200 cursor-help transition-transform hover:scale-110 z-20 shadow-lg"
            onMouseEnter={() => handleHover('UE (User Equipment)', 'Remplace la MS (Mobile Station) du GSM. Il intègre la carte USIM et gère la nouvelle interface radio W-CDMA.')}
            onMouseLeave={handleLeave}
          >
            <Smartphone className="text-slate-700 mb-1" size={28} />
            <span className="text-xs font-bold text-slate-700">UE</span>
          </div>

          {/* Node B 1 */}
          <div 
            className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-100 border-2 border-indigo-400 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-transform hover:scale-110 z-20 cursor-help shadow-lg"
            onMouseEnter={() => handleHover('Node B', 'L\'équivalent de la BTS. Gère la couche physique W-CDMA (modulation, étalement de spectre, contrôle de puissance rapide).')}
            onMouseLeave={handleLeave}
          >
            <RadioTower className="text-indigo-700" size={28} />
            <span className="absolute -bottom-6 text-xs font-bold text-indigo-800 whitespace-nowrap">Node B</span>
          </div>

          {/* Node B 2 */}
          <div 
            className="absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-100 border-2 border-indigo-400 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-transform hover:scale-110 z-20 cursor-help shadow-lg"
            onMouseEnter={() => handleHover('Node B', 'Un UE peut être connecté à plusieurs Node B simultanément (Soft Handover).')}
            onMouseLeave={handleLeave}
          >
            <RadioTower className="text-indigo-700" size={28} />
            <span className="absolute -bottom-6 text-xs font-bold text-indigo-800 whitespace-nowrap">Node B</span>
          </div>

          {/* RNC */}
          <div 
            className="absolute top-[50%] left-[42.5%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-600 border-2 border-indigo-800 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-transform hover:scale-110 z-20 shadow-xl cursor-help"
            onMouseEnter={() => handleHover('RNC (Radio Network Controller)', 'L\'équivalent du BSC. C\'est le "cerveau" de l\'UTRAN. Il gère les ressources radio (RRC), le chiffrement, et la macro-diversité (Soft Handover).')}
            onMouseLeave={handleLeave}
          >
            <span className="font-bold text-white text-lg">RNC</span>
          </div>

          {/* MSC */}
          <div 
            className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-slate-100 border-2 border-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-transform hover:scale-105 cursor-help z-20 shadow-lg"
            onMouseEnter={() => handleHover('3G-MSC / VLR', 'Mobile Switching Center. Gère la commutation de circuits pour la voix et la signalisation associée.')}
            onMouseLeave={handleLeave}
          >
            <span className="font-bold text-slate-700">3G-MSC</span>
          </div>

          {/* SGSN */}
          <div 
            className="absolute top-[70%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-emerald-100 border-2 border-emerald-400 rounded-xl flex items-center justify-center hover:bg-emerald-200 transition-transform hover:scale-105 cursor-help z-20 shadow-lg"
            onMouseEnter={() => handleHover('3G-SGSN', 'Serving GPRS Support Node. Gère la mobilité paquet et le routage vers le RNC.')}
            onMouseLeave={handleLeave}
          >
            <span className="font-bold text-emerald-800">3G-SGSN</span>
          </div>

          {/* GGSN */}
          <div 
            className="absolute top-[70%] left-[90%] -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-emerald-100 border-2 border-emerald-400 rounded-xl flex items-center justify-center hover:bg-emerald-200 transition-transform hover:scale-105 cursor-help z-20 shadow-lg"
            onMouseEnter={() => handleHover('3G-GGSN', 'Gateway GPRS Support Node. Passerelle vers Internet.')}
            onMouseLeave={handleLeave}
          >
            <span className="font-bold text-emerald-800">3G-GGSN</span>
          </div>

          {/* HLR */}
          <div 
            className="absolute top-[50%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-20 h-16 bg-purple-100 border-2 border-purple-400 rounded-xl flex items-center justify-center hover:bg-purple-200 transition-transform hover:scale-105 cursor-help z-20 shadow-lg"
            onMouseEnter={() => handleHover('HLR / AuC', 'Home Location Register / Authentication Center. Base de données centrale des abonnés et gestion de la sécurité.')}
            onMouseLeave={handleLeave}
          >
            <span className="font-bold text-purple-800">HLR</span>
          </div>

          {/* Interface Labels (Hoverable) */}
          <div 
            className="absolute top-[40%] left-[16%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-lg border border-indigo-200 text-xs font-mono font-bold text-indigo-600 cursor-help z-20 shadow-sm hover:bg-indigo-50"
            onMouseEnter={() => handleHover('Interface Uu', 'La nouvelle interface radio basée sur le W-CDMA (Wideband Code Division Multiple Access).')}
            onMouseLeave={handleLeave}
          >Uu</div>

          <div 
            className="absolute top-[40%] left-[34%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-lg border border-indigo-200 text-xs font-mono font-bold text-indigo-600 cursor-help z-20 shadow-sm hover:bg-indigo-50"
            onMouseEnter={() => handleHover('Interface Iub', 'Relie le Node B au RNC. Transporte les données utilisateur et la signalisation (NBAP).')}
            onMouseLeave={handleLeave}
          >Iub</div>

          <div 
            className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono font-bold text-slate-600 cursor-help z-20 shadow-sm hover:bg-slate-50"
            onMouseEnter={() => handleHover('Interface Iu-CS', 'Interface vers le domaine Circuit (voix).')}
            onMouseLeave={handleLeave}
          >Iu-CS</div>

          <div 
            className="absolute top-[60%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-lg border border-emerald-300 text-xs font-mono font-bold text-emerald-600 cursor-help z-20 shadow-sm hover:bg-emerald-50"
            onMouseEnter={() => handleHover('Interface Iu-PS', 'Interface vers le domaine Paquet (données).')}
            onMouseLeave={handleLeave}
          >Iu-PS</div>

          <div 
            className="absolute top-[70%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-lg border border-emerald-300 text-xs font-mono font-bold text-emerald-700 cursor-help z-20 shadow-sm hover:bg-emerald-50"
            onMouseEnter={() => handleHover('Interface Gn', 'Interface intra-opérateur entre SGSN et GGSN (GTP).')}
            onMouseLeave={handleLeave}
          >Gn</div>

        </div>
      </div>

      {/* Structural Comparison GPRS vs UMTS */}
      <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-white">
        <h3 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
          <GitCompare className="text-emerald-500" size={28} />
          Comparaison Structurelle : Accès Radio (RAN)
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GPRS Side */}
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-inner">
            <h4 className="text-lg font-bold text-slate-300 mb-8 text-center uppercase tracking-wider">Réseau 2.5G (BSS)</h4>
            
            <div className="relative h-[120px] w-full max-w-[300px] mx-auto">
              {/* SVG Lines GPRS */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <line x1="40" y1="60" x2="150" y2="60" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="150" y1="60" x2="260" y2="60" stroke="#94a3b8" strokeWidth="2" />
              </svg>

              {/* Nodes GPRS */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-slate-700 rounded border border-slate-500 flex items-center justify-center z-10 shadow-md">
                <span className="font-bold text-sm">MS</span>
              </div>
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-600 rounded-full border border-slate-400 flex items-center justify-center z-10 shadow-md">
                <span className="font-bold text-sm">BTS</span>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-16 bg-slate-600 rounded border border-slate-400 flex items-center justify-center z-10 shadow-md">
                <span className="font-bold text-sm">BSC</span>
              </div>

              {/* Labels GPRS */}
              <div className="absolute left-[80px] top-[30px] text-[11px] font-mono text-slate-400 bg-slate-800 px-1">Um</div>
              <div className="absolute right-[80px] top-[30px] text-[11px] font-mono text-slate-400 bg-slate-800 px-1">Abis</div>
            </div>
            
            <div className="mt-8 text-sm text-slate-400 space-y-3 bg-slate-900/50 p-4 rounded-lg">
              <p className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">▪</span> <strong>Pas de lien direct</strong> entre les BSC.</p>
              <p className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">▪</span> Handover géré par le réseau (Hard Handover).</p>
              <p className="flex items-start gap-2"><span className="text-slate-500 mt-0.5">▪</span> La BTS est "stupide" (simple relais physique).</p>
            </div>
          </div>

          {/* UMTS Side */}
          <div className="bg-indigo-900/30 rounded-xl p-6 border border-indigo-500/40 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            
            <h4 className="text-lg font-bold text-indigo-300 mb-8 text-center uppercase tracking-wider">Réseau 3G (UTRAN)</h4>
            
            <div className="relative h-[120px] w-full max-w-[300px] mx-auto">
              {/* SVG Lines UMTS */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <line x1="40" y1="60" x2="150" y2="60" stroke="#818cf8" strokeWidth="3" strokeDasharray="6 6" />
                <line x1="150" y1="60" x2="260" y2="60" stroke="#818cf8" strokeWidth="3" />
                {/* Iur Line (curved) */}
                <path d="M 260 80 Q 260 120 300 120" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Nodes UMTS */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-indigo-800 rounded border border-indigo-400 flex items-center justify-center z-10 shadow-md">
                <span className="font-bold text-sm text-white">UE</span>
              </div>
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-indigo-700 rounded-full border border-indigo-400 flex items-center justify-center z-10 shadow-md">
                <span className="font-bold text-sm text-white text-center leading-tight">Node<br/>B</span>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-16 bg-indigo-600 rounded border border-indigo-300 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(79,70,229,0.6)]">
                <span className="font-bold text-sm text-white">RNC</span>
              </div>

              {/* Labels UMTS */}
              <div className="absolute left-[80px] top-[30px] text-[11px] font-mono text-indigo-300 bg-slate-900 px-1 font-bold">Uu</div>
              <div className="absolute right-[80px] top-[30px] text-[11px] font-mono text-indigo-300 bg-slate-900 px-1 font-bold">Iub</div>
              <div className="absolute right-[-40px] top-[110px] text-[10px] font-mono text-pink-400 bg-slate-900 px-1 font-bold flex items-center gap-1">
                <ArrowRightLeft size={10} /> Iur
              </div>
            </div>
            
            <div className="mt-8 text-sm text-indigo-200 space-y-3 bg-indigo-950/50 p-4 rounded-lg border border-indigo-500/20">
              <p className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">▪</span> <span><strong className="text-pink-400">Nouveauté : Interface Iur</strong> entre les RNC.</span></p>
              <p className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">▪</span> <span>Permet le <strong>Soft Handover</strong> (Macro-diversité).</span></p>
              <p className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">▪</span> <span>Le Node B est plus intelligent (contrôle de puissance rapide).</span></p>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
