## What you get

- **Zoom and pan in the right panel.** Images, videos and audio files open in a viewer instead of bb's fit-to-panel preview. Drag to pan, pinch or Ctrl/Cmd-scroll to zoom at the pointer, and double-click to switch between Fit and a close-up. Fit and 100% buttons sit in the toolbar, and pixels stay sharp above 200%.
- **Every file in the folder.** Previous and next buttons, or the arrow keys, step through the other images, videos and audio files in the same folder, in name order.
- **Video you can inspect.** Play, step one frame at a time, seek, change speed from 0.25× to 2×, mute, and zoom into the frame.
- **Media inline in chat.** Agents can write `::media{file="/path/to/shot.png"}` in a reply to show the same viewer in the message, with a button that opens the file in the right panel.

## How it works

The viewer takes over wherever bb opens a matching file in the right panel: file links, the file picker and `bb thread open`. Files stream through bb's own file routes, so long videos seek without downloading the whole file, and files on any connected machine work. To keep bb's own preview for a file type, choose it under Settings, File openers, or use Open with on a file.

The plugin ships a `media-viewer` skill that tells agents to put the files they want to show in one folder and open the first one in the right panel.

## Supported files

- Images: png, jpg, jpeg, webp, gif, avif, bmp, ico, svg
- Video: mp4, m4v, mov, webm
- Audio: mp3, m4a, aac, wav, ogg, oga, opus, flac

Formats play as far as bb's browser engine supports them. A file the viewer cannot decode shows an error with a button to use bb's preview instead.
