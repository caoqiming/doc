# fstream

## 读取文件

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main()
{
	ifstream srcFile("E:\\Users\\data.txt", ios::in); //以文本模式打开txt文件
	string x;
	int flag = 0;
    getline(srcFile, x);
	srcFile.close();
	return 0;
}
```
