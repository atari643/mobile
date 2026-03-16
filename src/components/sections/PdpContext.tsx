import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, ShieldCheck, Route, Info } from 'lucide-react';

export default function PdpContext() {
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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Mobilité & Contexte PDP</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Pour qu'un mobile puisse envoyer ou recevoir des données, il doit d'abord s'attacher au réseau GPRS, puis activer un "Contexte PDP" (Packet Data Protocol). C'est le cœur de la session de données.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">1. Gestion de la Mobilité (GMM)</h3>
          <p className="text-sm text-slate-600 mb-4">
            Le mobile possède 3 états de mobilité distincts :
          </p>
          <ul className="text-sm text-slate-600 space-y-3">
            <li className="flex gap-2">
              <span className="font-bold text-slate-800 w-20">IDLE :</span>
              <span>Repos. Le mobile n'est pas attaché au réseau GPRS.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600 w-20">READY :</span>
              <span>Prêt à transmettre. Le mobile est repéré à la <strong>cellule près</strong>. S'active lors d'un transfert de données.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-orange-600 w-20">STANDBY :</span>
              <span>Surveillance. Le mobile est repéré à la <strong>Zone de Routage (Routing Area) près</strong>. Nécessite un "Paging" pour le localiser précisément avant de transmettre.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl lg:col-span-2 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30">
            <Database size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">2. Activation du Contexte PDP</h3>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            C'est l'étape cruciale pour accéder à Internet. Le contexte PDP est une structure de données présente dans le MS, le SGSN et le GGSN, qui contient les informations de session.
          </p>
          
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h4 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">Contenu d'un Contexte PDP</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Type PDP</span>
                <span className="font-mono">IPv4 / IPv6 / X.25</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Adresse PDP</span>
                <span className="font-mono text-blue-300">10.0.0.42 (IP allouée)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">APN (Access Point Name)</span>
                <span className="font-mono text-orange-300">internet.operateur.com</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">QoS Profile</span>
                <span className="font-mono">Best Effort, Delay class...</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">NSAPI</span>
                <span className="font-mono text-pink-300">Point d'accès SNDCP</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
            <p className="text-sm text-orange-300">
              <strong className="text-orange-400">⚠ Limitation GPRS :</strong> Un seul contexte PDP actif à la fois, et donc un seul niveau de QoS par utilisateur.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Route className="text-emerald-600" />
            Séquence d'Activation (Call Flow)
          </h3>
          
          {/* Info Panel for Call Flow */}
          <div className="w-64 bg-slate-50 border border-slate-200 rounded-lg p-3 shadow-sm min-h-[80px]">
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
                <Info size={14} /> Survolez les étapes du Call Flow.
              </div>
            )}
          </div>
        </div>
        
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
          <div 
            className="relative cursor-help group"
            onMouseEnter={() => handleHover('Étape 1: Requête MS -> SGSN', 'Le mobile initie la demande. Il spécifie l\'APN (Access Point Name) auquel il veut se connecter, le type de PDP (IPv4/IPv6) et la qualité de service (QoS) désirée.')}
            onMouseLeave={handleLeave}
          >
            <div className="absolute -left-[25px] bg-white border-2 border-emerald-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-emerald-600 group-hover:bg-emerald-50 transition-colors">1</div>
            <div className="pl-8 group-hover:bg-slate-50 p-2 rounded-lg transition-colors -ml-2">
              <h4 className="font-bold text-slate-800">Activate PDP Context Request</h4>
              <p className="text-sm text-slate-600 mt-1">Le Mobile envoie la requête au SGSN en spécifiant l'APN souhaité (ex: "internet").</p>
            </div>
          </div>
          
          <div 
            className="relative cursor-help group"
            onMouseEnter={() => handleHover('Étape 2: Résolution DNS', 'Le SGSN doit trouver l\'adresse IP du GGSN qui gère l\'APN demandé. Il interroge un serveur DNS interne à l\'opérateur.')}
            onMouseLeave={handleLeave}
          >
            <div className="absolute -left-[25px] bg-white border-2 border-emerald-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-emerald-600 group-hover:bg-emerald-50 transition-colors">2</div>
            <div className="pl-8 group-hover:bg-slate-50 p-2 rounded-lg transition-colors -ml-2">
              <h4 className="font-bold text-slate-800">DNS Query</h4>
              <p className="text-sm text-slate-600 mt-1">Le SGSN interroge un serveur DNS interne pour résoudre l'APN en adresse IP du GGSN correspondant.</p>
            </div>
          </div>

          <div 
            className="relative cursor-help group"
            onMouseEnter={() => handleHover('Étape 3: Création du Tunnel (SGSN -> GGSN)', 'Le SGSN envoie une requête de création de contexte au GGSN via le protocole GTP-C (Control plane). Il transmet les infos du mobile (IMSI, QoS demandée).')}
            onMouseLeave={handleLeave}
          >
            <div className="absolute -left-[25px] bg-white border-2 border-emerald-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-emerald-600 group-hover:bg-emerald-50 transition-colors">3</div>
            <div className="pl-8 group-hover:bg-slate-50 p-2 rounded-lg transition-colors -ml-2">
              <h4 className="font-bold text-slate-800">Create PDP Context Request</h4>
              <p className="text-sm text-slate-600 mt-1">Le SGSN envoie une requête GTP-C au GGSN pour créer le tunnel.</p>
            </div>
          </div>

          <div 
            className="relative cursor-help group"
            onMouseEnter={() => handleHover('Étape 4: Allocation IP & Tunnel (GGSN -> SGSN)', 'Le GGSN valide la requête, alloue une adresse IP dynamique au mobile, crée son extrémité du tunnel GTP-U et renvoie les infos (dont le TEID) au SGSN.')}
            onMouseLeave={handleLeave}
          >
            <div className="absolute -left-[25px] bg-white border-2 border-emerald-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-emerald-600 group-hover:bg-emerald-50 transition-colors">4</div>
            <div className="pl-8 group-hover:bg-slate-50 p-2 rounded-lg transition-colors -ml-2">
              <h4 className="font-bold text-slate-800">Allocation IP & Réponse</h4>
              <p className="text-sm text-slate-600 mt-1">Le GGSN alloue une adresse IP (souvent via un pool DHCP interne ou Radius), crée le contexte et répond au SGSN avec le TEID (Tunnel Endpoint Identifier).</p>
            </div>
          </div>

          <div 
            className="relative cursor-help group"
            onMouseEnter={() => handleHover('Étape 5: Acceptation (SGSN -> MS)', 'Le SGSN finalise la création du tunnel de son côté et informe le mobile que le contexte PDP est activé. Le mobile reçoit son adresse IP et peut commencer à émettre des paquets IP.')}
            onMouseLeave={handleLeave}
          >
            <div className="absolute -left-[25px] bg-white border-2 border-emerald-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-emerald-600 group-hover:bg-emerald-50 transition-colors">5</div>
            <div className="pl-8 group-hover:bg-slate-50 p-2 rounded-lg transition-colors -ml-2">
              <h4 className="font-bold text-slate-800">Activate PDP Context Accept</h4>
              <p className="text-sm text-slate-600 mt-1">Le SGSN confirme au Mobile. Le tunnel GTP est établi. Le mobile peut maintenant naviguer sur Internet !</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
