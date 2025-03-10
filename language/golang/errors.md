# errors

Package errors implements functions to manipulate errors.

An error e wraps another error if e's type has one of the methods

```go
Unwrap() error
Unwrap() []error
```

If e.Unwrap() returns a non-nil error w or a slice containing w, then we say that e wraps w. 

Successive unwrapping of an error creates a tree. The `Is` and `As` functions inspect an error's tree by examining first the error itself followed by the tree of each of its children in turn (pre-order, depth-first traversal).

`Is` examines the tree of its first argument looking for an error that matches the second. It reports whether it finds a match. It should be used in preference to simple equality checks

```go
if errors.Is(err, fs.ErrExist)
```

is preferable to

```go
if err == fs.ErrExist
```

because the former will succeed if err wraps `io/fs.ErrExist`.

`As` examines the tree of its first argument looking for an error that can be **assigned** to its second argument, which must be a pointer. If it succeeds, it performs the assignment and returns true. Otherwise, it returns false.

```go
var perr *fs.PathError
if errors.As(err, &perr) {
	fmt.Println(perr.Path)
}
```

is preferable to

```go
if perr, ok := err.(*fs.PathError); ok {
	fmt.Println(perr.Path)
}
```

because the former will succeed if err wraps an `*io/fs.PathError`.

## code

这里是 go1.20.1 里的源码，注意不同 go 版本的是不同的。

```go
// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package errors

import (
	"internal/reflectlite"
)

// Unwrap returns the result of calling the Unwrap method on err, if err's
// type contains an Unwrap method returning error.
// Otherwise, Unwrap returns nil.
//
// Unwrap returns nil if the Unwrap method returns []error.
func Unwrap(err error) error {
	u, ok := err.(interface {
		Unwrap() error
	})
	if !ok {
		return nil
	}
	return u.Unwrap()
}

// Is reports whether any error in err's tree matches target.
//
// The tree consists of err itself, followed by the errors obtained by repeatedly
// calling Unwrap. When err wraps multiple errors, Is examines err followed by a
// depth-first traversal of its children.
//
// An error is considered to match a target if it is equal to that target or if
// it implements a method Is(error) bool such that Is(target) returns true.
//
// An error type might provide an Is method so it can be treated as equivalent
// to an existing error. For example, if MyError defines
//
//	func (m MyError) Is(target error) bool { return target == fs.ErrExist }
//
// then Is(MyError{}, fs.ErrExist) returns true. See syscall.Errno.Is for
// an example in the standard library. An Is method should only shallowly
// compare err and the target and not call Unwrap on either.
func Is(err, target error) bool {
	if target == nil {
		return err == target
	}

	isComparable := reflectlite.TypeOf(target).Comparable()
	for {
		if isComparable && err == target {
			return true
		}
		if x, ok := err.(interface{ Is(error) bool }); ok && x.Is(target) {
			return true
		}
		switch x := err.(type) {
		case interface{ Unwrap() error }:
			err = x.Unwrap()
			if err == nil {
				return false
			}
		case interface{ Unwrap() []error }:
			for _, err := range x.Unwrap() {
				if Is(err, target) {
					return true
				}
			}
			return false
		default:
			return false
		}
	}
}

// As finds the first error in err's tree that matches target, and if one is found, sets
// target to that error value and returns true. Otherwise, it returns false.
//
// The tree consists of err itself, followed by the errors obtained by repeatedly
// calling Unwrap. When err wraps multiple errors, As examines err followed by a
// depth-first traversal of its children.
//
// An error matches target if the error's concrete value is assignable to the value
// pointed to by target, or if the error has a method As(interface{}) bool such that
// As(target) returns true. In the latter case, the As method is responsible for
// setting target.
//
// An error type might provide an As method so it can be treated as if it were a
// different error type.
//
// As panics if target is not a non-nil pointer to either a type that implements
// error, or to any interface type.
func As(err error, target any) bool {
	if err == nil {
		return false
	}
	if target == nil {
		panic("errors: target cannot be nil")
	}
	val := reflectlite.ValueOf(target)
	typ := val.Type()
	if typ.Kind() != reflectlite.Ptr || val.IsNil() {
		panic("errors: target must be a non-nil pointer")
	}
	targetType := typ.Elem()
	if targetType.Kind() != reflectlite.Interface && !targetType.Implements(errorType) {
		panic("errors: *target must be interface or implement error")
	}
	for {
		if reflectlite.TypeOf(err).AssignableTo(targetType) {
			val.Elem().Set(reflectlite.ValueOf(err))
			return true
		}
		if x, ok := err.(interface{ As(any) bool }); ok && x.As(target) {
			return true
		}
		switch x := err.(type) {
		case interface{ Unwrap() error }:
			err = x.Unwrap()
			if err == nil {
				return false
			}
		case interface{ Unwrap() []error }:
			for _, err := range x.Unwrap() {
				if As(err, target) {
					return true
				}
			}
			return false
		default:
			return false
		}
	}
}

var errorType = reflectlite.TypeOf((*error)(nil)).Elem()

```


## nil

golang 的 err 有一个坑，下面这段代码的 err 会始终是 not nil 的。 因为 nil 的 error 和 nil 的 *MyErr 是不一样的。

```go
type MyErr struct {
}

func (e *MyErr) Error() string {
	return ""
}

func test() *MyErr {
	return nil
}

func main() {
	var err *error
	err = test()
	if err != nil {
		fmt.Println("err not nil")
	} else {
		fmt.Println("err is nil")
	}
}
```

修复这个问题需要将 `var err *error` 修改为 `var err *MyErr`