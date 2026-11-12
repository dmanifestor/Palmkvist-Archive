# PALMKVIST ARCHIVE — Cinematic Horizontal Image Scroll Gallery

A faithful recreation of the cinematic horizontal image scrolling experience inspired by [Nicolai Palmkvist's live demo](https://nicolaipalmkvist.com/horizontal-image-scroll-live-demo/). Vertical page scrolling translates smoothly into pinned horizontal gallery displacement using GSAP ScrollTrigger, showcasing curated architectural and minimalist interior compositions.

---

## Key Features

1. **Scroll-Driven Horizontal Movement**: Vertical scrolling effortlessly controls the continuous horizontal movement of the photography track across the viewport.
2. **GSAP ScrollTrigger Dynamic Travel Calculation**:
   ```typescript
   travelDistance = horizontalTrack.scrollWidth - galleryViewport.clientWidth;
   ```
   Travel distance is dynamically measured to ensure all eight captures are fully revealed without trailing blank space or viewport clipping.
3. **Curated Architectural Imagery**: Curated high-resolution photography showcasing raw concrete, Roman travertine, fluted white oak, and brutalist oculus geometry.
4. **Interactive Detail Lightbox Modal**: Full-screen inspection modal with architectural project notes, material specifications, and comprehensive optical EXIF metadata (camera body, lens, focal length, aperture, shutter speed, ISO).
5. **Interactive Navigation Bar & Scrubber**: Real-time progress bar (0%–100%) with click-to-scrub capabilities, numerical slide indicator (`01 / 08`), previous/next jump arrows, and series index modal.
6. **Accessible Keyboard Navigation**:
   - `ArrowRight` / `ArrowLeft`: Navigate between architectural captures.
   - `Home` / `End`: Jump to first / last capture.
   - `Escape`: Close lightbox modal or series index drawer.
7. **Responsive & Mobile Fluidity**: Desktop and tablet utilize GSAP ScrollTrigger pinning; mobile devices support touch-momentum horizontal browsing without scroll traps.

---

## Local Development & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be accessible at `http://localhost:3000`.

### 3. Production Build & Linting
```bash
# Type check and lint
npm run lint

# Production bundle
npm run build

# Preview build locally
npm run preview
```

---

## Deployment Instructions (Vercel)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Framework Preset: **Vite**.
5. Build and Output Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Vercel will build and serve the application globally with edge caching.
