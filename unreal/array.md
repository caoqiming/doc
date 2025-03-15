# Array

## Creating and Filling an Array

```cpp
    TArray<int32> IntArray;
    IntArray.Init(10, 5);
    // IntArray == [10,10,10,10,10]
```

`Add` and `Emplace` functions can create new elements at the end of the array:

```cpp
    TArray<FString> StrArr;
    StrArr.Add    (TEXT("Hello"));
    StrArr.Emplace(TEXT("World"));
    // StrArr == ["Hello","World"]
```

> - `Add` (or `Push`) will copy (or move) an instance of the element type into the array.
> - `Emplace` will use the arguments you give it to construct a new instance of the element type.

`Append` adds multiple elements at once from either another TArray, or a pointer to a regular C array and the size of that array:

```cpp
	FString Arr[] = { TEXT("of"), TEXT("Tomorrow") };
	StrArr.Append(Arr, ARRAY_COUNT(Arr));
	// StrArr == ["Hello","World","of","Tomorrow"]
```

`AddUnique` only adds a new element to the container if an equivalent element doesn't already exist. Equivalence is checked by using the element type's `operator==`:

```cpp
	StrArr.AddUnique(TEXT("!"));
	// StrArr == ["Hello","World","of","Tomorrow","!"]

	StrArr.AddUnique(TEXT("!"));
	// StrArr is unchanged as "!" is already an element
```

`Insert`, like `Add`, `Emplace` and `Append`, adds a single element or a copy of an array of elements at a given index:

```cpp
    StrArr.Insert(TEXT("Brave"), 1);
	// StrArr == ["Hello","Brave","World","of","Tomorrow","!"]
```

The SetNum function can directly set the number of array elements, with new elements being created using the element type's default constructor if the new number is greater than the current one:

```cpp
	StrArr.SetNum(8);
	// StrArr == ["Hello","Brave","World","of","Tomorrow","!","",""]
```

## Iteration

recommended way is to use the C++ ranged-for feature:

```cpp
	FString JoinedStr;
	for (auto& Str : StrArr)
	{
		JoinedStr += Str;
		JoinedStr += TEXT(" ");
	}
    // JoinedStr == "Hello Brave World of Tomorrow ! "
```

Regular index-based iteration is also possible, of course:

```cpp
	for (int32 Index = 0; Index != StrArr.Num(); ++Index)
	{
		JoinedStr += StrArr[Index];
		JoinedStr += TEXT(" ");
	}
```

Finally, arrays also have their own iterator type for more control over your iteration. There are two functions called `CreateIterator` and `CreateConstIterator` which can be used for read-write or read-only access to the elements respectively:

```cpp
	for (auto It = StrArr.CreateConstIterator(); It; ++It)
	{
		JoinedStr += *It;
		JoinedStr += TEXT(" ");
	}
```

### Sorting

Arrays can be sorted simply by calling the `Sort` function:

```cpp
	StrArr.Sort();
	// StrArr == ["!","Brave","Hello","of","Tomorrow","World"]
```

Here, the values are sorted by means of the element type's `operator<`

```cpp
	StrArr.Sort([](const FString& A, const FString& B) {
		return A.Len() < B.Len();
	});
	// StrArr == ["!","of","Hello","Brave","World","Tomorrow"]
```

`Sort` is implemented as a quicksort. The `HeapSort` function can be used to perform a heap sort. They are not stable.

Finally, `StableSort` can be used to guarantee the relative order of equivalent elements after sorting.

## Queries

We can ask the array how many elements it holds by using the `Num` function:

```cpp
    int32 Count = StrArr.Num();
	// Count == 6
```

you can use the `GetData` function to return a pointer to the elements in the array. This pointer is only valid as long as the array exists and before any mutating operations are made to the array.

```cpp
	FString* StrPtr = StrArr.GetData();
	// StrPtr[0] == "!"
	// StrPtr[1] == "of"
	// ...
	// StrPtr[5] == "Tomorrow"
	// StrPtr[6] - undefined behavior
```

You can also ask the container how big the elements are:

```cpp
    uint32 ElementSize = StrArr.GetTypeSize();
	// ElementSize == sizeof(FString)
```

To retrieve elements, you can use the indexing operator[] and pass it a zero-based index to the element you want:

```cpp
	FString Elem1 = StrArr[1];
	// Elem1 == "of"
```

Passing an invalid index — less than 0 or greater than or equal to Num() — will cause a runtime error. You can ask the container if a particular index is valid using the `IsValidIndex` function:

You can also index from the end of the array backward by using the `Last` function. The index defaults to zero. The `Top` function is a synonym for `Last`, except it doesn't take an index:

```cpp
	FString ElemEnd  = StrArr.Last();
	FString ElemEnd0 = StrArr.Last(0);
	FString ElemEnd1 = StrArr.Last(1);
	FString ElemTop  = StrArr.Top();
	// ElemEnd  == "Tomorrow"
	// ElemEnd0 == "Tomorrow"
	// ElemEnd1 == "World"
	// ElemTop  == "Tomorrow"
```

We can ask the array if it contains a certain element:

```cpp
    bool bHello   = StrArr.Contains(TEXT("Hello"));
	bool bGoodbye = StrArr.Contains(TEXT("Goodbye"));
	// bHello   == true
	// bGoodbye == false
```

We can find elements by using the Find family of functions. To check if an element exists and return its index, we use Find:

```cpp
    int32 Index;
	if (StrArr.Find(TEXT("Hello"), Index))
	{
		// Index == 3
	}
```

This sets Index to be the index of the first element found. If there are duplicate elements and we instead want to find the index of last element, we use the `FindLast` function instead. Find and FindLast can also return an element index directly.

```cpp
	int32 Index2     = StrArr.Find(TEXT("Hello"));
	int32 IndexLast2 = StrArr.FindLast(TEXT("Hello"));
	int32 IndexNone  = StrArr.Find(TEXT("None"));
	// Index2     == 3
	// IndexLast2 == 3
	// IndexNone  == INDEX_NONE
```

`IndexOfByKey` works similarly, but allows comparison of the elements with an arbitrary object. With the Find functions, the argument is actually converted to the element type (FString in this case) before the search begins. With `IndexOfByKey`, the key is compared directly, supporting searches even when the key type isn't directly convertible to the element type.

The `IndexOfByPredicate` function finds the index of the first element that matches the specified predicate, again returning the special `INDEX_NONE` value if none was found:

```cpp
	int32 Index = StrArr.IndexOfByPredicate([](const FString& Str){
		return Str.Contains(TEXT("r"));
	});
	// Index == 2
```

Instead of returning indices, we can return pointers back to the elements we find. `FindByKey` works like `IndexOfByKey`, comparing the elements to an arbitrary object, but returning a pointer to the element it finds. If it does not find an element, it will return nullptr:

```cpp
    auto* OfPtr  = StrArr.FindByKey(TEXT("of")));
	auto* ThePtr = StrArr.FindByKey(TEXT("the")));
	// OfPtr  == &StrArr[1]
	// ThePtr == nullptr
```

`FindByPredicate` can be used like `IndexOfByPredicate`, except that it returns pointer instead of an index:

```cpp
	auto* Len5Ptr = StrArr.FindByPredicate([](const FString& Str){
		return Str.Len() == 5;
	});
	auto* Len6Ptr = StrArr.FindByPredicate([](const FString& Str){
		return Str.Len() == 6;
	});
	// Len5Ptr == &StrArr[2]
	// Len6Ptr == nullptr
```

Finally, you can retrieve an array of elements matching a particular predicate with the `FilterByPredicate` function:

```cpp
	auto Filter = StrArray.FilterByPredicate([](const FString& Str){
		return !Str.IsEmpty() && Str[0] < TEXT('M');
	});
```

## Removal

The `Remove` function removes all elements that are considered equal to the element you provide, according to the element type's `operator==` function. For example:

```cpp
    TArray<int32> ValArr;
	int32 Temp[] = { 10, 20, 30, 5, 10, 15, 20, 25, 30 };
	ValArr.Append(Temp, ARRAY_COUNT(Temp));
	// ValArr == [10,20,30,5,10,15,20,25,30]

	ValArr.Remove(20);
	// ValArr == [10,30,5,10,15,25,30]
```

You can also use `RemoveSingle` to erase the first matching element in the array. This is useful if you know your array may contain duplicates and you only want to erase one, or as an optimization if you know that your array can only ever contain one matching element:

```cpp
    ValArr.RemoveSingle(30);
	// ValArr == [10,5,10,15,25,30]
```

We can also remove elements by their zero-based index by using the `RemoveAt` function. You may wish to use `IsValidIndex` to verify that the array has an element with the index you plan to provide, as passing an invalid index to this function will cause a runtime error.:

```cpp
    ValArr.RemoveAt(2); // Removes the element at index 2
	// ValArr == [10,5,15,25,30]

	ValArr.RemoveAt(99); // This will cause a runtime error as
	                       // there is no element at index 99
```

We can also remove elements which match a predicate by using the `RemoveAll` function. For example, removing all values which are a multiple of 3:

```cpp
    ValArr.RemoveAll([](int32 Val) {
		return Val % 3 == 0;
	});
	// ValArr == [10,5,25]
```

> In all of these cases, when elements were removed, the elements that followed were shuffled down into lower indices, as there can never be holes left in the array.

The shuffling process has an overhead. If you don't really care what order the remaining elements are left in, this overhead can be reduced by using the `RemoveSwap`, `RemoveAtSwap` and `RemoveAllSwap` functions, which work like their non-swapping variants except that they don't guarantee the order of the remaining elements, enabling them to complete their tasks more quickly:

```cpp
    TArray<int32> ValArr2;
	for (int32 i = 0; i != 10; ++i)
		ValArr2.Add(i % 5);
	// ValArr2 == [0,1,2,3,4,0,1,2,3,4]

	ValArr2.RemoveSwap(2);
	// ValArr2 == [0,1,4,3,4,0,1,3]

	ValArr2.RemoveAtSwap(1);
	// ValArr2 == [0,3,4,3,4,0,1]

	ValArr2.RemoveAllSwap([](int32 Val) {
		return Val % 3 == 0;
	});
	// ValArr2 == [1,4,4]
```

Finally, the `Empty` function will remove everything from the array:

```cpp
    ValArr2.Empty();
	// ValArr2 == []
```

## Operators

As arrays strictly own their elements, copying an array is deep and so the new array will have its own copy of the elements:

```cpp
    TArray<int32> ValArr3;
	ValArr3.Add(1);
	ValArr3.Add(2);
	ValArr3.Add(3);

	auto ValArr4 = ValArr3;
	// ValArr4 == [1,2,3];
	ValArr4[0] = 5;
	// ValArr3 == [1,2,3];
	// ValArr4 == [5,2,3];
```

As an alternative to the Append function, you can concatenate arrays with `operator+=`:

```cpp
    ValArr4 += ValArr3;
	// ValArr4 == [5,2,3,1,2,3]
```

TArray also supports move semantics, which can be invoked using the `MoveTemp` function. After a move, the source array is guaranteed to be left empty:

```cpp
    ValArr3 = MoveTemp(ValArr4);
	// ValArr3 == [5,2,3,1,2,3]
	// ValArr4 == []
```

Arrays can be compared using the `operator==` and `operator!=`. The order of the elements are important — two arrays are only equal if they have the same number of elements in the same order. Elements are compared using their own `operator==`:

```cpp
    TArray<FString> FlavorArr1;
	FlavorArr1.Emplace(TEXT("Chocolate"));
	FlavorArr1.Emplace(TEXT("Vanilla"));
	// FlavorArr1 == ["Chocolate","Vanilla"]

	auto FlavorArr2 = Str1Array;
	// FlavorArr2 == ["Chocolate","Vanilla"]

	bool bComparison1 = FlavorArr1 == FlavorArr2;
	// bComparison1 == true

	for (auto& Str : FlavorArr2)
	{
		Str = Str.ToUpper();
	}
	// FlavorArr2 == ["CHOCOLATE","VANILLA"]

	bool bComparison2 = FlavorArr1 == FlavorArr2;
	// bComparison2 == true, because FString comparison ignores case

	Exchange(FlavorArr2[0], FlavorArr2[1]);
	// FlavorArr2 == ["VANILLA","CHOCOLATE"]

	bool bComparison3 = FlavorArr1 == FlavorArr2;
	// bComparison3 == false, because the order has changed
```

## Heap

When implemented as an array, the root node of the tree is at element 0 and the indices of the left and right child nodes of a node at index N are 2N+1 and 2N+2 respectively.

Any existing array can be turned into a heap by calling the Heapify function. This is overloaded to take a predicate or not, where the non-predicated version will use the element type's operator< to determine ordering:

```cpp
    TArray<int32> HeapArr;
	for (int32 Val = 10; Val != 0; --Val)
	{
		HeapArr.Add(Val);
	}
	// HeapArr == [10,9,8,7,6,5,4,3,2,1]
	HeapArr.Heapify();
	// HeapArr == [1,2,4,3,6,5,8,10,7,9]
```

New elements can be added to the heap via the HeapPush function, reordering other nodes to maintain the heap:

```cpp
HeapArr.HeapPush(4);
// HeapArr == [1,2,4,3,4,5,8,10,7,9,6]
```

The `HeapPop` and `HeapPopDiscard` functions are used to remove the top node from the heap. The difference between the two is that the former takes a reference to an element type to return a copy of the top element, and the latter simply removes the top node without returning it in any way. Both functions result in the same change to the array, and the heap is again maintained by reordering other elements appropriately:

```cpp
    int32 TopNode;
	HeapArr.HeapPop(TopNode);
	// TopNode == 1
	// HeapArr == [2,3,4,6,4,5,8,10,7,9]
```

HeapRemoveAt will remove an element from the array at a given index, and then reorder elements to maintain the heap:

```cpp
    HeapArr.HeapRemoveAt(1);
	// HeapArr == [2,4,4,6,9,5,8,10,7]
```

> `HeapPush`, `HeapPop`, `HeapPopDiscard` and `HeapRemoveAt` should only be called when the structure is already a valid heap, such as after a `Heapify` call, any other heap operation, or by manually manipulating the array into a heap.

Finally, the top node of the heap can be inspected using HeapTop, without changing the array:

```cpp
    int32 Top = HeapArr.HeapTop();
	// Top == 2
```

## Slack

The amount of slack in an array is defined as the difference between the number of elements stored in the array and the number of elements that the array could store with the amount of memory it has allocated.

As a default-constructed array allocates no memory, the slack will initially be zero. You can find out how much slack there is in an array by using the GetSlack function. The maximum number of elements that the array can hold before the container reallocates can be obtained by the Max function. GetSlack is equivalent to the difference between `Max` and `Num`:

```cpp
    TArray<int32> SlackArray;
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 0

	SlackArray.Add(1);
	// SlackArray.GetSlack() == 3
	// SlackArray.Num()      == 1
	// SlackArray.Max()      == 4

	SlackArray.Add(2);
	SlackArray.Add(3);
	SlackArray.Add(4);
	SlackArray.Add(5);
	// SlackArray.GetSlack() == 17
	// SlackArray.Num()      == 5
	// SlackArray.Max()      == 22
```

The `Empty` function, mentioned above, takes an optional slack argument:

```cpp
    SlackArray.Empty();
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 0
	SlackArray.Empty(3);
	// SlackArray.GetSlack() == 3
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 3
	SlackArray.Add(1);
	SlackArray.Add(2);
	SlackArray.Add(3);
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 3
	// SlackArray.Max()      == 3
```

There is a `Reset` function which works similarly to `Empty`, except that it doesn't free memory if the requested slack is already provided by the current allocation. However, it will allocate more memory if the requested slack is larger:

```cpp
    SlackArray.Reset(0);
	// SlackArray.GetSlack() == 3
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 3
	SlackArray.Reset(10);
	// SlackArray.GetSlack() == 10
	// SlackArray.Num()      == 0
	// SlackArray.Max()      == 10
```

And finally, you can remove all slack with the `Shrink` function, which will resize the allocation to be the minimum size required to hold the current elements. `Shrink` does not have any effect on the elements in the array:

```cpp
    SlackArray.Add(5);
	SlackArray.Add(10);
	SlackArray.Add(15);
	SlackArray.Add(20);
	// SlackArray.GetSlack() == 6
	// SlackArray.Num()      == 4
	// SlackArray.Max()      == 10
	SlackArray.Shrink();
	// SlackArray.GetSlack() == 0
	// SlackArray.Num()      == 4
	// SlackArray.Max()      == 4
```

## Raw Memory

> 更底层的接口参考[官方文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/array-containers-in-unreal-engine?application_version=5.4#rawmemory)
