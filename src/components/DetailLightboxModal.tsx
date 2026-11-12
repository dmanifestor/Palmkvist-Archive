import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, Compass, Layers, ShieldCheck } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';

interface DetailLightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const DetailLightboxModal: React.FC<DetailLightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    }
  }, [currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    }
  }, [currentIndex, items, onNavigate]);

  // Handle ESC and Arrow keys
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed specification for ${item.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      {/* Click backdrop to dismiss */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Lightbox Container */}
      <div className="relative z-10 flex flex-col lg:flex-row h-full max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0c0e] shadow-2xl">
        {/* Left: High-Res Image Display Area */}
        <div className="relative flex flex-1 items-center justify-center bg-[#060608] overflow-hidden p-4 sm:p-8">
          <img
            src={item.src}
            alt={item.alt}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
          />

          {/* Quick cycle controls over image */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              disabled={currentIndex <= 0}
              aria-label="Previous artwork"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-zinc-300 backdrop-blur-md border border-white/10 transition-colors hover:bg-black/90 hover:text-white disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={currentIndex >= items.length - 1}
              aria-label="Next artwork"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-zinc-300 backdrop-blur-md border border-white/10 transition-colors hover:bg-black/90 hover:text-white disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Image index counter watermark */}
          <div className="absolute bottom-4 left-6 text-xs font-mono text-zinc-500 tabular-nums">
            FIG. {item.index} OF {String(items.length).padStart(2, '0')}
          </div>
        </div>

        {/* Right: Architectural Specification & EXIF Drawer */}
        <div className="flex w-full lg:w-[420px] flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#0f0f12] p-6 sm:p-8">
          <div>
            {/* Header: Sequence and Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#d4a373]">
                <span>SPECIFICATION</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400 font-sans uppercase">{item.category}</span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal dialog"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/80 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Title & Architecture Office */}
            <div className="mt-6">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                {item.architect}
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-400 font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Structural Parameters */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Spatial Registry
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3">
                  <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>Location</span>
                  </div>
                  <div className="font-medium text-zinc-200">{item.location}</div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3">
                  <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>Completion</span>
                  </div>
                  <div className="font-medium text-zinc-200">{item.year}</div>
                </div>
              </div>

              {/* Materiality */}
              <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-500 mb-1.5">
                  <Layers className="h-3 w-3" />
                  <span>Material Matrix</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-zinc-300 font-light"
                    >
                      {mat}
                      {i < item.materials.length - 1 && <span className="text-zinc-600 ml-2">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Photographic EXIF Data */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Camera className="h-3.5 w-3.5 text-[#d4a373]" />
                <span>Optical Recording Data</span>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3 text-xs font-mono space-y-2 text-zinc-400">
                <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-zinc-500 font-sans">Camera Body</span>
                  <span className="text-zinc-200">{item.exif.camera}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-zinc-500 font-sans">Optics</span>
                  <span className="text-zinc-200 text-right truncate max-w-[190px]">{item.exif.lens}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-sans">Focal</div>
                    <div className="text-zinc-200 tabular-nums">{item.exif.focalLength}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-sans">Aperture</div>
                    <div className="text-zinc-200 tabular-nums">{item.exif.aperture}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-sans">Shutter</div>
                    <div className="text-zinc-200 tabular-nums">{item.exif.shutter}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-sans">ISO</div>
                    <div className="text-zinc-200 tabular-nums">{item.exif.iso}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#d4a373]" />
              <span>Verified Archival File</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                className="hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
              >
                Prev
              </button>
              <span className="text-zinc-700">|</span>
              <button
                onClick={handleNext}
                disabled={currentIndex >= items.length - 1}
                className="hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
