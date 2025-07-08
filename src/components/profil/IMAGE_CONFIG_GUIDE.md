# Image Data Configuration Guide

## How to Update Profile Images

The profile images are now centralized in `constants.ts` for easy management and reusability.

### Current Configuration

```typescript
// In src/components/profil/constants.ts
export const ADAT_IMAGES: readonly AdatImageData[] = [
  {
    src: "https://placehold.co/500x400",
    title: "Rumah Gadang",
    description: "Arsitektur tradisional"
  },
  {
    src: "https://placehold.co/500x400",
    title: "Tari Tradisional", 
    description: "Seni budaya warisan"
  },
  // ... more images
];
```

### To Add New Images

1. **Add new image data** to the `ADAT_IMAGES` array:
```typescript
{
  src: "/images/new-image.jpg",
  title: "New Cultural Element",
  description: "Description of the new element"
}
```

2. **The component will automatically**:
   - Include the new image in the slideshow
   - Create navigation dots
   - Handle touch/keyboard navigation
   - Apply proper lazy loading

### Benefits of This Approach

- ✅ **Single source of truth** for image data
- ✅ **Type safety** with TypeScript interfaces
- ✅ **Easy to maintain** and update
- ✅ **Reusable** across components
- ✅ **Consistent** data structure

### Configuration Options

You can also update timing and interaction settings:

```typescript
// In constants.ts
export const PERFORMANCE_CONFIG = {
  AUTO_SLIDE_INTERVAL: 4000, // 4 seconds
  TOUCH_SWIPE_THRESHOLD: 50,  // 50px swipe distance
  // ... other settings
};
```

This makes the component highly configurable without touching the component code itself!
