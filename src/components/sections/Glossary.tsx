import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Book, Info, Tag } from 'lucide-react';

const glossaryData = [
  { term: "MS", full: "Mobile Station", gen: "2G/2.5G", desc: "Le terminal de l'utilisateur (téléphone + carte SIM)." },
  { term: "BTS", full: "Base Transceiver Station", gen: "2G/2.5G", desc: "L'antenne relais qui gère la transmission radio avec le mobile." },
  { term: "BSC", full: "Base Station Controller", gen: "2G/2.5G", desc: "Contrôleur de plusieurs BTS. Gère l'allocation des ressources radio." },
  { term: "SGSN", full: "Serving GPRS Support Node", gen: "2.5G/3G", desc: "Gère la mobilité, l'authentification et le relais des paquets (via tunnels GTP) dans sa zone." },
  { term: "GGSN", full: "Gateway GPRS Support Node", gen: "2.5G/3G", desc: "Passerelle vers les réseaux IP externes (Internet). Attribue les adresses IP." },
  { term: "PCU", full: "Packet Control Unit", desc: "Ajout matériel au BSC pour séparer le trafic paquet du trafic circuit." },
  { term: "UE", full: "User Equipment", gen: "3G/4G", desc: "Le terminal mobile de l'utilisateur (remplace le terme MS)." },
  { term: "Node B", full: "Node B", gen: "3G", desc: "La station de base UMTS (équivalent de la BTS)." },
  { term: "RNC", full: "Radio Network Controller", gen: "3G", desc: "Le contrôleur de l'UTRAN (équivalent du BSC). Gère la macro-diversité." },
  { term: "UTRAN", full: "UMTS Terrestrial Radio Access Network", gen: "3G", desc: "L'ensemble du réseau d'accès radio UMTS (Node B + RNC)." },
  { term: "eNodeB", full: "Evolved Node B", gen: "4G", desc: "La station de base LTE. Fusionne les fonctions du Node B et du RNC." },
  { term: "EPC", full: "Evolved Packet Core", gen: "4G", desc: "Le cœur de réseau LTE, entièrement basé sur IP." },
  { term: "MME", full: "Mobility Management Entity", gen: "4G", desc: "Le cerveau du plan de contrôle dans l'EPC. Gère la signalisation." },
  { term: "S-GW", full: "Serving Gateway", gen: "4G", desc: "Passerelle de service du plan de données. Point d'ancrage local." },
  { term: "P-GW", full: "PDN Gateway", gen: "4G", desc: "Passerelle vers les réseaux externes (Internet, IMS)." },
  { term: "HSS", full: "Home Subscriber Server", gen: "4G", desc: "Base de données centrale des abonnés (évolution du HLR)." },
  { term: "HLR", full: "Home Location Register", gen: "2G/3G", desc: "Base de données centrale contenant les profils des abonnés." },
  { term: "GTP", full: "GPRS Tunneling Protocol", desc: "Protocole utilisé pour transporter les paquets IP à travers le réseau mobile." },
  { term: "PDCP", full: "Packet Data Convergence Protocol", desc: "Compression d'en-tête (ROHC), chiffrement et protection d'intégrité. Présent dans les plans utilisateur et contrôle." },
  { term: "RLC", full: "Radio Link Control", desc: "Gère la segmentation, le réassemblage et la retransmission (ARQ)." },
  { term: "MAC", full: "Medium Access Control", desc: "Gère l'accès au canal radio et les priorités entre les flux." },
  { term: "W-CDMA", full: "Wideband Code Division Multiple Access", gen: "3G", desc: "Technologie radio de l'UMTS utilisant des codes pour séparer les utilisateurs." },
  { term: "OFDMA", full: "Orthogonal Frequency Division Multiple Access", gen: "4G", desc: "Technologie radio du LTE (Lien Descendant) utilisant des sous-porteuses orthogonales." },
  { term: "SC-FDMA", full: "Single Carrier Frequency Division Multiple Access", gen: "4G", desc: "Technologie radio du LTE (Lien Montant) optimisée pour l'autonomie du mobile." },
  { term: "QoS", full: "Quality of Service", desc: "Capacité du réseau à garantir un niveau de performance à un flux (débit, délai, gigue)." },
  { term: "Bearer", full: "Bearer", desc: "Un 'tuyau' virtuel avec des caractéristiques de QoS définies." },
  { term: "VoLTE", full: "Voice over LTE", gen: "4G", desc: "Transport de la voix en mode paquet (IP) sur le réseau LTE." },
  { term: "CSFB", full: "Circuit Switched Fallback", gen: "4G", desc: "Mécanisme permettant de basculer sur la 2G/3G pour un appel vocal." }
];

import NavigationButtons from '../NavigationButtons';

export default function Glossary({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [search, setSearch] = useState("");

  const filteredGlossary = glossaryData.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) || 
    item.full.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-4">
          <Book size={16} />
          Lexique Technique
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Glossaire des Acronymes</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Le monde des télécoms est rempli d'acronymes. Voici un guide complet pour ne plus jamais être perdu.
        </p>
      </header>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-slate-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Rechercher un terme, un acronyme ou une définition..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGlossary.map((item, idx) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.02 }}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{item.term}</h3>
              {item.gen && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                  {item.gen}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-tight">{item.full}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {filteredGlossary.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <Info className="mx-auto text-slate-300 mb-3" size={48} />
          <p className="text-slate-500">Aucun terme ne correspond à votre recherche.</p>
        </div>
      )}

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
