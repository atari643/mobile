import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, BrainCircuit, HelpCircle, Info } from 'lucide-react';

const quizQuestions = [
  {
    question: "Quel équipement est introduit en GPRS pour gérer le trafic paquet au niveau du BSC ?",
    options: ["SGSN", "GGSN", "PCU", "HLR"],
    answer: 2,
    explanation: "Le PCU (Packet Control Unit) est l'ajout matériel/logiciel au BSC qui permet de séparer le trafic circuit (GSM) du trafic paquet (GPRS)."
  },
  {
    question: "Quelle interface relie le Node B au RNC en UMTS ?",
    options: ["Uu", "Iub", "Iu-PS", "Gn"],
    answer: 1,
    explanation: "L'interface Iub relie le Node B au RNC. Elle transporte les données utilisateur et la signalisation (NBAP)."
  },
  {
    question: "En LTE, quel équipement gère uniquement le plan de contrôle (signalisation) ?",
    options: ["S-GW", "P-GW", "MME", "eNodeB"],
    answer: 2,
    explanation: "Le MME (Mobility Management Entity) est le cerveau du plan de contrôle dans l'EPC. Il ne traite aucune donnée utilisateur."
  },
  {
    question: "Quelle technologie radio est utilisée pour le lien montant (UL) en LTE ?",
    options: ["OFDMA", "CDMA", "SC-FDMA", "TDMA"],
    answer: 2,
    explanation: "Le SC-FDMA (Single Carrier FDMA) est utilisé en UL pour réduire le PAPR et ainsi économiser la batterie du terminal mobile."
  },
  {
    question: "Quel est l'objectif principal de l'interface X2 en LTE ?",
    options: ["Relier l'eNodeB au MME", "Gérer les handovers rapides entre eNodeBs", "Connecter le P-GW à Internet", "Authentifier les abonnés"],
    answer: 1,
    explanation: "L'interface X2 permet aux eNodeBs de communiquer directement entre eux pour préparer et exécuter les handovers sans passer par le cœur de réseau."
  },
  {
    question: "Quelle classe de QoS UMTS est la plus exigeante en termes de délai ?",
    options: ["Streaming", "Interactive", "Background", "Conversationnelle"],
    answer: 3,
    explanation: "La classe Conversationnelle (ex: VoIP) est la plus exigeante, nécessitant un délai très faible (< 100ms) et une gigue minimale."
  },
  {
    question: "Que signifie l'acronyme EPC en LTE ?",
    options: ["Evolved Packet Core", "Enhanced Packet Controller", "E-UTRAN Packet Center", "Evolved Protocol Carrier"],
    answer: 0,
    explanation: "EPC signifie Evolved Packet Core. C'est le cœur de réseau LTE, entièrement basé sur IP."
  }
];

import NavigationButtons from '../NavigationButtons';

export default function Quiz({ onNext, onPrev, nextLabel, prevLabel }: { onNext?: () => void, onPrev?: () => void, nextLabel?: string, prevLabel?: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === quizQuestions[currentQuestion].answer) {
      setScore(s => s + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center max-w-2xl mx-auto"
      >
        <Trophy className="mx-auto text-amber-500 mb-6" size={80} />
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Quiz Terminé !</h2>
        <p className="text-xl text-slate-600 mb-8">Votre score : <span className="font-bold text-rose-600">{score} / {quizQuestions.length}</span></p>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 text-left">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BrainCircuit className="text-rose-500" size={20} />
            Analyse de votre performance
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {score === quizQuestions.length ? "Parfait ! Vous maîtrisez parfaitement l'architecture des réseaux mobiles." :
             score >= quizQuestions.length / 2 ? "Pas mal ! Vous avez de bonnes bases, mais quelques révisions sur les interfaces et protocoles pourraient être utiles." :
             "Il semble que vous ayez encore quelques lacunes. N'hésitez pas à relire les sections sur l'UMTS et le LTE."}
          </p>
        </div>

        <button
          onClick={restartQuiz}
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
        >
          <RotateCcw size={20} />
          Recommencer le Quiz
        </button>
      </motion.div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-4">
          <HelpCircle size={16} />
          Auto-Évaluation
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Testez vos connaissances</h2>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-slate-400">Question {currentQuestion + 1} / {quizQuestions.length}</span>
        </div>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-2xl font-bold text-slate-900 leading-snug">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === q.answer;
            const isWrong = isSelected && !isCorrect;

            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleOptionSelect(idx)}
                className={`
                  w-full p-5 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between
                  ${selectedOption === null ? 'bg-white border-slate-100 hover:border-slate-900 hover:bg-slate-50' : 
                    isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900' :
                    isWrong ? 'bg-rose-50 border-rose-500 text-rose-900' :
                    'bg-slate-50 border-slate-100 opacity-50'}
                `}
              >
                <span>{option}</span>
                {selectedOption !== null && isCorrect && <CheckCircle2 className="text-emerald-500" size={24} />}
                {selectedOption !== null && isWrong && <XCircle className="text-rose-500" size={24} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-slate-900 p-6 rounded-2xl text-white space-y-4"
            >
              <div className="flex items-start gap-3">
                <Info className="text-rose-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-rose-400 mb-1">Explication</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Voir les résultats" : "Question suivante"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NavigationButtons onNext={onNext} onPrev={onPrev} nextLabel={nextLabel} prevLabel={prevLabel} />
    </motion.div>
  );
}
