Review a changed screenshot or image the way you review code: see the exact
pixels that moved, not two pictures to squint at.

## What you get

- **Before, Diff and After side by side.** Changed pixels are painted magenta
  on the Diff pane. Show them over a white background, over the After image,
  or let them blink.
- **A number, not a feeling.** Every comparison reports how many pixels differ
  and the percentage, with both images' dimensions. Fit or 100% zoom.
- **Git LFS images inside BB's Diff tab.** Where BB would show the two pointer
  lines of an LFS image, the image diff renders in place. Objects that were
  never fetched download on demand.
- **An Image diff tab** pinned in the right panel whenever the thread has
  changed images. Pick Uncommitted, Branch or All, then the image.
- **Open a changed image anywhere** (a file link in chat, the file picker,
  `bb thread open`) and the diff replaces BB's preview. Unchanged images keep
  BB's preview.

## How it works

Both sides are read through BB's bundled Git plugin and compared in your
browser with exact pixel equality, so a one-pixel shift shows up. Images of
different sizes are compared over the union of their sizes. Nothing leaves
your machine, and no account or external service is needed.

## Requirements

- The thread's environment is a Git checkout.
- PNG, JPEG, GIF, WebP, BMP, ICO, AVIF or SVG, within the Git plugin's
  per-side size limit (about 2 MiB; 5 MiB for LFS objects).
- For Git LFS images: `git-lfs` installed on the host that runs the
  environment, and access to the LFS remote without a password prompt for
  objects not fetched yet.
