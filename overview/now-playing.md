Control your music without leaving bb.

## What you get

- A **Now Playing** button in the sidebar footer. It opens a small player
  with the track, album art, a seek bar, play and pause, previous and next,
  shuffle, repeat, and volume.
- Seven player styles: Default, Minimal, Cover, Hi-Fi, Terminal, Pocket, and
  bb-amp, a skin in the style of the desktop MP3 players of around 2000. Pick one on the plugin's settings page or with
  `bb music style`. Hi-Fi, Terminal, Pocket, and bb-amp take an accent color.
- Styles that follow your bb theme. They take their colors from the active
  palette in light and dark mode. If an accent is hard to read on a theme,
  the player adjusts it.
- Support for Spotify and Apple Music on macOS. On Linux and Windows it also
  controls other players, such as browsers and VLC. By default the player
  follows the app that is playing. A setting can lock it to Spotify or Apple
  Music.
- A `bb music` command that does the same from a terminal or an agent.

## How it works

The plugin drives the music app on the computer that runs the bb server. It
needs no account link or API key.

- On macOS it uses Automation. The first time the plugin controls an app,
  macOS asks if bb can control it.
- On Linux it uses MPRIS through `playerctl`.
- On Windows it uses the Windows media controls, the same ones as the media
  overlay.

Streamed Apple Music tracks do not share their album art with other apps. To
show it, the server asks Apple's public iTunes Search API for the cover. It
sends only the artist and the track title. A setting turns this lookup off.
Library tracks use their own art, with no lookup.

The player works from any bb client, but it always controls the server's
computer.

## Limits

- Spotify needs its desktop app.
- Linux needs `playerctl`, and the bb server must run in the desktop
  session.
- Windows media controls have no volume, so the panel shows no volume
  control there. Some players do not report shuffle or repeat.
- The plugin cannot search for music or start a playlist. Pick music in the
  app.
- Spotify has no "repeat one" mode, so repeat turns on or off there.
- When the iTunes Search API has no match by the same artist, a streamed
  Apple Music track shows a music note.
