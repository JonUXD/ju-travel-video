# Mobile Version Requirements
*Version 0.1 - Requirements Definition*

## Overview
Create a dedicated mobile experience for the travel video portfolio that prioritizes touch interaction, vertical scrolling, and simplified content.

## Core Principles
- **Mobile-first, not responsive:** Separate mobile components, not just CSS breakpoints
- **Touch-optimized:** Fat finger targets, swipe gestures, tap interactions
- **Content priority:** Video > Location/Date > Visual preview (carousel)
- **Simplify:** Remove non-essential information for mobile

## Target Devices
- Smartphones (320px - 480px width)
- Portrait orientation only
- Touchscreen interaction

## Component Requirements

### 1. Mobile Video Section (`VideoSectionMobile.astro`)
**Layout:**
- Full-width video player
- Compact metadata below video
- Full-width carousel below metadata

**Metadata (simplified):**
- Country + Year (e.g., "🇬🇷 Greece 2016")
- Specific places (e.g., "Athens, Crete")
- *Remove:* Gear details, region, music links, complex grid

**Interactions:**
- Video should be easy to tap/play
- No hover states (mobile doesn't hover)

### 2. Mobile Carousel (`PhotoCarouselMobile.astro`)
**Visual:**
- Full-width images
- Larger touch targets
- Swipe gestures for navigation
- Dots indicator (replaces "Scroll →" text)

**Interactions:**
- Horizontal swipe to navigate
- Tap to pause/resume auto-scroll (optional)
- Visual feedback on touch

### 3. Mobile Header (`HeaderMobile.astro`)
**Content:**
- Simplified title "Travel Videos"
- Remove stats row or make collapsible
- Clean, minimal design

### 4. Mobile Layout (`LayoutMobile.astro`)
**Structure:**
- Single column vertical layout
- Optimized touch targets (min 44px)
- Mobile-appropriate font sizes
- Consider safe areas (notch, home indicator)

## Technical Requirements

### Image Optimization
- Consider mobile-sized images (640×360) for faster loads
- Use `srcset` for responsive images
- Lazy load carousel images

### Touch Interactions
- Replace `:hover` with `:active` states
- Implement touch event handlers for carousel
- Ensure all interactive elements are min 44×44px

### Performance
- Prioritize mobile image loading
- Minimize JavaScript on mobile
- Consider Intersection Observer for lazy loading

## Success Metrics
- [ ] Video plays smoothly on mobile data
- [ ] Carousel is swipeable with touch
- [ ] All touch targets are easily tappable
- [ ] Page loads under 3 seconds on 4G
- [ ] No horizontal scrolling needed

## Open Questions
1. Should carousel auto-play on mobile?
2. Should video autoplay (muted) on mobile?
3. Do we need a "back to top" button for long pages?
4. Should metadata be expandable/collapsible?

## Next Steps
1. Create `VideoSectionMobile.astro` with vertical layout
2. Create `PhotoCarouselMobile.astro` with touch swiping
3. Update `index.astro` to show mobile/desktop based on viewport
4. Test on actual mobile devices
5. Iterate based on user testing

---
*Document created: [Date]*
*Last updated: [Date]*