# log

可以在 C++中借助 UE_LOG 方法来在控制台打印日志，G 在屏幕上打印日志。

```cpp
// 自定义一个日志分类
DEFINE_LOG_CATEGORY_STATIC(LogCustom,All,All);

// 控制台打印日志
UE_LOG(LogCustom, Display, TEXT("打印日志啦!")); // 第一个参数是日志分类；第二个是日志等级，分别由Error、Waring、Display；第三个是日志内容，支持格式化输出。
UE_LOG(LogCustom, Display, TEXT("%s"),FString(L"打印日志啦!"));
UE_LOG(LogCustom, Display, TEXT("%d"),123);
UE_LOG(LogCustom, Display, TEXT("%s,%f"),FString(L"打印日志啦!"),123.456);

// 屏幕上打印日志
GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Red, TEXT("打印日志啦!")); // 第一个参数是固定值-1；第二个参数是日志停
```
