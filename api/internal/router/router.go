package router

import (
	"database/sql"
	"net/http"

	"github.com/Felipe-Takayuki/Imersy/api/internal/database"
	"github.com/Felipe-Takayuki/Imersy/api/internal/service"
	"github.com/Felipe-Takayuki/Imersy/api/internal/web"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth"
)

func Router(db *sql.DB) http.Handler {

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)
	corsConfig := cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}
	c.Use(cors.Handler(corsConfig))
	tokenAuth := jwtauth.New("HS256", []byte("secret"), nil)

	userDB := database.NewUserDB(db)
	userService := service.NewUserService(userDB)
	userWebServer := web.NewUserWebServer(userService)

	bootcampDB := database.NewBootcampDatabase(db)
	bootcampService := service.NewBootcampService(bootcampDB)
	bootcampWebServer := web.NewBootcampWebServer(bootcampService)
	c.Post("/{id}/register", func(w http.ResponseWriter, r *http.Request) {
		bootcampWebServer.RegisterInBootcamp(w, r, tokenAuth)
	})
	c.Post("/login", func(w http.ResponseWriter, r *http.Request) {
		userWebServer.LoginUser(w, r, tokenAuth)
	})
	return c
}
