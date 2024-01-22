# cgroups

cgroups (abbreviated from control groups) is a Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, etc.) of a collection of processes.

## Features

- Resource limiting
  groups can be set to not exceed a configured memory limit, which also includes the file system cache, I/O bandwidth limit, CPU quota limit, CPU set limit, or maximum open files.
- Prioritization
  some groups may get a larger share of CPU utilization or disk I/O throughput
- Accounting
  measures a group's resource usage, which may be used, for example, for billing purposes
- Control
  freezing groups of processes, their checkpointing and restarting

## Use

Control groups can be used in multiple ways:

- By accessing the cgroup virtual file system manually.
- By creating and managing groups on the fly using tools like `cgcreate`, `cgexec`, and `cgclassify` (from `libcgroup`).
- Through the "rules engine daemon" that can automatically move processes of certain users, groups, or commands to cgroups as specified in its configuration.
- Indirectly through other software that uses cgroups, such as Docker, Firejail, LXC, libvirt, systemd, Open Grid Scheduler/Grid Engine, and Google's developmentally defunct lmctfy.

### Using cgroupfs to manually manage cgroups

You can manage cgroup hierarchies on your system by creating directories on the cgroupfs virtual file system. The file system is mounted by default on the `/sys/fs/cgroup/` directory and you can specify desired configurations in dedicated control files. You need to have root permissions.

1. Create the /sys/fs/cgroup/Example/ directory:

```bash
mkdir /sys/fs/cgroup/Example/
```

The `/sys/fs/cgroup/Example/` directory defines a child group. When you create the `/sys/fs/cgroup/Example/` directory, some cgroups-v2 interface files are automatically created in the directory. The `/sys/fs/cgroup/Example/` directory contains also controller-specific files for the memory and pids controllers.

2. Optionally, inspect the newly created child control group:

```bash
ll /sys/fs/cgroup/Example/
```

By default, the newly created child group inherits all settings from the parent cgroup. In this case, there are no limits from the root cgroup.

3. Verify that the desired controllers are available in the `/sys/fs/cgroup/cgroup.controllers` file:

```bash
cat /sys/fs/cgroup/cgroup.controllers
```

4. Enable the desired controllers. In this example it is cpu and cpuset controllers:

```bash
echo "+cpu" >> /sys/fs/cgroup/cgroup.subtree_control
echo "+cpuset" >> /sys/fs/cgroup/cgroup.subtree_control
```

Users can read the contents of the cgroup.subtree_control file at any level to get an idea of what controllers are going to be available for enablement in the immediate child group.

> By default, the `/sys/fs/cgroup/cgroup.subtree_control` file in the root control group contains memory and pids controllers.

5. Enable the desired controllers for child cgroups of the Example control group:

```bash
echo "+cpu +cpuset" >> /sys/fs/cgroup/Example/cgroup.subtree_control
```

This command ensures that the immediate child control group will only have controllers relevant to regulate the CPU time distribution - not to memory or pids controllers.

6. Create the /sys/fs/cgroup/Example/tasks/ directory:

```bash
mkdir /sys/fs/cgroup/Example/tasks/
```

The `/sys/fs/cgroup/Example/tasks/` directory defines a child group with files that relate purely to cpu and cpuset controllers. You can now assign processes to this control group and utilize cpu and cpuset controller options for your processes.

```bash
echo "2967427" > /sys/fs/cgroup/Example/tasks/cgroup.procs
```

7. Optionally, inspect the child control group:

```bash
ll /sys/fs/cgroup/Example/tasks
```
