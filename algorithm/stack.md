# stack

## go

```go
type Stack struct {
	data []string
}

func NewStack() *Stack {
	return &Stack{
		data: make([]string, 0),
	}
}

func (s *Stack) Push(a string) {
	s.data = append(s.data, a)
}

func (s *Stack) Pop() (bool, string) {
	if len(s.data) == 0 {
		return false, ""
	}
	l := len(s.data)
	value := s.data[l-1]
	s.data = s.data[:l-1]
	return true, value
}
```
