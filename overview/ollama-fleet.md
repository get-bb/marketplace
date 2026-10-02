## Local Ollama infrastructure

Connect multiple Ollama endpoints, inspect health and model inventory, test a
model, and request recommendations or generation with bounded fallback.
Agent tools report the actual selected model and server. Safe job metadata
records routing, running, completed, failed, and cancelled states without
publishing raw prompts, answers, or reasoning.

## Requirements

Requires BB and at least one reachable Ollama endpoint for inference. Agent Board
0.6.0 or newer is an optional dashboard companion; Fleet works independently.
Use local-only routing when cloud-backed Ollama models must be excluded.
The optional Ollama Cloud catalog/Pi configuration commands have separate
network and credential effects documented in the README.
