## What you get

Your sidebar sections become a workflow: Inbox, then the stages you name, in the order you choose. Every agent working in a thread receives that table of stages and rules in its instructions and moves its own thread with one command when its work clearly matches a rule. Idle threads that need your attention collect in Inbox and go back to their stage when work resumes, so the queue of things to read never hides where a thread actually is.

## Entry prompts

Give a stage an entry prompt and every thread that lands there receives it as a follow-up message, whether you dragged the thread in, an agent moved it, or a command did. A running thread gets the prompt when its current turn ends. A Review stage can tell the agent to run its review checklist, and a QA stage can ask for before-and-after screenshots. Prompts can name the thread and stage with `{{thread.title}}`, `{{section.title}}`, and their ids.

## How it works

Configure everything on the plugin's settings page: rename or reorder stages, describe what belongs in each, and type each entry prompt in place. Inbox routing cannot be changed, and Inbox never carries a prompt. From inside a thread, `bb organizer phase <stage>` moves that thread; `bb organizer section` and `bb organizer prompt` list, add, set, or clear stages and prompts, and each change asks for your approval in that thread before it is saved.

The plugin never renames a thread, never expands or collapses sections, and never classifies prompts to guess a stage. Movement follows the rules you wrote, and prompts fire once per landing with a cooldown, so a thread cannot be prompted in a loop.

## Requirements

Works with any provider you already use. No external service or account.
