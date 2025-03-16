# set

## Creating and Filling a Set

```cpp
    TSet<FString> FruitSet;
```

The standard way to populate a set is to use the Add function and provide a key (element):

```cpp
    FruitSet.Add(TEXT("Banana"));
	FruitSet.Add(TEXT("Grapefruit"));
	FruitSet.Add(TEXT("Pineapple"));
	// FruitSet == [ "Banana", "Grapefruit", "Pineapple" ]
```

Since this set uses the default allocator, keys are guaranteed to be unique. The following is the result of attempting to add a duplicate key:

```cpp
    FruitSet.Add(TEXT("Pear"));
	FruitSet.Add(TEXT("Banana"));
	// FruitSet == [ "Banana", "Grapefruit", "Pineapple", "Pear" ]
	// Note: Only one banana entry.
```

Like TArray, we can also use `Emplace` instead of `Add` to avoid the creation of temporaries when inserting into the set:

```cpp
    FruitSet.Emplace(TEXT("Orange"));
	// FruitSet == [ "Banana", "Grapefruit", "Pineapple", "Pear", "Orange" ]
```

It's also possible to insert all the elements from another set by using the `Append` function to merge them:

```cpp
    TSet<FString> FruitSet2;
	FruitSet2.Emplace(TEXT("Kiwi"));
	FruitSet2.Emplace(TEXT("Melon"));
	FruitSet2.Emplace(TEXT("Mango"));
	FruitSet2.Emplace(TEXT("Orange"));
	FruitSet.Append(FruitSet2);
	// FruitSet == [ "Banana", "Grapefruit", "Pineapple", "Pear", "Orange", "Kiwi", "Melon", "Mango" ]
```

## Editing UPROPERTY TSets

If you mark the TSet with the UPROPERTY macro and one of the "editable" keywords (EditAnywhere, EditDefaultsOnly, or EditInstanceOnly), you can add and edit elements in Unreal Editor.

```cpp
    UPROPERTY(Category = SetExample, EditAnywhere)
	TSet<FString> FruitSet;
```

## Iteration

Iteration over TSets is similar to TArrays. You can use the C++ ranged-for feature:

```cpp
    for (auto& Elem : FruitSet)
	{
		FPlatformMisc::LocalPrint(
			*FString::Printf(
				TEXT(" \"%s\"\n"),
				*Elem
			)
		);
	}
	// Output:
	// 	"Banana"
	// 	"Grapefruit"
	// 	"Pineapple"
	// 	"Pear"
	// 	"Orange"
	// 	"Kiwi"
	// 	"Melon"
	// 	"Mango"
```

You can also create iterators with the `CreateIterator` and `CreateConstIterators`

```cpp
	for (auto It = FruitSet.CreateConstIterator(); It; ++It)
	{
		FPlatformMisc::LocalPrint(
			*FString::Printf(
				TEXT("(%s)\n"),
				*It
			)
		);
	}
```

## Queries

To find out how many elements are currently in the set, call the Num function.

```cpp
	int32 Count = FruitSet.Num();
	// Count == 8
```

In order to determine whether or not a set contains a specific element, call the `Contains` function, as follows:

```cpp
    bool bHasBanana = FruitSet.Contains(TEXT("Banana"));
	bool bHasLemon = FruitSet.Contains(TEXT("Lemon"));
	// bHasBanana == true
	// bHasLemon == false
```

You can use the `FSetElementId` struct to find the index of a key within the set. You can then use that index with `operator[]` to retrieve the element.

```cpp
	FSetElementId BananaIndex = FruitSet.Index(TEXT("Banana"));
	// BananaIndex is a value between 0 and (FruitSet.Num() - 1)
	FPlatformMisc::LocalPrint(
		*FString::Printf(
			TEXT(" \"%s\"\n"),
			*FruitSet[BananaIndex]
		)
	);
	// Prints "Banana"

	FSetElementId LemonIndex = FruitSet.Index(TEXT("Lemon"));
	// LemonIndex is INDEX_NONE (-1)
	FPlatformMisc::LocalPrint(
		*FString::Printf(
			TEXT(" \"%s\"\n"),
			*FruitSet[LemonIndex]
		)
	); // Assert!
```

`Find` returns a pointer to the value of the element if the set contains the key, or a null pointer if it does not.

```cpp
	FString* PtrBanana = FruitSet.Find(TEXT("Banana"));
	FString* PtrLemon = FruitSet.Find(TEXT("Lemon"));
	// *PtrBanana == "Banana"
	//  PtrLemon == nullptr
```

The `Array` function returns a TArray populated with a copy of all the elements in the TSet. The array that you pass in will be emptied at the beginning of the operation, so the resulting number of elements will always equal the number of elements in the set:

```cpp
	TArray<FString> FruitArray = FruitSet.Array();
	// FruitArray == [ "Banana","Grapefruit","Pineapple","Pear","Orange","Kiwi","Melon","Mango" ] (order may vary)
```

## Removal

Elements can be removed by index with the Remove function, though this is recommended only for use while iterating through the elements. The Remove function returns the number of elements removed. If a TSet supports duplicate keys, Remove will remove all matching elements.

```cpp
    FruitSet.Remove(0);
	// FruitSet == [ "Grapefruit","Pineapple","Pear","Orange","Kiwi","Melon","Mango" ]
```

Finally, you can remove all elements from the set with the Empty or Reset functions.

```cpp
	TSet<FString> FruitSetCopy = FruitSet;
	// FruitSetCopy == [ "Grapefruit","Pear","Orange","Kiwi","Melon","Mango" ]

	FruitSetCopy.Empty();
	// FruitSetCopy == []
```

## Sorting

A TSet can be sorted. After sorting, iteration over the set will present the elements in sorted order, but this behavior is only guaranteed until the next time you modify the set. Sorting is unstable, so equivalent elements in a set that supports duplicate keys may appear in any order.

```cpp
	FruitSet.Sort([](const FString& A, const FString& B) {
		return A > B; // sort by reverse-alphabetical order
	});
	// FruitSet == [ "Pear", "Orange", "Melon", "Mango", "Kiwi", "Grapefruit" ] (order is temporarily guaranteed)

	FruitSet.Sort([](const FString& A, const FString& B) {
		return A.Len() < B.Len(); // sort strings by length, shortest to longest
	});
	// FruitSet == [ "Pear", "Kiwi", "Melon", "Mango", "Orange", "Grapefruit" ] (order is temporarily guaranteed)

```

## Operators

Like TArray, TSet is a regular value type and as such can be copied with the standard copy constructor or assignment operator. Sets strictly own their elements, so copying a set is deep; the new set will have its own copy of the elements.

```cpp
	TSet<int32, FString> NewSet = FruitSet;
	NewSet.Add(TEXT("Apple"));
	NewSet.Remove(TEXT("Pear"));
	// FruitSet == [ "Pear", "Kiwi", "Melon", "Mango", "Orange", "Grapefruit" ]
	// NewSet == [ "Kiwi", "Melon", "Mango", "Orange", "Grapefruit", "Apple" ]
```

## Slack

The following code removes all elements from the set without deallocating any memory, resulting in the creation of slack:

```cpp
	FruitSet.Reset();
	// FruitSet == [ <invalid>, <invalid>, <invalid>, <invalid>, <invalid>, <invalid> ]
```

To create slack directly, such as to preallocate memory before adding elements, use the `Reserve` function.

```cpp
	FruitSet.Reserve(10);
	for (int32 i = 0; i < 10; ++i)
	{
		FruitSet.Add(FString::Printf(TEXT("Fruit%d"), i));
	}
	// FruitSet == [ "Fruit9", "Fruit8", "Fruit7" ... "Fruit2", "Fruit1", "Fruit0" ]
```

To remove all slack from a TSet, use the `Collapse` and `Shrink` functions. `Shrink` removes all slack from the end of the container, but this will leave any empty elements in the middle or at the start.

```cpp
	// Remove every other element from the set.
	for (int32 i = 0; i < 10; i += 2)
	{
		FruitSet.Remove(FSetElementId::FromInteger(i));
	}
	// FruitSet == ["Fruit8", <invalid>, "Fruit6", <invalid>, "Fruit4", <invalid>, "Fruit2", <invalid>, "Fruit0", <invalid> ]

	FruitSet.Shrink();
	// FruitSet == ["Fruit8", <invalid>, "Fruit6", <invalid>, "Fruit4", <invalid>, "Fruit2", <invalid>, "Fruit0" ]
```

`Shrink` only removed one invalid element in the code above because there was only one empty element at the end. To remove all slack, the `Compact` or `CompactStable` function should be called first, so that the empty spaces will be grouped together in preparation for Shrink. As its name implies, `CompactStable` maintains element order while consolidating empty elements.

```cpp
	FruitSet.CompactStable();
	// FruitSet == ["Fruit8", "Fruit6", "Fruit4", "Fruit2", "Fruit0", <invalid>, <invalid>, <invalid>, <invalid> ]
	FruitSet.Shrink();
	// FruitSet == ["Fruit8", "Fruit6", "Fruit4", "Fruit2", "Fruit0" ]
```

## DefaultKeyFuncs

> 参考[官方文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/set-containers-in-unreal-engine#defaultkeyfuncs)
