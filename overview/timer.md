# Floating Timer

Run floating focus timers, custom sprints, and pomodoro blocks anywhere in BB. The overlay keeps time visible without taking over your editor or conversation.

## Capabilities

- **App-Wide Overlay**: Mounts everywhere across BB. Collapses into a non-intrusive floating pill that displays the earliest ending timer, and expands into a full control card when clicked.
- **Drag & Drop Positioning**: Reposition the pill or the expanded card anywhere on screen. Position persists across window reloads and thread switches.
- **Concurrent Multi-Timers**: Track multiple independent sessions at the same time, such as a 25-minute code sprint and a 5-minute break.
- **One-Click Presets & Quick Adjustments**: Start immediately with 1, 5, 10, 15, 25, 45, or 60 minute presets, enter custom durations, or add +1m / +5m to running timers on the fly.
- **Audio & Visual Alerts**: Synthesizes a gentle harmonic completion chime using the Web Audio API without external audio files. Includes a mute toggle right in the header.
- **Thread Header Action**: View the active countdown directly in the thread header bar and toggle the overlay in one click.
- **CLI & Agent Skill**: Manage timers with the `bb timer` command (`bb timer add 25 "Review"`, `bb timer list`, `bb timer pause <id>`).
