import React, { useEffect } from 'react';
import { X, ArrowRight, MapPin } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';

interface IndexDrawerModalProps {
  isOpen: boolean;
  items: GalleryItem[];
  onClose: () => void;
  onSelectImage: (item: GalleryItem, index: number) => void;
}

export const IndexDrawerModal: React.FC<IndexDrawerModalProps> = ({
  isOpen,
  items,
  onClose,
  onSelectImage,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Monograph Series Overview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 flex flex-col h-full max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0c0e] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
              Archival Registry
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Complete Photographic Monograph Index
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close index dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Grid List */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectImage(item, index);
                onClose();
              }}
              className="group relative flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 overflow-hidden p-3 transition-all hover:border-[#d4a373]/50 hover:bg-zinc-900/80 cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-950 mb-3">
                <img
                  src={item.src}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 rounded bg-black/60 backdrop-blur-md px-1.5 py-0.5 font-mono text-[10px] text-[#d4a373]">
                  {item.index}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-[#d4a373] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-1">
                    <MapPin className="h-3 w-3 text-zinc-500" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
                  <span>{item.year}</span>
                  <span className="flex items-center gap-1 text-[#d4a373] opacity-0 group-hover:opacity-100 transition-opacity">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
