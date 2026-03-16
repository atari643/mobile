import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Server, Smartphone, RadioTower, Database, Network, ArrowRight, ShieldCheck, Zap, Globe, MousePointerClick } from 'lucide-react';

export default function LteArchitecture() {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const elements = {
    ue: {
      title: "UE (User Equipment)",
      desc: "Le terminal mobile (smartphone, tablette). Il communique directement avec l'eNodeB via l'interface radio LTE-Uu.",
      details: "Contrairement à la 3G, le terminal gère lui-même la compensation de gigue pour la voix sur IP (VoLTE), car le réseau ne fait plus de commutation de circuit."
    },
    enodeb: {
      title: "eNodeB (Evolved Node B)",
      desc: "La station de base LTE. C'est l'unique équipement du réseau d'accès (E-UTRAN).",
      details: "Évolution majeure : il fusionne les fonctions du Node B (radio) et du RNC (contrôleur) de la 3G. Il gère l'allocation des ressources radio (ordonnancement), le contrôle d'admission, et prend les décisions de handover (X2). Il se connecte au cœur via l'interface S1."
    },
    mme: {
      title: "MME (Mobility Management Entity)",
      desc: "Le cerveau du plan de contrôle dans l'EPC.",
      details: "Il gère la signalisation (NAS), l'authentification des utilisateurs (en lien avec le HSS), le suivi de la mobilité (tracking area updates), et l'établissement des bearers (tunnels GTP). Il ne traite aucune donnée utilisateur."
    },
    sgw: {
      title: "S-GW (Serving Gateway)",
      desc: "La passerelle de service du plan de données.",
      details: "Elle sert de point d'ancrage local pour la mobilité intra-LTE (lors des handovers entre eNodeBs). Elle relaye les paquets de données utilisateur vers le P-GW via les tunnels GTP."
    },
    pgw: {
      title: "P-GW (PDN Gateway)",
      desc: "La passerelle vers les réseaux externes (Internet, IMS).",
      details: "C'est le point d'ancrage pour la mobilité inter-technologies (ex: vers 3G ou Wi-Fi). Elle attribue les adresses IP aux terminaux, applique les règles de QoS (policing), et gère la facturation."
    },
    hss: {
      title: "HSS (Home Subscriber Server)",
      desc: "La base de données centrale des abonnés.",
      details: "Évolution du HLR (2G/3G). Il contient les profils utilisateurs, les clés de sécurité pour l'authentification (via Diameter), et les informations de localisation (quel MME gère l'utilisateur)."
    },
    pcrf: {
      title: "PCRF (Policy and Charging Rules Function)",
      desc: "Le contrôleur des règles de politique et de facturation.",
      details: "Il décide dynamiquement des règles de QoS à appliquer aux flux de données (ex: garantir le débit pour un appel VoLTE) et transmet ces règles au P-GW."
    }
  };

  const interfaces = {
    lteuu: { title: "LTE-Uu", desc: "Interface radio entre l'UE et l'eNodeB (OFDMA en DL, SC-FDMA en UL)." },
    s1mme: { title: "S1-MME", desc: "Interface de contrôle (S1-AP / SCTP) entre l'eNodeB et le MME." },
    s1u: { title: "S1-U", desc: "Interface de données (GTP-U / UDP) entre l'eNodeB et le S-GW." },
    x2: { title: "X2", desc: "Interface directe entre eNodeBs pour gérer les handovers rapides (données et contrôle)." },
    s11: { title: "S11", desc: "Interface de contrôle entre le MME et le S-GW pour la gestion des sessions." },
    s5s8: { title: "S5/S8", desc: "Interface (GTP) entre S-GW et P-GW. S8 est utilisée en cas d'itinérance (roaming)." },
    s6a: { title: "S6a", desc: "Interface (Diameter) entre le MME et le HSS pour l'authentification." },
    gx: { title: "Gx", desc: "Interface entre le P-GW et le PCRF pour les règles de QoS." },
    sgi: { title: "SGi", desc: "Interface de sortie vers les réseaux IP externes (Internet, IMS)." }
  };

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
          Architecture EPC & E-UTRAN
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">L'Architecture LTE Simplifiée</h2>
        <p className="text-slate-600 mt-4 leading-relaxed max-w-3xl">
          Le LTE introduit l'<strong>E-UTRAN</strong> (réseau d'accès) et l'<strong>EPC</strong> (Evolved Packet Core). 
          La grande révolution est la séparation stricte entre le plan de contrôle (MME) et le plan de données (S-GW/P-GW), 
          ainsi que la fusion des équipements radio dans l'eNodeB.
        </p>
      </header>

      <div className="bg-slate-50 p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        {/* Diagramme SVG Interactif */}
        <div className="overflow-x-auto">
        <div className="relative w-full aspect-[16/9] min-h-[500px] min-w-[700px] max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-inner p-4">
          
          {/* Zones de fond */}
          <div className="absolute top-4 bottom-4 left-4 w-[30%] bg-blue-50/50 rounded-xl border border-blue-100/50 flex flex-col items-center pt-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">E-UTRAN (Accès Radio)</span>
          </div>
          <div className="absolute top-4 bottom-4 left-[36%] right-4 bg-rose-50/50 rounded-xl border border-rose-100/50 flex flex-col items-center pt-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">EPC (Cœur de Réseau)</span>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="arrowhead" markerUnits="userSpaceOnUse" markerWidth="5" markerHeight="3.5" refX="4.6" refY="1.75" orient="auto">
                <polygon points="0 0, 5 1.75, 0 3.5" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-data" markerUnits="userSpaceOnUse" markerWidth="5" markerHeight="3.5" refX="4.6" refY="1.75" orient="auto">
                <polygon points="0 0, 5 1.75, 0 3.5" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-ctrl" markerUnits="userSpaceOnUse" markerWidth="5" markerHeight="3.5" refX="4.6" refY="1.75" orient="auto">
                <polygon points="0 0, 5 1.75, 0 3.5" fill="#f43f5e" />
              </marker>
            </defs>

            {/* Lignes de données (Bleu) */}
            <path d="M 13 50 L 22 50" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead-data)" className="transition-all duration-300" opacity={activeElement === 'lteuu' || !activeElement ? 1 : 0.2} />
            <path d="M 28 52 L 52 68" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-data)" className="transition-all duration-300" opacity={activeElement === 's1u' || !activeElement ? 1 : 0.2} />
            <path d="M 28 78 L 52 72" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-data)" className="transition-all duration-300" opacity={activeElement === 's1u' || !activeElement ? 1 : 0.2} />
            <path d="M 58 70 L 72 70" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-data)" className="transition-all duration-300" opacity={activeElement === 's5s8' || !activeElement ? 1 : 0.2} />
            <path d="M 78 70 L 87 70" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-data)" className="transition-all duration-300" opacity={activeElement === 'sgi' || !activeElement ? 1 : 0.2} />

            {/* Lignes de contrôle (Rouge) */}
            <path d="M 28 48 L 52 32" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-ctrl)" className="transition-all duration-300" opacity={activeElement === 's1mme' || !activeElement ? 1 : 0.2} />
            <path d="M 28 75 L 52 35" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-ctrl)" className="transition-all duration-300" opacity={activeElement === 's1mme' || !activeElement ? 1 : 0.2} />
            <path d="M 55 36 L 55 64" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-ctrl)" className="transition-all duration-300" opacity={activeElement === 's11' || !activeElement ? 1 : 0.2} />
            <path d="M 58 28 L 72 17" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-ctrl)" className="transition-all duration-300" opacity={activeElement === 's6a' || !activeElement ? 1 : 0.2} />
            <path d="M 75 64 L 75 51" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrowhead-ctrl)" className="transition-all duration-300" opacity={activeElement === 'gx' || !activeElement ? 1 : 0.2} />

            {/* X2 Interface */}
            <path d="M 25 56 L 25 74" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4" fill="none" className="transition-all duration-300" opacity={activeElement === 'x2' || !activeElement ? 1 : 0.2} />

          </svg>

          {/* Éléments du réseau */}
          <div className="absolute inset-0" style={{ zIndex: 20 }}>
            {/* UE */}
            <div 
              className={`absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'ue' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('ue')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-slate-700 text-white">
                <Smartphone size={28} />
              </div>
              <span className="mt-2 font-bold text-slate-700 text-sm">UE</span>
            </div>

            {/* eNodeB 1 */}
            <div 
              className={`absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'enodeb' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('enodeb')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-500 text-white">
                <RadioTower size={32} />
              </div>
              <span className="mt-2 font-bold text-blue-700 text-sm">eNodeB</span>
            </div>

            {/* eNodeB 2 */}
            <div 
              className={`absolute top-[80%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'enodeb' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('enodeb')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-500 text-white opacity-80">
                <RadioTower size={32} />
              </div>
              <span className="mt-2 font-bold text-blue-700 text-sm opacity-80">eNodeB</span>
            </div>

            {/* MME */}
            <div 
              className={`absolute top-[30%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'mme' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('mme')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-16 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-rose-400 text-white">
                <Server size={32} />
              </div>
              <span className="mt-2 font-bold text-rose-700 text-sm">MME</span>
            </div>

            {/* S-GW */}
            <div 
              className={`absolute top-[70%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'sgw' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('sgw')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-indigo-400 text-white">
                <Network size={32} />
              </div>
              <span className="mt-2 font-bold text-indigo-700 text-sm">S-GW</span>
            </div>

            {/* P-GW */}
            <div 
              className={`absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'pgw' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('pgw')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-indigo-500 text-white">
                <Network size={32} />
              </div>
              <span className="mt-2 font-bold text-indigo-800 text-sm">P-GW</span>
            </div>

            {/* HSS */}
            <div 
              className={`absolute top-[15%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'hss' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('hss')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-400 text-white">
                <Database size={28} />
              </div>
              <span className="mt-2 font-bold text-amber-700 text-sm">HSS</span>
            </div>

            {/* PCRF */}
            <div 
              className={`absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 ${activeElement === 'pcrf' ? 'scale-110' : activeElement ? 'opacity-40' : 'hover:scale-105'}`}
              onMouseEnter={() => setActiveElement('pcrf')}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-emerald-400 text-white">
                <ShieldCheck size={28} />
              </div>
              <span className="mt-2 font-bold text-emerald-700 text-sm">PCRF</span>
            </div>

            {/* Internet/IMS */}
            <div className="absolute top-[70%] left-[92%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center shadow-inner border-2 border-slate-300 text-slate-500">
                <Globe size={32} />
              </div>
              <span className="mt-2 font-bold text-slate-500 text-sm">Internet / IMS</span>
            </div>

            {/* Labels Interfaces (Interactifs) */}
            <div 
              className="absolute top-[50%] left-[17.5%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-50"
              onMouseEnter={() => setActiveElement('lteuu')}
              onMouseLeave={() => setActiveElement(null)}
            >LTE-Uu</div>
            <div 
              className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-rose-600 border border-rose-200 cursor-pointer hover:bg-rose-50"
              onMouseEnter={() => setActiveElement('s1mme')}
              onMouseLeave={() => setActiveElement(null)}
            >S1-MME</div>
            <div 
              className="absolute top-[60%] left-[40%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-50"
              onMouseEnter={() => setActiveElement('s1u')}
              onMouseLeave={() => setActiveElement(null)}
            >S1-U</div>
            <div 
              className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-rose-600 border border-rose-200 cursor-pointer hover:bg-rose-50"
              onMouseEnter={() => setActiveElement('s11')}
              onMouseLeave={() => setActiveElement(null)}
            >S11</div>
            <div 
              className="absolute top-[70%] left-[65%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-50"
              onMouseEnter={() => setActiveElement('s5s8')}
              onMouseLeave={() => setActiveElement(null)}
            >S5/S8</div>
            <div 
              className="absolute top-[22.5%] left-[65%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-rose-600 border border-rose-200 cursor-pointer hover:bg-rose-50"
              onMouseEnter={() => setActiveElement('s6a')}
              onMouseLeave={() => setActiveElement(null)}
            >S6a</div>
            <div 
              className="absolute top-[57.5%] left-[75%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-rose-600 border border-rose-200 cursor-pointer hover:bg-rose-50"
              onMouseEnter={() => setActiveElement('gx')}
              onMouseLeave={() => setActiveElement(null)}
            >Gx</div>
            <div 
              className="absolute top-[70%] left-[83%] -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 border border-blue-200 cursor-pointer hover:bg-blue-50"
              onMouseEnter={() => setActiveElement('sgi')}
              onMouseLeave={() => setActiveElement(null)}
            >SGi</div>
          </div>
        </div>
        </div>

        {/* Panneau d'information dynamique */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[160px]">
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
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      {elements[activeElement as keyof typeof elements]?.title || interfaces[activeElement as keyof typeof interfaces]?.title}
                    </h4>
                    <p className="text-slate-600 mt-2 font-medium">
                      {elements[activeElement as keyof typeof elements]?.desc || interfaces[activeElement as keyof typeof interfaces]?.desc}
                    </p>
                    {elements[activeElement as keyof typeof elements]?.details && (
                      <p className="text-sm text-slate-500 mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {elements[activeElement as keyof typeof elements].details}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-slate-400 py-8"
              >
                <MousePointerClick size={32} className="mb-3 opacity-50" />
                <p>Survolez un équipement ou une interface pour voir les détails</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Zap className="text-amber-500" />
            Séparation Contrôle / Données
          </h3>
          <p className="text-sm text-slate-600">
            L'une des plus grandes avancées du LTE est la séparation stricte au sein de l'EPC. Le <strong>MME</strong> gère uniquement la signalisation (plan de contrôle), tandis que les <strong>S-GW et P-GW</strong> ne gèrent que le transfert des paquets IP (plan de données). Cela permet de dimensionner les équipements indépendamment selon les besoins.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <RadioTower className="text-blue-500" />
            L'eNodeB Tout-Puissant
          </h3>
          <p className="text-sm text-slate-600">
            En fusionnant la station de base et le contrôleur, l'eNodeB prend des décisions locales ultra-rapides. L'interface <strong>X2</strong> permet aux eNodeBs de communiquer directement entre eux pour préparer et exécuter les handovers sans passer par le cœur de réseau, réduisant la latence d'interruption à ~30ms.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
