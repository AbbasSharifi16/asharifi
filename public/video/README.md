# Video Files for Research Page

This directory should contain the following video files for the Storm Sewer Geyser research project:

## Required Video Files:

1. **geyser_experimental_setup.mp4**
   - Main experimental setup video
   - This video will autoplay in the background with a transparent overlay containing project information
   - Recommended size: 1920x1080 or higher
   - Format: MP4 (H.264 codec recommended for web compatibility)

2. **geyser_video1.mov / geyser_video1.mp4**
   - Example of cyclic geyser eruption
   - Converts: If you have .mov file, also export as .mp4 for better browser compatibility
   - Will autoplay in a grid with other experiment videos

3. **geyser_video2.mp4**
   - Example of violent geyser eruption
   - Will autoplay in a grid with other experiment videos

4. **geyser_video3.mp4**
   - High-speed capture of geyser experiment
   - Will autoplay in a grid with other experiment videos

## Video Specifications:

- **Format**: MP4 (primary), MOV (fallback)
- **Codec**: H.264 for maximum compatibility
- **Resolution**: 1920x1080 recommended (1080p)
- **Aspect Ratio**: 16:9
- **File Size**: Compress to <50MB per video for faster loading
- **Optimization**: Use web-optimized encoding (moov atom at start for streaming)

## Optimization Tips:

To optimize videos for web use, you can use FFmpeg:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## Current Status:

⚠️ **Videos not yet added** - Please add your research video files to this directory.

The website will display video placeholders until the actual files are added.
