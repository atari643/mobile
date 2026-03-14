import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Gauge, PhoneCall, Play, MousePointerClick, Download, AlertTriangle } from 'lucide-react';

export default function UmtsIntro() {
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
          Évolution 3G
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Transition vers l'UMTS (3G)</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Si le GPRS a introduit la commutation de paquets en s'appuyant sur l'infrastructure GSM, ses débits restaient limités et la gestion de la Qualité de Service (QoS) basique. L'<strong className="text-indigo-600">UMTS (Universal Mobile Telecommunications System)</strong> a été conçu pour répondre aux besoins du multimédia et de l'Internet mobile haut débit, avec une gestion de la QoS au cœur de son architecture.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" />
            Le Constat (Limites 2.5G)
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>GSM :</strong> Optimisé uniquement pour la téléphonie (mode circuit). Le débit de 10 Kbit/s était inadapté pour les données.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>GPRS :</strong> Transfert de données en mode paquet, mais à débit relativement faible. Les flux sont de nature homogène, rendant difficile la prise en charge de flux applicatifs hétérogènes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>Multimédia :</strong> Difficulté d'intégrer de nouveaux services nécessitant une Qualité de Service (QoS) stricte (voix sur IP, streaming vidéo). La notion de QoS n'était pas centrale dans l'architecture GSM/GPRS.</span>
            </li>
          </ul>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Globe className="text-indigo-500" />
            La Vision IMT-2000 (3G)
          </h3>
          <ul className="space-y-3 text-sm text-indigo-800">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              <span><strong>Haut Débit :</strong> Objectif d'atteindre 64 kb/s, 144 kb/s et jusqu'à 2 Mb/s.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              <span><strong>Nouveau Réseau d'Accès :</strong> Création de l'UTRAN avec une toute nouvelle interface radio basée sur le CDMA (W-CDMA en FDD et TD-CDMA en TDD). Unicité du réseau d'accès en mode paquet pour faciliter la gestion d'ensemble.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              <span><strong>Standard Mondial :</strong> Projet du 3GPP pour unifier les standards de télécommunications mobiles, intégrant les européens, japonais, coréens et chinois.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Gauge className="text-indigo-600" />
            Les 4 Classes de Qualité de Service (QoS) UMTS
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            L'UMTS introduit une gestion fine de la QoS (inspirée de l'ATM et de l'IETF) pour supporter des flux hétérogènes sur un même réseau paquet. La contrainte de délai est le critère principal de différenciation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-6 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
              <PhoneCall size={20} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Conversationnel</h4>
            <p className="text-xs text-slate-500 mb-4 h-16">Temps réel strict. Préserve la relation temporelle entre les entités. Délai très faible exigé (ex: &lt;100ms). Le débit peut être constant ou variable.</p>
            <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">
              Ex: Voix (VoIP), Visiophonie
            </div>
          </div>

          <div className="p-6 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
              <Play size={20} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Streaming</h4>
            <p className="text-xs text-slate-500 mb-4 h-16">Temps réel, mais la contrainte de délai est moindre (ex: &lt;250ms). Pas de dialogue entre extrémités. Préserve la relation temporelle.</p>
            <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">
              Ex: Streaming Audio/Vidéo
            </div>
          </div>

          <div className="p-6 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MousePointerClick size={20} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Interactif</h4>
            <p className="text-xs text-slate-500 mb-4 h-16">Best effort avec priorité. Modèle requête-réponse (dialogues client-serveur). La contrainte de délai est faible. Le contenu doit être préservé.</p>
            <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">
              Ex: Navigation Web, Jeux
            </div>
          </div>

          <div className="p-6 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center mb-4">
              <Download size={20} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Background</h4>
            <p className="text-xs text-slate-500 mb-4 h-16">Best effort pur (Trafic de fond). La destination n'attend pas les données dans un délai précis. Le contenu doit être préservé.</p>
            <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">
              Ex: Email, FTP, SMS
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
