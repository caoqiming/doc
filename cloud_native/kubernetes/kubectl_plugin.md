# kubectl plugins

A plugin is a standalone executable file, whose name begins with kubectl-. To install a plugin, move its executable file to anywhere on your `PATH`.

`kubectl` provides a command `kubectl plugin list` that searches your `PATH` for valid plugin executables. Executing this command causes a traversal of all files in your `PATH`. Any files that are executable, and begin with `kubectl-` will show up in the order in which they are present in your PATH in this command's output. A warning will be included for any files beginning with `kubectl-` that are not executable. A warning will also be included for any valid plugin files that overlap each other's name.

A plugin determines which command path it wishes to implement based on its name. For example, a plugin named `kubectl-foo` provides a command `kubectl foo`.
