# map

TMap is a hashing container, which means that the key type must support the `GetTypeHash` function and provide an `operator==` for comparing keys for equality
There are two types of map in Unreal Engine:

- TMap
- TMultiMap

When adding a new key-value pair to a TMap with a key that matches an existing pair, the new pair will replace the old one.
But in a TMultiMap, the container stores both the new pair and the old.

## Create and Fill a Map

```cpp
TMap<int32, FString> FruitMap;
```

The standard way to populate a map is to call `Add` with a key and a value:

```cpp
FruitMap.Add(5, TEXT("Banana"));
FruitMap.Add(2, TEXT("Grapefruit"));
FruitMap.Add(7, TEXT("Pineapple"));
// FruitMap == [
// 	{ Key: 5, Value: "Banana"     },
// 	{ Key: 2, Value: "Grapefruit" },
// 	{ Key: 7, Value: "Pineapple"  }
// ]
```

The `Add` function can accept a key without a value. When this overloaded Add is called, the value will be default-constructed.

Like TArray, we can use `Emplace` instead of `Add` to avoid the creation of temporaries when inserting into the map:

```cpp
FruitMap.Emplace(3, TEXT("Orange"));
// FruitMap == [
// 	{ Key: 5, Value: "Banana"    },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: ""          },
// 	{ Key: 3, Value: "Orange"    }
// ]
```

You can merge two maps with the `Append` function, which moves all elements from the argument map into the calling object map:

```cpp
TMap<int32, FString> FruitMap2;
FruitMap2.Emplace(4, TEXT("Kiwi"));
FruitMap2.Emplace(9, TEXT("Melon"));
FruitMap2.Emplace(5, TEXT("Mango"));
FruitMap.Append(FruitMap2);
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     }
// ]
// FruitMap2 is now empty.
```

If you mark the TMap with the `UPROPERTY` macro and one of the "editable" keywords (`EditAnywhere`, `EditDefaultsOnly`, or `EditInstanceOnly`), you can add and edit elements in the Editor.

```cpp
UPROPERTY(EditAnywhere, Category = MapsAndSets)
TMap<int32, FString> FruitMap;
```

## Iterate

Iteration over TMaps is similar to TArrays. You can use the C++ ranged-for feature, remembering that the element type is a TPair:

```cpp
for (auto& Elem : FruitMap)
{
	FPlatformMisc::LocalPrint(
		*FString::Printf(
			TEXT("(%d, \"%s\")\n"),
			Elem.Key,
			*Elem.Value
		)
	);
}

// Output:
// (5, "Mango")
// (2, "Pear")
// (7, "Pineapple")
// (4, "Kiwi")
// (3, "Orange")
// (9, "Melon")
```

You can create iterators with the `CreateIterator` and `CreateConstIterator` functions.

```cpp
for (auto It = FruitMap.CreateConstIterator(); It; ++It)
{
	FPlatformMisc::LocalPrint(
		*FString::Printf(
			TEXT("(%d, \"%s\")\n"),
			It.Key(),   // same as It->Key
			*It.Value() // same as *It->Value
		)
	);
}
```

## Get Value

If you know that your map contains a certain key, you can look up the corresponding value with `operator[]`, using the key as the index. Doing this with a non-const map returns a non-const reference, while a const map returns a const reference.

> You should always check that the map contains the key before using operator[]. If the map does not contain the key, it will assert.

## Query

To determine how many elements are currently in a TMap, call the `Num` function:

```cpp
int32 Count = FruitMap.Num();
// Count == 6
```

To determine whether or not a map contains a specific key, call the `Contains` function:

```cpp
bool bHas7 = FruitMap.Contains(7);
bool bHas8 = FruitMap.Contains(8);
// bHas7 == true
// bHas8 == false
```

You could check using the Contains function, and then use operator[]. However, this is suboptimal, since a successful retrieval involves two lookups on the same key.

The Find function combines these behaviors with a single lookup. Find returns a pointer to the value of the element if the map contains the key, or a null pointer if it does not. Calling Find on a const map returns a const pointer.

```cpp
FString* Ptr7 = FruitMap.Find(7);
FString* Ptr8 = FruitMap.Find(8);
// *Ptr7 == "Pineapple"
//  Ptr8 == nullptr
```

Alternatively, to ensure that you receive a valid result from your query, you can use `FindOrAdd` or `FindRef`:

`FindOrAdd` returns a reference to the value associated with the key you provide. If the key is not in the map, `FindOrAdd` returns a newly-created element, with your key and the default-constructed value, that it will add to the map.

> Because FindOrAdd can add new entries to the map, previously-obtained pointers or references could become invalid.

`FindRef`: Despite its name, returns a copy of the value associated with your key, or a default-constructed value if your key is not found in the map. `FindRef` does not create a new element, and thus is available for use with both const and non-const maps.

```cpp
FString& Ref7 = FruitMap.FindOrAdd(7);
// Ref7     == "Pineapple"
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     }
// ]

FString& Ref8 = FruitMap.FindOrAdd(8);
// Ref8     == ""
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     },
// 	{ Key: 8, Value: ""          }
// ]

FString Val7 = FruitMap.FindRef(7);
FString Val6 = FruitMap.FindRef(6);
// Val7     == "Pineapple"
// Val6     == ""
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     },
// 	{ Key: 8, Value: ""          }
// ]
```

## Remove

You can remove elements from a map using the `Remove` function and providing the key of the element to remove. The return value is the number of elements that were removed, and can be zero if the map didn't contain any elements matching the key.

```cpp
FruitMap.Remove(8);
// FruitMap == [
// 	{ Key: 5, Value: "Mango"     },
// 	{ Key: 2, Value: "Pear"      },
// 	{ Key: 7, Value: "Pineapple" },
// 	{ Key: 4, Value: "Kiwi"      },
// 	{ Key: 3, Value: "Orange"    },
// 	{ Key: 9, Value: "Melon"     }
// ]
```

The `FindAndRemoveChecked` function can be used to remove an element from the map and return its value. The "checked" part of the name indicates that the map calls check if the key does not exist.

```cpp
FString Removed7 = FruitMap.FindAndRemoveChecked(7);
// Removed7 == "Pineapple"
// FruitMap == [
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 2, Value: "Pear"   },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" },
// 	{ Key: 9, Value: "Melon"  }
// ]

FString Removed8 = FruitMap.FindAndRemoveChecked(8);
// Assert!
```

The `RemoveAndCopyValue` function is similar to Remove, but copies the value of the removed element out to a reference parameter. If the key you specified is not present in the map, the output parameter will be unchanged and the function returns false.

Finally, you can remove all elements from the map with the `Empty` or `Reset` functions.

```cpp
TMap<int32, FString> FruitMapCopy = FruitMap;
// FruitMapCopy == [
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" },
// 	{ Key: 9, Value: "Melon"  }
// ]

FruitMapCopy.Empty();		// You can also use Reset() here.
// FruitMapCopy == []
```

## Sort

You can sort by key or by value using the KeySort or ValueSort functions, respectively. Both functions take a binary predicate which specifies the sort order. After sorting, iteration over the map presents the elements in sorted order, but this behavior is only guaranteed until the next time you modify the map. Sorting is unstable, so equivalent elements in a TMultiMap may appear in any order.

```cpp
FruitMap.KeySort([](int32 A, int32 B) {
	return A > B; // sort keys in reverse
});
// FruitMap == [
// 	{ Key: 9, Value: "Melon"  },
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 3, Value: "Orange" }
// ]

FruitMap.ValueSort([](const FString& A, const FString& B) {
	return A.Len() < B.Len(); // sort strings by length
});
// FruitMap == [
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 9, Value: "Melon"  },
// 	{ Key: 3, Value: "Orange" }
// ]
```

## Operators

Maps strictly own their elements, so copying a map is deep; the new map will have its own copy of the elements.

```cpp
TMap<int32, FString> NewMap = FruitMap;
NewMap[5] = "Apple";
NewMap.Remove(3);
// FruitMap == [
// 	{ Key: 4, Value: "Kiwi"   },
// 	{ Key: 5, Value: "Mango"  },
// 	{ Key: 9, Value: "Melon"  },
// 	{ Key: 3, Value: "Orange" }
// ]
// NewMap == [
// 	{ Key: 4, Value: "Kiwi"  },
// 	{ Key: 5, Value: "Apple" },
// 	{ Key: 9, Value: "Melon" }
// ]
```

TMap supports move semantics, which can be invoked using the MoveTempfunction. After a move, the source map is guaranteed to be empty:

```cpp
FruitMap = MoveTemp(NewMap);
// FruitMap == [
// 	{ Key: 4, Value: "Kiwi"  },
// 	{ Key: 5, Value: "Apple" },
// 	{ Key: 9, Value: "Melon" }
// ]
// NewMap == []
```

## Slack

In the code below, the Reserve function allocates space for the map to contain up to ten elements:

```cpp
FruitMap.Reserve(10);
for (int32 i = 0; i < 10; ++i)
{
	FruitMap.Add(i, FString::Printf(TEXT("Fruit%d"), i));
}
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	{ Key: 8, Value: "Fruit8" },
// 	...
// 	{ Key: 1, Value: "Fruit1" },
// 	{ Key: 0, Value: "Fruit0" }
// ]
```

To remove all slack from a TMap, use the Collapse and Shrink functions. Shrink removes all slack from the end of the container, but leaves any empty elements in the middle or at the start.

```cpp
for (int32 i = 0; i < 10; i += 2)
{
	FruitMap.Remove(i);
}
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	<invalid>,
// 	{ Key: 7, Value: "Fruit7" },
// 	<invalid>,
// 	{ Key: 5, Value: "Fruit5" },
// 	<invalid>,
// 	{ Key: 3, Value: "Fruit3" },
// 	<invalid>,
// 	{ Key: 1, Value: "Fruit1" },
// 	<invalid>
// ]

FruitMap.Shrink();
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	<invalid>,
// 	{ Key: 7, Value: "Fruit7" },
// 	<invalid>,
// 	{ Key: 5, Value: "Fruit5" },
// 	<invalid>,
// 	{ Key: 3, Value: "Fruit3" },
// 	<invalid>,
// 	{ Key: 1, Value: "Fruit1" }
// ]
```

Shrink only removed one invalid element in the code above because there was only one empty element at the end. To remove all slack, use the Compact function first so that the empty spaces will be grouped together in preparation for Shrink.

```cpp
FruitMap.Compact();
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	{ Key: 7, Value: "Fruit7" },
// 	{ Key: 5, Value: "Fruit5" },
// 	{ Key: 3, Value: "Fruit3" },
// 	{ Key: 1, Value: "Fruit1" },
// 	<invalid>,
// 	<invalid>,
// 	<invalid>,
// 	<invalid>
// ]

FruitMap.Shrink();
// FruitMap == [
// 	{ Key: 9, Value: "Fruit9" },
// 	{ Key: 7, Value: "Fruit7" },
// 	{ Key: 5, Value: "Fruit5" },
// 	{ Key: 3, Value: "Fruit3" },
// 	{ Key: 1, Value: "Fruit1" }
// ]
```

## KeyFuncs

> 具体参考[官方文档](https://dev.epicgames.com/documentation/en-us/unreal-engine/map-containers-in-unreal-engine#keyfuncs)

As long as a type has an `operator==` and a non-member `GetTypeHash` overload, you can use it as a key type for a TMap without any changes. However, you may want to use types as keys without overloading those functions. In these cases, you can provide your own custom KeyFuncs. To create KeyFuncs for your key type, you must define two typedefs and three static functions

Type Definition:

1. `KeyInitType` Type used to pass keys around.
2. `ElementInitType` Type used to pass elements around.

Function:

1. `KeyInitType GetSetKey(ElementInitType Element)` Returns the key of an element.
2. `bool Matches(KeyInitType A, KeyInitType B)` Returns true if A and B are equivalent, false otherwise.
3. `uint32 GetKeyHash(KeyInitType Key)` Returns the hash value of Key.

```cpp
struct FMyStruct
{
	// String which identifies our key
	FString UniqueID;

	// Some state which doesn't affect struct identity
	float SomeFloat;

	explicit FMyStruct(float InFloat)
		: UniqueID (FGuid::NewGuid().ToString())
		, SomeFloat(InFloat)
	{

	}
};

template <typename ValueType>
struct TMyStructMapKeyFuncs :
	BaseKeyFuncs<
		TPair<FMyStruct, ValueType>,
		FString
	>
{

private:
	typedef BaseKeyFuncs<
		TPair<FMyStruct, ValueType>,
		FString
	> Super;

public:
	typedef typename Super::ElementInitType ElementInitType;
	typedef typename Super::KeyInitType     KeyInitType;

	static KeyInitType GetSetKey(ElementInitType Element)
	{
		return Element.Key.UniqueID;
	}

	static bool Matches(KeyInitType A, KeyInitType B)
	{
		return A.Compare(B, ESearchCase::CaseSensitive) == 0;
	}

	static uint32 GetKeyHash(KeyInitType Key)
	{
		return FCrc::StrCrc32(*Key);
	}
};

Copy full snippet

```
