# unix

UNIX（非复用信息和计算机服务，英语：Uniplexed Information and Computing Service，UnICS），一种多用户、多进程的计算机操作系统，源自于从 20 世纪 70 年代开始在美国 AT&T 公司的贝尔实验室开发的 AT&T Unix。
目前它的商标权由国际开放标准组织所拥有，只有符合单一 UNIX 规范的 UNIX 系统才能使用 UNIX 这个名称，否则只能称为类 UNIX（UNIX-like）。
Unix 最初受到 Multics 计划的启发。Multics 是由麻省理工学院、通用电气和 AT&T 底下的贝尔实验室合作进行的操作系统项目，被设计运行在 GE-645 大型主机上。但是由于整个目标过于庞大，糅合了太多的特性，Multics 虽然发布了一些产品，但是性能都很低，AT&T 最终撤出了投入 Multics 项目的资源，退出这项合作计划。
第一版 UNIX 是用 PDP-7 汇编语言编写的，一些应用是由叫做 B 语言的解释型语言和汇编语言混合编写的。在进行系统编程时不够强大，所以汤普逊和里奇对其进行了改造，并于 1971 年共同发明了 C 语言。1973 年汤普逊和里奇用 C 语言重写了 Unix，形成第三版 UNIX。在当时，为了实现最高效率，系统程序都是由汇编语言编写，所以汤普逊和里奇此举是极具大胆创新和革命意义的。用 C 语言编写的 Unix 代码简洁紧凑、易移植、易读、易修改，为此后 Unix 的发展奠定了坚实基础。

## 标准

> 单一 UNIX 规范（英语：Single UNIX Specification，缩写为 SUS），它是一套 UNIX 系统的统一规格书。扩充了 POSIX 标准，定义了标准 UNIX 操作系统。由 IEEE 与 The Open Group 所提出，目前由 Austin Group 负责维持。
> The standard specifies programming interfaces for the C language, a command-line shell, and user commands. The core specifications of the SUS known as Base Specifications are developed and maintained by the Austin Group, which is a joint working group of IEEE, ISO/IEC JTC 1/SC 22/WG 15 and The Open Group. If an operating system is submitted to The Open Group for certification, and passes conformance tests, then it is deemed to be compliant with a UNIX standard such as UNIX 98 or UNIX 03.

Very few BSD and Linux-based operating systems are submitted for compliance with the Single UNIX Specification, although system developers generally aim for compliance with POSIX standards, which form the core of the Single UNIX Specification.

### SUSv3 totals some 3700 pages, which are divided into four main parts:

- Base Definitions (XBD) - a list of definitions and conventions used in the specifications and a list of C header files which must be provided by compliant systems. 84 header files in total are provided.
- Shell and Utilities (XCU) - a list of utilities and a description of the shell, sh. 160 utilities in total are specified.
- System Interfaces (XSH) - contains the specification of various functions which are implemented as system calls or library functions. 1123 system interfaces in total are specified.
  Rationale (XRAT) - the explanation behind the standard.

### history

- The SUS emerged from multiple 1980s efforts to standardize operating system interfaces for software designed for variants of the Unix operating system. The need for standardization arose because enterprises using computers wanted to be able to develop programs that could be used on the computer systems of different manufacturers without reimplementing the programs. Unix was selected as the basis for a standard system interface partly because it was manufacturer-neutral.
- In 1988, standardization efforts resulted in IEEE 1003 (also registered as ISO/IEC 9945), or POSIX.1-1988, which loosely stands for Portable Operating System Interface.
- The X/Open Portability Guide (XPG) was a precursor to the SUS, published by the X/Open Company, a consortium of companies established in 1984.
- In the early 1990s, a separate effort known as the Common API Specification or Spec 1170 was initiated by several major vendors, who formed the COSE alliance in the wake of the Unix wars. In 1993, Spec 1170 was assigned by COSE to X/Open for fasttrack. In October 1993, a planned transfer of UNIX trademark from Novell to X/Open was announced; it was finalized in 2nd quarter of 1994. Spec 1170 would eventually become the Single Unix Specification.
- In 1994, the X/Open Company released the **Single UNIX Specification**. The SUS was made up of documents that were part of the X/Open Common Applications Environment (CAE).
- In 1996, X/Open merged with Open Software Foundation (OSF) to form The Open Group. In 1997, the Open Group released the Single UNIX Specification, Version 2.
- Beginning in 1998, a joint working group of IEEE, ISO JTC 1 SC22 and The Open Group known as the Austin Group began to develop the combined standard that would be known as the core of Single UNIX Specification, Version 3 and as POSIX.1-2001. It was released on January 30, 2002.
- In December 2008, the Austin Group published a new major revision of SUS and POSIX.[43][44][45] This is the Single UNIX Specification, Version 4 (SUSv4).

## 类 unix 系统

- 1984 年，Richard Stallman 发起了 GNU 项目，目标是创建一个完全自由且向下兼容 UNIX 的操作系统。这个项目不断发展壮大，包含了越来越多的内容。现在，GNU 项目的产品，如 Emacs、GCC 等已经成为各种其它自由发布的类 UNIX 系统中的核心角色。
- 1990 年，Linus Torvalds 决定编写一个自己的 Minix 内核，初名为 Linus' Minix，意为 Linus 的 Minix 内核，后来改名为 Linux。此内核于 1991 年正式发布，并逐渐引起人们的注意。当时 GNU 操作系统仍未完成，GNU 系统软件集与 Linux 内核结合后，GNU 软件构成了这个 POSIX 兼容操作系统 GNU/Linux 的基础。今天 GNU/Linux 已经成为发展最为活跃的自由／开放源码的类 Unix 操作系统。
- 1994 年，受到 GNU 工程的鼓舞，BSD 走上了复兴的道路。BSD 的开发也走向了几个不同的方向，并最终导致了 FreeBSD、NetBSD、OpenBSD 和 DragonFlyBSD 等基于 BSD 的操作系统的出现。
