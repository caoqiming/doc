# ring buffer

RingBuffer - an array with a Front and Back pointer and with implicit wraparound to the beginning of the array when reaching the end of the array when iterating from Front to Back Useful for providing O(1) push/pop at the end of the array (for Queue or Stack) while still having high cache coherency during iteration.

[官方文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Core/Containers/TRingBuffer?application_version=5.4)

```cpp
#include "Containers/RingBuffer.h"

template<typename T, typename AllocatorT>
class TRingBuffer

// Construct Empty Queue with the given initial requested capacity.
TRingBuffer (SizeType InitialCapacity)

// Add a new element after the back pointer of the RingBuffer, resizing if necessary.
IndexType Add(const ElementType& Element)

// Add a new element after the back pointer of the RingBuffer, resizing if necessary.
ElementType & Add_GetRef(const ElementType& Element)

// Add a new element before the front pointer of the RingBuffer, resizing if necessary.
IndexType AddFront(const ElementType& Element)

// Shift all elements so that the front pointer's location in memory is less than the back pointer's.
TArrayView< T > Compact ()

// Return a const reference to the element at the back pointer of the RingBuffer.
ElementType & Last ()

// Return a reference to the element at the front pointer of the RingBuffer.
ElementType & First ()

// Pop the given number of arguments (default: 1) from the back pointer of the RingBuffer.
void Pop (SizeType PopCount)

// Pop one element from the back pointer of the RingBuffer and return the popped value.
ElementType PopValue ()

// Pop the given number of elements (default: 1) from the front pointer of the RingBuffer.
void PopFront(SizeType PopCount)

// Pop one element from the front pointer of the RingBuffer and return the popped value.
ElementType PopFrontValue ()
```
