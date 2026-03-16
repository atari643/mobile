import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Key, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

export default function NetworkSecurity({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const evolution = [
    {
      gen: "2G (GSM)",
      level: "Faible",
      desc: "Authentification unidirectionnelle (le réseau vérifie le mobile, mais pas l'inverse). Chiffrement A5/1 cassable facilement.",
      color: "bg-rose-500"
    },
    {
      gen: "3G (UMTS)",
      level: "Moyenne",
      desc: "Introduction de l'authentification mutuelle (AKA). Le mobile vérifie aussi qu'il parle au bon réseau pour éviter les fausses antennes.",
      color: "bg-amber-500"
    },
    {
      gen: "4G (LTE)",
      level: "Élevée",
      desc: "Chiffrement AES-128. Séparation stricte des clés pour le plan utilisateur et le plan de contrôle. Protection de l'intégrité.",
      color: "bg-emerald-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
          <Shield size={16} />
          Sécurité
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Sécurité des Réseaux Mobiles</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          La sécurité a évolué de manière spectaculaire. D'un système 2G vulnérable aux "IMSI Catchers", nous sommes passés à une architecture 4G/5G ultra-sécurisée basée sur des clés cryptographiques robustes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {evolution.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-slate-900">{item.gen}</span>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase text-white ${item.color}`}>
                {item.level}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-3xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock className="text-emerald-400" />
            Le mécanisme AKA
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            L'Authentication and Key Agreement (AKA) est le cœur de la sécurité 3G/4G/5G.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">1</div>
              <p className="text-sm text-slate-300">Le mobile envoie son identifiant (IMSI ou GUTI) au réseau.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">2</div>
              <p className="text-sm text-slate-300">Le réseau génère un défi (RAND) et un jeton d'authentification (AUTN).</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">3</div>
              <p className="text-sm text-slate-300">Le mobile vérifie l'AUTN pour s'assurer que le réseau est légitime.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">4</div>
              <p className="text-sm text-slate-300">Les deux parties calculent une clé de session (K_ASME) qui ne transite jamais sur les ondes.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <EyeOff className="text-indigo-600" />
              Confidentialité de l'identité
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pour éviter le traçage, le réseau n'utilise l'identifiant permanent (IMSI) que lors du premier attachement. Ensuite, il utilise des identifiants temporaires (TMSI en 2G/3G, GUTI en 4G) qui changent régulièrement.
            </p>
          </div>
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl">
            <h4 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="text-rose-600" />
              Menaces persistantes
            </h4>
            <ul className="text-xs text-rose-800 space-y-2">
              <li>• <strong>IMSI Catchers :</strong> Fausses antennes forçant le mobile à descendre en 2G pour intercepter les appels.</li>
              <li>• <strong>Attaques SS7/Diameter :</strong> Exploitation des failles du réseau cœur pour localiser un utilisateur ou intercepter des SMS.</li>
            </ul>
          </div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
