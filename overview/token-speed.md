# Token Speed (TPS)

See an approximate visible-output token rate beside each assistant message's existing actions. The counter follows BB's native hover and focus reveal behavior. Hover or focus the adjacent ⓘ marker to see the full breakdown; the message's native menus remain unchanged.

## What the estimate includes

- The complete assistant message text, including Markdown and code, tokenized locally with `o200k_base`.
- The first chunk's token count and the measured interval between text deltas.
- Known tool execution intervals excluded from the denominator, with overlapping and nested calls counted only once.

Reasoning is not tokenized. Waiting before the first chunk and after the last chunk is not measured. Tool output and provider-wide input, cache, and billing totals do not enter the visible-text token count.

## When speed is unavailable

A single chunk, equal timestamps, a missing or inconsistent stream, incomplete tool timing, or text arriving during an active tool call does not provide a reliable rate. The plugin shows an unavailable speed instead of dividing by the full turn duration. Stored message text can still provide an approximate token count when historical deltas are missing.

## Privacy and performance

Processing stays inside the BB client. Tokenization runs in a local Web Worker. The plugin does not upload message text, call an external token-counting service, or write metrics to a database. Event reads are paginated and limited to mounted message ranges; hidden threads are not polled.

## Requirements and limits

Requires BB 0.46 or later and a compatible Plugin SDK 0.6.37 runtime. The estimate depends on BB's saved stream events and its current message-action markup. Messages without native actions receive no separate counter.

This is an estimate of delivered visible text, not billing usage or an exact model decode benchmark. Unmarked pauses, prefill, hidden tool-argument generation, and delivery delays cannot reliably be separated from generation inside the model. Short replies can be especially sensitive to buffering. All plugin labels and tooltip text are in English.
