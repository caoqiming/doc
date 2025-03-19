# AsyncTask

Convenience function for executing code asynchronously on the Task Graph.

```cpp
#include "Async/Async.h"
```

> 这个函数好像不用加头文件，应该是已经在 UE 自动生成的头文件里包含了

```cpp
AsyncTask(ENamedThreads::AnyThread, []()
{
	// This code will run asynchronously, without freezing the game thread
});
```

todo： c++ Lambda 函数
