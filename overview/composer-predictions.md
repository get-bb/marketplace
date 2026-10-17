After an agent replies, the next thing you type is often obvious. Composer
Predictions reads the conversation and suggests that message as faint ghost
text in the empty message box. Press **Tab** and it becomes an ordinary draft
you can edit. Nothing is ever sent for you.

## What you get

- **Tab to insert.** Plain Tab fills the empty box with the suggestion and
  focuses it. Shift+Tab keeps its usual behaviour.
- **Out of your way.** Typing, pasting or Escape hides the suggestion until
  the conversation moves on. Nothing shows while the thread is running or the
  draft has text, mentions or attachments.
- **Your choice of model.** By default it uses the conversation's own provider
  and model at low reasoning effort. In **Settings → Plugins → Composer
  Predictions**, pick a separate provider, model, effort and service tier with
  BB's native picker.
- **Survives restarts.** Suggestions, abstentions and dismissals are saved and
  checked against the current conversation before they are shown again.
- **Silent when unsure.** The model can suggest nothing when there is no clear
  next move.
- `bb composer-predictions show|regenerate|dismiss <thread-id>` and a bundled
  agent skill for checking why a suggestion is or isn't showing.

## Safety and cost

Tab only fills an empty draft through BB's public composer API, and the plugin
never submits a message. Each prediction is one request in a hidden helper
thread, never in your conversation, archived and stopped as soon as it
finishes, fails or reaches its 60-second timeout. Normal provider usage
applies. Once you open a thread with an empty message box, each later reply
there costs one request, even when you are not looking at it, until the thread
is archived or deleted or the plugin restarts. At most two helpers run at
once, and an unchanged conversation reuses its saved result.

Each request carries up to 48,000 characters of recent messages and tool
output by default. A separate prediction model's provider receives that too.
The plugin's database stores the suggestion, its status and a fingerprint,
not your conversation. BB keeps each helper's history as an archived hidden
thread. The helper is told not to use tools and runs in `auto` permission
mode; it is stopped if it asks for approval or input, but it is not a
tool-free sandbox.

## How it works

The plugin rebuilds up to 400 recent events (your messages, the agent's
replies and completed tool records), capped at a character budget of 48,000
by default. A fingerprint of the conversation, prompt, model and budget
decides whether a saved result can be reused. BB has no ghost-text slot yet,
so the overlay relies on BB 0.46 composer markup; if it cannot find its own
composer, it shows nothing and leaves Tab alone.

## Requirements

bb 0.46 or later, and a provider that supports BB's `auto` permission mode,
with the prediction model available on the conversation's machine.
