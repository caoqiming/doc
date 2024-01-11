# reflect

```go
// IsValidStructPtr returns error if param s is not a ptr to a struct or s is nil.
func IsValidStructPtr(s interface{}) (err error) {
	structPtrValue := reflect.ValueOf(s)
	if !structPtrValue.IsValid() {
		err = fmt.Errorf("invalid param, s must be a ptr of a struct")
		return
	}

	if structPtrValue.Kind() != reflect.Ptr {
		err = fmt.Errorf("invalid param, s must be a ptr")
		return
	}

	if structPtrValue.IsNil() {
		err = fmt.Errorf("invalid param, s is nil")
		return
	}
	return
}

// SetStringPtrEmptyIfNil sets the given fields in the given struct to empty string ptr if the field is nil.
func SetStringPtrEmptyIfNil(s interface{}, keys []string) (err error) {
	if err = IsValidStructPtr(s); err != nil {
		return
	}

	structValue := reflect.ValueOf(s).Elem()
	for _, key := range keys {
		fieldValue := structValue.FieldByName(key)
		if fieldValue.Kind() == reflect.Invalid {
			err = fmt.Errorf("%s.%s not found", structValue.Type().Name(), key)
			return
		}

		emptyStr := ""
		emptyStrValue := reflect.ValueOf(&emptyStr)
		if emptyStrValue.Type().AssignableTo(fieldValue.Type()) {
			if !fieldValue.IsNil() {
				continue
			}

			fieldValue.Set(emptyStrValue)
		} else {
			err = fmt.Errorf("%s.%s is not string ptr", structValue.Type().Name(), key)
			return
		}
	}
	return
}
```
