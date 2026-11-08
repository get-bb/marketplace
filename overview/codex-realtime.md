Voice Mode normally needs an OpenAI API key, billed separately from your ChatGPT plan. This plugin
lets it use the ChatGPT sign-in that the Codex CLI already keeps on the machine running the bb server,
so your voice chats run on your ChatGPT subscription instead.

## What you get

- Voice Mode voice chats with no OpenAI API key. Voice Mode stays on its default Connection: auto
  setting and picks this plugin up by itself.
- A Realtime model setting, gpt-realtime-2.1 to begin with.
- A list of the plugins allowed to use your sign-in: only Voice Mode to begin with. The bb app, the
  command line and agents in threads never receive it.

## What it never does

- It never renews your Codex sign-in and never writes Codex's files. Codex renews its own sign-in;
  when it has expired, run codex once, or codex login.
- It never pretends to be the Codex app, and never logs or shows the token.

## Read this first

- This is an undocumented use of the ChatGPT subscription. OpenAI documents its Realtime API for API
  keys, and already refuses the ChatGPT sign-in for one of its voice models, so this can stop working
  at any time.
- OpenAI's terms have not been checked. Whether they allow another program to use the Codex sign-in
  this way is for you to decide.
- Voice chats count against your ChatGPT plan.

## What you need

- bb 0.46 or later and Voice Mode 0.1.9 or later.
- The Codex CLI, signed in with Sign in with ChatGPT, on the machine running the bb server.
- A ChatGPT plan that includes Codex.
