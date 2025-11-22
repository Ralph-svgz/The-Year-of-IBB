# Media Components Guide

## AnimatedImage Component

### Usage
```jsx
import AnimatedImage from '../components/AnimatedImage';

<AnimatedImage
  src="/path/to/image.jpg"
  alt="Description"
  effect="zoom"
  className="h-64"
/>
```

### Available Effects
- **`fade`** - Fades in and slides up when scrolled into view
- **`zoom`** - Scales from 80% to 110% as you scroll
- **`parallax`** - Moves vertically at a different speed than the page
- **`slide-left`** - Slides in from the right
- **`slide-right`** - Slides in from the left

### Props
- `src` (required) - Image URL or path
- `alt` (required) - Alt text for accessibility
- `effect` (optional) - Animation effect (default: 'fade')
- `className` (optional) - Additional CSS classes

---

## AnimatedVideo Component

### Usage
```jsx
import AnimatedVideo from '../components/AnimatedVideo';

<AnimatedVideo
  src="/path/to/video.mp4"
  poster="/path/to/poster.jpg"
  effect="zoom"
  autoPlayOnScroll={true}
  className="h-96"
/>
```

### Features
- **Auto-play on scroll** - Video plays when 50% visible, pauses when out of view
- **Muted by default** - For auto-play compatibility
- **Loop** - Videos loop continuously
- **Status indicator** - Shows "Playing" or "Paused" badge

### Props
- `src` (required) - Video URL or path
- `poster` (optional) - Poster image shown before playback
- `effect` (optional) - Animation effect ('fade' or 'zoom')
- `autoPlayOnScroll` (optional) - Enable auto-play (default: true)
- `className` (optional) - Additional CSS classes

---

## Examples in the Project

### 2021 Section
- Fade effect image (First Day)
- Zoom effect image (Campus Life)

### 2022 Section
- Auto-playing video with zoom effect
- Slide-left effect image (Study Group)
- Slide-right effect image (Weekend Trip)

### 2023 Section
- Parallax effect image (Internship)

### 2024 Section
- Grid of 3 images with mixed effects

### 2025 Section
- Background image with zoom effect

---

## Replacing Placeholder Images

To use your own images, simply replace the `src` URLs:

```jsx
// Before (placeholder)
<AnimatedImage
  src="https://images.unsplash.com/photo-..."
  alt="First Day"
  effect="fade"
/>

// After (your image)
<AnimatedImage
  src="/images/my-first-day.jpg"
  alt="First Day"
  effect="fade"
/>
```

Place your images in the `public/images/` folder and reference them with `/images/filename.jpg`.

---

## Performance Tips

1. **Optimize images** - Use WebP format when possible
2. **Proper sizing** - Don't use 4K images for small thumbnails
3. **Lazy loading** - Images automatically lazy load when using these components
4. **Video compression** - Keep videos under 10MB for web performance
