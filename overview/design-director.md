Every task that touches a screen ends with a critic looking at it. The critic
gets a screenshot and nothing else — no code, no diff, no previous critique, no
round number — so the agent that built the screen is not the one deciding
whether it worked.

## What you get

Three tiers. The skill asks which one you want before it spends anything past
the cheapest, and defaults to skipping when nobody is there to answer.

- **Spot check** — runs unasked at the end of any task that changed a surface:
  a pairwise comparison against the last screenshot, a rules tally against the
  brief, at most two nudges, no score. One call, about ten seconds.
- **Review** — for a surface whose baseline slipped. Three critic repeats per
  round on the current direction, scored, median reported. About two minutes
  per round.
- **Redesign** — for a new surface. A cached reference brief, three seeded
  directions each scored, then critic rounds until the score stops moving.
  The most calls of the three tiers by far.

Each design keeps a Markdown record on disk: the baseline per surface, every
critic round with its median and spread, the Lighthouse scores, and the
directions that were rejected with the model and date each was tried — so a
direction that failed this month can be retried on a newer model.

## How it works

In bb each critic is a hidden child thread spawned with `bb thread spawn`, with
the screenshot attached as an image. `scripts/bb-critics.sh` handles the
spawning, waiting and score parsing, and three repeats run at once. Critics
prefer the `claude-code` provider when bb has one, then the session thread's
own provider; `DESIGN_DIRECTOR_PROVIDER` overrides both.

The scoring critic is always an Opus-class model and the spot check never
produces a number. Both come from a bench of eleven real sites: the smaller
model picked the better of two screenshots 20 times out of 20, yet ranged from
1 to 7 scoring identical input in the same run.

## Requirements

- Chrome or Chromium, on `PATH` or in `/Applications`, for the screenshots.
- Node 18 or newer for the screenshot script that drives Chrome over CDP.
- `npx lighthouse` for the accessibility gate, fetched on first use.
- Critic runs spend tokens on your own provider account. The cost depends on
  the model you pick and the tier: a spot check is one call, a redesign is
  dozens.
- Optional image and video generation keys (`OPENAI_API_KEY`, `GEMINI_API_KEY`,
  `FAL_KEY`) in a gitignored `.env.agents`. Without them the skill says so in
  one line and uses documented fallbacks.
- Only the Claude configuration is calibrated. The score findings above were
  measured on Claude models; a run on `codex`, `pi` or an ACP agent is a separate scale
  whose scores are internally comparable and nothing else, which is why the
  record logs the provider and model beside every score.

## Credits

The framework comes from Anshu Chimala's
[How to turn your AI into a world-class designer](https://www.lennysnewsletter.com/p/how-to-turn-your-ai-into-a-world);
the tiers, the brief and the split score come from measuring it.
