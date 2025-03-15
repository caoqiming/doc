# else

## 命名规范

类型和变量名称是名词，方法名称是描述方法效果或没有效果的方法的返回值的谓词；

命名（如类型或变量）中的每个单词需大写首字母，单词间通常无下划线；

- 宏名称应完全大写，单词之间用下划线分隔，并以 为前缀 UE\_ ；
- 类型名前缀需使用额外的大写字母，用于区分其和变量命名。例如：FSkin 为类型名，而 Skin 则是 FSkin 的实例；
- 多数情况下，UHT 需要正确的前缀、后缀，否则会报错，因此添加前缀、后缀至关重要；
- 类型名称前缀遵守约定
  - 模板类的前缀为 T；
  - 继承自 UObject 的类前缀为 U；
  - 继承自 AActor 的类前缀为 A；
  - 继承自 SWidget 的类前缀为 S；
  - 作为抽象接口的类前缀为 I；
  - Epic 概念相似的类前缀为 C；
  - 枚举的前缀为 E。
  - 布尔变量必须以 b 为前缀。
  - 其他多数类均以 F 为前缀，而部分子系统则以其他字母为前缀。
  - Typedefs 应以任何与其类型相符的字母为前缀：
- 若为结构体的 Typedefs，则使用 F；
- 若为 Uobject 的 Typedefs，则使用 U，以此类推；
- 特定模板实例化的 typedef 不再是模板，应相应地添加前缀；

## 常用数据类型

### 向量类型

- FVector：向量，包含 x、y、z 三个位置参数；
- FRotator：向量，包含 roll、pitch、yaw 三个旋转参数；
- FTransform：平移、旋转、缩放三个的集合；

```cpp
FVector v = FVector();					// x y z 都是0
FVector s(1, 2, 3);						// 另一种创建方式，x y z 分别是1 2 3
FVector2D v2 = FVector2D();				// x y，不传数字，默认都是 0
FRotator r = FRotator(1, 2, 3);			// roll ptch yaw 分别是1 2 3
FTransform t = FTransform(r, v, s);		// 旋转、平移、缩放
```

### 容器类型的数据

- TArray：动态数组，速度快、内存消耗小、安全性高，不同类型的元素不能混装；
- TMap：由多个 Key-Value 对组成的数据；
- TSet：Set 是个特殊的 Map，Key 和 Value 是一样的，只存储了 Key，所以不能重复；

### 枚举类型

C++里可以通过 Namespace 方式生定义枚举类型，也可以通过 Class 的方式定义枚举类型。通过“UENUM”宏可以把枚举类型暴露给蓝图，这样蓝图里就可以使用这个枚举类型来定义变量了。

```cpp
#pragmaonce
#include"CoreMinimal.h"
#include"GameFramework/Actor.h"
#include"MyActor.generated.h"
UENUM(BlueprintType)
namespace MyEnumType {
  enum MyEnum
  {
    type1 UMETA(DisplayName = "第一种类型1", ToolTip = "1注释11111"),
    type2 UMETA(DisplayName = "第一种类型2", ToolTip = "1注释22222"),
    type3 UMETA(DisplayName = "第一种类型3", ToolTip = "1注释33333"),
  };
}
UENUM(BlueprintType)
enum class MyEnumType2 : uint8
{
  type1 UMETA(DisplayName = "第二种类型1", ToolTip = "2注释11111"),
  type2 UMETA(DisplayName = "第二种类型2", ToolTip = "2注释22222"),
  type3 UMETA(DisplayName = "第二种类型3", ToolTip = "2注释33333"),
};
UCLASS()
class DIGITALBASIN_API AMyActor : public AActor
{
  GENERATED_BODY()
public:
  // Sets default values for this actor's properties
  AMyActor();
protected:
  // Called when the game starts or when spawned
  virtual void BeginPlay() override;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "BaseProperty", meta = (DisplayName = "枚举变量", ToolTip = "枚举类型，共三种"))
  TEnumAsByte<MyEnumType::MyEnum> MyEnum;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "BaseProperty", meta = (DisplayName = "枚举变量2", ToolTip = "枚举类型2，共三种"))
  TEnumAsByte<MyEnumType2> MyEnum2;
public:
  // Called every frame
  virtual void Tick(float DeltaTime) override;
}
```

### struct

虚幻引擎的反射系统将结构体识别为 UStruct ，但它们不是 UObject 生态系统的一部分，不能在 UClasses 中使用。UStruct 的创建速度比具有相同数据的 UObject 更快。
C++通过“USTRUCT ”宏可以把 Struct 类型暴露给蓝图，这样蓝图里就可以使用这个 Struct 类型了。这个宏有一个参数 BlueprintType。

```cpp
#pragmaonce
#include"CoreMinimal.h"
#include"GameFramework/Actor.h"
#include"MyActor.generated.h"
USTRUCT(BlueprintType)
struct FMyStructType  // 必须以F开头
{
  GENERATED_USTRUCT_BODY()
  UPROPERTY(EditAnywhere, BlueprintReadWrite, meta = (DisplayName = "身份证号"))
  FString ID;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, meta = (DisplayName = "姓名"))
  FString Name;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, meta = (DisplayName = "年龄"))
  int32 Age;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, meta = (DisplayName = "身高"))
  float Height;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, meta = (DisplayName = "性别"))
  bool IsMan;
};
UCLASS()
class DIGITALBASIN_API AMyActor : public AActor
{
  GENERATED_BODY()
public:
  // Sets default values for this actor's properties
  AMyActor();
protected:
  // Called when the game starts or when spawned
  virtual void BeginPlay() override;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "BaseProperty", meta = (DisplayName = "结构体变量", ToolTip = "我是结构体，有很多属性"))
  FMyCustomStruct MyCustomStruct;
public:
  // Called every frame
  virtual void Tick(float DeltaTime) override;
};
```
