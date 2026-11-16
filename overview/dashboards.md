## What you get

- Ask an agent in any thread for a dashboard, report, tracker or small tool you want to keep. It writes the dashboard in OpenUI Lang with OpenUI's dashboard components, the plugin checks and saves it, and the reply shows a card that opens it in its own side-panel tab.
- 62 components: OpenUI's 45 dashboard components (KPIs, time series, bars, donuts, tables, funnels, maps and more) plus tabs, record lists with a details drawer, search, toggles, sliders, notes and a sandboxed HTML frame.
- Filters, tabs, search and drill-down respond with no model call. Your choices are remembered in your browser.
- Live data from a JSON or CSV file in the thread's folder, the branch's commits, changed files and pull request, a read-only tool of an MCP server you add, or a script you approve. These refresh without the agent; data only the agent can reach is refreshed by asking it.
- Change a dashboard by asking again, or click Edit, point at a part and say what should change. Every save is a new version; the newest 100 stay viewable, and an old one can be restored.
- A Colours button for your own accent, chart palette and light or dark look, and a Dashboards page that lists every dashboard and holds the Connections section.
- For agents: the `dashboards` skill and the tools `dashboard_save`, `dashboard_get` and `dashboard_sources`.

## How it stays read-only

- Every save is checked: a program cannot contain `Mutation`, links open only http and https, and free HTML runs in a sandboxed frame with no network.
- Only MCP tools that the server marks read-only and that you confirm can be called.
- A script runs on your computer only after you read and approve its exact text. An approved script is not sandboxed, and an agent you allow to run shell commands could approve one through bb's command line.
- Tokens stay in the operating system's secure store, never in the plugin's database, the page or the agent's view.

## Requirements and costs

- bb 0.49 or later. No account and no outside service of the plugin's own: the plugin itself contacts only the web MCP servers you add. Pull request data comes through bb's built-in GitHub pull request plugin, and an approved script reaches whatever its text reaches.
- Measured with the Claude Code provider: an idle thread costs about 17 more tokens; the three tool definitions (921 tokens) and the authoring guide (about 10,500 characters) come in when an agent uses them; one measured build added about 18,400 tokens to its thread. Other providers are not measured.
- Viewing, filtering and refreshing cost no model call. Each change, Edit request, AskAgent click or agent-source refresh is one agent turn.
- Tested on macOS only. Scripts are not supported on Windows. Connections with a token need the system's secure store; the Windows and Linux stores are untested, and Linux needs `secret-tool` with a keyring.
- No telemetry of its own. OpenUI's runtime usage report stays off unless `OPENUI_RUNTIME_TELEMETRY_ENABLED` is set.

Built on OpenUI Lang and OpenUI's dashboard component library: [openui.com](https://www.openui.com).
