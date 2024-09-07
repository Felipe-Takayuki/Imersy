package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/Felipe-Takayuki/Imersy/api/internal/router"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dbHost := os.Getenv("DB_HOST")

	if dbHost == "" {
		dbHost = "127.0.0.1"
	}
	db, err := sql.Open("mysql", "root:@tcp("+dbHost+":3306)/imersy")
	if err != nil {
		panic(err.Error())
	}
	r := router.Router(db)
	fmt.Println("Server is running on port 3000")
	http.ListenAndServe(":3000", r)
}
