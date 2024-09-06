package web

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
	"github.com/Felipe-Takayuki/Imersy/api/internal/service"
	"github.com/go-chi/chi"
	"github.com/go-chi/jwtauth"
)

type BootcampWebServer struct {
	bs *service.BootcampService
}

func NewBootcampWebServer(bs *service.BootcampService) *BootcampWebServer {
	return &BootcampWebServer{
		bs: bs,
	}
}

func (bws *BootcampWebServer) RegisterInBootcamp(w http.ResponseWriter, r *http.Request, tokenAuth *jwtauth.JWTAuth) {
	w.Header().Set("Content-Type", "application/json")
	var register *model.User
	err := json.NewDecoder(r.Body).Decode(&register)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	bootcampID, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, "event_id is not int!", http.StatusInternalServerError)
		return
	}
	user, err := bws.bs.RegisterInBootcamp(bootcampID, register.TeachType, register.HighScholl, "estudante", register.Name, register.Email, register.Password, register.Cpf, register.Scholl, register.PhoneNumber)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	claims := map[string]interface{}{"id": user.ID, "name": user.Name, "email": user.Email, "user_type": user.UserType, "exp": jwtauth.ExpireIn(time.Minute * 60)}
	_, tokenString, _ := tokenAuth.Encode(claims)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token": tokenString,
	})

}

func (bws *BootcampWebServer) GetBootcampActual(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	bootcamp, err := bws.bs.GetBootcampActual()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	json.NewEncoder(w).Encode(bootcamp)

}