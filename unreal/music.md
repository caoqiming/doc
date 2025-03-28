# music

```cpp
#include "Sound/SoundWave.h"
#include "Kismet/GameplayStatics.h"

// ......

// 加载Wave音乐
    auto cls = StaticLoadObject(UObject::StaticClass(), nullptr, TEXT("/Script/Engine.SoundWave'/Game/music/wakuwaku.wakuwaku'"));
    USoundWave *WakuWaku = Cast<USoundWave>(cls);
    UGameplayStatics::PlaySound2D(GetWorld(), WakuWaku, 0.3f);

```
