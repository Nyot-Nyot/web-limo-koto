# News Page Components

This directory contains components and utilities for the news/berita page of the Nagari website.

## Components

### 1. SearchFilter (`SearchFilter.tsx`)
- Reusable search and filter component
- Features:
  - Real-time search input
  - Sort by date/popularity
  - Modern glassmorphism design
  - Mobile responsive

### 2. NewsCard (`NewsCard.tsx`)
- Unified news card component for both featured and regular news
- Features:
  - Support for featured news layout (large, horizontal)
  - Regular news card layout (vertical)
  - Glassmorphism theme consistency
  - Hover animations
  - Image optimization with Next.js Image

### 3. AgendaItem (`AgendaItem.tsx`)
- Individual agenda item component
- Features:
  - Customizable gradient backgrounds
  - Emoji icons
  - Structured information display

### 4. AgendaSidebar (`AgendaSidebar.tsx`)
- Sidebar container for agenda items
- Features:
  - Sticky positioning
  - Custom scrollbar
  - Responsive design

### 5. Pagination (`Pagination.tsx`)
- Advanced pagination component
- Features:
  - Mobile and desktop layouts
  - Smart page range calculation
  - Disabled state handling
  - Smooth scrolling to content

### 6. SectionHeader (`SectionHeader.tsx`)
- Reusable section header with decorative elements
- Features:
  - Gradient text
  - Decorative gradient line
  - Consistent spacing

## Hooks

### useNewsFilter (`../hooks/useNewsFilter.ts`)
- Custom hook for news filtering, sorting, and pagination
- Features:
  - Search functionality
  - Sort by date/popularity
  - Pagination logic
  - Memoized calculations for performance
  - Smooth scrolling to content

## Data

### newsData (`../data/newsData.ts`)
- TypeScript interfaces and mock data
- Features:
  - Type-safe data structure
  - Extensible design
  - Sample news and agenda data

## Performance Optimizations

1. **Memoization**: All filtering and pagination calculations are memoized
2. **Component Separation**: Logical separation for better tree shaking
3. **Image Optimization**: Next.js Image component for automatic optimization
4. **Code Splitting**: Components can be lazy loaded if needed

## Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## Theme Consistency

- Glassmorphism design pattern
- Consistent color scheme
- Unified animations and transitions
- Proper contrast for accessibility
