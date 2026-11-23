## What you get

A **Servers** item in the bb sidebar. Every server in the list shows its status, hosting provider, price per month and per hour, the first line of its description, and the last snapshot: CPU, memory, disk, load, uptime, cores, processes, swap and network rate. A badge on the sidebar item counts servers that did not answer the last check.

Servers live in groups you create yourself. Open the **Group** dropdown in the server form to add a group by name or delete the selected one. A new install starts with a single group, *Personal*, which cannot be deleted; servers of a deleted group move there after you confirm. Tabs above the list filter by group and show the total monthly and hourly cost of what is visible.

## How it works

- Each server is reached as `root` over SSH with the path to a private key that is already on your machine. The plugin checks that the file is an owner-only private key, stores only its path and never reads or copies the key.
- A check runs every hour and on demand, only while bb is running. The first successful login records the host key in `~/.ssh/known_hosts`; a changed host key stops the check.
- Loopback, link-local and cloud metadata addresses are refused.
- Hosts with an `IdentityFile` in `~/.ssh/config` can be imported after you confirm them.
- Agents get a command line: `bb ssh-fleet list`, `add`, `set`, `check`, and `group list|add|set|remove`.

## Requirements

- bb 0.49 or later and the `ssh` client on the machine that runs bb.
- Linux servers: the snapshot reads `/proc` and `df`.
- Prices are entered in rubles per month; hourly cost is the monthly price divided by 720.
- The interface is in Russian.

## First step

Open **Servers** in the sidebar, press **Добавить** (Add), and enter a name, the host and the absolute path to the private key. Or press **Импорт** to pick hosts from `~/.ssh/config`.
