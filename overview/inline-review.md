Long agent responses often need several separate comments: refine one step in a plan, question part of an implementation proposal, or remove a section from a generated draft. Inline Review keeps each instruction attached to the exact passage it concerns, then delivers the complete review as one readable message.

## Review as you read

Select exact text in an assistant response and choose **Feedback** from BB's native selection menu. Add a **Comment** or mark the passage for **Remove** without leaving the thread. Return saves a comment, while Shift+Return inserts a new line.

## Keep the source visible

Staged comments remain marked with a yellow underline and removals with a red strike-through. The compact feedback editor leaves the surrounding response visible. After navigation or a page reload, Inline Review restores a highlight only when it finds one unique visible assistant-text match, while tolerating Markdown layout whitespace. Ambiguous quotes remain safely stored in the review without highlighting the wrong passage.

## Build one revision request

The collapsed **Feedback** banner appears after the first annotation. Expand it to edit or remove items, add Overall feedback, clear the draft, or submit everything together. Enter adds a line to Overall feedback; Ctrl+Enter or ⌘+Enter sends the review. **Send feedback** creates one numbered message in the same thread so the agent receives the quotations and instructions as one revision request.

## Storage and requirements

Each thread has its own server-side draft. Drafts survive navigation, browser reloads, and BB restarts. Inline Review uses no external service and requires no additional account. It supports BB 0.43.x with Plugin SDK 0.4.87.

## Focused scope

Inline Review annotates assistant-message text. It does not annotate user messages or files, and it never changes the original response. A **Remove** item asks the agent to omit or disregard the quoted material in its revision; it does not delete text from thread history. Browsers without the CSS Custom Highlight API retain feedback capture, persistence, review, and delivery without passage coloring.
