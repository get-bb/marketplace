## A familiar face for every thread

Recognize your workspace’s conversations with small text faces like `ʕ•ᴥ•ʔ`
and `(⌐■_■)`. Each thread starts with a stable generated face in its header,
so returning to a conversation feels familiar across sessions.

## Make it yours

Click the face to open a picker with 12 named presets. Choose a favorite,
write your own custom asciimoji, or use Surprise me for a different preset.
Every thread automatically gets a deterministic expression from the thread ID; child
threads share their parent's hash-selected eyes. Reset to default returns to the thread’s automatic face.

Choices are saved in bb and updates sync between connected windows. Each
visible thread has its own control, including in split views. Custom faces
can contain up to 40 characters on a single visible line.

## Display and animation

In Settings → Plugins → Asciimoji, toggle the header face and optionally show
faces beside threads in the sidebar. Sidebar faces are off by default and
follow your saved choices without changing titles.

Enable Use theme color to color faces with your theme’s primary color in the
header, picker, and sidebar. This optional setting is off by default and follows
theme changes automatically.

Choose Off, Subtle, or Playful animation. Subtle adds a small entrance and hover
wave; Playful adds a gentle idle bob. System reduced-motion preferences disable
these animations. Changes to settings take effect immediately.

Enable Show activity expressions to see running, waiting, and error feedback.
Generated faces change their eyes; presets and custom faces use a small marker.
Generated faces blink when idle and animated. Their expression frames keep a
stable width, and a shared clock pauses in hidden windows and for reduced motion.
Activity is on by default and follows BB's reported state.

## Shell controls

Use `bb asciimoji get`, `bb asciimoji set '<face>'`, `bb asciimoji shuffle`,
`bb asciimoji generate`, and `bb asciimoji reset`. Commands target the current thread, with an optional
`--thread` for another conversation and `--json` for structured output.

## Requirements

Requires bb 0.45 or later and Plugin SDK 0.6.15 or later. The plugin uses the
experimental thread-header and app-overlay slots, plus a content script that
decorates bb’s thread rows. No external service, account, or API key is
needed. Faces do not change conversation titles or agent prompts.
