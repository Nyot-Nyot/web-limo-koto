export interface Section {
  id: string;
  title: string;
  label: string;
}

export const PROFIL_SECTIONS: Section[] = [
  { id: '01', title: 'Profil Singkat', label: 'Profil' },
  { id: '02', title: 'Visi & Misi', label: 'Visi Misi' },
  { id: '03', title: 'Jorong', label: 'Jorong' },
  { id: '04', title: 'Adat Istiadat', label: 'Adat' },
  { id: '05', title: 'Galeri', label: 'Galeri' },
];

export const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '-20% 0px -20% 0px',
  threshold: [0, 0.1, 0.5, 1]
};

export const SCROLL_TIMEOUT_DURATION = 100;
export const NAVIGATION_TIMEOUT_DURATION = 800;

// Performance configurations
export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE_QUALITY: 75,
  IMAGE_SIZES: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  LAZY_LOAD_THRESHOLD: 0.1,
  LAZY_LOAD_ROOT_MARGIN: '50px',
  
  // Component loading
  COMPONENT_LOAD_DELAY: 200,
  ANIMATION_DURATION: 300,
  
  // Virtual scrolling
  VIRTUAL_ITEM_HEIGHT: 300,
  VIRTUAL_CONTAINER_HEIGHT: 600,
  PRELOAD_BUFFER: 2,
  
  // Auto-slide
  AUTO_SLIDE_INTERVAL: 4000,
  TOUCH_SWIPE_THRESHOLD: 50,
  
  // Debounce timings
  SCROLL_DEBOUNCE: 16, // ~60fps
  RESIZE_DEBOUNCE: 250,
  SEARCH_DEBOUNCE: 300,
} as const;

// Media query breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Accessibility configurations
export const A11Y_CONFIG = {
  FOCUS_VISIBLE_OUTLINE: '2px solid #fbbf24',
  SKIP_LINK_Z_INDEX: 9999,
  SCREEN_READER_ONLY: 'sr-only',
  REDUCED_MOTION_QUERY: '(prefers-reduced-motion: reduce)',
} as const;
