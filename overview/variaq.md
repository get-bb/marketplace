VariaQ brings the standalone [VariaQ](https://github.com/aaronphifer/variaq) hybrid-compute research platform into bb. It is a thin, validated adapter: bb tools and the `bb variaq` CLI forward your request to a VariaQ install you control, and every result is VariaQ's own.

## What you can do

- **Generate and import problems** across VariaQ's generic families (`maxcut`, `assignment`, `subset-selection`, `graph-partition`), deterministically seeded.
- **Solve, benchmark, and compare** with classical solvers (exact, heuristic), QAOA, and optional CUDA-Q CPU/GPU solvers when your environment provides them.
- **Plan and run campaigns**: bounded experiment grids with VariaQ's max-run guard preserved, then list, show, analyze, and report on them.
- **Analyze and report** quality, feasibility, timing, resource, and scaling summaries computed by VariaQ itself; JSON/CSV/Markdown (and optional plots) reports land under a contained output directory.
- **Reproduce runs** from stable run IDs, preserving lineage and environment differences.

## How it works

The plugin shells out to your VariaQ install via an argument-array subprocess boundary with bounded output and timeouts — no Qiskit or CUDA-Q code is duplicated in the plugin, and no plugin-side science is added. VariaQ JSON envelopes are validated against schema version `1`; structured VariaQ errors, warnings, and exit semantics are preserved end to end.

Configure it with `bb plugin config variaq set pythonPath <variaq-checkout>/.venv/bin/python` (auto-discovery also supported), then check `bb variaq status` for detected solver availability.

## Compatibility

Requires bb 0.46.x / Plugin SDK 0.6.37 and a separate VariaQ install. Supports VariaQ 0.6.x and 0.8.x stable series plus the tested 0.8.0rc1 candidate; unsupported versions are rejected rather than silently accepted. `paired_solvers` comparisons are available on VariaQ 0.8.x.

No physical QPU execution, remote quantum providers, or external domain semantics are part of this plugin. CUDA-Q GPU support is explicitly opt-in via environment variable and requires a working local CUDA-Q + NVIDIA setup.