# Follow the change, with context

Guided Review turns a GitHub pull request into a reading guide inside BB. Follow related changes in chapters, inspect the diff, ask questions about the focused code, and prepare your review in the same workspace. Local Git refs and ranges are also supported, without GitHub submission.

## Your first review

1. Open Guided Review, then Settings, and check setup readiness.
2. Sign in to GitHub on the machine running BB with `gh auth login --hostname github.com`. Use an account with access to the repository.
3. Paste a pull request link and generate its guide. Read the chapters and check the explanation against the code.
4. Draft comments and a summary, choose a verdict, and select Submit to GitHub when ready.

Requires BB 0.41+, plugin SDK 0.4.34+, Node.js 24+, Git, and GitHub CLI on the BB server. Guide generation needs a configured BB agent provider and project. There is no separate plugin token; generation and assistant answers use your connected provider's normal usage allowance.

## A workspace for your reasoning

- Keep a private checklist in Reviewer notes. These notes stay in BB and are excluded from GitHub submissions and assistant prompts.
- Ask the review assistant about the focused file or selected code. Its conversation stays with the review.
- Track viewed files, use Focus or Full screen, and return to saved guides, drafts, notes, and archived reviews.
- Re-review when the PR changes. Submission checks the reviewed revision and the active GitHub identity before sending feedback.

## Notifications and updates

[Needs You](https://notpritam.in/plugins/needs-you) 0.2.0-beta.3+ can notify you when generation completes or fails, with a direct Open review action. This integration is optional and follows your Needs You notification preferences; Telegram is optional too.

Settings includes manual update checks and optional automatic updates when idle. Automatic updates are off by default and wait for active review work and open review or Settings pages to close. Saved reviews and preferences remain in BB.

## Data and account access

GitHub operations use the server's GitHub CLI credentials. Relevant patches and review context are sent to your configured BB agent provider. Draft feedback stays in BB until you explicitly submit it. The plugin has no separate hosted review service.

Use your own trusted BB installation for your own GitHub identity. A shared BB server shares its selected account, settings, and stored reviews.

Screenshots preview the latest development build with native BB chat and refreshed open/resolved discussions, using synthetic sample PR data and a sample conversation. These UI updates are not yet included in the v0.2.1 tagged release.

[Watch the walkthrough and see setup details](https://notpritam.in/plugins/guided-review) · [Source and documentation](https://github.com/notpritam/bb-plugin-guided-review) · [Release notes](https://github.com/notpritam/bb-plugin-guided-review/releases/tag/v0.2.1)
