## What you get

Each thread gets computers of its own: a Linux server with a terminal, a Linux, Windows or macOS desktop, or an iPhone, iPad or Android device. You and the agent share the same screen. The agent waits while you have control, and takes it back when you hand it over.

A box joins BB as a machine, with the thread's Git access and variables, so a thread can also run on it.

## What a box can do

- **Desktops and terminals in BB's panel.** Open a box's desktop or terminal beside the thread. Copy files in and out, and browse and edit them in the Files tab.
- **Phones and tablets.** iOS Simulator devices on a Mac, and Android emulator devices on Linux with KVM. Touch, keys, rotation and app installs, from the panel or the agent, and network presets on Android.
- **Snapshots.** Save a box before a risky change, restore it with an undo, or fork it into a new box with its own identity, on the backends that support it.
- **Resize as you go.** More cores, memory, disk or a GPU, from the panel or the agent, where the backend can. A GPU box can share an NVIDIA card or have one to itself.
- **Recordings.** An agent records its test run as a short clip, with each step and its result captioned.
- **The Monitor.** CPU, memory, disk, GPU and processes of every box and machine, in BB's sidebar.

## Where boxes run

You choose the backends, and a box goes to the first one with room:

- Docker on the machine that runs BB, on another host over SSH, or on a BB machine
- microsandbox microVMs on Linux with KVM or a Mac with Apple silicon
- Proxmox VE, as LXC containers or QEMU virtual machines
- Tart virtual machines on your Macs with Apple silicon
- Your own machines over SSH, physical or a VPS
- Hetzner Cloud, Namespace and boat.dev, rented as boxes need them

## Requirements

BB Box starts on the machine that runs BB:

- **Linux**: Docker. The server image needs about 10 GB of disk free and 8 GiB of memory, and builds in 5 to 12 minutes. A desktop needs about 18 GB of disk free and 12 GiB of memory.
- **A Mac with Apple silicon**: microsandbox, which needs nothing installed and runs arm64 Linux boxes as microVMs. It needs about 80 GiB of free disk while it builds its first image. Tart adds macOS, iOS and Windows boxes.
- **Windows**: Docker in WSL 2.

Other backends need their own host or account, such as a Proxmox VE host, or a Hetzner Cloud, Namespace or boat.dev account. The cloud accounts bill you for what boxes use.

BB Box assumes one trusted user. It is not a sandbox for code you do not trust.

## Learn more

- [User guide](https://bbbox.dev/guide/)
- [Setting up backends](https://bbbox.dev/setup/)
