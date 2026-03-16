import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Smartphone, RadioTower, Server, Globe, ArrowRight } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

const flows = {
  attach: {
    title: "Procédure d'Attach GPRS",
    steps: [
      { from: 'MS', to: 'SGSN', label: 'Attach Request (IMSI, Type)', desc: 'Le mobile demande à s\'enregistrer sur le réseau.' },
      { from: 'SGSN', to: 'HLR', label: 'Update Location', desc: 'Le SGSN informe le HLR de la position du mobile.' },
      { from: 'HLR', to: 'SGSN', label: 'Insert Subscriber Data', desc: 'Le HLR envoie le profil de l\'abonné au SGSN.' },
      { from: 'SGSN', to: 'MS', label: 'Attach Accept (P-TMSI)', desc: 'Le réseau confirme l\'enregistrement et donne un identifiant temporaire.' }
    ]
  },
  pdp: {
    title: "Activation Contexte PDP",
    steps: [
      { from: 'MS', to: 'SGSN', label: 'Activate PDP Context Request', desc: 'Le mobile demande une session de données (APN).' },
      { from: 'SGSN', to: 'GGSN', label: 'Create PDP Context Request', desc: 'Le SGSN demande au GGSN de créer un tunnel.' },
      { from: 'GGSN', to: 'SGSN', label: 'Create PDP Context Response (IP)', desc: 'Le GGSN alloue une adresse IP et confirme le tunnel.' },
      { from: 'SGSN', to: 'MS', label: 'Activate PDP Context Accept', desc: 'Le mobile reçoit son IP et peut commencer à surfer.' }
    ]
  }
};

export default function CallFlows({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [activeFlow, setActiveFlow] = useState<keyof typeof flows>('attach');
  const [currentStep, setCurrentStep] = useState(-1);

  const flow = flows[activeFlow];

  const nextStep = () => {
    if (currentStep < flow.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => setCurrentStep(-1);

  const getX = (node: string) => {
    if (node === 'MS') return '10%';
    if (node === 'BSS') return '35%';
    if (node === 'SGSN' || node === 'HLR') return '60%';
    if (node === 'GGSN') return '90%';
    return '50%';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
          <Play size={16} />
          Flux de Signalisation
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Diagrammes de Flux Interactifs</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Comprenez comment les différents éléments du réseau communiquent entre eux lors des procédures critiques.
        </p>
      </header>

      <div className="flex gap-4">
        {(Object.keys(flows) as Array<keyof typeof flows>).map(key => (
          <button
            key={key}
            onClick={() => { setActiveFlow(key); reset(); }}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              activeFlow === key 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {flows[key].title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 relative min-h-[500px]">
        {/* Lifelines */}
        <div className="absolute inset-0 flex justify-around px-12 pt-24 pb-12 pointer-events-none">
          {['MS', 'BSS', 'SGSN', 'GGSN'].map(node => (
            <div key={node} className="flex flex-col items-center h-full">
              <div className="w-px h-full bg-slate-200 border-dashed border-l" />
            </div>
          ))}
        </div>

        {/* Nodes */}
        <div className="relative flex justify-around mb-12">
          {[
            { id: 'MS', icon: Smartphone, label: 'Mobile' },
            { id: 'BSS', icon: RadioTower, label: 'BSS' },
            { id: 'SGSN', icon: Server, label: 'SGSN' },
            { id: 'GGSN', icon: Globe, label: 'GGSN' }
          ].map(node => (
            <div key={node.id} className="flex flex-col items-center gap-2 z-10 w-24">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <node.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{node.label}</span>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="relative space-y-8 mt-8">
          {flow.steps.map((step, idx) => {
            const isVisible = idx <= currentStep;
            const isCurrent = idx === currentStep;
            const fromX = getX(step.from);
            const toX = getX(step.to);
            const isReverse = parseInt(fromX) > parseInt(toX);

            return (
              <div key={idx} className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative h-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isVisible ? `calc(${Math.abs(parseInt(toX) - parseInt(fromX))}% - 20px)` : 0 }}
                    style={{ 
                      left: isReverse ? toX : fromX,
                      marginLeft: isReverse ? '10px' : '10px',
                      position: 'absolute',
                      top: '50%'
                    }}
                    className={`h-0.5 ${isCurrent ? 'bg-emerald-500' : 'bg-slate-400'}`}
                  >
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isReverse ? 'left-0' : 'right-0'}`}>
                      <ArrowRight size={16} className={`${isReverse ? 'rotate-180' : ''} ${isCurrent ? 'text-emerald-500' : 'text-slate-400'}`} />
                    </div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-slate-600 bg-white px-2">
                      {step.label}
                    </div>
                  </motion.div>
                </div>
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 italic"
                  >
                    {step.desc}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button
            onClick={reset}
            className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === flow.steps.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === -1 ? 'Démarrer' : 'Étape Suivante'}
            <Play size={18} />
          </button>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
