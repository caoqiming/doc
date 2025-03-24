# actor

~~UE 刚开始学，先胡乱记录一点。后续再慢慢整理。~~

创建空白蓝图类，添加 cpp 脚本，添加形状。就可以用 cpp 脚本控制物体移动了。

## 移动

头文件中添加

```cpp
	FVector StartRelativeLocation;

	UPROPERTY(EditAnywhere)
	float speed = 1.0f;

	UPROPERTY(EditAnywhere)
	FVector EndRelativeLocation;

	FVector CurrentLocation;
	float stoppingDistance = 1.0f;
```

cpp 中实现移动

```cpp
UMoveComponent::UMoveComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	CurrentLocation = StartRelativeLocation;
}
// Called when the game starts
void UMoveComponent::BeginPlay()
{
	Super::BeginPlay();
	StartRelativeLocation = FVector(0.0f, 0.0f, 0.0f);
}


// Called every frame
void UMoveComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
	if (FVector::Dist(CurrentLocation, EndRelativeLocation) < stoppingDistance)
	{
		return;
	}
	FVector Direction = (EndRelativeLocation - CurrentLocation).GetSafeNormal();
	FVector NewLocation = CurrentLocation + (Direction * (speed * DeltaTime));
	SetRelativeLocation(NewLocation);
	CurrentLocation = NewLocation;

}
```

## cpp 生成蓝图类

这个懵逼了很久，因为蓝图对象没有对应的 cpp 类，不知道怎么在 cpp 里引用。最后看了[教程](https://forums.unrealengine.com/t/how-to-spawn-a-blueprint-actor-via-c/78121/12)

1. 新建一个 cpp 类型继承 Actor，用一个变量，在外面设置成想要生成的蓝图就行了。
2. 新建一个 blueprint actor 继承刚才新建的 cpp 的 actor
3. 在 blueprint actor 的“类默认值”选项中就出现 ActorToSpown 选项了，选择想要生成的 actor 即可

```cpp
	UPROPERTY(EditAnywhere)
	TSubclassOf<AActor>ActorToSpown;
```

```cpp
// Called when the game starts
void UGameController::BeginPlay()
{
	Super::BeginPlay();
	// ...
	FVector Location(0.0f, 0.0f, 0.0f);
	FRotator Rotation(0.0f, 0.0f, 0.0f);
	FActorSpawnParameters SpawnInfo;
	GetWorld()->SpawnActor<AActor>(ActorToSpown, Location, Rotation);
}
```

SpawnActor 有很多重载，可以返回被创建的对象的指针。

## UI

> 参考这个[教程](https://www.bilibili.com/video/BV1gT41137Vp)

### 显示 ui

想要显示 ui 需要

1. 打开“关卡蓝图”
2. 在开始事件里 create widget
3. 在 return value 后 add to view point

### 显示鼠标

1. 打开关卡蓝图
2. get player controller
3. set show mouse cursor

## F&Q

- unreal 里看不到 cpp 类。 这时候在 unreal 里直接点击编译，之后就能看到了。
