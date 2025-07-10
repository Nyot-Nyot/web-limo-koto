# Layanan (Services) Components

This directory contains all components for the services/layanan page of the Nagari Limo Koto website.

## Architecture Overview

The layanan page has been completely refactored for better performance, maintainability, and code organization:

### Data Layer (`/src/data/layanan.ts`)
- Contains all service data and contact information
- Centralized data management
- Type-safe service definitions

### Types Layer (`/src/types/layanan.ts`)
- TypeScript interfaces for type safety
- Consistent data structures
- Better IDE support and error catching

### Component Structure

#### Core Components
- **Modal.tsx** - Reusable modal component with proper scroll handling
- **LayananCard.tsx** - Service card component with hover effects
- **PageHeader.tsx** - Main page header with operational hours
- **BackgroundLayer.tsx** - Background image and overlay component

#### Form Components
- **FormComponents.tsx** - Reusable form field components
- **DomisiliForm.tsx** - Domicile certificate form
- **SKTMForm.tsx** - SKTM (poverty certificate) form
- **StepsForm.tsx** - Generic steps form for other services

#### Information Components
- **ContactCard.tsx** - Contact information display
- **OperationalHours.tsx** - Service hours display
- **ReviewSection.tsx** - User feedback form

## Performance Optimizations

1. **Lazy Loading**: All components are dynamically imported for code splitting
2. **Memoization**: Components use React.memo for preventing unnecessary re-renders
3. **Callback Optimization**: useCallback hooks for event handlers
4. **Constant Memoization**: Layout constants are memoized with useMemo

## Key Features

### Modal System
- Fixed scroll issues by centering modal properly
- Backdrop blur effect
- Smooth animations
- Proper focus management

### Form System
- Reusable form components
- Consistent validation
- File upload support
- Error handling

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Consistent spacing
- Touch-friendly interactions

## Removed Files

The following individual service pages were removed as they're now handled by modals:
- `/layanan/domisili/page.tsx`
- `/layanan/sktm/page.tsx`
- `/layanan/usaha/page.tsx`
- `/layanan/pengantar_nikah/page.tsx`
- `/layanan/surat_kematian/page.tsx`
- `/layanan/surat_cerai/page.tsx`

## Usage

The main page (`page.tsx`) orchestrates all components:

```tsx
import { layananList, kontakInfo } from "@/data/layanan";
import { ModalState } from "@/types/layanan";

// Components are lazy loaded for performance
const Modal = dynamic(() => import("@/components/layanan/Modal"));
const LayananCard = dynamic(() => import("@/components/layanan/LayananCard"));
```

## Benefits of Refactoring

1. **Reduced Bundle Size**: Code splitting with lazy loading
2. **Better Performance**: Memoized components and optimized re-renders
3. **Improved UX**: Modal system instead of page navigation
4. **Maintainability**: Separated concerns and reusable components
5. **Type Safety**: Comprehensive TypeScript interfaces
6. **Code Reusability**: Shared form components
7. **Consistent Styling**: Centralized design system
