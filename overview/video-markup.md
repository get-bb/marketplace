## Put feedback on the frame

Open a product demo or screen recording in the Video Markup thread panel. Pause, step through frames, and leave a note with a box, arrow, or zoom region. Each note keeps its timestamp, captured still, and marked region.

Select up to 12 actionable notes and choose **Add to prompt** to place their context in your draft. When you send it, the agent receives the feedback and captured stills. Adding notes never sends a message for you.

## Review successive versions

Keep multiple demos and their versions together in a thread. Unresolved notes carry into the next version, preserving the original frame and version they describe. Mark feedback **fixed**, **still wrong**, or **regressed** as you review.

The bundled Product Demo Direction skill guides agents through reading open notes, making revisions, and presenting the next cut for review.

## Requirements and storage

Requires bb 0.43.4 or newer. Install **ffprobe** on the machine holding your videos for automatic metadata and exact frame timestamps. Without it, frame stepping needs a supplied, known constant frame rate. H.264 MP4 offers the broadest playback compatibility; MOV and WebM depend on your browser's codec support.

No external account is required. Notes and captured stills are stored in plugin-owned SQLite on the bb server. Temporary composer attachments are copied into persistent plugin storage on their host. Other videos are referenced in place: keep each version at a distinct, durable path. The plugin does not render or transcode videos.

## Plugin access

Plugins run with bb's full access; read one before installing.
