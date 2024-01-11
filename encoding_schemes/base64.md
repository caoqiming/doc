# base64

Base64 是一种基于 64 个字符的编码算法,经过 Base64 编码后的数据会比原始数据略长，为原来的 4/3 倍。字符串的字符数是以 4 位单位的整数倍。

## 原理

1. 对二进制编码做分组操作，每 3 个 8 位二进制码为一组(24bit)，转换为每 4 个 6 位二进制码为一组(不足 6 位时低位补 0)
2. 将获得的 6 位进制码转换为 Base64 字符表中对应的字符

## Base64 alphabet defined in RFC 4648

包含大小写字母，数字 0 ～ 9，`+` 和 `/` ，一共 26\*2+10+2=64 个字符。还包括`=`，如果要编码的字节数不能被 3 整除，最后会多出 1 个或 2 个字节，那么可以使用下面的方法进行处理：先使用 0 字节值在末尾补足，使其能够被 3 整除，然后再进行 Base64 的编码。在编码后的 Base64 文本后加上一个或两个`=`号，代表补足的字节数。
如 `1` 进行 base64 编码的结果为`MQ==`，因为`1`的 ascii 码为 `00110001`，按 6 个 bit 分组后为`001100 010000`，对应 base64 的`MQ`，后面再加上两个`=`表示为空。
`12`进行 base64 编码的结果为`MTI=`，因为`12`的 ascii 码为`00110001 00110010`，按 6 个 bit 分组后为`001100 010011 001000`，对应 base64 的`MTI`，后面再加上一个`=`表示为空。
`123`是三个字节所以直接编码为`MTIz`。
补充`=`后长度恰好为 4 的整数倍。这个应该只是凑巧，并不是为了保持 base64 结果长度是 4 的整数倍才补的，是为了表示空的概念。这样如果原始数据是 8bit 的整数倍就可以完美还原，否则最后一个字节还是会被补 0

| Index | Binary | Char | Index | Binary | Char | Index | Binary | Char | Index | Binary | Char |
| ----- | ------ | ---- | ----- | ------ | ---- | ----- | ------ | ---- | ----- | ------ | ---- |
| 0     | 000000 | A    | 16    | 010000 | Q    | 32    | 100000 | g    | 48    | 110000 | w    |
| 1     | 000001 | B    | 17    | 010001 | R    | 33    | 100001 | h    | 49    | 110001 | x    |
| 2     | 000010 | C    | 18    | 010010 | S    | 34    | 100010 | i    | 50    | 110010 | y    |
| 3     | 000011 | D    | 19    | 010011 | T    | 35    | 100011 | j    | 51    | 110011 | z    |
| 4     | 000100 | E    | 20    | 010100 | U    | 36    | 100100 | k    | 52    | 110100 | 0    |
| 5     | 000101 | F    | 21    | 010101 | V    | 37    | 100101 | l    | 53    | 110101 | 1    |
| 6     | 000110 | G    | 22    | 010110 | W    | 38    | 100110 | m    | 54    | 110110 | 2    |
| 7     | 000111 | H    | 23    | 010111 | X    | 39    | 100111 | n    | 55    | 110111 | 3    |
| 8     | 001000 | I    | 24    | 011000 | Y    | 40    | 101000 | o    | 56    | 111000 | 4    |
| 9     | 001001 | J    | 25    | 011001 | Z    | 41    | 101001 | p    | 57    | 111001 | 5    |
| 10    | 001010 | K    | 26    | 011010 | a    | 42    | 101010 | q    | 58    | 111010 | 6    |
| 11    | 001011 | L    | 27    | 011011 | b    | 43    | 101011 | r    | 59    | 111011 | 7    |
| 12    | 001100 | M    | 28    | 011100 | c    | 44    | 101100 | s    | 60    | 111100 | 8    |
| 13    | 001101 | N    | 29    | 011101 | d    | 45    | 101101 | t    | 61    | 111101 | 9    |
| 14    | 001110 | O    | 30    | 011110 | e    | 46    | 101110 | u    | 62    | 111110 | +    |
| 15    | 001111 | P    | 31    | 011111 | f    | 47    | 101111 | v    | 63    | 111111 | /    |

编码时每 3 个字节转化为 4 个字符，因为都是 24bit 所以没有浪费存储空间。但这 4 个字符会以 ascii 的形式存储所以浪费了 2 个 bit 的存储空间。原本 3 字节的内容现在占用 4 字节的空间，是原来的 4/3 倍。

## 为什么用 base64

因为某些场合并不能传输或者储存二进制流。
另外还有一个原因，就是某些协议会对二进制流中的特定字符进行特殊处理（比如 ASCII 的 0~32 编码的字符在某些传输介质中，是会被当作特殊含义处理的），这种时候就需要通过编码来避开这些特定字符了。