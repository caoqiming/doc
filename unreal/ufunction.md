# ufunction

C++通过“UFUNCTION”宏来把 C++里的方法反射暴露给蓝图，实现蓝图中调用 C++方法的效果，也可以实现在蓝图中绑定、调用 C++事件的效果。

## 设置调用方式：

- BlueprintCallable：可以调用的方法，有输入输出节点和；
- BlueprintPure：纯函数，只有输出结果；
- BlueprintImplementableEvent：可以在蓝图里绑定实现的事件，不能在 C++里实现；
- BlueprintNativeEvent：可以在蓝图里绑定实现的事件，也能在 C++里实现；
- CallInEditor：在编辑器的场景细节面板中调用

## 设置元数据 meta

- DisplayName=“xxx：设置显示名称，相当于别名；
- ToolTip="abc"：设置鼠标悬浮时候的提示内容；

更多元数据可以参照官网文档

## 操作步骤

在 UE 的关卡编辑界面中点击菜单栏中“工具-新建 C++类”创建一个 C++类，继承自 Actor，类名 MyActor，创建完成后在 VS 里编辑 MyActor.h 和 MyActor.cpp 文件，添加如下代码。然后回到 UE 编辑器中进行编译。编译完成之后在内容浏览器里找到 C++类，右键创建蓝图实例，双击创建的实例，进入蓝图蓝图边界界面，就可以看到上述效果了。

```cpp
#pragmaonce
#include"CoreMinimal.h"
#include"GameFramework/Actor.h"
#include"MyActor.generated.h"
UCLASS()
class MYFIRSTSTUDY_API AMyActor : public AActor
{
  GENERATED_BODY()
public:
  // Sets default values for this actor's properties
  AMyActor();
protected:
  // Called when the game starts or when spawned
  virtual void BeginPlay() override;
  // 方法、事件
  UFUNCTION(BlueprintPure, Category = "BaseProperty", meta = (DisplayName = "获取名字", ToolTip = "有别名的蓝图纯函数节点"))
  FString GetMyName();
  UFUNCTION(BlueprintCallable, Category = "BaseProperty", meta = (DisplayName = "获取长度", ToolTip = "有别名的蓝图函数节点"))
  float GetMyLength();
  UFUNCTION(BlueprintImplementableEvent)
  void LoadEvent();
  UFUNCTION(CallInEditor, CallInEditor, Category = "BaseProperty", meta = (DisplayName = "获取名字", ToolTip = "在编辑器里有个按钮可以调用"))
  void LogNames();
public:
  // Called every frame
  virtual void Tick(float DeltaTime) override;
};
```

```cpp
#include"MyActor.h"



// Sets default values

AMyActor::AMyActor()
{
  // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
  PrimaryActorTick.bCanEverTick = true;
}



// Called when the game starts or when spawned
void AMyActor::BeginPlay()
{
  Super::BeginPlay();
  LoadEvent();
}



FString AMyActor::GetMyName()
{
  FString Str = L"我的名字是Spline";
  return Str;
}



float AMyActor::GetMyLength()
{
  return 1234.34;
}



void AMyActor::LogNames()
{
  UE_LOG(LogTemp, Warning, TEXT("张三、李四、王五"));
}



// Called every frame

void AMyActor::Tick(float DeltaTime)
{
  Super::Tick(DeltaTime);
}
```
