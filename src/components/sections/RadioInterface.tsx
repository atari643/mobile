import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RadioReceiver, ArrowRightLeft, Layers, Zap, Info } from 'lucide-react';

export default function RadioInterface() {
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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Interface Radio & Couches MAC/RLC</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          C'est ici que se trouve la véritable complexité du GPRS ("On rentre dans le dur !"). L'allocation dynamique des ressources radio et le partage des canaux physiques nécessitent des mécanismes sophistiqués au niveau des couches MAC et RLC.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="text-emerald-600" />
            Canaux Physiques et Logiques
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Le canal physique GPRS est le <strong>PDCH (Packet Data Channel)</strong>. Il est partagé entre plusieurs utilisateurs. L'allocation se fait sur une granularité de <strong>4 slots consécutifs</strong>, formant un "bloc".
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-800 text-sm mb-2">Multitrame GPRS (52 trames TDMA = 240ms)</h4>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
              {[...Array(12)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-1 rounded">B{i}</div>
                  {(i === 2 || i === 8) && <div className="bg-orange-100 text-orange-800 border border-orange-300 px-2 py-1 rounded">T</div>}
                  {(i === 5 || i === 11) && <div className="bg-slate-200 text-slate-600 border border-slate-300 px-2 py-1 rounded">i</div>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              B = Bloc (4 bursts), T = PTCCH (Timing Advance), i = Idle
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><strong className="text-slate-800">PDTCH :</strong> Packet Data Traffic Channel (Données)</li>
            <li><strong className="text-slate-800">PACCH :</strong> Packet Associated Control Channel (Ack/Nack, Contrôle)</li>
            <li><strong className="text-slate-800">PRACH :</strong> Packet Random Access Channel (Requêtes montantes)</li>
          </ul>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-emerald-400" />
            Codage & Couche Physique
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Le GPRS propose 4 schémas de codage (CS-1 à CS-4). Le choix dépend de la qualité radio. Plus le codage est robuste (CS-1), moins le débit utile est élevé.
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-mono text-emerald-400 font-bold">CS-1</span>
              <span className="text-sm text-slate-300">9.05 kbps / slot</span>
              <span className="text-xs text-slate-500">Très robuste (Signal faible)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-mono text-emerald-400 font-bold">CS-2</span>
              <span className="text-sm text-slate-300">13.4 kbps / slot</span>
              <span className="text-xs text-slate-500">Standard</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-mono text-emerald-400 font-bold">CS-3</span>
              <span className="text-sm text-slate-300">15.6 kbps / slot</span>
              <span className="text-xs text-slate-500">Bon signal</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-mono text-emerald-400 font-bold">CS-4</span>
              <span className="text-sm text-slate-300">21.4 kbps / slot</span>
              <span className="text-xs text-slate-500">Excellent signal (Pas de correction)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Le concept clé : TBF, TFI et USF</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">TBF (Temporary Block Flow)</h4>
            <p className="text-sm text-blue-800">
              C'est une connexion unidirectionnelle temporaire entre le mobile et le réseau pour transférer des données (LLC PDUs). Il n'existe que tant qu'il y a des données à transmettre.
            </p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
            <h4 className="font-bold text-purple-900 mb-2">TFI (Temporary Flow Identifier)</h4>
            <p className="text-sm text-purple-800">
              Identifiant unique sur 5 bits attribué à chaque TBF. Il permet au mobile de reconnaître les blocs qui lui sont destinés sur la voie descendante.
            </p>
          </div>
          <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
            <h4 className="font-bold text-orange-900 mb-2">USF (Uplink State Flag)</h4>
            <p className="text-sm text-orange-800">
              Indicateur sur 3 bits inclus dans l'en-tête MAC des blocs <strong>descendants</strong>. Il indique quel mobile a le droit d'émettre dans le <strong>prochain bloc montant</strong>.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <ArrowRightLeft className="text-slate-500" />
              Mécanisme d'allocation dynamique (Voie Montante)
            </h4>
            
            {/* Info Panel for Radio Interface */}
            <div className="w-64 bg-white border border-slate-200 rounded-lg p-3 shadow-sm min-h-[80px]">
              {activeInfo ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                    <Info size={14} className="text-emerald-500" />
                    {activeInfo.title}
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">{activeInfo.desc}</p>
                </motion.div>
              ) : (
                <div className="text-xs text-slate-400 italic flex items-center gap-1 h-full">
                  <Info size={14} /> Survolez les éléments du schéma.
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-6">
            Puisque plusieurs mobiles partagent le même canal montant, le BSC (Base Station Controller) doit ordonnancer les transmissions pour éviter les collisions. C'est le rôle de l'USF.
          </p>

          <div className="relative pt-8 pb-4">
            {/* Downlink */}
            <div className="flex items-center mb-8">
              <div className="w-24 text-sm font-bold text-slate-700">Voie Descendante</div>
              <div className="flex-1 flex gap-2">
                <div 
                  className="flex-1 bg-white border-2 border-slate-300 rounded p-2 text-center relative cursor-help hover:border-orange-400 transition-colors"
                  onMouseEnter={() => handleHover('Bloc Descendant N', 'Le réseau envoie des données au MS 1. Dans l\'en-tête MAC de ce bloc, il inclut USF=3.')}
                  onMouseLeave={handleLeave}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-500">Bloc N</span>
                  <div className="text-xs font-mono bg-orange-100 text-orange-800 inline-block px-2 py-1 rounded mb-1 border border-orange-300">USF = 3</div>
                  <div className="text-xs text-slate-500">Data pour MS 1</div>
                </div>
                <div 
                  className="flex-1 bg-white border-2 border-slate-300 rounded p-2 text-center relative cursor-help hover:border-orange-400 transition-colors"
                  onMouseEnter={() => handleHover('Bloc Descendant N+1', 'Le réseau envoie des données au MS 2. Il inclut USF=7, ce qui libère le prochain bloc montant pour des requêtes aléatoires.')}
                  onMouseLeave={handleLeave}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-500">Bloc N+1</span>
                  <div className="text-xs font-mono bg-orange-100 text-orange-800 inline-block px-2 py-1 rounded mb-1 border border-orange-300">USF = 7</div>
                  <div className="text-xs text-slate-500">Data pour MS 2</div>
                </div>
                <div 
                  className="flex-1 bg-white border-2 border-slate-300 rounded p-2 text-center relative cursor-help hover:border-orange-400 transition-colors"
                  onMouseEnter={() => handleHover('Bloc Descendant N+2', 'Le réseau envoie à nouveau des données au MS 1, et autorise le mobile avec l\'USF 1 à émettre ensuite.')}
                  onMouseLeave={handleLeave}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-500">Bloc N+2</span>
                  <div className="text-xs font-mono bg-orange-100 text-orange-800 inline-block px-2 py-1 rounded mb-1 border border-orange-300">USF = 1</div>
                  <div className="text-xs text-slate-500">Data pour MS 1</div>
                </div>
              </div>
            </div>

            {/* Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
              <path d="M 250 80 L 400 130" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrow)" strokeDasharray="4 4"/>
              <path d="M 450 80 L 600 130" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrow)" strokeDasharray="4 4"/>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
                </marker>
              </defs>
            </svg>

            {/* Uplink */}
            <div className="flex items-center">
              <div className="w-24 text-sm font-bold text-slate-700">Voie Montante</div>
              <div className="flex-1 flex gap-2">
                <div className="flex-1 bg-slate-100 border-2 border-slate-200 rounded p-2 text-center opacity-50">
                  <div className="text-xs text-slate-400 mt-4">Bloc N</div>
                </div>
                <div 
                  className="flex-1 bg-emerald-50 border-2 border-emerald-400 rounded p-2 text-center shadow-sm cursor-help hover:bg-emerald-100 transition-colors"
                  onMouseEnter={() => handleHover('Émission MS 3', 'Le mobile qui s\'est vu attribuer l\'USF 3 (lors de l\'établissement de son TBF) a lu l\'USF=3 dans le bloc descendant précédent. Il a donc le droit exclusif d\'émettre ses données dans ce bloc montant.')}
                  onMouseLeave={handleLeave}
                >
                  <div className="text-xs font-bold text-emerald-700 mb-1">MS 3 émet</div>
                  <div className="text-xs text-emerald-600">(Autorisé par USF=3)</div>
                </div>
                <div 
                  className="flex-1 bg-purple-50 border-2 border-purple-400 rounded p-2 text-center shadow-sm cursor-help hover:bg-purple-100 transition-colors"
                  onMouseEnter={() => handleHover('Accès Aléatoire (PRACH)', 'L\'USF 7 dans le bloc descendant précédent indique que ce bloc montant est libre. N\'importe quel mobile voulant initier un transfert peut envoyer une requête (Packet Channel Request) ici. Il y a un risque de collision.')}
                  onMouseLeave={handleLeave}
                >
                  <div className="text-xs font-bold text-purple-700 mb-1">Accès Aléatoire</div>
                  <div className="text-xs text-purple-600">(Autorisé par USF=7) PRACH</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200">
            <strong>Règles de l'USF :</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>USF 1 à 6 :</strong> Le bloc montant suivant est réservé au mobile possédant cet USF.</li>
              <li><strong>USF = 7 :</strong> Le bloc montant suivant est laissé en accès aléatoire (PRACH) pour permettre aux nouveaux mobiles de faire une requête de canal.</li>
              <li><strong>USF = 0 :</strong> Réservé pour le polling (demande explicite d'acquittement par le réseau).</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Zap className="text-orange-500" />
          EDGE (2.75G) — Améliorations clés
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          EDGE (Enhanced Data Rates for GSM Evolution) apporte des améliorations ciblées sur la couche radio sans changer l'architecture réseau. Le PDF souligne deux innovations majeures :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
            <h4 className="font-bold text-orange-900 mb-2">Modulation & Codage Adaptatifs</h4>
            <p className="text-sm text-orange-800">
              Contrairement au GPRS où le taux de codage est fixé à l'échelle d'un flux, EDGE permet de faire évoluer <strong>dynamiquement</strong> le couple (modulation, codage) <strong>à l'échelle des trames</strong>. La station de base calcule en permanence la qualité de réception et ajuste ce couple en conséquence. Cela offre un meilleur débit avec moins de prudence dans les marges.
            </p>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
            <h4 className="font-bold text-purple-900 mb-2">Mini-blocs & Renumérotation</h4>
            <p className="text-sm text-purple-800">
              Le changement de modulation/codage pose un problème : le nombre de blocs nécessaires pour retransmettre une RLC-PDU change. EDGE résout cela en découpant les blocs en <strong>mini-blocs</strong> numérotés individuellement. Ainsi, un changement de couple codage/modulation modifie le nombre de blocs, mais la numérotation des mini-blocs reste cohérente.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
          <strong>⚠ Important :</strong> Les terminaux EDGE doivent être spécifiquement modifiés pour supporter ces nouvelles modulations. Un terminal GPRS classique ne peut pas utiliser EDGE.
        </div>
      </div>
    </motion.div>
  );
}
