Run BB agent threads with the Pi Durable ACID SQLite runtime, offering persistent conversations and deterministic session resumption.

## What it does

- **Durable Agent Sessions:** Replaces stateless process execution with Pi's ACID-compliant SQLite backend. Every message, tool invocation, and thought delta is preserved transactionally.
- **Dynamic Model Discovery:** Connects to Pi's model registry and local extensions, exposing all authenticated models directly in BB without artificial limitations or hardcoded fallbacks.
- **Full Reasoning Spectrum:** Full support for extended thinking controls across all supported reasoning models.
- **Native Skill Integration:** Seamlessly maps `.pi/agent/skills` and workspace skill roots into BB's skill registry.

## How it works

When a thread starts in BB with the Pi Durable provider selected, the plugin spawns its built-in TypeScript runner with dedicated IPC bridge channels. The runner establishes handshake communication, exchanges the model catalog, and streams conversation events into the BB timeline with sub-millisecond latency.

## Prerequisites

Ensure `pi` is installed and logged in on the host machine.
