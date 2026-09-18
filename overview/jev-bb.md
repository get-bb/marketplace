## Keep the useful context

Turn on Eco Mode in a thread to let Jev select relevant workspace text before your main agent reads it. Returned excerpts keep original wording and line numbers. Omitted ranges are listed explicitly, so the agent can request the complete source when needed.

## Your provider stays yours

Works through BB tools and a CLI fallback, using your existing provider. It does not rewrite conversation history or intercept other tools. Jev adds its own request and API cost; speed and token savings depend on your workload. Counters report source characters, not billing.

## Opt in for each thread

Requires your own Typesafe API key, stored as a BB secret. Requested file ranges and the task go to Typesafe. Use only non-sensitive files you may share. Common credential patterns are blocked, but detection is not exhaustive. Service errors return the unfiltered range.

Read omitted lines with normal tools before editing or concluding that something is absent. Native tool availability depends on the provider integration; the CLI is the fallback.
