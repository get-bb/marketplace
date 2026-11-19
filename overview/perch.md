## What you get

- **Perch in the thread picker.** Choose one of the four Roost tiers or a named model from Perch's catalog, a reasoning level from Off to Ultra, and the Saffron or Quill persona for each thread. A separate dropdown sets the sub-agent model.
- **Approvals in bb.** bb's permission picker maps to Perch's own modes: Accept Edits runs Default, Auto runs Auto Review, and Full runs Take the Wheel. Any approval Perch still asks for appears in bb. bb's Plan action starts a read-only Perch planning turn.
- **Plan usage.** Settings → Perch shows each Perch meter: the Roost and Manual pools with their 5-hour and weekly windows, the Manual allowance in dollars, and bonus pools. The same meters appear in bb's Provider usage card and from `bb perch usage`.
- **One-off tasks.** `bb perch run` sends a task to Perch with optional model, effort, mode, persona and file attachments, and returns JSON with the answer, the Perch thread ID and token usage. Pass `--thread` to continue that conversation.
- **Defaults in Settings.** Set the default model, effort, permission, chat mode, persona and sub-agent model once. Threads set to Plugin default use the new values from their next turn.

## How it works

The plugin runs Perch's own ACP agent and gives each agent process its own temporary settings file, so your interactive Perch settings stay untouched. Changing a setting between turns restarts the agent and reloads the same Perch conversation. Perch keeps its own history and sign-in.

Text, reasoning and tool activity stream into the thread. Local images go to Perch as images, and other files as workspace references. bb lists skills from `.perch/skills` and `.agents/skills`.

## Requirements

- The Perch CLI (`npm install -g perchai-cli`) and Node.js 22.18 or later on the machine that runs the thread.
- A Perch account. Sign in with `bb perch login` or **Settings → Perch → Open Perch terminals**, which opens Perch's own sign-in in a bb terminal. The plugin never reads, copies or stores Perch credentials.
- bb 0.49 or later. Tested with Perch 2.4.138 and later.

## Limits

Perch's ACP agent has no fork, compaction or slash commands, and it reports no per-turn token counts, so bb's context meter stays empty for Perch threads. Perch decides which models your account can use, and it may map a reasoning level to the closest level a model supports.
