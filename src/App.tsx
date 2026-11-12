import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from './data/galleryData';
import { TopBar } from './components/TopBar';
import { IntroSection } from './components/IntroSection';
import { HorizontalGallery } from './components/HorizontalGallery';
import { DetailLightboxModal } from './components/DetailLightboxModal';
import { IndexDrawerModal } from './components/IndexDrawerModal';
import { EndingSection } from './components/EndingSection';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToColophon = () => {
    const el = document.getElementById('colophon');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-[#d4a373]/30 selection:text-white">
      {/* Top Navigation */}
      <TopBar
        onOpenIndex={() => setIsIndexOpen(true)}
        onScrollToGallery={handleScrollToGallery}
        onScrollToColophon={handleScrollToColophon}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section A: Editorial Introduction */}
        <IntroSection onExploreClick={handleScrollToGallery} />

        {/* Section B: Pinned Horizontal Image Gallery (GSAP ScrollTrigger) */}
        <HorizontalGallery
          onSelectImage={(item) => setSelectedImage(item)}
          activeImageId={selectedImage?.id}
        />

        {/* Section E: Editorial Closing & Colophon */}
        <EndingSection />
      </main>

      {/* Fullscreen Detail Lightbox Modal */}
      <DetailLightboxModal
        item={selectedImage}
        items={GALLERY_ITEMS}
        onClose={() => setSelectedImage(null)}
        onNavigate={(newItem) => setSelectedImage(newItem)}
      />

      {/* Overview Index Drawer Modal */}
      <IndexDrawerModal
        isOpen={isIndexOpen}
        items={GALLERY_ITEMS}
        onClose={() => setIsIndexOpen(false)}
        onSelectImage={(item) => {
          setSelectedImage(item);
        }}
      />
    </div>
  );
}
