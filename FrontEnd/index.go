package main

import (
	"fmt"

	. "github.com/siongui/godom/wasm"
)

func main() {
	app := Document.GetElementById("app")
	fmt.Println(app)
	
}