## Your scheduled briefing

Choose what you want to know and when. Each run arrives in a Briefs inbox as
an ordinary bb thread with a headline, numbered priorities, buttons that open
the page where each task gets done with its domain shown, and collapsible
routine details. Move or archive it when finished; thread search
keeps earlier briefs findable.

Add a brief under a signed-in site in Settings, describe what it should tell
you, and choose a schedule. Run it immediately to preview the result. Starter
recipes cover unread email, money, and reading; another thread can also publish
a prepared report.

## Gmail read state and recovery

Gmail emails are read in full, including every message in a thread, and left
read by default. Choose **Keep unread** under any Gmail account to preserve
original read states. Briefs never summarizes list previews. Messages that were
already read stay read in both modes.

A saved per-message journal retains the original state across interruptions.
Unverified or failed restoration stays visible in the brief; Retry instructs
the agent to repair those records before collecting more. The journal records
the agent's browser observations; it does not operate Gmail itself.
Each email appears in one brief only: Money gets money mail, Reading gets
newsletters, and copies in several inboxes collapse into one row. Successfully
summarized message IDs are remembered to avoid repeats.

Collection must not send, reply, archive, delete, or change labels or settings.
Marking fully read messages read and restoring known original unread state
are its only permitted explicit Gmail writes. Other sites
are read-only. Task buttons open the page where you can finish the task;
Open email returns to the original message. Opening a button performs no write.

## Requirements and privacy

Install **Automations**, **Browser Automation**, and **Thread Organizer** with
additional-inbox support. Browser collection requires **bb 0.45.0 or later**
on the browser desktop and connected server, a connected browser computer,
and a configured agent provider and model. Runs use that provider's account
and usage allowance. Sign in to your chosen sources—Gmail, X, or LinkedIn—in
BB Browser; Briefs reuses those sign-ins in fresh tabs without copying cookies.
Import opens bb’s own Browser settings.

Signed-out connections show Reconnect. Unavailable or interrupted runs show
Retry. Brief content, definitions, read-state journals, and processed message
IDs stay in plugin-owned storage on your bb server. Content read by the agent
is sent to your configured provider. Optional **Inline Decisions** adds
approval cards for proposed actions; without it, proposals remain plain text.

## Plugin access

Plugins run with bb's full access; read one before installing.
