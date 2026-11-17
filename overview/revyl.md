## What you get

- **Test on Revyl, per thread.** One button in the composer. With it on, the thread's agent (Claude Code, Codex or Cursor) builds, tests and runs iOS apps only on Revyl's cloud, never on a local simulator, and writes a Revyl test when none covers its change.
- **Builds and test runs above the composer.** Each cloud build and test run shows live, then passes or fails. Builds are named by their profile, and a failed one shows the step that broke and Revyl's error.
- **The device beside the chat.** When the agent starts a cloud device, a side pane opens by itself while the thread is open and streams it live, listing each tap, swipe and screenshot the agent sends. When the agent is idle you can tap, swipe and type yourself, or stop the device. After it stops, the pane keeps its last screen and says how it ended.
- **Reports.** Open any run for its recording with a step timeline, each step's screenshot and reasoning, and Revyl's summary.
- **Proof in the reply.** The agent pins live test results and the device screenshots it took in its answer.
- **A Revyl page in the sidebar.** Browse a project's tests and workflows, read past runs and run them.

## How it works

The agent never gets your Revyl key. bb gives a Test on Revyl thread a token that works only for that thread, through a proxy on the bb server that adds the key and removes it from every reply. A thread can act only on the devices, runs and builds it started, with one cloud device and one cloud build at a time. Archiving or deleting a thread stops the devices it left running and cancels its runs.

## Requirements

- A Revyl account and API key. Devices, test runs and cloud builds use your Revyl minutes. Starting a run or a device from bb asks first.
- The Revyl CLI on the machine that runs the bb server: `brew install RevylAI/tap/revyl`.
- bb 0.49 or newer, and a Claude Code, Codex or Cursor thread.
- Verified on iOS. Android uses the same paths but is not verified yet.

## Privacy

The key stays in bb's secret settings on the bb server. For the device pane the plugin records each action and its point, never typed text, and keeps up to the latest 12 screenshots of each recent device. Archiving a thread keeps only those its replies show; deleting it removes them all.

This plugin is unofficial. It is not made by, affiliated with or endorsed by Revyl. Source and documentation: [github.com/vburojevic/bb-plugin-revyl](https://github.com/vburojevic/bb-plugin-revyl)
