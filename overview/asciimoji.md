## A familiar face for every thread

Recognize your workspace’s conversations with small text faces like `ʕ•ᴥ•ʔ`
and `(⌐■_■)`. Each thread starts with a stable generated face in its header,
so returning feels familiar across sessions.

## Make it yours

Click the face to open a picker with 12 named presets. Choose a favorite,
write your own custom asciimoji, or use Surprise me for a different preset.
Every thread automatically gets a stable generated face. Automatic children in the same generated family share their parent's eyes across generations. Use automatic face removes a saved thread override.

Choose a generated face family: Classic, Bears, Robots, Cats, or Minimal.
Precedence is Thread override → Project override → Global default. Set **Project default**
in the picker to style a project's automatic faces, or choose **Use global default**
to inherit the global **Default face family**. Thread family selections, presets, and custom
faces are saved overrides. Previously saved version-1 faces keep their appearance.

Choices are saved in bb and sync between connected windows. Each
visible thread has its own control, including in split views. Custom faces allow up to 40 Unicode code points on one line. The editor previews drafts, counts characters, and rejects invisible faces. Retry controls recover failed loads. Sidebar faces also open the picker when the header is hidden.

## Display and animation

In Settings → Plugins → Asciimoji, toggle the header face and optionally show
faces beside threads in the sidebar. Sidebar faces are off by default and
follow your saved choices without changing titles. Sidebar width is Compact (6ch),
Standard (10ch), or Expanded (16ch); long faces truncate with full text in tooltips
and assistive labels.

Enable Use theme accent color to color faces with your theme’s primary color in the
header, picker, and sidebar. This optional setting is off by default and follows
theme changes automatically.

Choose Off, Subtle, or Playful animation. Subtle adds a small entrance and hover
wave on working threads; Playful adds a gentle bob while working. Idle,
waiting, and error faces stay still. System reduced-motion preferences disable
these animations. Changes to settings take effect immediately.

Enable Show activity state to see running, waiting, and error feedback.
With Expressions, generated faces change eyes and custom faces use saved expressions
with marker fallback; with Markers, all faces keep static text plus a marker (·, ?, !).
An Appearance preview shows all states and truncation without changing settings.
Header and sidebar share activity reads, refreshing only threads that change.
Activity is on by default and follows BB's reported state.

## Shell controls

Use `bb asciimoji get`, `set '<face>'`, `shuffle`,
`generate --family bear`, `vary`, `favorite`, `library --json`, `project-default robot`, `project-default inherit`, and `reset`. Optional `set --running`, `--waiting`, and `--error` flags save custom expressions. Commands target the current thread, with an optional
`--thread` for another conversation and `--json` for structured output.

## Requirements

Requires bb 0.45+ and Plugin SDK 0.6.15+. The plugin uses the
experimental thread-header and app-overlay slots, plus a content script that
decorates bb’s thread rows. No external service, account, or API key is
needed. Faces do not change conversation titles or agent prompts.

## Reuse favorites

Try another variation saves a different face in the current family. Keep a family saves an override; Use automatic face tracks future defaults. The picker labels automatic choices as Following global/project default and overrides as Saved for this thread.

Favorite current face saves reusable text and expressions across threads. The library holds 50 favorites and the 20 most recent choices, syncs across windows, and persists across reloads. Generated favorites reuse their static text with activity markers.
