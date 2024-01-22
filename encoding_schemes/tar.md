# tar

tar is a computer software utility for collecting many files into one archive file, often referred to as a tarball, for distribution or backup purposes. The name is derived from "tape archive", as it was originally developed to write data to sequential I/O devices with no file system of their own, such as devices that use magnetic tape. The archive data sets created by tar contain various file system parameters, such as name, timestamps, ownership, file-access permissions, and directory organization. POSIX abandoned tar in favor of pax, yet tar sees continued widespread use.

## command

Create an archive file archive.tar from the file README.txt and directory src:

```bash
tar -cvf archive.tar README.txt src
```

Extract contents for the archive.tar into the current directory:

```bash
tar -xvf archive.tar
```

Create an archive file archive.tar.gz from the file README.txt and directory src and compress it with gzip:

```bash
tar -cavf archive.tar.gz README.txt src
```

Extract contents for the archive.tar.gz into the current directory:

```bash
tar -xvf archive.tar.gz
```

> 一部分参数
> -c, --create create a new archive
> -x, --extract, --get extract files from an archive
> -f, --file=ARCHIVE use archive file or device ARCHIVE
> -a, --auto-compress use archive suffix to determine the compression
> -z, --gzip, --gunzip, --ungzip filter the archive through gzip
> -r, --append append files to the end of an archive
> -t, --list list the contents of an archive
> -v, --verbose verbose mode
