import React from 'react';
import { Layers } from 'lucide-react';

interface TopBarProps {
  onOpenIndex: () => void;
  onScrollToGallery: () => void;
  onScrollToColophon: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenIndex,
  onScrollToGallery,
  onScrollToColophon,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-base font-semibold tracking-wider text-zinc-100 uppercase transition-opacity hover:opacity-80 whitespace-nowrap shrink-0"
        >
          Palmkvist Archive
        </a>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-zinc-400">
          <button
            onClick={onScrollToGallery}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Horizontal Gallery
          </button>
          <button
            onClick={onOpenIndex}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Series Index
          </button>
          <button
            onClick={onScrollToColophon}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Monograph Notes
          </button>
          <button
            onClick={onScrollToColophon}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Inquiries
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenIndex}
            className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-zinc-200 transition-all hover:border-[#d4a373]/60 hover:text-[#d4a373] hover:bg-zinc-800 whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Open photographic series index"
          >
            <Layers className="h-3.5 w-3.5 text-[#d4a373]" />
            <span>Overview Index</span>
          </button>
        </div>
      </div>
    </header>
  );
};
