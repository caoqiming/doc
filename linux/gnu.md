# GNU

GNU (/ɡnuː/) is an extensive collection of free software, which can be used as an operating system or can be used in parts with other operating systems. The use of the completed GNU tools led to the family of operating systems popularly known as Linux. Most of GNU is licensed under the GNU Project's own General Public License (GPL).
GNU 是 "GNU's Not Unix!"的递归缩写。

## History

GNU 操作系统起源于 GNU 计划，由理查德·斯托曼在麻省理工学院人工智能实验室发起，希望发展出一套完整的开放源代码操作系统来取代 Unix，计划中的操作系统，名为 GNU。1983 年 9 月 27 日，理查德·斯托曼在 net.unix-wizards 和 net.usoft 新闻组中公布这项计划。

1991 年，Linux 出现。1993 年，FreeBSD 发布。所有 GNU 计划中，运行于用户空间的软件，都可以在 Linux 或 FreeBSD 上使用。许多开发者转向于 Linux 或 FreeBSD。其中，Linux 成为常见的 GNU 计划软件运行平台。

## Components

The system's basic components include the GNU Compiler Collection (GCC), the GNU C library (glibc), and GNU Core Utilities (coreutils), but also the GNU Debugger (GDB), GNU Binary Utilities (binutils), and the GNU Bash shell. GNU developers have contributed to Linux ports of GNU applications and utilities, which are now also widely used on other operating systems such as BSD variants, Solaris and macOS.

Many GNU programs have been ported to other operating systems, including proprietary platforms such as Microsoft Windows and macOS. GNU programs have been shown to be more reliable than their proprietary Unix counterparts.

## GNU as an operating system

In its original meaning, and one still common in hardware engineering, the operating system is a basic set of functions to control the hardware and manage things like task scheduling and system calls. In modern terminology used by software developers, the collection of these functions is usually referred to as a kernel, while an 'operating system' is expected to have a more extensive set of programmes. The GNU project maintains two kernels itself, allowing the creation of pure GNU operating systems, but the GNU toolchain is also used with non-GNU kernels. Due to the two different definitions of the term 'operating system', there is an ongoing debate concerning the naming of distributions of GNU packages with a non-GNU kernel.

## GNU 和 linux

There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called “Linux” distributions are really distributions of GNU/Linux.

Many users do not understand the difference between the kernel, which is Linux, and the whole system, which they also call “Linux.” The ambiguous use of the name doesn't help people understand. These users often think that Linus Torvalds developed the whole operating system in 1991, with a bit of help.

Programmers generally know that Linux is a kernel. But since they have generally heard the whole system called “Linux” as well, they often envisage a history that would justify naming the whole system after the kernel. For example, many believe that once Linus Torvalds finished writing Linux, the kernel, its users looked around for other free software to go with it, and found that (for no particular reason) most everything necessary to make a Unix-like system was already available.

What they found was no accident—it was the not-quite-complete GNU system. The available free software added up to a complete system because the GNU Project had been working since 1984 to make one. In the GNU Manifesto we set forth the goal of developing a free Unix-like system, called GNU. The Initial Announcement of the GNU Project also outlines some of the original plans for the GNU system. By the time Linux was started, GNU was almost finished.

Most free software projects have the goal of developing a particular program for a particular job. For example, Linus Torvalds set out to write a Unix-like kernel (Linux); Donald Knuth set out to write a text formatter (TeX); Bob Scheifler set out to develop a window system (the X Window System). It's natural to measure the contribution of this kind of project by specific programs that came from the project.

If we tried to measure the GNU Project's contribution in this way, what would we conclude? One CD-ROM vendor found that in their “Linux distribution,” GNU software was the largest single contingent, around 28% of the total source code, and this included some of the essential major components without which there could be no system. Linux itself was about 3%. (The proportions in 2008 are similar: in the “main” repository of gNewSense, Linux is 1.5% and GNU packages are 15%.) So if you were going to pick a name for the system based on who wrote the programs in the system, the most appropriate single choice would be “GNU.”

But that is not the deepest way to consider the question. The GNU Project was not, is not, a project to develop specific software packages. It was not a project to develop a C compiler, although we did that. It was not a project to develop a text editor, although we developed one. The GNU Project set out to develop a complete free Unix-like system: GNU.

Many people have made major contributions to the free software in the system, and they all deserve credit for their software. But the reason it is an integrated system—and not just a collection of useful programs—is because the GNU Project set out to make it one. We made a list of the programs needed to make a complete free system, and we systematically found, wrote, or found people to write everything on the list. We wrote essential but unexciting  components because you can't have a system without them. Some of our system components, the programming tools, became popular on their own among programmers, but we wrote many components that are not tools . We even developed a chess game, GNU Chess, because a complete system needs games too.

By the early 90s we had put together the whole system aside from the kernel. We had also started a kernel, the GNU Hurd, which runs on top of Mach. Developing this kernel has been a lot harder than we expected; the GNU Hurd started working reliably in 2001, but it is a long way from being ready for people to use in general.

Fortunately, we didn't have to wait for the Hurd, because of Linux. Once Torvalds freed Linux in 1992, it fit into the last major gap in the GNU system. People could then combine Linux with the GNU system to make a complete free system—a version of the GNU system which also contained Linux. The GNU/Linux system, in other words.

Making them work well together was not a trivial job. Some GNU components  needed substantial change to work with Linux. Integrating a complete system as a distribution that would work “out of the box” was a big job, too. It required addressing the issue of how to install and boot the system—a problem we had not tackled, because we hadn't yet reached that point. Thus, the people who developed the various system distributions did a lot of essential work. But it was work that, in the nature of things, was surely going to be done by someone.

The GNU Project supports GNU/Linux systems as well as the GNU system. The FSF funded the rewriting of the Linux-related extensions to the GNU C library, so that now they are well integrated, and the newest GNU/Linux systems use the current library release with no changes. The FSF also funded an early stage of the development of Debian GNU/Linux.

Today there are many different variants of the GNU/Linux system (often called “distros”). Most of them include nonfree programs—their developers follow the “open source” philosophy associated with Linux rather than the “free software” philosophy of GNU. But there are also completely free GNU/Linux distros. The FSF supports computer facilities for a few of them.

Making a free GNU/Linux distribution is not just a matter of eliminating various nonfree programs. Nowadays, the usual version of Linux contains nonfree programs too. These programs are intended to be loaded into I/O devices when the system starts, and they are included, as long series of numbers, in the “source code” of Linux. Thus, maintaining free GNU/Linux distributions now entails maintaining a free version of Linux too.

Whether you use GNU/Linux or not, please don't confuse the public by using the name “Linux” ambiguously. Linux is the kernel, one of the essential major components of the system. The system as a whole is basically the GNU system, with Linux added. When you're talking about this combination, please call it “GNU/Linux.”

Aside from GNU, one other project has independently produced a free Unix-like operating system. This system is known as BSD, and it was developed at UC Berkeley. It was nonfree in the 80s, but became free in the early 90s. A free operating system that exists today  is almost certainly either a variant of the GNU system, or a kind of BSD system.

People sometimes ask whether BSD too is a version of GNU, like GNU/Linux. The BSD developers were inspired to make their code free software by the example of the GNU Project, and explicit appeals from GNU activists helped persuade them, but the code had little overlap with GNU. BSD systems today use some GNU programs, just as the GNU system and its variants use some BSD programs; however, taken as wholes, they are two different systems that evolved separately. The BSD developers did not write a kernel and add it to the GNU system, and a name like GNU/BSD would not fit the situation .

以上内容来自[官网](https://www.gnu.org/gnu/linux-and-gnu.en.html)，知乎上的一个回答更加通俗：[原文链接](https://www.zhihu.com/question/319783573/answer/656033035)

> Unix 系统被发明之后，大家用的很爽。但是后来开始收费和商业闭源了。一个叫 RMS 的大叔觉得很不爽，于是发起 GNU 计划，模仿 Unix 的界面和使用方式，从头做一个开源的版本。然后他自己做了编辑器 Emacs 和编译器 GCC。GNU 是一个计划或者叫运动。在这个旗帜下成立了 FSF，起草了 GPL 等。接下来大家纷纷在 GNU 计划下做了很多的工作和项目，基本实现了当初的计划。包括核心的 gcc 和 glibc。但是 GNU 系统缺少操作系统内核。原定的内核叫 HURD，一直完不成。同时 BSD（一种 UNIX 发行版）陷入版权纠纷，x86 平台开发暂停。然后一个叫 Linus 的同学为了在 PC 上运行 Unix，在 Minix 的启发下，开发了 Linux。注意，Linux 只是一个系统内核，系统启动之后使用的仍然是 gcc 和 bash 等软件。Linus 在发布 Linux 的时候选择了 GPL，因此符合 GNU 的宗旨。最后，大家突然发现，这玩意不正好是 GNU 计划缺的么。于是合在一起打包发布叫 GNU / Linux。然后大家念着念着省掉了前面部分，变成了 Linux 系统。实际上 Debian，RedHat 等 Linux 发行版中内核只占了很小一部分容量。
