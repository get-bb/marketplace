## What you get

Thread titles that fit a narrow sidebar. Any title longer than the limit is cut to its first words (four by default), and trailing punctuation and dangling short words left by the cut are removed.

Example with the default limit: "Update docs for the new API" becomes "Update docs", not "Update docs for the".

## Setting

Maximum words in a title: a whole number from 2 to 12, default 4. Change it on the plugin's settings page. A title that already fits is never touched.

## How it works

bb has no title-length setting, so the plugin shortens titles after they are written. It checks the thread when it is created, when a turn starts and when a turn finishes, and updates the title only if it has more words than the limit. Words are split on whitespace.

After the cut, a trailing article, preposition or conjunction (short English and Russian lists, such as "the", "and", "for", "в", "и") is dropped. At least one word always stays.

## Things to know

- The plugin cannot tell who wrote a title. A title you typed yourself is shortened too, and the full title is not kept.
- It counts words, not meaning, so a cut can lose the important part of a title.
- The ending-word lists are short and fixed; an unlisted word can still end a title.
- Because the change happens after the title is set, a long title may be visible for a moment before it is trimmed.
- Languages written without spaces between words are not split into words, so those titles are rarely cut.
- Requires bb 0.49 or later. No pages or commands.
