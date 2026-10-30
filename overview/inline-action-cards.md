## Answer in the thread

When an agent needs your decision, its card opens in **Waiting on you** above that thread’s prompt box. Choose an option and press Submit, or write an answer to a plain question. Recommended options are marked, never selected for you.

Cards keep the question, action labels and an optional line of context together. Longer context can be expanded. The timeline shows an unanswered card as one line that opens the drawer; after an answer, it shows the result or delivery status.

## Keep track of decisions

The drawer collects the current thread’s waiting items, with urgent items first. Open **Decision log** from the sidebar to review every thread, or from a thread’s panel launcher to review that thread. Waiting items and completed results appear separately.

Dismiss an unanswered card or question from either the drawer or the Decision log. You can add a reason and briefly Undo before dismissal is saved. Dismissal approves no action; the plugin tells the owning thread to stop waiting. If that notice fails, the log offers a way to tell the thread again.

## Review replies before approving

Reply cards show recipients, the subject, the original excerpt and an editable plain-text draft. Draft edits autosave. A send, save-to-Gmail-drafts or retry action on a collapsed log row opens the reply for review before it can be submitted.

The agent uses the saved draft and your approval, then reports the outcome on the card. Failed actions can offer Retry when another attempt is safe, or Check outcome when the result is uncertain.

## Requirements

Requires bb with Plugin SDK 0.5.9 or newer and an agent that follows the included Inline Decisions skill. The package declares bb 0.0.34 or newer; use a current bb release for its drawer and panel surfaces.

Decisions and drafts are stored in plugin-owned SQLite storage, scoped to their thread. The plugin does not connect to Gmail itself. Sending email or saving Gmail drafts requires the agent’s connected Gmail tools and your explicit review and approval of the reply. Other actions require the agent’s relevant connected tools and permissions.

## Plugin access

Plugins run with bb's full access; read one before installing.
