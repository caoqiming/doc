# posix

可移植操作系统接口（Portable Operating System Interface，缩写为 POSIX）是 IEEE 为要在各种 UNIX 操作系统上运行软件，而定义 API 的一系列互相关联的标准的总称，其正式称呼为 IEEE Std 1003，而国际标准名称为 ISO/IEC 9945。此标准源于一个大约开始于 1985 年的项目。POSIX 这个名称是由理查德·斯托曼（RMS）应 IEEE 的要求而提议的一个易于记忆的名称。它基本上是 Portable Operating System Interface（可移植操作系统接口）的缩写，而 X 则表明其对 Unix API 的传承。

Linux 基本上逐步实现了 POSIX 兼容，但并没有参加正式的 POSIX 认证。

微软的 Windows NT 声称部分实现了 POSIX 标准。

当前的 POSIX 主要分为四个部分：Base Definitions、System Interfaces、Shell and Utilities 和 Rationale。

Unix was selected as the basis for a standard system interface partly because it was "manufacturer-neutral". However, several major versions of Unix existed—so there was a need to develop a common-denominator system. The POSIX specifications for Unix-like operating systems originally consisted of a single document for the core programming interface, but eventually grew to 19 separate documents (POSIX.1, POSIX.2, etc.). The standardized user command line and scripting interface were based on the UNIX System V shell. Many user-level programs, services, and utilities (including awk, echo, ed) were also standardized, along with required program-level services (including basic I/O: file, terminal, and network). POSIX also defines a standard threading library API which is supported by most modern operating systems. In 2008, most parts of POSIX were combined into a single standard (IEEE Std 1003.1-2008, also known as POSIX.1-2008).
