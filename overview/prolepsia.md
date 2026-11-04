## Forecast from your BB thread

Ask your agent to prepare a forecasting question, start a Prolepsia run, and read its result later. Forecasts continue on Prolepsia after a tool call ends; the client returns the task ID so you can check progress without starting another run.

## What you get

The `prolepsia_tools` agent tool discovers Prolepsia’s available tools and input schemas. `prolepsia_call` invokes them for questions, forecasts, run modes, credit balances, and other account operations. The same capabilities are available through `bb prolepsia tools` and `bb prolepsia call`.

A bundled forecasting skill teaches the agent how to prepare questions, report task IDs, and check asynchronous forecasts. The client does not automatically retry failed requests or cancel remote runs when you disconnect.

## Requirements

Requires a Prolepsia account and API key with scopes for the operations you use. Forecast runs consume Prolepsia credits and usually take 5–90 minutes; deep runs can take longer. Set your API key in the plugin’s secret setting in BB. This version uses API-key authentication and has no dedicated sidebar page.

Learn more in the [Prolepsia developer documentation](https://prolepsia.com/docs/developers).
