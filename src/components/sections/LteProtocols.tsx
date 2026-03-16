import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Info, Activity, ShieldCheck, MousePointerClick, Smartphone, RadioTower, Server, Network, Globe, ArrowRightLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import NavigationButtons from '../NavigationButtons';

interface LayerInfo {
  title: string;
  desc: string;
  color: string;
  boxClass: string;
}

type LayerName = keyof typeof layerDetails;

type DiagramItem =
  | { kind: 'layer'; name: LayerName }
  | { kind: 'label'; text: string }
  | { kind: 'empty' };

type DiagramCell =
  | DiagramItem
  | { kind: 'split'; left: DiagramItem; right: DiagramItem };

interface DiagramNode {
  label: string;
  icon: LucideIcon;
  iconClass: string;
  rows: DiagramCell[];
  subtitle?: string;
  widthClass?: string;
}

const layerDetails = {
  NAS: { title: 'NAS (Non-Access Stratum)', desc: 'Signalisation entre l’UE et le MME : rattachement/détachement, mise à jour de localisation (TAU), sécurité et établissement des bearers EPS (sessions).', color: 'text-rose-400', boxClass: 'text-rose-300 border-rose-500/35 bg-rose-500/10' },
  RRC: { title: 'RRC (Radio Resource Control)', desc: 'Configure la connexion radio, diffuse les informations système et pilote les états radio.', color: 'text-orange-400', boxClass: 'text-orange-300 border-orange-500/35 bg-orange-500/10' },
  PDCP: { title: 'PDCP', desc: 'Présent dans les plans de données ET de contrôle. Compression d’en-tête (ROHC), chiffrement et protection de l’intégrité. En contrôle, chiffre et protège les messages RRC.', color: 'text-blue-400', boxClass: 'text-blue-300 border-blue-500/35 bg-blue-500/10' },
  RLC: { title: 'RLC', desc: 'Segmentation, réassemblage et retransmissions ARQ lorsque nécessaire.', color: 'text-purple-400', boxClass: 'text-purple-300 border-purple-500/35 bg-purple-500/10' },
  MAC: { title: 'MAC', desc: 'Ordonnancement radio, multiplexage logique et retransmissions HARQ rapides.', color: 'text-pink-400', boxClass: 'text-pink-300 border-pink-500/35 bg-pink-500/10' },
  L1: { title: 'L1 / PHY', desc: 'Couche physique radio ou terrestre selon le segment considéré.', color: 'text-emerald-400', boxClass: 'text-emerald-300 border-emerald-500/35 bg-emerald-500/10' },
  L2: { title: 'L2', desc: 'Couche de liaison terrestre, typiquement Ethernet ou équivalent dans le backbone.', color: 'text-slate-400', boxClass: 'text-slate-300 border-slate-600 bg-slate-800/60' },
  IP: { title: 'IP', desc: 'Couche réseau utilisée pour le transport des tunnels et, côté extrémité, du trafic utilisateur.', color: 'text-indigo-400', boxClass: 'text-indigo-300 border-indigo-500/35 bg-indigo-500/10' },
  'S1-AP': { title: 'S1-AP', desc: 'Protocole de signalisation entre eNodeB et MME sur l’interface S1-MME.', color: 'text-amber-400', boxClass: 'text-amber-300 border-amber-500/35 bg-amber-500/10' },
  SCTP: { title: 'SCTP (Stream Control Transmission Protocol)', desc: 'Créé par le groupe IETF SigTran. Fiable avec contrôle de congestion (comme TCP) mais orienté message (comme UDP, pas un flot d’octets). Idéal pour la signalisation qui nécessite peu de messages mais de manière fiable.', color: 'text-slate-300', boxClass: 'text-slate-200 border-slate-500 bg-slate-700/60' },
  'GTP-U': { title: 'GTP-U', desc: 'Encapsulation du trafic utilisateur dans des tunnels entre eNodeB, S-GW et P-GW.', color: 'text-cyan-400', boxClass: 'text-cyan-300 border-cyan-500/35 bg-cyan-500/10' },
  'UDP/IP': { title: 'UDP/IP', desc: 'Transport standard du tunnel GTP-U sur les interfaces S1-U et S5/S8.', color: 'text-slate-400', boxClass: 'text-slate-300 border-slate-600 bg-slate-800/60' },
  Application: { title: 'Application', desc: 'Point d’entrée du trafic utilisateur avant encapsulation IP et transport radio.', color: 'text-amber-300', boxClass: 'text-amber-200 border-amber-400/35 bg-amber-500/10' },
} satisfies Record<string, LayerInfo>;

const controlNodes: DiagramNode[] = [
  {
    label: 'UE',
    icon: Smartphone,
    iconClass: 'text-cyan-400',
    widthClass: 'w-[170px]',
    rows: [
      { kind: 'layer', name: 'NAS' },
      { kind: 'layer', name: 'RRC' },
      { kind: 'layer', name: 'PDCP' },
      { kind: 'layer', name: 'RLC' },
      { kind: 'layer', name: 'MAC' },
      { kind: 'layer', name: 'L1' },
    ],
  },
  {
    label: 'eNodeB',
    subtitle: 'Relais contrôle + terminaison radio',
    icon: RadioTower,
    iconClass: 'text-cyan-400',
    widthClass: 'w-[250px]',
    rows: [
      { kind: 'label', text: 'Relay' },
      { kind: 'split', left: { kind: 'layer', name: 'RRC' }, right: { kind: 'layer', name: 'S1-AP' } },
      { kind: 'split', left: { kind: 'layer', name: 'PDCP' }, right: { kind: 'layer', name: 'SCTP' } },
      { kind: 'split', left: { kind: 'layer', name: 'RLC' }, right: { kind: 'layer', name: 'IP' } },
      { kind: 'split', left: { kind: 'layer', name: 'MAC' }, right: { kind: 'layer', name: 'L2' } },
      { kind: 'split', left: { kind: 'layer', name: 'L1' }, right: { kind: 'layer', name: 'L1' } },
    ],
  },
  {
    label: 'MME',
    icon: Network,
    iconClass: 'text-orange-400',
    widthClass: 'w-[170px]',
    rows: [
      { kind: 'layer', name: 'NAS' },
      { kind: 'layer', name: 'S1-AP' },
      { kind: 'layer', name: 'SCTP' },
      { kind: 'layer', name: 'IP' },
      { kind: 'layer', name: 'L2' },
      { kind: 'layer', name: 'L1' },
    ],
  },
];

const userNodes: DiagramNode[] = [
  {
    label: 'UE',
    icon: Smartphone,
    iconClass: 'text-cyan-400',
    widthClass: 'w-[170px]',
    rows: [
      { kind: 'layer', name: 'Application' },
      { kind: 'layer', name: 'IP' },
      { kind: 'layer', name: 'PDCP' },
      { kind: 'layer', name: 'RLC' },
      { kind: 'layer', name: 'MAC' },
      { kind: 'layer', name: 'L1' },
    ],
  },
  {
    label: 'eNodeB',
    subtitle: 'Terminaison radio + encapsulation GTP-U',
    icon: RadioTower,
    iconClass: 'text-cyan-400',
    widthClass: 'w-[250px]',
    rows: [
      { kind: 'label', text: 'Relay' },
      { kind: 'split', left: { kind: 'layer', name: 'PDCP' }, right: { kind: 'layer', name: 'GTP-U' } },
      { kind: 'split', left: { kind: 'layer', name: 'RLC' }, right: { kind: 'layer', name: 'UDP/IP' } },
      { kind: 'split', left: { kind: 'layer', name: 'MAC' }, right: { kind: 'layer', name: 'L2' } },
      { kind: 'split', left: { kind: 'layer', name: 'L1' }, right: { kind: 'layer', name: 'L1' } },
      { kind: 'empty' },
    ],
  },
  {
    label: 'S-GW',
    subtitle: 'Relais de tunnel et ancrage local',
    icon: Server,
    iconClass: 'text-cyan-400',
    widthClass: 'w-[250px]',
    rows: [
      { kind: 'label', text: 'Relay' },
      { kind: 'split', left: { kind: 'layer', name: 'GTP-U' }, right: { kind: 'layer', name: 'GTP-U' } },
      { kind: 'split', left: { kind: 'layer', name: 'UDP/IP' }, right: { kind: 'layer', name: 'UDP/IP' } },
      { kind: 'split', left: { kind: 'layer', name: 'L2' }, right: { kind: 'layer', name: 'L2' } },
      { kind: 'split', left: { kind: 'layer', name: 'L1' }, right: { kind: 'layer', name: 'L1' } },
      { kind: 'empty' },
    ],
  },
  {
    label: 'P-GW',
    subtitle: 'Sortie vers le PDN',
    icon: Globe,
    iconClass: 'text-rose-400',
    widthClass: 'w-[200px]',
    rows: [
      { kind: 'empty' },
      { kind: 'layer', name: 'IP' },
      { kind: 'layer', name: 'GTP-U' },
      { kind: 'layer', name: 'UDP/IP' },
      { kind: 'layer', name: 'L2' },
      { kind: 'layer', name: 'L1' },
    ],
  },
];

const viewContent = {
  user: {
    title: 'Plan utilisateur',
    description: 'Le trafic IP traverse la pile radio jusqu’à l’eNodeB, puis circule dans des tunnels GTP-U entre eNodeB, S-GW et P-GW.',
    nodes: userNodes,
    links: ['LTE-Uu', 'S1-U', 'S5 / S8'],
  },
  control: {
    title: 'Plan de contrôle',
    description: 'La signalisation NAS/RRC est relayée par l’eNodeB vers le MME au-dessus de S1-AP et SCTP sur l’interface S1-MME.',
    nodes: controlNodes,
    links: ['LTE-Uu', 'S1-MME'],
  },
};

export default function LteProtocols({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [activeLayer, setActiveLayer] = useState<LayerName | null>(null);
  const [view, setView] = useState<'user' | 'control'>('user');

  const currentView = viewContent[view];
  const rowCount = currentView.nodes[0].rows.length;

  const renderItem = (item: DiagramItem) => {
    if (item.kind === 'empty') {
      return <div className="h-12" />;
    }

    if (item.kind === 'label') {
      return (
        <div className="h-12 rounded-xl border border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-center text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
          {item.text}
        </div>
      );
    }

    const layer = layerDetails[item.name];
    const isActive = activeLayer === item.name;

    return (
      <div
        onMouseEnter={() => setActiveLayer(item.name)}
        onMouseLeave={() => setActiveLayer(null)}
        className={`h-12 rounded-xl border flex items-center justify-center px-2 text-center font-mono text-[10px] font-bold cursor-help transition-all duration-200 ${layer.boxClass} ${
          isActive ? 'scale-[1.03] shadow-lg shadow-cyan-500/10 border-white/40' : 'hover:scale-[1.01]'
        }`}
      >
        {item.name}
      </div>
    );
  };

  const renderCell = (cell: DiagramCell) => {
    if ('kind' in cell && cell.kind !== 'split') {
      return renderItem(cell);
    }

    return (
      <div className="grid grid-cols-2 gap-2">
        {renderItem(cell.left)}
        {renderItem(cell.right)}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-4">
            <Layers size={16} />
            Architecture LTE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Piles protocolaires LTE</h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed max-w-3xl">
            Cette vue reprend la séparation fondamentale du LTE entre <strong>plan utilisateur</strong> et <strong>plan de contrôle</strong>, avec un eNodeB qui termine la radio puis relaie vers l’EPC.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setView('user')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              view === 'user' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Activity size={16} />
            Plan utilisateur
          </button>
          <button
            onClick={() => setView('control')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              view === 'control' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldCheck size={16} />
            Plan de contrôle
          </button>
        </div>
      </header>

      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="bg-slate-800/50 border-b border-slate-700 p-6 min-h-[128px] flex items-start gap-4">
          <div className="p-3 bg-slate-700 rounded-2xl text-cyan-400 shadow-inner">
            <Info size={24} />
          </div>
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className={`text-xl font-bold ${layerDetails[activeLayer].color}`}>
                    {layerDetails[activeLayer].title}
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    {layerDetails[activeLayer].desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={view}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 flex items-start gap-3"
                >
                  <MousePointerClick size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">{currentView.title}</p>
                    <p className="mt-1 text-slate-400 leading-relaxed">{currentView.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-8 overflow-x-auto">
          <div className="min-w-[980px] flex items-start justify-start gap-4">
            {currentView.nodes.map((node, index) => {
              const Icon = node.icon;

              return (
                <React.Fragment key={node.label}>
                  <div className={`${node.widthClass ?? 'w-[180px]'} shrink-0`}>
                    <div className="h-20 rounded-2xl border border-slate-700 bg-slate-800 flex flex-col items-center justify-center text-slate-100 shadow-lg">
                      <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                        <Icon size={18} className={node.iconClass} />
                        {node.label}
                      </div>
                      {node.subtitle && (
                        <p className="mt-2 px-3 text-center text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          {node.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 space-y-2 rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                      {node.rows.map((cell, cellIndex) => (
                        <div key={`${node.label}-${cellIndex}`}>{renderCell(cell)}</div>
                      ))}
                    </div>
                  </div>

                  {index < currentView.links.length && (
                    <div className="w-16 shrink-0 flex flex-col items-center">
                      <div className="h-20 flex items-center justify-center text-slate-500">
                        <ArrowRightLeft size={18} />
                      </div>
                      <div className="mt-3 relative flex items-center justify-center" style={{ minHeight: `${rowCount * 56}px` }}>
                        <div className="absolute inset-y-0 w-px bg-slate-700" />
                        <div className="relative z-10 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700 shadow-lg">
                          <span className="block rotate-90 whitespace-nowrap text-[10px] font-mono font-bold text-slate-400">
                            {currentView.links[index]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="text-rose-600" size={20} />
            NAS côté contrôle
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>NAS</strong> ne traverse pas l'eNodeB en interprétation métier : il est relayé jusqu'au <strong>MME</strong>, qui gère mobilité, authentification et gestion de session.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Network className="text-amber-600" size={20} />
            S1-AP + SCTP
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            La signalisation entre <strong>eNodeB</strong> et <strong>MME</strong> repose sur <strong>S1-AP</strong>, transporté par <strong>SCTP</strong> puis IP, ce qui sépare nettement la signalisation du trafic utilisateur.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Activity className="text-cyan-600" size={20} />
            GTP-U côté données
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            En <strong>plan utilisateur</strong>, le paquet IP est encapsulé dans <strong>GTP-U</strong>, relayé par le <strong>S-GW</strong>, puis remis au <strong>P-GW</strong> avant la sortie vers Internet.
          </p>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
