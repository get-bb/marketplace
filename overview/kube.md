## What you get

- A **Kubernetes** entry in the bb sidebar. Its badge counts failing pods and nodes that are not ready, so you notice trouble without opening anything.
- A sidebar toolbar while the panel is open: kubeconfig context, a multi-select namespace filter with pod and problem counts per namespace, one name search shared by every page, cluster health, and the port-forwards you have running.
- **Pods** with Logs and Restart buttons on every row, a jump to the owning Deployment, live CPU and memory, sorting, and a problems-only filter.
- **Deployments**, StatefulSets and DaemonSets with their pods, logs from every pod merged by time, rollout restart, scaling and port-forward.
- **ArgoCD**: sync and health of every Application, the resources that drift, Sync (prune optional), Refresh and Hard refresh, and a link to the ArgoCD web UI. It reads the Application objects with kubectl, so no ArgoCD token or CLI is needed.
- **Nodes**: real CPU, memory and disk usage against requests and allocatable, node pools, memory overcommit, the PVCs mounted on each node, and the pods using most CPU and local disk.
- **Storage**: how full every PVC is, which pods mount it, totals per storage class, claims nothing mounts, and released volumes still costing money.
- **Port-forwards** to any pod, Deployment or Service on 127.0.0.1, with open and copy buttons.
- **Rollout cards in chat**: when an agent deploys, it writes a `kube-rollout` block and the thread shows a live card per workload: restarted, still restarting, not restarted yet, or failed, with the new and old pods. The panel's Rollout check builds the same card by hand.
- Jobs and CronJobs, Services and Ingresses, warning events, recently updated workloads, and `kubectl describe` for every object.
- English and Russian interface, switchable from the toolbar.

## For agents

The `bb kube` command gives agents the same view: `status`, `pods --unhealthy`, `workloads`, `events`, `nodes`, `pvc`, `argocd` and `rollout`, each with `--json`. A bundled skill tells agents to add a rollout card whenever they deploy.

## How it works

The plugin runs your own `kubectl` with your kubeconfig, so any authentication your kubeconfig already uses keeps working. It always passes an explicit context and never changes your current context. Nothing leaves your machine except the kubectl calls to your clusters.

Every action that changes a cluster asks first and names the context. Turn on read-only mode in the plugin settings to hide restarts, scaling, job runs and ArgoCD syncs.

## Requirements

- `kubectl` on the machine running bb, plus any credential plugin your kubeconfig uses.
- metrics-server in the cluster for live CPU and memory. Requests and limits work without it.
- Read access to `nodes/proxy` for disk and PVC fill levels.
- ArgoCD is optional and detected automatically.
