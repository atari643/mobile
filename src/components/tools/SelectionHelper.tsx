import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, X, Book, StickyNote } from 'lucide-react';
import { defineTerm } from '../../services/geminiService';

export default function SelectionHelper() {
  const [selection, setSelection] = useState<{ text: string, x: number, y: number } | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selectedText = window.getSelection()?.toString().trim();
      
      // If clicking inside the tooltip, don't clear it immediately
      if (tooltipRef.current?.contains(e.target as Node)) return;

      if (selectedText && selectedText.length > 1 && selectedText.length < 2000) {
        setSelection({
          text: selectedText,
          x: e.clientX,
          y: e.clientY
        });
      } else {
        setSelection(null);
        setDefinition(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleDefine = async () => {
    if (!selection) return;
    setLoading(true);
    const result = await defineTerm(selection.text);
    setDefinition(result);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {selection && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          style={{ 
            position: 'fixed', 
            ...(selection.x > window.innerWidth / 2 
                ? { right: window.innerWidth - selection.x + 10 } 
                : { left: selection.x + 10 }),
            ...(selection.y > window.innerHeight / 2 
                ? { bottom: window.innerHeight - selection.y + 10 } 
                : { top: selection.y + 10 }),
            zIndex: 9999 
          }}
          className="bg-white rounded-xl shadow-2xl border border-slate-200 p-1 flex flex-col min-w-[250px] max-w-[400px] md:max-w-[500px] overflow-hidden"
        >
          {!definition && !loading && (
            <div className="flex flex-col">
              <button
                onClick={handleDefine}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors rounded-lg text-left"
              >
                <Sparkles size={16} className="text-emerald-500 shrink-0" />
                Définir avec Gemini
              </button>
              <button
                onClick={() => {
                  const heading = window.getSelection()?.anchorNode?.parentElement?.closest('section')?.querySelector('h2, h3')?.textContent || 'Général';
                  window.dispatchEvent(new CustomEvent('add-note', { detail: { text: selection.text, context: heading } }));
                  setSelection(null);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors rounded-lg text-left"
              >
                <StickyNote size={16} className="text-blue-500 shrink-0" />
                Ajouter aux notes
              </button>
            </div>
          )}

          {loading && (
            <div className="p-4 flex items-center gap-3 text-slate-500 text-sm">
              <Loader2 size={16} className="animate-spin text-emerald-500 shrink-0" />
              Analyse en cours...
            </div>
          )}

          {definition && (
            <div className="p-4 bg-slate-50 rounded-lg flex flex-col max-h-[60vh]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider truncate pr-4">
                  <Book size={14} className="shrink-0" />
                  <span className="truncate" title={selection.text}>
                    {selection.text.length > 25 ? selection.text.substring(0, 25) + '...' : selection.text}
                  </span>
                </div>
                <button onClick={() => setSelection(null)} className="text-slate-400 hover:text-slate-600 shrink-0 p-1 hover:bg-slate-200 rounded">
                  <X size={14} />
                </button>
              </div>
              <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 pr-2">
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {definition}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
