# Travel Video Portfolio – Photo Gallery Enhancement Requirements

## Project Overview
Enhance the existing travel video portfolio (Astro + Tailwind CSS) by adding a clickable photo gallery that displays video stills in a polaroid-style modal. Currently, carousels are view-only; clicking images should open a fullscreen gallery experience.

## Current Codebase
- **Framework:** Astro 5.16.6 + Tailwind CSS 3.4.0  
- **Structure:** Separate mobile and desktop components  
- **Video data:** JSON files containing a `stills` array  
- **Current carousels:**  
  - `PhotoCarousel.astro` (desktop)  
  - `PhotoCarouselMobile.astro` (mobile)

## Core Requirements

### 1. Gallery Modal Component
- **Name:** `GalleryModal.astro`  
- **Location:** `src/components/` (shared between mobile and desktop)

**Features:**
- Opens when clicking any carousel image  
- Displays the current image inside a polaroid-style frame  
- Navigation between images (previous / next)  
- Close functionality:
  - Click on overlay  
  - `ESC` key  
  - Close button  
- Keyboard navigation (left/right arrow keys)  
- Touch swipe gestures on mobile

### 2. Polaroid Style
Use CSS from the provided example with the following characteristics:
- White, paper-like background  
- Cut-corner effect (not rounded corners)  
- Slight rotation (0.5–1 degree tilt)  
- Double border (inner light border + outer shadow)  
- Caption at the bottom in the format:  
  - `{Place} {Year}` (e.g., **Tokyo 2025**)

### 3. Integration Points
- Modify `PhotoCarousel.astro` (desktop) to make images clickable  
- Modify `PhotoCarouselMobile.astro` (mobile) to make images clickable  
- Reuse the existing `stills` array from video JSON data  
- Pass video metadata (places, year) into the gallery modal

### 4. User Experience Flow
1. User clicks a carousel image  
2. Black overlay fades in  
3. Polaroid-style image appears centered  
4. Caption displays: **Tokyo 2025**  
5. Navigation arrows are visible  
6. User can close via:
   - Close button `[X]`
   - Clicking the overlay
   - Pressing `ESC`
7. User returns to the original carousel position

### 5. Technical Specifications
- **State management:** Use `data-*` attributes or lightweight JavaScript  
- **Images:** Use existing optimized WebP images  
- **Responsiveness:** Fully functional on mobile and desktop  
- **Performance:** Lazy-load images as needed  
- **Accessibility:**
  - ARIA labels
  - Keyboard navigation
  - Proper focus management
- **Animations:** Smooth fade-in / fade-out (300ms)

### 6. Design Matching
- **Colors:** Match existing monochrome palette  
- **Typography:** Inter font  
- **Spacing:** Consistent with existing components  
- **Shadows:** Subtle, matching Tailwind `shadow-lg`  
- **Transitions:** 300ms duration, consistent with site

## Component API (Props)

```ts
interface GalleryModalProps {
  isOpen: boolean;
  images: string[];          // Array of image URLs
  currentIndex: number;      // Starting index
  places: string[];          // e.g., ["Shibuya", "Shinjuku"]
  year: string;              // e.g., "2025"
  onClose: () => void;
  onNavigate: (index: number) => void;
}
```

## Implementation Steps
1. Create `GalleryModal.astro` with polaroid styling  
2. Add client-side JavaScript for modal interactivity  
3. Update `PhotoCarousel.astro` to trigger the gallery  
4. Update `PhotoCarouselMobile.astro` to trigger the gallery  
5. Test functionality on both mobile and desktop  
6. Add keyboard and touch interactions

## Acceptance Criteria
- Clicking a carousel image opens the gallery  
- Polaroid frame renders with cut corners  
- Caption displays in **Place Year** format  
- Navigation arrows function correctly  
- Modal closes via `[X]`, overlay click, or `ESC`  
- Mobile swipe gestures work  
- Keyboard navigation works  
- Smooth performance with no layout shifts  
- Accessibility requirements met  
- Design matches the existing site aesthetic

## Open Questions / Decisions
- Polaroid rotation: **Yes** (recommended: ~0.5° tilt)  
- Arrow visibility: Always visible or on hover?  
- Preload adjacent images: **Yes**, for smooth navigation  
- Remember last viewed position when reopened: **Yes**  
- Paper texture: Subtle texture recommended  
- Mobile swipe gestures: **Yes**, in addition to arrows

## Reference CSS (Example)

```css
figure {
  --c: 50px;
  --p: 30px;
  --d: 10px;
  display: inline-block;
  padding: var(--p);
  background:
    radial-gradient(farthest-side at 0 0, #000, #0000) 0 0 / var(--c) var(--c),
    radial-gradient(farthest-side at 100% 100%, #000, #0000) 100% 100% / var(--c) var(--c),
    linear-gradient(#fff 0 0) 50% 50% / calc(100% - var(--p)) calc(100% - var(--p));
  clip-path: polygon(
    0 var(--c),
    var(--c) 0,
    100% 0,
    100% calc(100% - var(--c)),
    calc(100% - var(--c)) 100%,
    0 100%
  );
}
```

---

This document provides the complete requirements for implementing a polaroid-style photo gallery modal in the existing travel video portfolio.
