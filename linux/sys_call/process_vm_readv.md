# process_vm_readv

根据 pid 和虚拟地址，读取一个进程的内存

## python 用例

python 调用该系统调用

```python
import ctypes
import ctypes.util
import struct

# Define constants
PROCESS_VM_READV = 310  # System call number for process_vm_readv on x86_64 architecture

# Define iovec structure for local and remote data
class IOVec(ctypes.Structure):
    _fields_ = [("iov_base", ctypes.c_void_p),
                ("iov_len", ctypes.c_size_t)]

# Load the C library
libc = ctypes.CDLL(ctypes.util.find_library("c"), use_errno=True)

# Define the system call interface for process_vm_readv
syscall = libc.syscall
syscall.restype = ctypes.c_long
syscall.argtypes = [ctypes.c_long, ctypes.c_int, ctypes.POINTER(IOVec), ctypes.c_ulong,
                    ctypes.POINTER(IOVec), ctypes.c_ulong, ctypes.c_ulong]

def process_vm_readv(pid, address, size):
    # Prepare the local iovec buffer
    local_buffer = (ctypes.c_char * size)()
    local_iov = IOVec(ctypes.cast(ctypes.pointer(local_buffer), ctypes.c_void_p), size)

    # Prepare the remote iovec buffer
    remote_iov = IOVec(ctypes.c_void_p(address), size)

    # Perform the process_vm_readv system call
    result = syscall(PROCESS_VM_READV, pid, ctypes.byref(local_iov), 1, ctypes.byref(remote_iov), 1, 0)

    if result == -1:
        errno = ctypes.get_errno()
        raise OSError(errno, "process_vm_readv failed", os.strerror(errno))

    return bytes(local_buffer)

# Example usage
if __name__ == "__main__":
    import os

    target_pid = int(input("Enter target PID: "))
    target_address = int(input("Enter target address (in hex): "), 16)
    read_size = int(input("Enter number of bytes to read: "))

    try:
        data = process_vm_readv(target_pid, target_address, read_size)
        print("Data read from process memory:", data)
    except Exception as e:
        print("Error:", e)
```

## c++ 用例

```cpp
#include <iostream>
#include <sys/uio.h>
#include <unistd.h>
#include <fcntl.h>
#include <cstring>
#include <errno.h>

// Function to read memory of a target process
ssize_t read_process_memory(pid_t pid, void *remote_addr, void *local_addr, size_t length) {
    struct iovec local[1];
    struct iovec remote[1];

    local[0].iov_base = local_addr;
    local[0].iov_len = length;
    remote[0].iov_base = remote_addr;
    remote[0].iov_len = length;

    return process_vm_readv(pid, local, 1, remote, 1, 0);
}

int main() {
    pid_t target_pid;
    unsigned long target_address;
    size_t read_size;

    std::cout << "Enter target PID: ";
    std::cin >> target_pid;

    std::cout << "Enter target address (in hex): ";
    std::cin >> std::hex >> target_address;

    std::cout << "Enter number of bytes to read: ";
    std::cin >> read_size;

    char *buffer = new char[read_size];
    memset(buffer, 0, read_size);

    ssize_t nread = read_process_memory(target_pid, (void *)target_address, buffer, read_size);

    if (nread == -1) {
        std::cerr << "Error: " << strerror(errno) << std::endl;
    } else {
        std::cout << "Read " << nread << " bytes: ";
        for (size_t i = 0; i < nread; ++i) {
            printf("%02hhx ", buffer[i]);
        }
        std::cout << std::endl;
    }

    delete[] buffer;
    return 0;
}
```

## 测试

用于测试的被读取内存的 c++程序

```cpp
#include <iostream>

using namespace std;

int main(){
    char c[30]="this str is in c++";
    cout<<&c<<endl;
    int a;
    cin>>a;
    return 0;
}
```

编译 cpp

```bash
g++ main.cpp
```

得到 `a.out` 并执行，得到地址 `0x7ffea0e4bc00`
查看 pid，为 33312

```bash
ps aux | grep a.out
```

运行 python，执行系统调用 process_vm_readv
输出为

```text
(base) root@xxx:~/code# python3 test.py
Enter target PID: 33312
Enter target address (in hex): 0x7ffea0e4bc00
Enter number of bytes to read: 30
Data read from process memory: b'this str is in c++\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
```

成功读取到了 c++程序的内存
