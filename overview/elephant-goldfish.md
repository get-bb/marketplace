## What you get

A spec workspace for BB that adapts Google's
[Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model).
Your design documents stay as Markdown files in your project checkout. A
**Spec workspace** page in the sidebar lists the registered specs of each
project, and an **Elephant Goldfish** tab beside each conversation shows the
same reviews, findings and proposals inside the thread where the work happens.
Seven agent skills (brainstorm, draft, staged review, review loop, resolve,
drift report, bootstrap) cover the workflow from idea to reviewed document.

## How it works

The model separates three roles:

- **Elephant** — your normal BB conversation. It knows the project and the
  decisions behind the spec. It can contest a finding with a rationale or
  propose a revised document, but it never edits the spec directly.
- **Goldfish** — the fresh-context reviewer. Each review stage is prompted
  with only the reviewer persona, the document standard, the numbered spec
  and the context files you selected, so it carries none of the
  conversation's history. In the Advanced endpoint mode those prompt inputs
  are all it ever gets; a BB worker reviewer receives the same prompt but
  also keeps BB's normal tool permissions and can read the workspace within
  them.
- **You** — the human who decides. You resolve findings (request fix, accept
  trade-off with a reason, or dismiss), inspect every proposed diff and
  explicitly confirm before anything is applied.

Reviews run in rounds: full pipeline, feature spec, implementation readiness,
chosen brainstorm lenses, or custom reviewers. A successfully applied change
can start the next round automatically once no finding remains unresolved.

## Reviewer engines

**BB workers** are the default. Each stage launches a new BB worker thread in
the reviewed project's environment. Workers can use tools and write according
to BB's permission mode, so the first launch requires explicit
installation-wide consent, revocable at any time. BB worker threads are not a
sandbox; revoking BB's own permissions is what changes what workers can do.

**Advanced endpoint** is the optional tool-less mode: a fresh
OpenAI-compatible model call that receives only the persona, standard, spec
and chosen context files. It cannot read other files, run commands or change
anything, and tool-call responses are rejected. It needs a base URL ending in
`/v1`, a model id and an API key stored in BB's plugin secret store. If the
selected engine is unavailable, the launch is refused with its reason; the
plugin never substitutes another engine.

## What is never automatic

Drafting an Elephant request only fills the composer draft — you review and
send it yourself. The Elephant proposes changes; it does not apply them.
Applying a proposal always needs your explicit confirmation against its diff,
with a version check and a backup, and the plugin never blindly re-applies a
change after a restart. No commits, pushes or issue sync are performed.
Reviewer context is an explicit reading list; linked files and URLs are never
fetched automatically.

## Requirements

BB 0.47 or newer, Plugin SDK 0.6.79, and a local project checkout visible to
the BB server. Markdown specs live in your repository. BB workers use the
provider and model configured for the reviewed project's BB environment; the
Advanced endpoint mode needs an OpenAI-compatible endpoint and key instead.
The plugin works with local sources and does not operate on specs stored on
another enrolled machine.
