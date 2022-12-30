package main

import (
	"fmt"
	"net/http"
)

func main() {
	fileServer := http.FileServer(http.Dir("../client"))
	http.Handle("/", fileServer)
	fmt.Println("server is running")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		fmt.Println("error occured")
	}
}
