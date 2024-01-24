# ps

## options

- -A, -e all processes
- -a all with tty, except session leaders
- a all with tty, including other users
- -d all except session leaders
- -N, --deselect negate selection
- r only running processes
- T all processes on this terminal
- x processes without controlling ttys. It lists processes not attached to a terminal, such as system services.

Selection by list:

- -C <command> command name
- -G, --Group <GID> real group id or name
- -g, --group <group> session or effective group name
- -p, p, --pid <PID> process id
-        --ppid <PID>  parent process id
- -q, q, --quick-pid <PID>
-                      process id (quick mode)
- -s, --sid <session> session id
- -t, t, --tty <tty> terminal
- -u, U, --user <UID> effective user id or name
- -U, --User <UID> real user id or name

Output formats:

- -F extra full
- -f full-format, including command lines
- f, --forest ascii art process tree
- u user-oriented format. It provides detailed information about each process, including the user that owns the process.

```bash
ps aux
```

```text
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  19356  1584 ?        Ss   Jan01   0:01 /sbin/init
```

- USER: The user that owns the process.
- PID: Process ID.
- %CPU: The percentage of CPU usage.
- %MEM: The percentage of memory usage.
- VSZ: Virtual Memory Size in KBs.
- RSS: Resident Set Size, the non-swapped physical memory that a task has used in KBs.
- TTY: The terminal type that the user logged on.
- STAT: Process state codes.
- START: The time when the command was initiated.
- TIME: Cumulative CPU time.
- COMMAND: The command that initiated the process.

sort processes by memory and CPU usage

```bash
ps aux --sort=-%mem,%cpu
```

查看某一进程的子进程，替换以下命令中的`<pid>`

```bash
ps --forest $(ps -e --no-header -o pid,ppid|awk -vp=<pid> 'function r(s){print s;s=a[s];while(s){sub(",","",s);t=s;sub(",.*","",t);sub("[0-9]+","",s);r(t)}}{a[$2]=a[$2]","$1}END{r(p)}')
```

获取某一进程的所有子进程 pid

```bash
pidtree() (
    [ -n "$ZSH_VERSION"  ] && setopt shwordsplit
    declare -A CHILDS
    while read P PP;do
        CHILDS[$PP]+=" $P"
    done < <(ps -e -o pid= -o ppid=)

    walk() {
        echo $1
        for i in ${CHILDS[$1]};do
            walk $i
        done
    }

    for i in "$@";do
        walk $i
    done
)
```
