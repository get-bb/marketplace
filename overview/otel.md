## What you get

- One span for each finished turn, with model, token counts, cache tokens and cost, in GenAI semantic-convention attributes.
- Thread, project and environment ids, plus the project name, on every span. A delegated thread joins the trace of its parent.
- Token, cost, duration and thread-lifecycle metrics.
- Provider quota windows (used percent, reset time) as gauges.

## Privacy

The plugin never exports prompts, replies, tool input or output, thread titles, file paths or error messages. There is no setting to turn that on.

## Requirements

An OpenTelemetry collector that you run and that accepts OTLP/HTTP.

## Set up

Set the OTLP/HTTP endpoint of your collector, and the headers it needs. Nothing is sent until the endpoint is set.
