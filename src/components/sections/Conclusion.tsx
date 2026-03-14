import React from 'react';
import { motion } from 'motion/react';
import { Flag, Rocket, ShieldCheck, Heart, Sparkles, ChevronRight } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

export default function Conclusion({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-12"
    >
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4 shadow-sm">
          <Flag size={18} />
          Conclusion du Parcours
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Félicitations !</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Vous avez parcouru l'évolution des réseaux mobiles, du GPRS au LTE. Vous avez maintenant une vision claire de l'architecture, des protocoles et de la gestion de la mobilité.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <Rocket className="text-emerald-500 mb-6" size={40} />
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Vers la 5G et au-delà</h3>
          <p className="text-slate-600 leading-relaxed">
            Le LTE a posé les bases du "Tout IP". La 5G continue cette évolution avec le <strong>Network Slicing</strong>, des débits encore plus élevés et une latence ultra-faible pour l'Internet des Objets (IoT) et les communications critiques.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
          <ShieldCheck className="text-blue-500 mb-6" size={40} />
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Maîtrise Technique</h3>
          <p className="text-slate-600 leading-relaxed">
            Vous comprenez maintenant que derrière chaque "barre de réseau" sur votre téléphone se cache une infrastructure complexe de serveurs, de contrôleurs et d'algorithmes de gestion radio.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[40px] p-12 text-center text-white">
        <Sparkles className="mx-auto text-amber-400 mb-6" size={48} />
        <h3 className="text-3xl font-bold mb-4">Prêt pour l'examen ?</h3>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Si vous avez suivi tout le parcours, vous devriez être capable de répondre à toutes les questions du quiz technique. N'hésitez pas à revenir sur les schémas interactifs pour clarifier certains points.
        </p>
        <button 
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-slate-900 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg hover:shadow-xl"
        >
          Accéder au Glossaire & Quiz
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 text-slate-400">
        <Heart className="text-rose-500 fill-rose-500" size={24} />
        <p className="text-sm font-medium italic">Merci d'avoir utilisé cette plateforme d'apprentissage.</p>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
