# caffeinate

>  这个命令防止 mac 进入睡眠

caffeinate creates assertions to alter system sleep behavior.  If no assertion flags are specified, caffeinate creates an assertion to prevent idle sleep.  If a utility is specified, caffeinate creates the assertions on the utility's behalf, and those assertions will persist for the duration of the utility's execution. Otherwise, caffeinate creates the assertions directly, and those assertions will persist until caffeinate exits.


```bash
# 直接运行这个命令，在结束这个命令之前都不会sleep
caffeinate -is
# 指定时间
caffeinate -t 3600
# 指定运行某个命令
caffeinate -is python
```

- `-d` Create an assertion to prevent the display from sleeping.
- `-i` Create an assertion to prevent the system from idle sleeping.
- `-m` Create an assertion to prevent the disk from idle sleeping.
- `-s` Create an assertion to prevent the system from sleeping. This assertion is valid only when system is running on AC power.

如果还不行，试试
```bash
pmset -a disablesleep 1
```