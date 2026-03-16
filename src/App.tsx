import React, { useState, useEffect } from 'react';
import { BookOpen, Radio, Network, Layers, Activity, PlayCircle, Signal, Globe, Cpu, Settings, ArrowRightLeft, Zap, ShieldCheck, ArrowLeftRight, GitCompare, HelpCircle, Flag, ChevronUp, Info, Phone, Menu, X } from 'lucide-react';
import Intro from './components/sections/Intro';
import GsmVsGprs from './components/sections/GsmVsGprs';
import Architecture from './components/sections/Architecture';
import ProtocolStack from './components/sections/ProtocolStack';
import ControlPlane from './components/sections/ControlPlane';
import PdpContext from './components/sections/PdpContext';
import RadioInterface from './components/sections/RadioInterface';
import AnimationDemo from './components/sections/AnimationDemo';
import UmtsIntro from './components/sections/UmtsIntro';
import UmtsArchitecture from './components/sections/UmtsArchitecture';
import UmtsProtocols from './components/sections/UmtsProtocols';
import UmtsDataFlow from './components/sections/UmtsDataFlow';
import LteIntro from './components/sections/LteIntro';
import LteArchitecture from './components/sections/LteArchitecture';
import LteProtocols from './components/sections/LteProtocols';
import LteUserPlane from './components/sections/LteUserPlane';
import LtePhyMac from './components/sections/LtePhyMac';
import LteMobility from './components/sections/LteMobility';
import FiveGIntro from './components/sections/FiveGIntro';
import VoLteIms from './components/sections/VoLteIms';
import NetworkSecurity from './components/sections/NetworkSecurity';
import CallFlows from './components/sections/CallFlows';
import PerformanceCharts from './components/sections/PerformanceCharts';
import IotFocus from './components/sections/IotFocus';
import Conclusion from './components/sections/Conclusion';
import EvolutionSummary from './components/sections/EvolutionSummary';
import Glossary from './components/sections/Glossary';
import Quiz from './components/sections/Quiz';
import SelectionHelper from './components/tools/SelectionHelper';
import NoteSystem from './components/tools/NoteSystem';

const sectionGroups = [
  {
    label: "Général",
    items: [
      { id: 'intro', title: 'Accueil & Introduction', icon: BookOpen, component: Intro },
      { id: 'summary', title: 'Synthèse des Évolutions', icon: GitCompare, component: EvolutionSummary },
      { id: 'charts', title: 'Comparaison des Performances', icon: Activity, component: PerformanceCharts },
    ]
  },
  {
    label: "GPRS (2.5G)",
    items: [
      { id: 'gsm-gprs', title: 'GSM vs GPRS', icon: Radio, component: GsmVsGprs },
      { id: 'architecture', title: 'Architecture GPRS', icon: Network, component: Architecture },
      { id: 'protocols', title: 'Piles Protocolaires', icon: Layers, component: ProtocolStack },
      { id: 'control-plane', title: 'Plan de Contrôle', icon: Settings, component: ControlPlane },
      { id: 'pdp', title: 'Mobilité & Contexte PDP', icon: Activity, component: PdpContext },
      { id: 'radio', title: 'Interface Radio', icon: Signal, component: RadioInterface },
      { id: 'demo', title: 'Démonstration Animée', icon: PlayCircle, component: AnimationDemo },
    ]
  },
  {
    label: "UMTS (3G)",
    items: [
      { id: 'umts-intro', title: 'Introduction UMTS', icon: Globe, component: UmtsIntro },
      { id: 'umts-arch', title: 'Architecture UMTS', icon: Network, component: UmtsArchitecture },
      { id: 'umts-proto', title: 'Protocoles UMTS', icon: Cpu, component: UmtsProtocols },
      { id: 'umts-data', title: 'Flux de Données', icon: ArrowRightLeft, component: UmtsDataFlow },
    ]
  },
  {
    label: "LTE (4G)",
    items: [
      { id: 'lte-intro', title: 'Introduction LTE', icon: Zap, component: LteIntro },
      { id: 'lte-arch', title: 'Architecture EPC', icon: Network, component: LteArchitecture },
      { id: 'lte-proto', title: 'Protocoles LTE', icon: Layers, component: LteProtocols },
      { id: 'lte-user-plane', title: 'Plan Utilisateur LTE', icon: Activity, component: LteUserPlane },
      { id: 'lte-phy', title: 'Couche PHY & QoS', icon: ShieldCheck, component: LtePhyMac },
      { id: 'lte-mob', title: 'Mobilité & Évolutions', icon: ArrowLeftRight, component: LteMobility },
    ]
  },
  {
    label: "Avancé & Futur",
    items: [
      { id: '5g', title: 'Le Futur : 5G NR', icon: Zap, component: FiveGIntro },
      { id: 'volte', title: 'VoLTE & IMS', icon: Phone, component: VoLteIms },
      { id: 'security', title: 'Sécurité Réseau', icon: ShieldCheck, component: NetworkSecurity },
      { id: 'flows', title: 'Flux de Signalisation', icon: PlayCircle, component: CallFlows },
      { id: 'iot', title: 'Focus sur l\'IoT', icon: Cpu, component: IotFocus },
      { id: 'conclusion', title: 'Conclusion', icon: Flag, component: Conclusion },
    ]
  },
  {
    label: "Outils & Quiz",
    items: [
      { id: 'glossary', title: 'Glossaire Technique', icon: BookOpen, component: Glossary },
      { id: 'quiz', title: 'Test de Connaissances', icon: HelpCircle, component: Quiz },
    ]
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const mainElement = document.getElementById('main-content');
    const handleScroll = () => {
      if (mainElement) {
        setShowScrollTop(mainElement.scrollTop > 400);
      }
    };
    mainElement?.addEventListener('scroll', handleScroll);
    return () => mainElement?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const mainElement = document.getElementById('main-content');
    mainElement?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allSections = sectionGroups.flatMap(g => g.items);
  const currentIndex = allSections.findIndex(s => s.id === activeSection);
  
  const handleNext = () => {
    if (currentIndex < allSections.length - 1) {
      setActiveSection(allSections[currentIndex + 1].id);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSection(allSections[currentIndex - 1].id);
      scrollToTop();
    }
  };

  const ActiveComponent = (allSections[currentIndex]?.component || Intro) as React.ComponentType<any>;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 bg-slate-950 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400 tracking-tight">Réseaux Mobiles</h1>
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wider font-semibold">GPRS / UMTS / LTE</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
          {sectionGroups.map((group, gIdx) => (
            <div key={gIdx} className="mb-6">
              <h3 className="px-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                {group.label}
              </h3>
              <ul className="space-y-1 px-3">
                {group.items.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          scrollToTop();
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-left ${
                          isActive 
                            ? 'bg-emerald-500/10 text-emerald-400 font-medium' 
                            : 'hover:bg-slate-800 hover:text-slate-100'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-slate-500'} />
                        <span className="text-sm">{section.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-4 text-xs text-slate-600 border-t border-slate-800 text-center">
          v2.5 - Plateforme d'Apprentissage
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth w-full">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 flex items-center gap-3 shadow-lg lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-bold text-emerald-400 tracking-tight">Réseaux Mobiles</h1>
        </div>
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-12">
          <ActiveComponent 
            onNext={currentIndex < allSections.length - 1 ? handleNext : undefined}
            onPrev={currentIndex > 0 ? handlePrev : undefined}
            nextLabel={currentIndex < allSections.length - 1 ? allSections[currentIndex + 1].title : undefined}
            prevLabel={currentIndex > 0 ? allSections[currentIndex - 1].title : undefined}
          />
        </div>

        {/* Floating Back to Top */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-4 bg-white border border-slate-200 rounded-2xl shadow-xl text-slate-600 hover:text-slate-900 transition-all duration-300 z-50 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
        >
          <ChevronUp size={24} />
        </button>
      </main>

      {/* Global Tools */}
      <SelectionHelper />
      <NoteSystem />
    </div>
  );
}
