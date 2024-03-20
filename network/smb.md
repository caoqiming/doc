# smb

Server Message Block (SMB) is a communication protocol used to share files, printers, serial ports, and miscellaneous communications between nodes on a network.
Server Message Block (SMB) enables file sharing, printer sharing, network browsing, and inter-process communication (through named pipes) over a computer network. SMB serves as the basis for Microsoft's Distributed File System implementation.
SMB relies on the TCP and IP protocols for transport. This combination allows file sharing over complex, interconnected networks, including the public Internet. The SMB server component uses TCP port 445.

## usage

```
smb://{you local ip}
```

### mac os

- share
  Searcn `file sharing` in setiings.

- access
  Open Finder. Click "Go" > "Connect to Server."

### windows

- share
  Open Control Panel > Network and Sharing Center. Click "Change advanced sharing settings." Under "Private" network, turn on "Network discovery" and "File and printer sharing."
- access
  Open File Explorer.
