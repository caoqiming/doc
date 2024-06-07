# socket

Sockets are a service provided by transport layer. Internet socket APIs are usually based on the Berkeley sockets standard.

> Socket is nothing but a file in UNIX operating system. Even everything is treated as a file in UNIX Operating system. Whenever we create a socket an entry is made in the file descriptor table which contains standard i/o and standard errors and other details. The file descriptor acts as a pointer to the File Table which contains information about what action is to be taken i.e read, write, etc, and it contains pointers to the inode table of that particular file and as you might know inode contains all the necessary deatils of a file.

> Unix Domain Socket，即 UNIX 域套接字，被设计用于同一主机上的进程间通讯。尽管它采用了与 Internet Socket 相似的接口，但是它实际上并不使用网络协议进行通信，而是在内核中直接将数据从一个进程传到另一个进程。因此，Unix 域套接字的数据不会被写入硬盘，而是保存在内存中。这也就解释了为什么 Unix 域套接字的通信效率比网络套接字更高。
> 有一点需要注意的是，虽然 Unix 域套接字在文件系统中表现为一个文件，但是这仅仅是一个标识符，用来为套接字提供一个地址而已。Unix 域套接字并不像常规文件那样，数据会被写入硬盘。所以你在操作系统中看到的 Unix 域套接字文件，其实是一个链接，指向内核中的一个套接字对象，而不是一个包含数据的常规文件。

## Berkeley sockets

Berkeley sockets is an API for Internet sockets and Unix domain sockets, used for inter-process communication (IPC). It is commonly implemented as a library of linkable modules. It originated with the 4.2BSD Unix operating system, which was released in 1983.

The Berkeley sockets API represents socket as a file descriptor (file handle) in the Unix philosophy that provides a common interface for input and output to streams of data.

### usage

The function socket() creates an endpoint for communication and returns a file descriptor for the socket. It uses three arguments:

- domain, which specifies the protocol family of the created socket. For example:
  - `AF_INET` for network protocol IPv4 (IPv4-only)
  - `AF_INET6` for IPv6 (and in some cases, backward compatible with IPv4)
  - `AF_UNIX` for local socket (using a special filesystem node)
- type, one of:
  - `SOCK_STREAM` (reliable stream-oriented service or stream sockets)
  - `SOCK_DGRAM` (datagram service or datagram sockets)
  - `SOCK_SEQPACKET` (reliable sequenced packet service)
  - `SOCK_RAW` (raw protocols atop the network layer)
- protocol specifying the actual transport protocol to use. The most common are `IPPROTO_TCP`, `IPPROTO_SCTP`, `IPPROTO_UDP`, `IPPROTO_DCCP`. These protocols are specified in file netinet/in.h. The value 0 may be used to select a default protocol from the selected domain and type.
