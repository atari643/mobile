import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Info, ArrowRight, Layers, Cpu, RadioTower, Server, Smartphone, ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  {
    id: 0,
    title: "1. Génération du Paquet (UE)",
    desc: "L'application génère un paquet IP. Le protocole PDCP compresse l'en-tête (ex: ROHC) pour économiser la bande passante. RLC segmente les données, MAC gère les priorités, et la couche PHY applique le codage W-CDMA.",
    protocols: ["IP", "PDCP", "RLC", "MAC", "PHY (W-CDMA)"],
    node: "UE"
  },
  {
    id: 1,
    title: "2. Interface Radio (Uu)",
    desc: "Le paquet, transformé en flux de bits codés (chips), traverse l'interface radio Uu en utilisant l'accès multiple par répartition en code (CDMA).",
    protocols: ["W-CDMA RF"],
    node: "Air"
  },
  {
    id: 2,
    title: "3. Réception (Node B)",
    desc: "Le Node B démodule le signal W-CDMA. Contrairement au GPRS où la BTS faisait peu de choses, le Node B gère le contrôle de puissance rapide. Les données sont placées dans un Frame Protocol (FP).",
    protocols: ["PHY (W-CDMA)", "MAC-b/c", "FP"],
    node: "Node B"
  },
  {
    id: 3,
    title: "4. Transport Terrestre (Iub)",
    desc: "Historiquement (Rel '99), les trames FP sont encapsulées dans des cellules ATM via la couche d'adaptation AAL2, optimisée pour multiplexer de petits paquets avec des contraintes de délai (voix/données).",
    protocols: ["FP", "AAL2", "ATM", "PHY (SDH/E1)"],
    node: "Iub"
  },
  {
    id: 4,
    title: "5. Traitement Centralisé (RNC)",
    desc: "Le RNC extrait les données de l'ATM. C'est ici que se terminent les protocoles MAC-d, RLC (réassemblage, ARQ) et PDCP (décompression). Le paquet IP d'origine est reconstitué.",
    protocols: ["ATM", "AAL2", "FP", "MAC-d", "RLC", "PDCP", "IP"],
    node: "RNC"
  },
  {
    id: 5,
    title: "6. Encapsulation Core (Iu-PS)",
    desc: "Le RNC encapsule le paquet IP utilisateur dans un tunnel GTP-U (GPRS Tunneling Protocol User plane) sur UDP/IP pour l'envoyer vers le SGSN.",
    protocols: ["IP (User)", "GTP-U", "UDP", "IP (Transport)", "L2/L1"],
    node: "Iu-PS"
  },
  {
    id: 6,
    title: "7. Routage vers Internet (SGSN/GGSN)",
    desc: "Le SGSN relaie le tunnel GTP vers le GGSN. Le GGSN désencapsule le GTP-U et route le paquet IP natif vers le réseau externe (Internet).",
    protocols: ["GTP-U", "IP (User) -> Internet"],
    node: "Core Network"
  }
];

export default function UmtsDataFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const activeStepData = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
          <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
          Flux de Données
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Flux de Données UMTS (Plan Utilisateur)</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Découvrez comment un paquet IP voyage à travers l'architecture UMTS, de l'équipement utilisateur (UE) jusqu'à Internet, en observant les différentes encapsulations protocolaires.
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Interactive Diagram Area */}
        <div className="p-8 bg-slate-900 relative h-[400px] flex items-center justify-center overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
          
          {/* Network Nodes */}
          <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 relative">
            
            {/* UE */}
            <div className={`flex flex-col items-center transition-all duration-500 relative ${currentStep === 0 ? 'scale-125 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'opacity-50 scale-90'}`}>
              <div className={`w-16 h-24 rounded-lg flex items-center justify-center border-2 ${currentStep === 0 ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-slate-600'}`}>
                <Smartphone className="text-white" size={32} />
              </div>
              <span className="text-white font-bold mt-2 absolute -bottom-8">UE</span>
              {currentStep === 0 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

            {/* Uu */}
            <div className={`flex-1 h-2 mx-2 transition-all duration-500 relative ${currentStep === 1 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-slate-700 border-y border-dashed border-slate-600'}`}>
              {currentStep === 1 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

            {/* Node B */}
            <div className={`flex flex-col items-center transition-all duration-500 relative ${currentStep === 2 ? 'scale-125 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'opacity-50 scale-90'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${currentStep === 2 ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-600'}`}>
                <RadioTower className="text-white" size={32} />
              </div>
              <span className="text-white font-bold mt-2 absolute -bottom-8 whitespace-nowrap">Node B</span>
              {currentStep === 2 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

            {/* Iub */}
            <div className={`flex-1 h-2 mx-2 transition-all duration-500 relative ${currentStep === 3 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-700'}`}>
              {currentStep === 3 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

            {/* RNC */}
            <div className={`flex flex-col items-center transition-all duration-500 relative ${currentStep === 4 ? 'scale-125 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'opacity-50 scale-90'}`}>
              <div className={`w-20 h-24 rounded-lg flex items-center justify-center border-2 ${currentStep === 4 ? 'bg-purple-600 border-purple-400' : 'bg-slate-800 border-slate-600'}`}>
                <Cpu className="text-white" size={32} />
              </div>
              <span className="text-white font-bold mt-2 absolute -bottom-8">RNC</span>
              {currentStep === 4 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

            {/* Iu-PS */}
            <div className={`flex-1 h-2 mx-2 transition-all duration-500 relative ${currentStep === 5 ? 'bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'bg-slate-700'}`}>
              {currentStep === 5 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

            {/* Core Network */}
            <div className={`flex flex-col items-center transition-all duration-500 relative ${currentStep === 6 ? 'scale-125 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'opacity-50 scale-90'}`}>
              <div className={`w-24 h-20 rounded-lg flex items-center justify-center border-2 ${currentStep === 6 ? 'bg-orange-600 border-orange-400' : 'bg-slate-800 border-slate-600'}`}>
                <Server className="text-white" size={32} />
              </div>
              <span className="text-white font-bold mt-2 text-center leading-tight absolute -bottom-12 whitespace-nowrap">SGSN /<br/>GGSN</span>
              {currentStep === 6 && (
                <motion.div layoutId="packet" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 flex items-center justify-center opacity-0">
                  <span className="text-[10px] font-bold text-slate-900">IP</span>
                </motion.div>
              )}
            </div>

          </div>
        </div>

        {/* Controls and Info Panel */}
        <div className="p-6 bg-white flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">
                Étape {currentStep + 1} / {steps.length}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{activeStepData.title}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed min-h-[80px]">
              {activeStepData.desc}
            </p>
            
            <div className="mt-6 flex gap-3">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={18} /> Précédent
              </button>
              <button 
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30"
              >
                Suivant <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="w-full md:w-72 bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers size={16} className="text-blue-500" />
              Pile Protocolaire Active
            </h4>
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {activeStepData.protocols.map((proto, idx) => (
                  <motion.div
                    key={`${currentStep}-${proto}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-2 rounded text-center text-sm font-mono font-semibold border
                      ${idx === 0 && proto.includes('IP') ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                        proto.includes('PDCP') ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        proto.includes('RLC') ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        proto.includes('MAC') ? 'bg-pink-100 text-pink-800 border-pink-200' :
                        proto.includes('ATM') || proto.includes('AAL2') ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        proto.includes('GTP') ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                        'bg-slate-200 text-slate-700 border-slate-300'
                      }
                    `}
                  >
                    {proto}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison GPRS vs UMTS Data Flow */}
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm mt-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <ArrowRight className="text-indigo-500" />
          Différence majeure avec le GPRS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">Dans le GPRS</h4>
            <p className="text-sm text-slate-600">
              La couche LLC (Logical Link Control) s'étendait de bout en bout entre le <strong>Mobile (MS)</strong> et le <strong>SGSN</strong>. Le BSS (BTS+BSC) n'était qu'un relais de niveau inférieur (Frame Relay / BSSGP). Le SGSN gérait donc la fiabilisation radio.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h4 className="font-bold text-indigo-800 mb-2 border-b border-slate-100 pb-2">Dans l'UMTS</h4>
            <p className="text-sm text-slate-600">
              Les couches RLC et PDCP se terminent dans le <strong>RNC</strong>. Le RNC est beaucoup plus intelligent que le BSC : il gère la fiabilisation (ARQ) et la compression. Le SGSN est déchargé de ces tâches radio et ne gère plus que le tunnel GTP-U.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
