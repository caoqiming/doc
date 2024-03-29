# unshare

Run a program with some namespaces unshared from the parent.

> Options:  
> -m, --mount[=<file>] unshare mounts namespace  
> -u, --uts[=<file>] unshare UTS namespace (hostname etc)  
> -i, --ipc[=<file>] unshare System V IPC namespace  
> -n, --net[=<file>] unshare network namespace  
> -p, --pid[=<file>] unshare pid namespace  
> -U, --user[=<file>] unshare user namespace  
> -C, --cgroup[=<file>] unshare cgroup namespace
>
> -f, --fork fork before launching <program>  
> -r, --map-root-user map current user to root (implies --user)
>
> --kill-child[=<signame>] when dying, kill the forked child (implies --fork)  
> defaults to SIGKILL  
> --mount-proc[=<dir>] mount proc filesystem first (implies --mount)  
> --propagation slave|shared|private|unchanged  
> modify mount propagation in mount namespace  
> --setgroups allow|deny control the setgroups syscall in user namespaces
>
> -h, --help display this help  
> -V, --version display version
