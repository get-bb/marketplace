Agent Graph replaces scrolling through agent logs with a map. Each project, thread, turn, tool call, subagent and workflow agent is a node, drawn live as the work happens.

## What you get

- **Color by type or status.** Tool calls are split into shell, file edit, read/search and web, each with its own color and icon. A corner dot shows status, and running work pulses with animated edges.
- **Click any node** for its status, duration, input, output and last step. Subagents show the report they handed back.
- **Collapse and expand** subtrees. Finished turns start collapsed, and long runs of tool calls fold into "+N earlier steps".
- **Jump to running work** with one click or the `J` key, or filter to active work only.

## Where it appears

- An **Agent Graph** page in the sidebar showing every recently active thread, with a right-panel tab to chat with any thread while you watch the graph.
- A **graph button in each thread's header** that opens the graph beside the chat, for this thread or all threads.
- A `bb agent-graph` command that prints the same graph as a text tree, so agents can see what their siblings are doing.

Agent Graph only reads your threads through the bb plugin SDK and makes no outside network requests.
