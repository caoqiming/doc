# component

unreal 更倾向将父子关系放在 component 里，这里介绍如何添加 component

> 参考[官方教程](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-cpp-quick-start#5endresult)

首先创建 c++ 类，在头文件中添加一个 component 的变量。

```cpp
	UPROPERTY(VisibleAnywhere)
	UStaticMeshComponent* VisualMesh;
```

然后在 cpp 文件的构造函数中对该 mesh 进行初始化，其中被注释掉的部分就是给 VisualMesh 一个初始值，设置之后在 UE 的界面就直接可以看到，不设置的话将其拖到场景中再设置也是可以的。

```cpp
// Sets default values
AFloatingActor::AFloatingActor()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
    VisualMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
    VisualMesh->SetupAttachment(RootComponent);

    /*
    static ConstructorHelpers::FObjectFinder<UStaticMesh> CubeVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Cube.Shape_Cube"));

    if (CubeVisualAsset.Succeeded())
    {
        VisualMesh->SetStaticMesh(CubeVisualAsset.Object);
        VisualMesh->SetRelativeLocation(FVector(0.0f, 0.0f, 0.0f));
    }
    */
}
```

这部分代码实现悬浮的效果

```cpp
// Called every frame
void AFloatingActor::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
    FVector NewLocation = GetActorLocation();
    FRotator NewRotation = GetActorRotation();
    float RunningTime = GetGameTimeSinceCreation();
    float DeltaHeight = (FMath::Sin(RunningTime + DeltaTime) - FMath::Sin(RunningTime));
    NewLocation.Z += DeltaHeight * 20.0f;       //Scale our height by a factor of 20
    float DeltaRotation = DeltaTime * 20.0f;	//Rotate by 20 degrees per second
    NewRotation.Yaw += DeltaRotation;
    SetActorLocationAndRotation(NewLocation, NewRotation);
}

```
