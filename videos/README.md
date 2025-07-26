# Videos Folder

This folder is for storing Cadence's videos that will be displayed in the media section of her website.

## Recommended File Organization:
- Use descriptive filenames (e.g., `cadence-performance-1.mp4`, `cadence-audition-1.mp4`)
- Supported formats: MP4, WebM, OGV
- Recommended resolution: 720p or 1080p
- Keep file sizes reasonable (under 50MB) for web streaming
- Consider creating multiple quality versions for different devices

## How to Add Videos:
1. Place your video files in this folder
2. Update the video carousel in `media.html` to reference your videos
3. Replace the placeholder cards with actual `<video>` tags

## Example Usage:
```html
<div class="carousel-card">
  <video controls>
    <source src="videos/cadence-performance-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
```

## Current Placeholder Cards:
The website currently uses colored placeholder cards. To use real videos, replace the `<div class="card-placeholder video-card-1"></div>` elements with actual `<video>` tags.

## Alternative: YouTube/Vimeo Links
You can also embed videos from YouTube or Vimeo by using iframe elements instead of local video files. 