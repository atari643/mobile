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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 gap-3">
      {onPrev ? (
        <button
          onClick={onPrev}
          className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all group text-sm sm:text-base"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform shrink-0" size={20} />
          <span className="truncate">{prevLabel || "Précédent"}</span>
        </button>
      ) : <div className="hidden sm:block" />}

      {onNext ? (
        <button
          onClick={onNext}
          className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg group text-sm sm:text-base"
        >
          <span className="truncate">{nextLabel || "Suivant"}</span>
          <ChevronRight className="group-hover:translate-x-1 transition-transform shrink-0" size={20} />
        </button>
      ) : <div className="hidden sm:block" />}
    </div>
  );
}
