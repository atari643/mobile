import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StickyNote, Plus, Trash2, FileText, Sparkles, Loader2, X, ChevronRight, ChevronLeft, Download, Book, Edit2, Check, GripVertical, Maximize2, Minimize2, BrainCircuit, HelpCircle, Tag } from 'lucide-react';
import { summarizeNotes, generateFlashcards, generateQuiz, generateTags, NoteItem } from '../../services/geminiService';
import Markdown from 'react-markdown';

export default function NoteSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoadingIdx, setAiLoadingIdx] = useState<number | null>(null);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Drag & Drop State
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Study Modal State
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [studyMode, setStudyMode] = useState<'sheet' | 'flashcards' | 'quiz'>('sheet');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Data States
  const [studySheet, setStudySheet] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any[]>([]);

  // Flashcards UI State
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz UI State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('mobile_network_notes_v2');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Migration from old string[] format
      const oldNotes = localStorage.getItem('mobile_network_notes');
      if (oldNotes) {
        const parsed = JSON.parse(oldNotes);
        if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
          setNotes(parsed.map((text, i) => ({ id: Date.now().toString() + i, text, context: 'Général' })));
        }
      }
    }

    const handleAddNote = (e: any) => {
      const payload = e.detail;
      if (payload) {
        const text = typeof payload === 'string' ? payload : payload.text;
        const context = typeof payload === 'string' ? 'Général' : payload.context;
        setNotes(prev => [...prev, { id: Date.now().toString(), text, context }]);
        setIsOpen(true);
      }
    };

    window.addEventListener('add-note', handleAddNote);
    return () => window.removeEventListener('add-note', handleAddNote);
  }, []);

  useEffect(() => {
    localStorage.setItem('mobile_network_notes_v2', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now().toString(), text: newNote.trim(), context: 'Note manuelle' }]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const startEdit = (note: NoteItem) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    setNotes(notes.map(n => n.id === editingId ? { ...n, text: editText } : n));
    setEditingId(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    
    const newNotes = [...notes];
    const draggedNote = newNotes[draggedIdx];
    newNotes.splice(draggedIdx, 1);
    newNotes.splice(index, 0, draggedNote);
    
    setDraggedIdx(index);
    setNotes(newNotes);
  };

  const handleDrop = () => {
    setDraggedIdx(null);
  };

  const askGeminiAboutNote = async (index: number, action: 'define' | 'expand' | 'tags') => {
    const note = notes[index];
    setAiLoadingIdx(index);
    try {
      if (action === 'tags') {
        const tags = await generateTags(note);
        setNotes(notes.map((n, i) => i === index ? { ...n, tags: [...(n.tags || []), ...tags] } : n));
      } else {
        const prompt = action === 'define' 
          ? `Donne une définition précise et technique de : "${note.text}" dans le contexte : ${note.context}`
          : `Explique plus en détail et donne des exemples pour ce concept : "${note.text}" dans le contexte : ${note.context}`;
        
        const result = await summarizeNotes([{ id: 'temp', text: prompt, context: 'Général' }]);
        setStudySheet(result);
        setStudyMode('sheet');
        setShowStudyModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoadingIdx(null);
    }
  };

  const generateStudyMaterial = async (mode: 'sheet' | 'flashcards' | 'quiz') => {
    if (notes.length === 0) return;
    setLoading(true);
    setStudyMode(mode);
    setShowStudyModal(true);
    
    try {
      if (mode === 'sheet') {
        const result = await summarizeNotes(notes);
        setStudySheet(result);
      } else if (mode === 'flashcards') {
        const result = await generateFlashcards(notes);
        setFlashcards(result);
        setCurrentCard(0);
        setIsFlipped(false);
      } else if (mode === 'quiz') {
        const result = await generateQuiz(notes);
        setQuiz(result);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setQuizFinished(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-slate-900 text-white rounded-l-2xl shadow-2xl transition-all duration-300 hover:pr-6 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className="flex flex-col items-center gap-2">
          <StickyNote size={20} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase vertical-text tracking-widest">Notes</span>
        </div>
      </button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 md:w-96 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[60] flex flex-col border-l border-slate-200"
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <StickyNote size={20} className="text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg">Mes Notes</h3>
              </div>
              <div className="flex items-center gap-2">
                {notes.length > 0 && (
                  <button 
                    onClick={() => { if(confirm('Effacer toutes les notes ?')) setNotes([]); }}
                    className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                    title="Tout effacer"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
              {/* Add Note Input */}
              <div className="space-y-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Prendre une note..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none h-24"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addNote();
                    }
                  }}
                />
                <button
                  onClick={addNote}
                  disabled={!newNote.trim()}
                  className="w-full py-2 bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Plus size={16} />
                  Ajouter
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notes récentes</h4>
                {notes.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm italic">
                    Aucune note pour le moment.
                  </div>
                ) : (
                  notes.map((note, idx) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      draggable
                      onDragStart={(e: any) => handleDragStart(e, idx)}
                      onDragOver={(e: any) => handleDragOver(e, idx)}
                      onDrop={handleDrop}
                      className={`group p-4 bg-slate-50 border rounded-xl relative transition-all ${draggedIdx === idx ? 'border-emerald-500 shadow-md opacity-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab text-slate-300 hover:text-slate-500 transition-opacity">
                        <GripVertical size={14} />
                      </div>
                      <div className="pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{note.context}</span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(note)} className="p-1 text-slate-400 hover:text-blue-500"><Edit2 size={14} /></button>
                            <button onClick={() => deleteNote(note.id)} className="p-1 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        
                        {editingId === note.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                              rows={3}
                            />
                            <div className="flex justify-end">
                              <button onClick={saveEdit} className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-emerald-600">
                                <Check size={12} /> Enregistrer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-slate-700 mb-3">{note.text}</p>
                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {note.tags.map((tag, i) => (
                                  <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all flex-wrap">
                              <button
                                onClick={() => askGeminiAboutNote(idx, 'define')}
                                disabled={aiLoadingIdx !== null}
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-500 hover:text-emerald-600 hover:border-emerald-200 flex items-center gap-1"
                              >
                                {aiLoadingIdx === idx && aiLoadingIdx !== null ? <Loader2 size={10} className="animate-spin" /> : <Book size={10} />}
                                Définir
                              </button>
                              <button
                                onClick={() => askGeminiAboutNote(idx, 'expand')}
                                disabled={aiLoadingIdx !== null}
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-500 hover:text-blue-600 hover:border-blue-200 flex items-center gap-1"
                              >
                                {aiLoadingIdx === idx && aiLoadingIdx !== null ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                                Expliquer
                              </button>
                              <button
                                onClick={() => askGeminiAboutNote(idx, 'tags')}
                                disabled={aiLoadingIdx !== null}
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-500 hover:text-purple-600 hover:border-purple-200 flex items-center gap-1"
                              >
                                {aiLoadingIdx === idx && aiLoadingIdx !== null ? <Loader2 size={10} className="animate-spin" /> : <Tag size={10} />}
                                Tags
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
              <button
                onClick={() => generateStudyMaterial('sheet')}
                disabled={notes.length === 0 || loading}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50 text-sm"
              >
                {loading && studyMode === 'sheet' ? <Loader2 size={16} className="animate-spin text-emerald-400" /> : <FileText size={16} className="text-emerald-400" />}
                Fiche de révision
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => generateStudyMaterial('flashcards')}
                  disabled={notes.length === 0 || loading}
                  className="py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 text-xs"
                >
                  {loading && studyMode === 'flashcards' ? <Loader2 size={14} className="animate-spin text-blue-500" /> : <BrainCircuit size={14} className="text-blue-500" />}
                  Flashcards
                </button>
                <button
                  onClick={() => generateStudyMaterial('quiz')}
                  disabled={notes.length === 0 || loading}
                  className="py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 text-xs"
                >
                  {loading && studyMode === 'quiz' ? <Loader2 size={14} className="animate-spin text-rose-500" /> : <HelpCircle size={14} className="text-rose-500" />}
                  Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Study Modal */}
      <AnimatePresence>
        {showStudyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`bg-white w-full ${isFullscreen ? 'h-full max-w-none rounded-none' : 'max-w-4xl max-h-full rounded-3xl'} shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
            >
              <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${studyMode === 'sheet' ? 'bg-emerald-100 text-emerald-600' : studyMode === 'flashcards' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                    {studyMode === 'sheet' ? <FileText size={20} /> : studyMode === 'flashcards' ? <BrainCircuit size={20} /> : <HelpCircle size={20} />}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-slate-900">
                    {studyMode === 'sheet' ? 'Fiche de Révision' : studyMode === 'flashcards' ? 'Flashcards' : 'Quiz'}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hidden md:block">
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                  {studyMode === 'sheet' && studySheet && (
                    <button 
                      onClick={() => {
                        const blob = new Blob([studySheet], { type: 'text/markdown' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'fiche-revision.md';
                        a.click();
                      }}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"
                      title="Télécharger en Markdown"
                    >
                      <Download size={20} />
                    </button>
                  )}
                  <button onClick={() => setShowStudyModal(false)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white flex flex-col">
                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Loader2 size={40} className="animate-spin text-emerald-500" />
                    <p>Génération par l'IA en cours...</p>
                  </div>
                ) : (
                  <>
                    {studyMode === 'sheet' && studySheet && (
                      <div className="prose prose-slate max-w-none mx-auto w-full">
                        <div className="markdown-body">
                          <Markdown>{studySheet}</Markdown>
                        </div>
                      </div>
                    )}

                    {studyMode === 'flashcards' && flashcards.length > 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
                        <div className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">
                          Carte {currentCard + 1} sur {flashcards.length}
                        </div>
                        <div 
                          className="w-full aspect-[3/2] perspective-1000 cursor-pointer"
                          onClick={() => setIsFlipped(!isFlipped)}
                        >
                          <motion.div
                            className="w-full h-full relative preserve-3d"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                          >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-100 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center">
                              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{flashcards[currentCard].front}</h3>
                              <div className="absolute bottom-6 text-sm text-slate-400 flex items-center gap-2">
                                <Sparkles size={16} /> Cliquez pour voir la réponse
                              </div>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden bg-blue-50 border-2 border-blue-100 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center rotate-y-180">
                              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">{flashcards[currentCard].back}</p>
                            </div>
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                          <button 
                            onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setIsFlipped(false); }}
                            disabled={currentCard === 0}
                            className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button 
                            onClick={() => { setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1)); setIsFlipped(false); }}
                            disabled={currentCard === flashcards.length - 1}
                            className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </div>
                      </div>
                    )}

                    {studyMode === 'quiz' && quiz.length > 0 && (
                      <div className="max-w-3xl mx-auto w-full">
                        {!quizFinished ? (
                          <>
                            <div className="flex items-center justify-between mb-8">
                              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                Question {currentQuestion + 1} / {quiz.length}
                              </div>
                              <div className="text-sm font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                                Score: {score}
                              </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
                              {quiz[currentQuestion].question}
                            </h3>
                            
                            <div className="space-y-3">
                              {quiz[currentQuestion].options.map((opt: string, i: number) => {
                                const isSelected = selectedAnswer === i;
                                const isCorrect = i === quiz[currentQuestion].answer;
                                const showResult = showExplanation;
                                
                                let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all text-lg ";
                                if (!showResult) {
                                  btnClass += isSelected ? "border-rose-500 bg-rose-50" : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50";
                                } else {
                                  if (isCorrect) btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
                                  else if (isSelected) btnClass += "border-rose-500 bg-rose-50 text-rose-800";
                                  else btnClass += "border-slate-100 bg-white opacity-50";
                                }

                                return (
                                  <button
                                    key={i}
                                    disabled={showResult}
                                    onClick={() => setSelectedAnswer(i)}
                                    className={btnClass}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {showExplanation ? (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                <h4 className={`font-bold mb-2 ${selectedAnswer === quiz[currentQuestion].answer ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {selectedAnswer === quiz[currentQuestion].answer ? 'Bonne réponse !' : 'Mauvaise réponse.'}
                                </h4>
                                <p className="text-slate-700">{quiz[currentQuestion].explanation}</p>
                                <button
                                  onClick={() => {
                                    if (currentQuestion < quiz.length - 1) {
                                      setCurrentQuestion(prev => prev + 1);
                                      setSelectedAnswer(null);
                                      setShowExplanation(false);
                                    } else {
                                      setQuizFinished(true);
                                    }
                                  }}
                                  className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
                                >
                                  {currentQuestion < quiz.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                                </button>
                              </motion.div>
                            ) : (
                              <button
                                onClick={() => {
                                  if (selectedAnswer !== null) {
                                    if (selectedAnswer === quiz[currentQuestion].answer) setScore(s => s + 1);
                                    setShowExplanation(true);
                                  }
                                }}
                                disabled={selectedAnswer === null}
                                className="mt-8 w-full py-4 bg-rose-500 text-white rounded-xl font-bold text-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
                              >
                                Valider
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Check size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz terminé !</h2>
                            <p className="text-xl text-slate-600 mb-8">Votre score : <span className="font-bold text-emerald-600">{score} / {quiz.length}</span></p>
                            <button
                              onClick={() => {
                                setCurrentQuestion(0);
                                setScore(0);
                                setSelectedAnswer(null);
                                setShowExplanation(false);
                                setQuizFinished(false);
                              }}
                              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                            >
                              Recommencer
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
