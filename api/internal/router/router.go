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
	c.Get("/rank/{categorie}", userWebServer.GetTopRankProjectsByCategorie)
	c.Get("/bootcamp", bootcampWebServer.GetBootcampActual)
	c.Get("/material-class", userWebServer.GetMaterialsClass)
	c.Get("/material-class/{material_id}", userWebServer.GetMaterialClassByID)

	c.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Get("/user", userWebServer.GetInfoUser)
		r.Get("/project/{categorie}", userWebServer.GetProjectsByCategorie)
		r.Post("/project",userWebServer.SendProject)
		r.Get("/project",userWebServer.GetProjectByUserID)
		r.Post("/evaluate/project", userWebServer.SendEvaluationProject)
		r.Post("/material-class", userWebServer.SendMaterialClass)
	})
	return c
}
