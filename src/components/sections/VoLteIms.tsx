import React from 'react';
import { motion } from 'motion/react';
import { Phone, Server, Shield, Activity, ArrowRight, Zap } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

export default function VoLteIms({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
          <Phone size={16} />
          Voix sur IP
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">VoLTE & Architecture IMS</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Le LTE est un réseau purement IP. Contrairement à la 2G/3G, il n'y a plus de commutateur de circuits (MSC). La voix doit donc être transportée comme des paquets de données, mais avec une priorité absolue.
        </p>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Server className="text-blue-600" />
            L'Architecture IMS (IP Multimedia Subsystem)
          </h3>
          <p className="text-slate-600 mb-8">
            IMS est la couche de contrôle qui permet de gérer les services multimédias (Voix, Vidéo) au-dessus du réseau IP LTE.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-blue-600 mb-1">P-CSCF</div>
              <div className="text-xs text-slate-500 mb-2">Proxy Call Session Control Function</div>
              <p className="text-sm text-slate-600">Le premier point de contact pour le mobile dans le réseau IMS.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-blue-600 mb-1">S-CSCF</div>
              <div className="text-xs text-slate-500 mb-2">Serving Call Session Control Function</div>
              <p className="text-sm text-slate-600">Gère l'enregistrement et le routage des appels SIP.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-blue-600 mb-1">HSS</div>
              <div className="text-xs text-slate-500 mb-2">Home Subscriber Server</div>
              <p className="text-sm text-slate-600">Base de données centrale contenant les profils utilisateurs IMS.</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50">
          <h4 className="font-bold text-slate-900 mb-4">Avantages de la VoLTE</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Activity size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">Qualité HD Voice</div>
                <div className="text-xs text-slate-500">Codec AMR-WB pour une clarté exceptionnelle.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <div className="font-bold text-sm">Appel quasi-instantané</div>
                <div className="text-xs text-slate-500">Établissement de l'appel en moins de 2 secondes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
        <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <Shield className="text-amber-600" />
          Le défi du CSFB (Circuit Switched Fallback)
        </h4>
        <p className="text-sm text-amber-800 leading-relaxed">
          Si un opérateur n'a pas encore déployé l'IMS, le mobile LTE doit "redescendre" en 2G ou 3G pour passer un appel. C'est ce qu'on appelle le <strong>CSFB</strong>. Cela entraîne une latence importante avant que le téléphone ne commence à sonner et coupe la connexion de données 4G pendant l'appel.
        </p>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
