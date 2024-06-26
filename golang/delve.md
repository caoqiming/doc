# Delve

Delve 是一个专门为调试 Go 程序而生的调试工具，它比 GDB 更强大，尤其时调试多 goroutine 高并发的 Go 程序。
[github 地址](https://github.com/derekparker/delve)

## install

```bash
git clone https://github.com/go-delve/delve
cd delve
go install github.com/go-delve/delve/cmd/dlv
```

## 使用

### unit test

cd 到 test 文件所在位置

```bash
dlv test -- -test.v  -test.count=1 -test.run TestMLJobRecord
```

### debug

从源码执行

```bash
dlv debug main.go -- arg1 arg2
```

从二进制执行，build 时需要加上`-gcflags="all=-N -l"`禁用编译器优化和内联

```bash
dlv exec executable_file -- arg1 arg2
```

attach 到 pid

```bash
dlv attach pid
```

### 快捷键

设置断点

```bash
b tls_config_test.go:25
```

运行到断点

```bash
c
```

`n`是下一行，`s`是逐过程，可以进入调用的函数。
`p`用于查看变量，如果遇到变量被截断，可以调整设置

```bash
config max-string-len 1000
config max-array-values 1000
```

全部快捷键

```text
Running the program:
    call ------------------------ Resumes process, injecting a function call (EXPERIMENTAL!!!)
    continue (alias: c) --------- Run until breakpoint or program termination.
    next (alias: n) ------------- Step over to next source line.
    rebuild --------------------- Rebuild the target executable and restarts it. It does not work if the executable was not built by delve.
    restart (alias: r) ---------- Restart process.
    step (alias: s) ------------- Single step through program.
    step-instruction (alias: si)  Single step a single cpu instruction.
    stepout (alias: so) --------- Step out of the current function.

Manipulating breakpoints:
    break (alias: b) ------- Sets a breakpoint.
    breakpoints (alias: bp)  Print out info for active breakpoints.
    clear ------------------ Deletes breakpoint.
    clearall --------------- Deletes multiple breakpoints.
    condition (alias: cond)  Set breakpoint condition.
    on --------------------- Executes a command when a breakpoint is hit.
    toggle ----------------- Toggles on or off a breakpoint.
    trace (alias: t) ------- Set tracepoint.
    watch ------------------ Set watchpoint.

Viewing program variables and memory:
    args ----------------- Print function arguments.
    display -------------- Print value of an expression every time the program stops.
    examinemem (alias: x)  Examine raw memory at the given address.
    locals --------------- Print local variables.
    print (alias: p) ----- Evaluate an expression.
    regs ----------------- Print contents of CPU registers.
    set ------------------ Changes the value of a variable.
    vars ----------------- Print package variables.
    whatis --------------- Prints type of an expression.

Listing and switching between threads and goroutines:
    goroutine (alias: gr) -- Shows or changes current goroutine
    goroutines (alias: grs)  List program goroutines.
    thread (alias: tr) ----- Switch to the specified thread.
    threads ---------------- Print out info for every traced thread.

Viewing the call stack and selecting frames:
    deferred --------- Executes command in the context of a deferred call.
    down ------------- Move the current frame down.
    frame ------------ Set the current frame, or execute command on a different frame.
    stack (alias: bt)  Print stack trace.
    up --------------- Move the current frame up.

Other commands:
    config --------------------- Changes configuration parameters.
    disassemble (alias: disass)  Disassembler.
    dump ----------------------- Creates a core dump from the current process state
    edit (alias: ed) ----------- Open where you are in $DELVE_EDITOR or $EDITOR
    exit (alias: quit | q) ----- Exit the debugger.
    funcs ---------------------- Print list of functions.
    help (alias: h) ------------ Prints the help message.
    libraries ------------------ List loaded dynamic libraries
    list (alias: ls | l) ------- Show source code.
    packages ------------------- Print list of packages.
    source --------------------- Executes a file containing a list of delve commands
    sources -------------------- Print list of source files.
    target --------------------- Manages child process debugging.
    transcript ----------------- Appends command output to a file.
    types ---------------------- Print list of types
```
