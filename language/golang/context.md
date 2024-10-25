# Context

## Why use context

In Go servers, each incoming request is handled in its own goroutine. Request handlers often start additional goroutines to access backends such as databases and RPC services. The set of goroutines working on a request typically needs access to request-specific values such as the identity of the end user, authorization tokens, and the request’s deadline. When a request is canceled or times out, all the goroutines working on that request should exit quickly so the system can reclaim any resources they are using.

## What is package context

> 以下内容基于 go1.23.2

Package context defines the Context type, which carries deadlines, cancellation signals, and other request-scoped values across API boundaries and between processes.

The chain of function calls between them must propagate the Context, optionally replacing it with a derived Context created using WithCancel, WithDeadline, WithTimeout, or WithValue. When a Context is canceled, all Contexts derived from it are also canceled.

The WithCancel, WithDeadline, and WithTimeout functions take a Context (the parent) and return a derived Context (the child) and a CancelFunc. Calling the CancelFunc cancels the child and its children, removes the parent's reference to the child, and stops any associated timers.

Do not store Contexts inside a struct type; instead, pass a Context explicitly to each function that needs it. The Context should be the first parameter, typically named ctx

Use context Values only for request-scoped data that transits processes and APIs, not for passing optional parameters to functions.

The same Context may be passed to functions running in different goroutines; Contexts are safe for simultaneous use by multiple goroutines.

## Context interface

```go
type Context interface {
	Deadline() (deadline time.Time, ok bool)
	Done() <-chan struct{}
	Err() error
	Value(key any) any
}
```

The `Done` method returns a channel that acts as a cancellation signal to functions running on behalf of the Context: when the channel is closed, the functions should abandon their work and return. The `Err` method returns an error indicating why the Context was canceled.
Done is provided for use in select statements:

```go
func Stream(ctx context.Context, out chan<- Value) error {
    for {
        v, err := DoSomething(ctx)
        if err != nil {
            return err
        }
        select {
        case <-ctx.Done():
            return ctx.Err()
        case out <- v:
        }
    }
}
```

The `Deadline` method allows functions to determine whether they should start work at all; if too little time is left, it may not be worthwhile. Code may also use a deadline to set timeouts for I/O operations.

`Value` allows a Context to carry request-scoped data. That data must be safe for simultaneous use by multiple goroutines.

A Context does not have a Cancel method for the same reason the Done channel is receive-only: In particular, when a parent operation starts goroutines for sub-operations, those sub-operations should not be able to cancel the parent. Instead, the `WithCancel` function provides a way to cancel a new Context value.

## Derived contexts

The context package provides functions to derive new Context values from existing ones. These values form a tree: when a Context is canceled, all Contexts derived from it are also canceled.

Background is the root of any Context tree; it is never canceled:

```go
// Background returns an empty Context. It is never canceled, has no deadline,
// and has no values. Background is typically used in main, init, and tests,
// and as the top-level Context for incoming requests.
func Background() Context
```

- `WithCancel` returns a copy of parent whose Done channel is closed as soon as parent.Done is closed or cancel is called.
- `WithTimeout` returns a copy of parent whose Done channel is closed as soon as parent.Done is closed, cancel is called, or timeout elapses. The new Context's Deadline is the sooner of now+timeout and the parent's deadline, if any. If the timer is still running, the cancel function releases its resources.

```go
func WithCancel(parent Context) (ctx Context, cancel CancelFunc)

// A CancelFunc cancels a Context.
type CancelFunc func()

func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)

// WithValue returns a copy of parent whose Value method returns val for key.
func WithValue(parent Context, key interface{}, val interface{}) Context
```

## Pipelines and cancellation

为了进一步理解 context 里 `Done` 的工作原理，这里参考[Go Concurrency Patterns: Pipelines and cancellation](https://go.dev/blog/pipelines)
There’s no formal definition of a pipeline in Go; it’s just one of many kinds of concurrent programs.

### Example: squaring numbers

The first stage, gen, is a function that converts a list of integers to a channel that emits the integers in the list.

```go
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}
```

The second stage, sq, receives integers from a channel and returns a channel that emits the square of each received integer. After the inbound channel is closed and this stage has sent all the values downstream, it closes the outbound channel:

```go
func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}
```

Multiple functions can read from the same channel until that channel is closed; this is called **fan-out**. This provides a way to distribute work amongst a group of workers to parallelize CPU use and I/O.

A function can read from multiple inputs and proceed until all are closed by multiplexing the input channels onto a single channel that’s closed when all the inputs are closed. This is called **fan-in**.

We introduce a new function, merge, to fan in the results:

```go
func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    // Start an output goroutine for each input channel in cs.  output
    // copies values from c to out until c is closed, then calls wg.Done.
    output := func(c <-chan int) {
        for n := range c {
            out <- n
        }
        wg.Done()
    }
    wg.Add(len(cs))
    for _, c := range cs {
        go output(c)
    }

    // Start a goroutine to close out once all the output goroutines are
    // done.  This must start after the wg.Add call.
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

func main() {
    in := gen(2, 3)

    // Distribute the sq work across two goroutines that both read from in.
    c1 := sq(in)
    c2 := sq(in)

    // Consume the merged output from c1 and c2.
    for n := range merge(c1, c2) {
        fmt.Println(n) // 4 then 9, or 9 then 4
    }
}
```

There is a pattern to our pipeline functions:

- stages close their outbound channels when all the send operations are done.
- stages keep receiving values from inbound channels until those channels are closed.

_But in real pipelines, stages don’t always receive all the inbound values. Sometimes this is by design: the receiver may only need a subset of values to make progress. More often, a stage exits early because an inbound value represents an error in an earlier stage. In either case the receiver should not have to wait for the remaining values to arrive, and we want earlier stages to stop producing values that later stages don’t need._

In our example pipeline, if a stage fails to consume all the inbound values, the goroutines attempting to send those values will block indefinitely. This is a resource leak.

We need to provide a way for downstream stages to indicate to the senders that they will stop accepting input.

## Explicit cancellation

When main decides to exit without receiving all the values from out, it must tell the goroutines in the upstream stages to abandon the values they’re trying to send. It does so by sending values on a channel called done. It sends two values since there are potentially two blocked senders:

```go
func merge(done <-chan struct{}, cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    // Start an output goroutine for each input channel in cs.  output
    // copies values from c to out until c is closed or it receives a value
    // from done, then output calls wg.Done.
    output := func(c <-chan int) {
        for n := range c {
            select {
            case out <- n:
            case <-done:
            }
        }
        wg.Done()
    }
    wg.Add(len(cs))
    for _, c := range cs {
        go output(c)
    }

    // Start a goroutine to close out once all the output goroutines are
    // done.  This must start after the wg.Add call.
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

func main() {
    in := gen(2, 3)

    // Distribute the sq work across two goroutines that both read from in.
    c1 := sq(in)
    c2 := sq(in)

    // Consume the first value from output.
    done := make(chan struct{}, 2)
    out := merge(done, c1, c2)

    // Tell the remaining senders we're leaving.
    done <- struct{}{}
    done <- struct{}{} // It sends two values since there are potentially two blocked senders:
}
```

_这里的 merge 函数中的 output 函数，在从 done 中每接收一次，就会从 inbound channel 读取一次数据。因此 main 函数中写两次 done 就能保证上游都没有阻塞_

This approach has a problem: each downstream receiver needs to know the number of potentially blocked upstream senders and arrange to signal those senders on early return. Keeping track of these counts is tedious and error-prone.
We need a way to tell an unknown and unbounded number of goroutines to stop sending their values downstream. In Go, we can do this by closing a channel, because **a receive operation on a closed channel can always proceed immediately, yielding the element type’s zero value**.

```go
package main

import (
	"fmt"
	"sync"
)

func gen(done <-chan struct{}, nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			select {
			case out <- n:
			case <-done:
				return
			}
		}

	}()
	return out
}

func sq(done <-chan struct{}, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			select {
			case out <- n * n:
			case <-done:
				return
			}
		}
	}()
	return out
}

func merge(done <-chan struct{}, cs ...<-chan int) <-chan int {
	var wg sync.WaitGroup
	out := make(chan int)

	// Start an output goroutine for each input channel in cs.  output
	// copies values from c to out until c is closed or it receives a value
	// from done, then output calls wg.Done.
	output := func(c <-chan int) {
		defer wg.Done()
		for n := range c {
			select {
			case out <- n:
			case <-done:
				return
			}
		}
	}
	wg.Add(len(cs))
	for _, c := range cs {
		go output(c)
	}

	// Start a goroutine to close out once all the output goroutines are
	// done.  This must start after the wg.Add call.
	go func() {
		wg.Wait()
		close(out)
	}()
	return out
}

func main() {
	// Set up a done channel that's shared by the whole pipeline,
	// and close that channel when this pipeline exits, as a signal
	// for all the goroutines we started to exit.
	done := make(chan struct{})
	defer close(done)

	in := gen(done, 2, 3)

	// Distribute the sq work across two goroutines that both read from in.
	c1 := sq(done, in)
	c2 := sq(done, in)

	// Consume the first value from output.
	out := merge(done, c1, c2)
	fmt.Println(<-out) // 4 or 9

	// done will be closed by the deferred call.
}
```

_这里在 main 里关闭 done 之后，上游所有协程都能正常退出，因为被关闭的 channel 可以一直读取出零值_

> range 能够感知 channel 的关闭，当 channel 被发送数据的协程关闭时，range 就会结束。
> 可以使用,ok 来检测通道的关闭 `x, ok := <-in`
