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
