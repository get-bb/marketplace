Inspect Azure DevOps builds without leaving your BB thread. The Pipelines tab lists every pipeline in your Azure DevOps project, highlights active runs at the top, and lets you drill into any pipeline or run to follow stage progress live.

## What you get

- **All pipelines by folder**: Search by pipeline or folder name, filter between Default, All, and Running, and open any pipeline in Azure DevOps.
- **Default pipeline picker**: Toggle individual pipelines or entire folders to show on your Default tab so your main builds stay front and center.
- **Live runs and stage breakdown**: Click a pipeline to view active runs with percent complete and stage status, plus recent run history. Click any run to inspect its branch, requester, duration, and every stage while it updates automatically.
- **Agent and CLI command**: Run `bb azure-pipelines status` from the terminal or an agent thread to print running pipelines, percent complete, and per-stage status.

## How it works

The plugin signs in through your local Azure CLI session (`az login`) and reads your organization and project from plugin settings, the current checkout's Azure DevOps git remote, or `az devops configure`. A personal access token with Build (Read) permission is also supported in settings as a fallback.

## Requirements

- An Azure DevOps account on `dev.azure.com` or `*.visualstudio.com`.
- Azure CLI (`az login` and `az devops configure`), or a Build (Read) personal access token in plugin settings.
