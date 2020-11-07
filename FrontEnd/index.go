package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	//. "github.com/siongui/godom/wasm"
)

type InfoJs struct {
	Traduccion string
	ReporteErr string
	ReporteTok string
	ReportAST  string
}

type InfoPy struct {
	Traduccion string
	ReporteErr string
	ReporteTok string
	ReportAST  string
}

var nodeURLJs = ""
var nodeURLPy = ""

func getInfoJs(w http.ResponseWriter, r *http.Request) {

	var url = nodeURLJs + "/JS/"

	var decoder = json.NewDecoder(r.Body)

	tradJs := InfoJs{}

	err := decoder.Decode(&tradJs)

	if err != nil {
		fmt.Println("ERROR: ", err)
	}

	var jsonJS = []byte(`"Traduccion": "` + tradJs.Traduccion + `", "ReporteErr": "` + tradJs.ReporteErr + `", "ReporteTok": "` + tradJs.ReporteTok + `", "ReporteAST": "` + tradJs.ReportAST + `"`)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonJS))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("ERROR: ", err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(bodyBytes)

}

func getInfoPy(w http.ResponseWriter, r *http.Request) {

	var url = nodeURLPy + "/PY/"

	var decoder = json.NewDecoder(r.Body)

	var tradJs InfoPy

	err := decoder.Decode(&tradJs)

	if err != nil {
		fmt.Println("ERROR: ", err)
	}

	var jsonJS = []byte(`"Traduccion": "` + tradJs.Traduccion + `", "ReporteErr": "` + tradJs.ReporteErr + `", "ReporteTok": "` + tradJs.ReporteTok + `", "ReporteAST": "` + tradJs.ReportAST + `"`)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonJS))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("ERROR: ", err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(bodyBytes)

}

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {

	//NODE API PARA JS

	nodeip, defip := os.LookupEnv("NODEIP")
	nodeport, defport := os.LookupEnv("NODEPORT")

	if !defip {
		nodeip = "localhost"
	}

	if !defport {
		nodeport = "3000"
	}

	nodeURLJs = "http://" + nodeip + ":" + nodeport

	//==================== GO ====================//
	ip, defip := os.LookupEnv("GOIP")
	port, defport := os.LookupEnv("GOPORT")

	if !defip {
		ip = "182.18.7.9"
	}

	if !defport {
		port = "8000"
	}

	fmt.Println(ip, port)

	//http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))

	http.HandleFunc("/", index)
	http.HandleFunc("/getInfoPy", getInfoPy)
	http.HandleFunc("/getInfoJs", getInfoJs)

	http.ListenAndServe(":8000", nil)
}
