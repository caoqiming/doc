# format a text

TEXT 宏，作用是将字符串转换成 Unicode

FName 是 UE 里特有的类型。它更注重于表示名称不区分大小写，不可以更改。引擎中的资源名称都是 FName 类型，通过内容建立哈希，直接比较哈希。

FText 着重于显示和本地化。本地化是指多种语言的处理，不可更改。提供了非常优秀的本地化功能

## FName

> 创建相同名字的 object，ue 会直接崩溃

```cpp
FString MyString = TEXT("I am Best");
FName MyName = FName(*Mystring);
```

## Ftext

### Using Indexed Parameters

```cpp
return FText::Format(LOCTEXT("SnippetHeader", "There are {0} snippets in group {1}"), SnippetCount, GroupNameText);
```

### Using Named Parameters

```cpp
FFormatNamedArguments Args;
Args.Add(TEXT("Count"), SnippetCount);
Args.Add(TEXT("Name"), GroupNameText);
return FText::Format(LOCTEXT("SnippetHeader", "There are {Count} snippets in group {Name}"), Args);
```

### Using Inline Named Parameters

```cpp
return FText::FormatNamed(LOCTEXT("SnippetHeader", "There are {Count} snippets in group {Name}"),
	TEXT("Count"), SnippetCount,
	TEXT("Name"), GroupNameText
);
```

## FString

### Printf

```cpp
FString Role = FString("Authority");
FString LocalRoleString = FString::Printf(TEXT("Local Role: %s"), *Role); // Role 前面的 * 号用于转换成C风格字符串
```

### 其他类型转 FString

> https://dev.epicgames.com/documentation/en-us/unreal-engine/fstring-in-unreal-engine

```cpp
FString::SanitizeFloat(FloatVariable);
FString::FromInt(IntVariable);
InBool ? TEXT("true") : TEXT("false");
VectorVariable.ToString();
Vector2DVariable.ToString();
RotatorVariable.ToString();
LinearColorVariable.ToString();
(InObj != NULL) ? InObj->GetName() : FString(TEXT("None"));
```
