# gzip

gzip is a file format and a software application used for file compression and decompression. The program was created by Jean-loup Gailly and Mark Adler as a free software replacement for the compress program used in early Unix systems, and intended for use by GNU.

gzip is based on the DEFLATE algorithm, which is a combination of LZ77 and Huffman coding. DEFLATE was intended as a replacement for LZW and other patent-encumbered data compression algorithms which, at the time, limited the usability of compress and other popular archivers.

"gzip" is often also used to refer to the gzip file format which has DEFLATE-compressed body. It also have a header that contains timestamp, compression flags and the operating system ID. It may have extra headers about the original filename, etc. At last, a CRC-32 checksum is in the trailer.

# command

解压命令

```bash
gzip -d {file name}
```

> -c, --stdout write on standard output, keep original files unchanged  
> -d, --decompress decompress  
> -f, --force force overwrite of output file and compress links  
> -h, --help give this help  
> -k, --keep keep (don't delete) input files  
> -l, --list list compressed file contents  
> -L, --license display software license  
> -n, --no-name do not save or restore the original name and timestamp  
> -N, --name save or restore the original name and timestamp  
> -q, --quiet suppress all warnings  
> -r, --recursive operate recursively on directories  
> --rsyncable make rsync-friendly archive  
> -S, --suffix=SUF use suffix SUF on compressed files  
> --synchronous synchronous output (safer if system crashes, but slower)  
> -t, --test test compressed file integrity  
> -v, --verbose verbose mode  
> -V, --version display version number  
> -1, --fast compress faster  
> -9, --best compress better
