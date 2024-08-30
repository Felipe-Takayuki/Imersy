package main

import (
	"fmt"
	"net/http"

	"github.com/Felipe-Takayuki/Imersy/api/internal/router"
)

func main() {
	c := router.Router()
	fmt.Println("Server is running on port 3000")
	http.ListenAndServe(":3000", c)
}
