## Review dependency exposure

See open Dependabot alerts across the repositories connected to your BB projects. Alerts are grouped by repository, package ecosystem, and dependency, keeping related CVEs and affected manifests together.

The exposure overview summarizes open alerts, unique advisories, affected dependencies and manifests, patch availability, severity distribution, and exposure by repository. Repository and search filters persist between sessions.

## Fix with an agent

Start one project-scoped fix thread for a dependency group. The thread receives every CVE in the group, vulnerable ranges, first patched versions, and instructions to update manifests and lockfiles and run the repository's checks.

An active fix remains linked from its alert group, so you can reopen or resume the thread instead of starting duplicate work.

## Requirements

Dependabot uses the GitHub CLI and does not require BB's GitHub plugin. Authenticate `gh` on the BB server and grant access to repository Dependabot alerts. OAuth and classic tokens need the `security_events` scope; fine-grained tokens need read access to Dependabot alerts.
