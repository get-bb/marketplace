## What you get

A sidebar of parallel threads reads like this:

```
feat: csv export
fix: login redirect loop
review: rate limiter changes
ops: staging deploy pipeline
```

The category is one word for the kind of work. The name is two or three words about the subject of the task, in the language the task is written in. Everything is lowercase. The default categories are feat, fix, refactor, review, docs, research, ops and agents, each with a short description of the work it covers.

## Your own categories

The plugin's settings page has two fields. **Categories** takes one category per line as `name: what it covers`, from 1 to 16 of them. **Example names** takes up to 12 sample titles that show the model the style; an example whose category is not in your list is left out. bb refuses a value that breaks the format and says what is wrong. The same fields can be set from a terminal with `bb plugin config thread-names set categories "..."`.

## How it works

The plugin adds a thread-title service called Short thread names. After you select it with `bb settings ai-services set thread-title short-names --plugin thread-names`, it takes bb's title request, keeps the thread material (the task, later messages, agent replies, the current title), puts the naming rules and your categories on top, and sends it to bb cloud, the service that writes bb's default titles. The reply is lowercased before bb shows it.

When a first prompt is shorter than five words, bb keeps the prompt text as the title. After each finished turn, the plugin regenerates the title of any thread that is not yet in the `category: name` form, at most twice per thread. A thread that had the form and was then renamed by hand is left alone. A request that is not a title, such as a commit message, passes to bb cloud unchanged.

To go back to bb's own titles, run `bb settings ai-services set thread-title automatic`.

## Requirements

- bb 0.49 or later.
- A bb account signed in on this bb, with bb cloud on. Titles count against the bb cloud daily budget, and no API key is needed.
- Turning bb cloud off with `bb ai off` stops the service at once.
