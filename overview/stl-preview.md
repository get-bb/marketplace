## Inspect the model beside your thread

Open an STL file link or use BB's file picker to load an interactive 3D preview in the side panel. Drag to orbit, right-drag to pan, and scroll or pinch to zoom. Reset view fits the whole model back into view.

## See the mesh

Switch between solid and wireframe views. The footer reports X/Y/Z bounding dimensions and triangle count. Dimensions are model units because STL files do not carry unit metadata.

Reload fetches the latest file after a model changes. Open original preview returns to BB's built-in viewer.

## Your files stay within BB

Workspace, project, host, and thread-storage files use BB's existing authenticated file routes. Selected remote hosts use the same routing. The plugin renders models in your client and does not upload them to an external service or start another server.

## Requirements and limits

Requires BB 0.46 or newer, Plugin SDK 0.6.49 or newer, and WebGL2. Supports binary and ASCII STL up to 64 MiB and one million triangles. Large files can briefly occupy the client's main thread while parsing.

No separate viewer, paid account, or API key is required. This is a viewer, not an editor, repair tool, or slicer.

The MIT-licensed source includes the original mounting-bracket sample shown in the screenshots, plus its parametric source.
