import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavigationButtonsProps {
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
}

export default function NavigationButtons({ onNext, onPrev, nextLabel, prevLabel }: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
      {onPrev ? (
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
          {prevLabel || "Précédent"}
        </button>
      ) : <div />}

      {onNext ? (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg group"
        >
          {nextLabel || "Suivant"}
          <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </button>
      ) : <div />}
    </div>
  );
}
