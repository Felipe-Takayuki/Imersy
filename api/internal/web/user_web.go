package web

import (
	"encoding/json"
	"net/http"
	"time"
	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
	"github.com/Felipe-Takayuki/Imersy/api/internal/service"
	"github.com/go-chi/jwtauth"
)

type UserWebServer struct {
	userService *service.UserService
}

func NewUserWebServer(userService *service.UserService) *UserWebServer {
	return &UserWebServer{userService: userService}
}

func (uws *UserWebServer) LoginUser(w http.ResponseWriter, r *http.Request, tokenAuth *jwtauth.JWTAuth) {
	w.Header().Set("Content-Type", "application/json")
	var login *model.User
	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	user, err := uws.userService.LoginUser(login.Email, login.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
		claims := map[string]interface{}{"id": user.ID, "name": user.Name, "email": user.Email, "user_type": user.UserType, "exp": jwtauth.ExpireIn(time.Minute * 20)}
		_, tokenString, _ := tokenAuth.Encode(claims)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"token": tokenString,
		})


}
