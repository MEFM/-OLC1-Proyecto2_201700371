package main

import (
	"fmt"
	"net/http"
	. "github.com/siongui/godom/wasm"

)

type RetornoPy struct{
	TextoPython string
}

type RetornoJs struct{
	TextoJs string
}


func main() {

	app := Document.GetElementById("app")
	fmt.Println(app)
	


	http.ListenAndServe(":8000",nil)
}


