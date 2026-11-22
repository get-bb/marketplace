## A sidebar for a fleet of agent threads

WizBar replaces the thread list with three sections, Pinned, Specs and Unread, in the order you choose: drag a section by the grip on its header, or press Alt+Up and Alt+Down with the header focused. Click a header to collapse it; WizBar remembers both the order and what is collapsed. Snoozed and Muted shelves sit below, and Settled is one quiet link at the very bottom.

## Unread

Unread lists only threads with something new for you (unread, waiting on your input, or marked by the host with an unread result or a failure). A running agent of a spec appears under that spec instead. Without a search, Unread also leaves out fleet wakes, and fleet-loop runs for a repository you have bound; any other loop's run can appear when it has something new, because the host does not mark loop runs. While you search, Unread drops its filter.

## Specs

A rule such as `Specs 24 · 5 tickets need you (3 specs)`, then one row per spec from your factory's specs file, specs with a ticket due now first, then the most recently active. A picker switches to Recently active, Closest to done or Newest, and is remembered. Each ticket is a dot: done, building, in review, needs you, later, held or not started. The dot of a ticket whose agent is working breathes slowly unless the ticket is done or in review; a spec with nothing running and nothing due now shows its name muted. Finished specs, and specs with nothing moving for more than 3 days, fold into a collapsed `Quiet N` group. Open a spec to see its running builders and reviewers with their model and effort.

A small producer in the plugin's `tools/specs-producer/` keeps the specs file fresh from GitHub through your `gh` login.

## Cards and running work

Cards show the issue or pull request as a link, a child count with the children on hover, and model and effort in friendly words, such as `Opus 5.5 · High`; a missing model is left out, never guessed. The footer shows "N running", counting threads; hover or focus it for a card of the running threads with their spec and model, which updates in place without flashing. Click to pin it open. Drag a card into Pinned to pin it, out to unpin it, or inside Pinned to reorder it.

## Agent-first

`room-cli wizbar` commands settle, snooze, mute, pin and move threads, list a thread's shelf or children, read the running card and the specs, open or close a spec, and collapse or expand a section, each with `--json`. The sort picker, the section order and the Quiet group have no command. The [README](https://github.com/openwizdev/WizPlugins/tree/main/wizbar#readme) lists every command and its exit codes.

## Theme and settings

Every colour is a host theme variable, so WizBar follows your Cloudroom theme. Switches cover the list-bottom count, Cloud/Local row icons and the two thread-header chips. Upgrading from 0.5.0 keeps every setting.

## What is proven

The behaviour above is covered by WizBar's fixture tests in CI. 0.5.0 was installed from source and run on a real Cloudroom host; 0.6.0 has not been run on a real host yet.

## Credit

WizBar is derived from [Sawyer Hood's T3 Sidebar](https://github.com/SawyerHood/sawyer-plugins/tree/d3424f24e2cebe91da4e72cb38feb023da808922/plugins/t3sidebar) and keeps its MIT notices. Source: [openwizdev/WizPlugins](https://github.com/openwizdev/WizPlugins).
