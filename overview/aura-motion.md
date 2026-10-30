Aura Motion puts a video, GIF or photo wallpaper behind the New thread screen and your
conversations, with an optional pixel-dither effect that keeps moving. In chats, your messages
sit on a solid column or on frosted glass that lets the wallpaper show through.

## What you get

- **Glass behind your messages.** Choose Solid (wallpaper in the margins
  only), Glass (a floating frosted sheet behind the message column) or Sheer
  (a light veil). In dark mode the glass dims bright frames so text stays
  readable, the composer becomes a matching glass capsule, and the sheet keeps
  its margins from phone to 4K widths. Set it per slot, or with
  `bb aura-motion chat glass`.
- **Readable on phones.** In the bb mobile app and phone browsers, the New
  thread Recent list and project row sit on frosted cards, and Sheer chats use
  Glass's fill, so text stays clear when the wallpaper fills the screen.
  Desktop is unchanged.
- **Video wallpapers.** Upload an MP4 (H.264) or WebM loop up to 24 MB and
  4,096 px per side, so a 4K loop plays in full colour. Videos play muted and
  looped. Turn the texture off to show the video exactly as encoded, or keep
  Capy dithering to render it through the pixel effect.
- **Animated GIF wallpapers.** Upload a GIF up to 8 MB and 4,096 px per side.
  It plays frame by frame through the dither effect, at the GIF's own timing.
  Turn the texture off and the GIF plays as it is.
- **Photo wallpapers.** Upload a PNG or JPG up to 32 MB; large images are
  resized to fit the 2 MB stored-image limit. Choose how the dither texture
  moves across the photo: Wave, Ripple, Diagonal drift, Shimmer or Still.
- **Patterns without an image.** Drifting noise, Warp, Falling dots, Sine
  wave, Ripple, Swirl or Lit sphere, in lavender or your BB theme color.
- **Dither styles.** Grain, or a 2×2, 4×4 or 8×8 ordered grid.
- **Six saved slots.** Save an image with its appearance and switch with one
  click, from Settings or with `bb aura-motion use <1-6>`.
- **Where it shows.** Full or half wallpaper on New thread, and optionally in
  every conversation. The settings preview switches between Chat and New
  thread so you can see either before applying.
- **Activity overview (optional, off by default).** A GitHub contributions,
  PRs and reviews summary below the New thread composer.

## Performance

Animation runs at 15, 30 or 60 FPS at one of three render-quality tiers, and
pauses when the panel is hidden or off-screen and when your system asks for
reduced motion; videos pause in the same cases. If WebGL is unavailable, the plain image or gradient shows
instead. With Reduce Transparency turned on, every glass surface turns solid.

## Requirements

- Images stay on your BB server and are never sent anywhere else.
- The activity overview needs the GitHub CLI signed in on the BB server
  (`gh auth login`). It makes no requests while it is off.
- GIF playback through the dither effect needs WebCodecs' ImageDecoder, which
  Chromium-based browsers provide. Without it, the GIF's first frame shows.
- Install Aura Motion instead of Aura, not beside it: both draw a background
  on the same panels.

## Credits

Aura Motion is a fork of
[Aura](https://github.com/MateoCerquetella/bb-plugins/tree/main/plugins/aura)
by Mateo Cerquetella, under the MIT license. The dither shaders come from
Capy and Paper Shaders (Apache-2.0).
