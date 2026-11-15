## What it is

BB draws Mermaid in chat and in Markdown previews, and nothing else. Diagram
Fences adds the rest of the toolchain developers actually use: PlantUML,
Graphviz, D2 and the wider Kroki family, as fenced code blocks that render where
you read them.

## Where it renders

- Assistant replies: a `plantuml`, `dot` or `d2` block becomes a diagram with a
  source toggle, copy, and open-in-tab controls.
- Markdown file previews: the same blocks draw in the right panel, where BB's
  code-fence slot does not reach. A content script swaps the code block for the
  diagram and leaves the file untouched.

## Local engines

Settings lists each engine with the binary it resolved, its origin, and its own
buttons:

- Graphviz uses `dot` when it is installed and a bundled WASM build otherwise,
  so boxes-and-arrows always work offline.
- PlantUML is the official native binary, downloaded from the settings screen
  or on first use — no Java, no server. It draws in about 0.2 s.
- D2 is the official binary, installed the same way; Kroki covers it until then.
- A custom path can point any engine at a binary you already have.

Everything else goes to Kroki, public or your own instance.

## Cost

Each engine runs per diagram and exits; at most two run at a time. Diagrams are
cached by content hash, and a preview draws only the fences near the viewport,
so scrolling a long file or switching threads costs nothing.

## Modes

`Auto` (default) picks a local engine when one exists and kroki.io otherwise.
`Local only` refuses to leave the machine. `kroki.io` and `Own Kroki URL` cover
the hosted cases, including a self-hosted Kroki for private diagrams.

## Safety

Rendered SVG is shown through an `<img>` blob, so a diagram cannot run script in
the bb page. Files are written only inside the plugin's own data directory, and
diagram source reaches kroki.io only in the modes that name it.
