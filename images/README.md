# Images Folder

This folder is for storing Cadence's photos that will be displayed in the media section of her website.

## Recommended File Organization:
- Use descriptive filenames (e.g., `cadence-performance-1.jpg`, `cadence-headshot-1.jpg`)
- Supported formats: JPG, PNG, WebP
- Recommended size: 800x600px or larger for good quality
- Keep file sizes under 2MB for fast loading

## How to Add Photos:
1. Place your image files in this folder
2. Update the carousel in `media.html` to reference your images
3. Replace the placeholder cards with actual `<img>` tags

## Example Usage:
```html
<div class="carousel-card">
  <img src="images/cadence-performance-1.jpg" alt="Cadence performing on stage">
</div>
```

## Current Placeholder Cards:
The website currently uses colored placeholder cards. To use real images, replace the `<div class="card-placeholder photo-card-1"></div>` elements with actual `<img>` tags. 