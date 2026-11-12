import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryItem, GALLERY_ITEMS } from '../data/galleryData';
import { GalleryCard } from './GalleryCard';
import { GalleryControls } from './GalleryControls';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalGalleryProps {
  onSelectImage: (item: GalleryItem) => void;
  activeImageId?: string | null;
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  onSelectImage,
  activeImageId,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Setup GSAP ScrollTrigger for horizontal scroll
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    // Use GSAP Context for safe React cleanup
    const ctx = gsap.context(() => {
      // Dynamic travel calculation based on actual measured track width and viewport client width
      const getTravelDistance = () => {
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };

      // Only enable pinning on screens with horizontal overflow
      const tween = gsap.to(track, {
        x: () => -getTravelDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getTravelDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentProgress = self.progress;
            setProgress(currentProgress);

            // Compute active index based on progress and total items
            const total = GALLERY_ITEMS.length;
            const newIndex = Math.min(
              total - 1,
              Math.max(0, Math.floor(currentProgress * total))
            );
            setActiveIndex(newIndex);
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    }, sectionRef);

    // Refresh ScrollTrigger after assets finish settling
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, [isMobile]);

  // Programmatic scroll helper to target a specific index or progress
  const scrollToSlide = (targetIndex: number) => {
    const st = scrollTriggerRef.current;
    const total = GALLERY_ITEMS.length;
    const clampedIndex = Math.max(0, Math.min(total - 1, targetIndex));

    if (st) {
      const targetProgress = clampedIndex / (total - 1);
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else if (trackRef.current) {
      // Fallback for native mobile scroll track
      const card = trackRef.current.children[clampedIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  };

  const handleScrub = (targetProgress: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Keyboard navigation listener (Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process when not typing into an input/textarea and no modal open
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT' ||
        activeImageId
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToSlide(activeIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSlide(activeIndex - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(GALLERY_ITEMS.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, activeImageId]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-[#09090b] text-zinc-100 overflow-hidden"
    >
      {/* Viewport container */}
      <div
        ref={viewportRef}
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden px-6 lg:px-12 py-8"
      >
        {/* Top Section Header within Pinned Gallery */}
        <div className="z-20 flex items-center justify-between border-b border-white/[0.08] pb-4 pt-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
              Section B
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-300">
              Photographic Monograph Sequence
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>
              Traverse: <span className="text-zinc-200">{Math.round(progress * 100)}%</span>
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              Archive Ref: <span className="text-zinc-200">{GALLERY_ITEMS[activeIndex]?.index}</span>
            </span>
          </div>
        </div>

        {/* Center: The Continuous Horizontal Image Track */}
        <div className="relative my-auto flex items-center overflow-x-auto md:overflow-x-visible no-scrollbar py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-8 sm:gap-12 lg:gap-16 pr-[20vw] pl-2 select-none will-change-transform"
          >
            {/* Introductory Title Slide within the Track */}
            <div className="w-[70vw] sm:w-[45vw] md:w-[35vw] max-w-[460px] shrink-0 pr-6 border-r border-white/[0.08]">
              <div className="text-xs font-mono text-[#d4a373] uppercase tracking-widest mb-3">
                Folio 01–08
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Architectural Monoliths in Natural Light
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Explore the series sequentially as physical space transforms through vertical displacement. Click any image to examine tectonic specifications and optical capture metadata.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <span>[← / → Keys Active]</span>
              </div>
            </div>

            {/* Gallery Cards */}
            {GALLERY_ITEMS.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                isActive={activeIndex === index}
                onSelect={onSelectImage}
              />
            ))}

            {/* Terminal Card signaling end of sequence */}
            <div className="w-[60vw] sm:w-[40vw] md:w-[30vw] max-w-[380px] shrink-0 pl-6 border-l border-white/[0.08] flex flex-col justify-center">
              <span className="text-xs font-mono text-[#d4a373] uppercase tracking-widest mb-2">
                Sequence End
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Release & Monograph Colophon
              </h3>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-light">
                Continue scrolling downward to access the complete curatorial notes, publication credits, and archival inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Floating Scrubber and Controls */}
        <GalleryControls
          currentIndex={activeIndex}
          totalItems={GALLERY_ITEMS.length}
          progress={progress}
          onPrev={() => scrollToSlide(activeIndex - 1)}
          onNext={() => scrollToSlide(activeIndex + 1)}
          onScrub={handleScrub}
        />
      </div>
    </section>
  );
};
