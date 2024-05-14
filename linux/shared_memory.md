# Shared Memory

Linux 系统中支持多种共享内存（Shared Memory）的机制，主要包括以下几种：

1. System V 共享内存：这是一种常见且传统的使用共享内存的方式。API 包括 shmget、shmat、shift 和 shmctl 等。这种方式能够让不同的进程共享同一块内存，从而达到交换信息的目的。
2. POSIX 共享内存：这种方式在新版本的 Linux 中引入，提供了类似的功能，但 API 稍有不同，包括 shm_open、mmap 和 munmap 等。这同样是为了让进程能共享内存来进行交流。POSIX 共享内存的实现通常会使用到 /dev/shm。POSIX 共享内存对象在文件系统中表现为一个文件，这类文件通常存放在 /dev/shm 目录下。
3. 使用 mmap：mmap 是一种现代且灵活的共享内存方式，主要用于将文件或设备映射到进程的地址空间，通常与 POSIX 共享内存一起使用。
4. /dev/shm 文件系统：/dev/shm 是 Linux 系统中一个基于内存的 tmpfs 文件系统，它可以让你像操作文件一样操作内存，所有在 /dev/shm 下创建的文件实际上都放在 RAM 中，这样的性能优势适合做共享内存使用。
