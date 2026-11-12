export interface GalleryItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  aspectRatio: '16:9' | '4:3' | '3:4';
  src: string;
  alt: string;
  architect: string;
  materials: string[];
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'arch-01',
    index: '01',
    title: 'Travertine & Water Pavilion',
    subtitle: 'Brutalist Overhang on Calm Waters',
    category: 'Public Monolith',
    location: 'Monsanto, Portugal',
    year: '2025',
    aspectRatio: '16:9',
    src: '/src/assets/images/arch_concrete_pavilion_1792450944673.jpg',
    alt: 'Raw concrete architectural pavilion with geometric cantilever overhang and reflecting pool',
    architect: 'Studio Kanso & Associés',
    materials: ['Board-formed Concrete', 'Roman Travertine', 'Cast Bronze'],
    exif: {
      camera: 'Leica SL2',
      lens: 'Super-Vario-Elmar-SL 16-35mm f/3.5-4.5',
      focalLength: '21mm',
      aperture: 'f/8.0',
      shutter: '1/320s',
      iso: '100'
    },
    description:
      'A study in horizontal cantilever geometry. Two floating concrete masses intersect above a mirror-like reflecting pool, balancing raw textural mass against crystalline water reflections.'
  },
  {
    id: 'arch-02',
    index: '02',
    title: 'Sanctuary of Filtered Light',
    subtitle: 'Double-Height Gallery & Bamboo Court',
    category: 'Residential Interior',
    location: 'Kyoto, Japan',
    year: '2024',
    aspectRatio: '4:3',
    src: '/src/assets/images/arch_minimal_interior_1792450945721.jpg',
    alt: 'Double-height minimalist interior with textured plaster walls and limestone bench opening to bamboo grove',
    architect: 'Katsura Atelier',
    materials: ['Hand-troweled Lime Plaster', 'Honed Limestone', 'Darkened Steel'],
    exif: {
      camera: 'Hasselblad 907X 50C',
      lens: 'XCD 45mm f/4 P',
      focalLength: '45mm',
      aperture: 'f/5.6',
      shutter: '1/125s',
      iso: '200'
    },
    description:
      'Sculpted with tactile lime plaster and framed by monolithic pivot apertures, this quiet interior captures ambient daylight diffused through ancient bamboo stalks.'
  },
  {
    id: 'arch-03',
    index: '03',
    title: 'Rhythmic Timber & Cardoso',
    subtitle: 'Vertical Fluting and Granite Monolith',
    category: 'Material Study',
    location: 'Basel, Switzerland',
    year: '2025',
    aspectRatio: '3:4',
    src: '/src/assets/images/arch_fluted_timber_1792450945796.jpg',
    alt: 'Fluted white oak wall paneling meeting dark Cardoso granite flooring in raking light',
    architect: 'Herzog & Rychner Architekten',
    materials: ['Japanese White Oak', 'Cardoso Sandstone', 'Acid-etched Glass'],
    exif: {
      camera: 'Leica M11-P',
      lens: 'Summilux-M 35mm f/1.4 ASPH',
      focalLength: '35mm',
      aperture: 'f/2.8',
      shutter: '1/250s',
      iso: '160'
    },
    description:
      'Precision-milled fluted timber fins provide acoustic warmth and linear shadow play alongside raw tectonic stonework, creating an intimate threshold transition.'
  },
  {
    id: 'arch-04',
    index: '04',
    title: 'Helical Oculus Atrium',
    subtitle: 'Continuous Concrete Spiral Staircase',
    category: 'Cultural Space',
    location: 'Valencia, Spain',
    year: '2024',
    aspectRatio: '4:3',
    src: '/src/assets/images/arch_sculptural_atrium_1792450946004.jpg',
    alt: 'Monumental spiral concrete staircase ascending through circular atrium lit by skylight',
    architect: 'Alonso & Partners',
    materials: ['Self-compacting White Concrete', 'Polished Terrazzo', 'Structural Glass'],
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 24-70mm f/2.8 GM II',
      focalLength: '28mm',
      aperture: 'f/9.0',
      shutter: '1/160s',
      iso: '125'
    },
    description:
      'Rising beneath an oversized zenithal oculus, this unbroken spiral staircase transforms structural circulation into a fluid sculptural centerpiece.'
  },
  {
    id: 'arch-05',
    index: '05',
    title: 'The Silent Cloister',
    subtitle: 'Raked Basalt Courtyard & Solitary Olive',
    category: 'Courtyard & Landscape',
    location: 'Alentejo, Portugal',
    year: '2023',
    aspectRatio: '16:9',
    src: '/src/assets/images/arch_courtyard_oasis_1792450947344.jpg',
    alt: 'Historic stone colonnade courtyard with solitary olive tree and reflective water channel at dusk',
    architect: 'Manuel Aires Mateus Studio',
    materials: ['Weathered Limestone', 'Crushed Basalt Gravel', 'Aged Chestnut'],
    exif: {
      camera: 'Fujifilm GFX 100 II',
      lens: 'GF 23mm f/4 R LM WR',
      focalLength: '18mm equiv.',
      aperture: 'f/11',
      shutter: '0.8s',
      iso: '100'
    },
    description:
      'Enclosed within centuries-old masonry arcades, a single centenarian olive tree sits in concentric ripples of basalt stone, accompanied by a quiet linear spring channel.'
  },
  {
    id: 'arch-06',
    index: '06',
    title: 'Cliffside Cantilever Villa',
    subtitle: 'Suspended Above Coastal Crags',
    category: 'Private Residence',
    location: 'Reykjavik Coast, Iceland',
    year: '2025',
    aspectRatio: '3:4',
    src: '/src/assets/images/arch_cantilever_villa_1792450946001.jpg',
    alt: 'Brutalist concrete cantilevered villa suspended over dramatic sea cliffs illuminated at twilight',
    architect: 'Nordic Tectonic Works',
    materials: ['Sulphate-resistant Concrete', 'Low-iron Triple Glazing', 'Lava Rock'],
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 35mm f/3.5',
      focalLength: '35mm',
      aperture: 'f/6.3',
      shutter: '1/60s',
      iso: '400'
    },
    description:
      'Cantilevered twelve meters out over the North Atlantic surge, this raw monolithic sanctuary frames expansive oceanic horizons through seamless heated glass.'
  },
  {
    id: 'arch-07',
    index: '07',
    title: 'Subterranean Basalt Thermal',
    subtitle: 'Shaft of Light in Volcanic Cavern',
    category: 'Thermal Architecture',
    location: 'Vals, Graubünden',
    year: '2024',
    aspectRatio: '16:9',
    src: '/src/assets/images/arch_monolithic_spa_1792450963212.jpg',
    alt: 'Underground natural stone thermal pool with steam rising beneath a dramatic sunbeam from an oculus',
    architect: 'Peter K. & Associates',
    materials: ['Split-face Basalt', 'Thermal Mineral Water', 'Burnished Brass'],
    exif: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7 ASPH',
      focalLength: '28mm',
      aperture: 'f/2.2',
      shutter: '1/90s',
      iso: '800'
    },
    description:
      'Carved directly into the Alpine bedrock, this subterranean bathhouse harnesses natural thermal springs under a singular celestial shaft of morning light.'
  },
  {
    id: 'arch-08',
    index: '08',
    title: 'Rhythmic Brise-Soleil',
    subtitle: 'Vertical Concrete Fins and Bronze Portals',
    category: 'Civic Facade',
    location: 'Zurich, Switzerland',
    year: '2025',
    aspectRatio: '3:4',
    src: '/src/assets/images/arch_brutalist_facade_1792450963055.jpg',
    alt: 'Rhythmic vertical concrete brise-soleil fins with dark bronze window frames on civic building',
    architect: 'Max Dudler Atelier',
    materials: ['Bush-hammered Concrete', 'Architectural Bronze', 'Solar Control Glass'],
    exif: {
      camera: 'Nikon Z9',
      lens: 'NIKKOR Z 50mm f/1.2 S',
      focalLength: '50mm',
      aperture: 'f/5.6',
      shutter: '1/400s',
      iso: '64'
    },
    description:
      'Deep vertical fins provide passive solar shading while establishing a muscular, timeless rhythm that shifts in shadow depth throughout the progression of the sun.'
  }
];
