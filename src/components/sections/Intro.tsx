import React from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, Server, ArrowRightLeft, Globe, Network, ShieldCheck, GraduationCap, ChevronRight, BookOpen, PlayCircle, BrainCircuit, Info } from 'lucide-react';

import NavigationButtons from '../NavigationButtons';

export default function Intro({ onNext }: { onNext?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-12"
    >
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4 shadow-sm">
          <GraduationCap size={18} />
          Plateforme d'Apprentissage Interactive
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Maîtrisez l'Architecture des <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Réseaux Mobiles</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Une exploration complète et visuelle du GPRS (2.5G), de l'UMTS (3G) et du LTE (4G). 
          Apprenez comment les données circulent de votre mobile jusqu'à Internet.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Network size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">GPRS (2.5G)</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
            L'introduction du mode paquet sur le réseau GSM. Découvrez comment le SGSN et le GGSN ont révolutionné l'accès aux données mobiles.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">SGSN</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">GGSN</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">PCU</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Globe size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">UMTS (3G)</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
            Le passage au haut débit et à la gestion de la Qualité de Service (QoS). Explorez l'UTRAN et le rôle crucial du RNC.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">Node B</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">RNC</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">W-CDMA</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
            <Zap size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">LTE (4G)</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
            La révolution du "Tout IP". Une architecture simplifiée (EPC) pour des débits records et une latence minimale.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">eNodeB</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">MME</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">EPC</span>
          </div>
        </motion.div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Info className="text-blue-500" />
          Comment utiliser cette plateforme ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <p className="text-sm text-slate-600">Utilisez la <strong>barre latérale</strong> pour naviguer entre les différentes sections du cours.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <p className="text-sm text-slate-600">Survolez les <strong>éléments des schémas</strong> pour obtenir des définitions détaillées.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <p className="text-sm text-slate-600">Suivez les <strong>boutons de navigation</strong> en bas de page pour un parcours guidé.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">4</div>
              <p className="text-sm text-slate-600">Terminez par le <strong>Quiz</strong> pour valider vos connaissances techniques.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[40px] p-10 lg:p-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -ml-48 -mb-48"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Pourquoi cette plateforme ?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Contenu Fiable</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Basé sur les spécifications 3GPP et les notes de cours académiques pour une précision maximale.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <PlayCircle className="text-blue-400" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Apprentissage Visuel</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Des schémas interactifs et des animations pour visualiser concrètement le trajet des paquets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <BrainCircuit className="text-rose-400" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Auto-Évaluation</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Un quiz complet pour valider vos acquis et identifier les points à revoir.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="text-emerald-400" size={20} />
              Commencer le parcours
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-400 mb-6">Nous vous recommandons de suivre l'ordre chronologique pour bien comprendre l'évolution technologique.</p>
              <button 
                onClick={onNext}
                className="w-full flex items-center justify-between p-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all group"
              >
                1. Découvrir la Synthèse
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onNext}
                className="w-full flex items-center justify-between p-4 border border-white/20 rounded-2xl font-bold hover:bg-white/5 transition-all group"
              >
                2. Explorer l'UMTS
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onNext}
                className="w-full flex items-center justify-between p-4 border border-white/20 rounded-2xl font-bold hover:bg-white/5 transition-all group"
              >
                3. Maîtriser le LTE
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <NavigationButtons onNext={onNext} nextLabel="Synthèse des Évolutions" />
    </motion.div>
  );
}
