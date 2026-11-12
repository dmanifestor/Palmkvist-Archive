import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';

interface IntroSectionProps {
  onExploreClick: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative flex min-h-[82vh] flex-col justify-between px-6 pt-16 pb-12 lg:px-12 lg:pt-24 lg:pb-16 max-w-7xl mx-auto">
      {/* Top Editorial Kicker */}
      <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase text-zinc-400 font-medium">
        <span className="text-[#d4a373] font-semibold">Volume IV</span>
        <span aria-hidden="true" className="text-zinc-600">·</span>
        <span>Architectural Monograph</span>
        <span aria-hidden="true" className="text-zinc-600">·</span>
        <span>Curated Works 2023–2026</span>
      </div>

      {/* Main Headline & Lead Text */}
      <div className="my-auto max-w-4xl py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.08] text-balance">
          Sculpting Light, Concrete & Tectonic Silence.
        </h1>
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
          An exploration of contemporary brutalism and minimalist structural forms. As you scroll vertically, the gallery unfolds along a continuous horizontal axis, revealing eight architectural compositions framed in natural daylight and textural precision.
        </p>

        {/* Spatial context metrics strip - clean unboxed figures */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]">
          <div>
            <div className="text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">08</div>
            <div className="mt-1 text-xs text-zinc-500 uppercase tracking-wider">Compositions</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">05</div>
            <div className="mt-1 text-xs text-zinc-500 uppercase tracking-wider">Territories</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">35<span className="text-sm font-normal text-zinc-400">mm</span></div>
            <div className="mt-1 text-xs text-zinc-500 uppercase tracking-wider">Focal Standard</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-[#d4a373] tabular-nums">100%</div>
            <div className="mt-1 text-xs text-zinc-500 uppercase tracking-wider">Scroll-Driven</div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.08] text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.15] text-[#d4a373]">
            <Compass className="h-3.5 w-3.5 animate-spin [animation-duration:12s]" />
          </span>
          <span className="tracking-wide">
            Scroll vertically to traverse the gallery horizontally
          </span>
        </div>

        <button
          onClick={onExploreClick}
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#d4a373] transition-colors cursor-pointer w-fit"
        >
          <span>Begin Series</span>
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1 text-[#d4a373]" />
        </button>
      </div>
    </section>
  );
};
