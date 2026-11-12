import React, { useState } from 'react';
import { Maximize2, MapPin, Calendar, Camera } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';

interface GalleryCardProps {
  item: GalleryItem;
  isActive: boolean;
  onSelect: (item: GalleryItem) => void;
  index: number;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  isActive,
  onSelect,
  index,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Define width and height container classes based on aspect ratio
  const getContainerDimensions = (ratio: GalleryItem['aspectRatio']) => {
    switch (ratio) {
      case '16:9':
        return 'w-[80vw] sm:w-[68vw] md:w-[58vw] lg:w-[52vw] max-w-[860px] aspect-[16/9]';
      case '4:3':
        return 'w-[72vw] sm:w-[56vw] md:w-[46vw] lg:w-[42vw] max-w-[700px] aspect-[4/3]';
      case '3:4':
        return 'w-[58vw] sm:w-[44vw] md:w-[36vw] lg:w-[32vw] max-w-[540px] aspect-[3/4]';
      default:
        return 'w-[68vw] sm:w-[54vw] md:w-[46vw] max-w-[680px] aspect-[4/3]';
    }
  };

  return (
    <article
      className="relative flex flex-col justify-end shrink-0 group select-none cursor-pointer focus-visible:outline-none"
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.title}`}
    >
      {/* Top Card Metadata strip */}
      <div className="flex items-center justify-between pb-3 text-xs tracking-wider text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#d4a373] font-semibold">{item.index}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300 font-sans tracking-normal uppercase text-[11px]">
            {item.category}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-[11px] font-sans">
          <MapPin className="h-3 w-3 text-zinc-500" />
          <span>{item.location}</span>
        </div>
      </div>

      {/* Main Image Frame */}
      <div
        className={`relative overflow-hidden rounded-lg bg-zinc-900 border border-white/[0.08] transition-all duration-500 shadow-2xl ${
          isActive ? 'ring-1 ring-[#d4a373]/40' : 'group-hover:border-white/[0.18]'
        } ${getContainerDimensions(item.aspectRatio)}`}
      >
        {/* Skeleton placeholder while image loads */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
            <span className="text-xs text-zinc-600 font-mono">Loading capture...</span>
          </div>
        )}

        {/* Fallback container if image fails */}
        {imgError ? (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
            <Camera className="h-8 w-8 text-zinc-600 mb-2" />
            <span className="text-xs text-zinc-400 font-medium">{item.title}</span>
            <span className="text-[10px] text-zinc-600 mt-1">{item.location}</span>
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            referrerPolicy="no-referrer"
            loading={index < 2 ? 'eager' : 'lazy'}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform ${
              imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-105`}
          />
        )}

        {/* Subtle vignette and hover inspect trigger */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Hover Action Badge */}
        <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-200 border border-white/10 shadow-lg">
            <Maximize2 className="h-3 w-3 text-[#d4a373]" />
            <span>Inspect Spec</span>
          </span>
        </div>

        {/* Bottom Title Overlay on Image */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-zinc-100">
          <div className="text-xs font-medium text-[#d4a373] tracking-wider uppercase mb-1">
            {item.architect}
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
            {item.title}
          </h2>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-1 font-light">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Caption & Material Footer below card */}
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 truncate max-w-[80%]">
          <span>{item.materials.join(' · ')}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono shrink-0">
          <Calendar className="h-3 w-3" />
          <span>{item.year}</span>
        </div>
      </div>
    </article>
  );
};
