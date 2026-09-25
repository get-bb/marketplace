Lame duck helps you update and restart a busy BB server. When many threads are
running, agents are messaging each other, and follow-ups keep arriving, waiting
for BB to become idle on its own can be difficult.

Enter lame-duck mode to queue message sends while active turns finish. New work
stays in BB's durable queue instead of keeping the server busy. Once active
threads have drained, BB is ready for maintenance. Update and restart BB, then
leave lame-duck mode to resume the queued work.

From the bb-plugins repository, install with:

```sh
bb plugin install path:. --plugin lame-duck --yes
```

## Manual maintenance

1. Click the duck icon in the sidebar footer and choose **Pause sends**.
2. Watch the active-thread and held-send counts. Wait for **Ready to update**.
3. Update and restart BB using your usual server-management process.
4. Once BB is healthy again, open the duck disclosure and choose **Resume**.

The pause and queued messages survive the restart. Restarting BB does not
leave lame-duck mode automatically.

## Maintenance managed by an agent

Agents that manage your BB servers can use the CLI for the same workflow:

```sh
bb lame-duck pause
bb lame-duck status --json
# Wait until status reports drained: true.
# Update/restart BB using your server-management commands, then check health.
bb lame-duck resume
```

Poll `status` until `drained` is true (`paused` and zero `runningCount`). The
maintenance agent or script must run outside the BB instance being drained,
or hand off the remaining steps to an external process and finish its turn.
A maintenance agent running inside that instance counts as active too; waiting
for itself to drain would prevent the restart workflow from progressing.

Use `resume` to disable lame-duck mode; keep the plugin itself enabled.
Repeating `resume` is safe. Core rechecks queued work in order, respecting
scheduled times, per-thread ordering, and other plugin limits.

## Behavior and limits

Pause applies across this BB server. New threads, follow-ups, steering,
scheduled sends, and retries wait in the durable message queue. Existing turns
continue until they finish or require input. A turn waiting for a queued reply
may need attention before it can drain; the plugin does not force it to stop.

SDK clients can use the typed RPC contract in `contract.ts` with
`sdk.plugins.callRpc({ pluginId: "lame-duck", method: "status", input: null, outputSchema: lameDuckContract.status.output })`
(and the `pause` / `resume` methods).

Keep the plugin enabled throughout maintenance. Disabling or removing it removes
its dispatch hook. Explicit **Send now** on a queued row overrides plugin holds;
avoid it while draining. Messages can only be accepted while the server is
online; this plugin does not add an offline client outbox. It does not perform
server updates, stop threads, or answer interactions on their behalf.

`heldCount` counts durable queue rows whose current wait owner is Lame duck.
Messages currently owned by another plugin or a core wait are not included.
The disclosure refreshes on queue events and periodically while open.
