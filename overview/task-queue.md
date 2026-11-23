## What you get

- **One card above the prompt box.** Closed, it is a single line: a state dot, the plan name with the ticket in work, and up to three pills such as `2 / 18` (tickets done), acceptance `92%` and the running time.
- **Queues and tickets.** Open it to see the queues ("Очередь 1: ...") with a counter each, and a row per ticket: its owner (for example "Sonnet 5.5" or "Lead: Fable 5.2"), its title and one state word (`queued`, `running`, `review`, `done`, `rework`, `failed` and so on). Acceptance such as `5/6` or rework counts such as `↺2` sit on the right.
- **Hints on hover.** Hover, focus or press and hold a ticket to read its description and its state in plain words: how long it waited, how long it has been in work, who does it, and how many acceptance criteria were confirmed.
- **Time left.** The open card estimates the remaining time from the pace of accepted tickets, and shows one tick per ticket.
- **Agents under their tickets.** With Background Peek installed, a background agent or command shows under the ticket it works on; open the row to see its current command and latest output. Agents with no ticket are named in the plan hint.
- **Phones.** The card stays a full-width card above the prompt box even when the Liquid Glass plugin shows cards as pills.

The card is visible while the thread has an unfinished plan. A finished plan stays for 30 seconds.

## How it works

Agents keep the plan with one JSON operation per call:

```sh
bb task-queue plan '{"id":"v1","title":"Release","epics":[{"name":"Очередь 1: build","tickets":[{"title":"Login page","points":3,"owner":"Sonnet 5.5","criteria":4,"desc":"Login form with error states."}]}]}'
bb task-queue plan '{"id":"v1","start":["Login page"]}'
bb task-queue plan '{"id":"v1","review":["Login page"]}'
bb task-queue plan '{"id":"v1","accept":[{"ticket":"Login page","confirmed":4,"total":4}]}'
bb task-queue plan show
```

The same JSON works through the `task_queue_plan` agent tool. The plugin ships a skill with the full contract. Plans are stored per thread in the plugin's own storage, up to 10 per thread. Nothing leaves your machine and no account or key is needed.

## Requirements

- bb 0.50 or later.
- Optional: the Background Peek plugin, for agents under tickets. Without it the card shows the plan alone.
- Optional: the Thread Materials plugin, to name agents from the thread history; otherwise agents get names from a built-in list of Russian names.
- The card text, hints and time phrases are in Russian. The CLI, tool and skill are in English.

## First step

Ask the lead agent to plan a task with `bb task-queue plan`. The card appears above the prompt box as soon as the plan exists.
