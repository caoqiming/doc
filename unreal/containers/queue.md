# queue

[官方文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TQueue?application_version=5.4)

```cpp
#include "Containers/Queue.h"

template<typename T, EQueueMode Mode>  class TQueue

// Adds an item to the head of the queue.To be called only from producer thread(s).
bool Enqueue ( const FElementType& Item)

// Removes and returns the item from the tail of the queue.To be called only from consumer thread.
bool Dequeue(FElementType& OutItem)

// 	Empty the queue, discarding all items.To be called only from consumer thread.
viod Empty()

// Adds an item to the head of the queue.To be called only from producer thread(s).
bool Enqueue (const FElementType& Item)

bool IsEmpty()

// Peeks at the queue's tail item without removing it.To be called only from consumer thread.
bool Peek(FElementType& OutItem)

// Removes the item from the tail of the queue.To be called only from consumer thread.
bool Pop()
```
