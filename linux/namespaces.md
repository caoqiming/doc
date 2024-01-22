# namespaces

## PID Namespace

The PID namespace isolates the process ID number space, allowing each container to have its unique set of process IDs. This ensures that processes within a container cannot see or interfere with processes outside of the namespace.

Commands to Explore PID Namespace:
Global namespace

```bash
ps aux
```

Create pid namespace for isolation

```bash
unshare --fork --pid --mount-proc
```

## Network Namespace

The Network namespace isolates network-related resources such as network interfaces, routing tables, and firewall rules. Each container has its network stack, enabling network isolation and independent IP addresses.

Commands to Explore Network Namespace:
Global namespace

```bash
ip addr
```

Create net namespace for isolation

```bash
unshare --fork --pid --net --mount-proc
```

## Mount Namespace

The Mount namespace isolates the filesystem mount points. Each container has its mount namespace, meaning it can have its root filesystem and different mounts compared to the host system and other containers.

Create mnt namespace for isolation

```bash
unshare --mount --fork bash
```

## UTS Namespace

The UTS namespace isolates the hostname and domain name of the container. This allows each container to have its unique hostname and NIS domain name, independent of the host system and other containers.

Create UTS namespace for isolation

```bash
unshare --uts -- /bin/bash
```

Change the hostname

```bash
hostname newhostname
```

## IPC Namespace

The IPC namespace isolates Inter-Process Communication resources, such as System V IPC objects and POSIX message queues. This prevents processes within a container from accessing the IPC resources of other containers.

Create IPC namespace for isolation

```bash
unshare --ipc -- /bin/bash
```

create new ipc for semaphore and check ipc details

```bash
ipcmk -S 1
ipcs
```

## User Namespace

The User namespace isolates user and group IDs. Containers in their user namespaces can have their range of user and group IDs, providing better security and avoiding conflicts with the host system.

Create USER namespace for isolation

```bash
unshare --user -- /bin/bash
```

check id of namespaced isolated user

```bash
id
```

## Cgroup Namespace

The Cgroup namespace allows a process to create its cgroup hierarchy. This means that a process inside a container can only see and control its cgroups without affecting other containers or the host system.

Create cgroup namespace for isolation

```bash
unshare --cgroup -- /bin/bash
```

check id of namespaced isolated user and assign pid of current shell to cgroup, then restrict of cpu usage.

```bash
mkdir /sys/fs/cgroup/cpu/my-cgroup
echo $$ > /sys/fs/cgroup/cpu/my-cgroup/cgroup.procs
echo 50000 > /sys/fs/cgroup/cpu/my-cgroup/cpu.cfs_quota_us
cat /sys/fs/cgroup/cpu/my-cgroup/cgroup.procs
```
