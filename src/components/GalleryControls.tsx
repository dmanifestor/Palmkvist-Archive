import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sliders, Command } from 'lucide-react';

interface GalleryControlsProps {
  currentIndex: number;
  totalItems: number;
  progress: number; // 0 to 1
  onPrev: () => void;
  onNext: () => void;
  onScrub: (targetProgress: number) => void;
}

export const GalleryControls: React.FC<GalleryControlsProps> = ({
  currentIndex,
  totalItems,
  progress,
  onPrev,
  onNext,
  onScrub,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clampedRatio = Math.max(0, Math.min(1, clickX / rect.width));
    onScrub(clampedRatio);
  };

  const percentage = Math.round(progress * 100);
  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalItems).padStart(2, '0');

  return (
    <aside
      aria-label="Gallery navigation controls"
      className="pointer-events-none fixed bottom-6 inset-x-0 z-30 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center gap-4 rounded-xl border border-white/[0.12] bg-[#0c0c0e]/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl transition-all hover:border-white/[0.2] max-w-xl w-full sm:w-auto">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentIndex <= 0}
          aria-label="Previous image"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900/60 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Index counter display */}
        <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums text-zinc-300 shrink-0 select-none">
          <span className="text-[#d4a373] font-semibold">{formattedCurrent}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">{formattedTotal}</span>
        </div>

        {/* Interactive Scrub Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleProgressClick}
          role="slider"
          aria-label="Scroll progress bar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
          }}
          className="group relative flex-1 sm:w-48 h-5 flex items-center cursor-pointer select-none"
        >
          {/* Track background */}
          <div className="relative h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden transition-all group-hover:h-2">
            {/* Filled progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-zinc-400 via-[#d4a373] to-[#e29578] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Scrub Handle Thumb */}
          <div
            className="absolute h-3 w-3 rounded-full bg-white shadow-md border border-zinc-900 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${percentage}%` }}
          />
        </div>

        {/* Percentage label */}
        <span className="hidden sm:inline font-mono text-[11px] text-zinc-500 tabular-nums w-8 text-right select-none">
          {percentage}%
        </span>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentIndex >= totalItems - 1}
          aria-label="Next image"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900/60 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Keyboard shortcut hint */}
        <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-white/[0.08] text-[11px] text-zinc-500 font-mono">
          <span className="px-1 py-0.5 rounded bg-zinc-800/80 text-zinc-400 text-[10px]">←</span>
          <span className="px-1 py-0.5 rounded bg-zinc-800/80 text-zinc-400 text-[10px]">→</span>
          <span className="text-zinc-500 font-sans">Navigate</span>
        </div>
      </div>
    </aside>
  );
};
