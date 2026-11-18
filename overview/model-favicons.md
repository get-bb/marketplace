Give every agent its own logo, so custom ACP agents stop sharing the generic Toolbox mark.

## What you get

- A real mark for the agents BB leaves on the Toolbox glyph: ZCode draws the Z.ai logo, Kimi Code draws the Kimi swirl, and MiniMax Code draws its monogram in the model picker and every provider list.
- Nine bundled marks — GLM, Kimi, MiniMax Code, OpenCode, Qwen Code, Claude, Codex, Gemini, and a neutral agent mark for a custom agent with no vendor logo.
- A `bb model-favicons` command, so an agent sets a mark from a terminal: `bb model-favicons set acp-zcode glm`.
- A Model Favicons page in the left sidebar for setting and clearing marks by hand.

## How it works

BB draws one icon per provider, never per model: every model row in a picker inherits its provider logo. This plugin registers a mark per provider id through BB's provider-icon extension, so a registered mark replaces the provider logo and follows the theme in light and dark.

The choices live in this plugin's own storage on the BB server, one map per installation. A change applies everywhere at once, with no reload. The plugin changes presentation only: provider authentication, model selection, and agent execution stay with the configured ACP provider, and disabling the plugin restores BB's default icons.

## Requirements

BB 0.49 or newer with a configured ACP provider. There are no plugin settings, accounts, or external services, and no data leaves the machine.
