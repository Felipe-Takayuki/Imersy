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

func (uws *UserWebServer) SendProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var project *model.Project
	err := json.NewDecoder(r.Body).Decode(&project)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	_, claims, _ := jwtauth.FromContext(r.Context())

	userID, ok := claims["id"].(float64)
	if !ok {
		http.Error(w, "id is not int!", http.StatusInternalServerError)
		return
	}

	sendProject, err := uws.userService.SendProject(project.Name, project.Description, project.VideoUrl, project.ProjectUrl, int(userID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	json.NewEncoder(w).Encode(sendProject)
}

func (uws *UserWebServer) SendEvaluationProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, claims, _ := jwtauth.FromContext(r.Context())

	userType, ok := claims["user_type"].(string)
	if !ok {
		http.Error(w, "user_type is not string!", http.StatusInternalServerError)
		return
	}
	if userType == "mentor" {
		evaluatorID, ok := claims["id"].(float64)
		if !ok {
			http.Error(w, "id is not int!", http.StatusInternalServerError)
			return
		}
		var evaluation *model.Evaluation
		err := json.NewDecoder(r.Body).Decode(&evaluation)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err.Error())
			return
		}
		err = uws.userService.SendEvaluationProject(int64(evaluatorID), evaluation.ProjectID, evaluation.QualityGrade, evaluation.CreativityGrade)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(err.Error())
			return	
		}
		json.NewEncoder(w).Encode(nil)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"error":"not have permission"})
		return
	}
}
func (uws *UserWebServer) GetProjectsByCategorie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, claims, _ := jwtauth.FromContext(r.Context())

	userType, ok := claims["user_type"].(string)
	if !ok {
		http.Error(w, "user_type is not string!", http.StatusInternalServerError)
		return
	}


	if userType == "mentor" {
		categorie := chi.URLParam(r, "categorie")
		if categorie == "" {
			http.Error(w, "categorie is empty", http.StatusInternalServerError)
			return
		}
		evaluatorID, ok := claims["id"].(float64)
		if !ok {
			http.Error(w, "id is not int!", http.StatusInternalServerError)
			return
		}
		projects, err := uws.userService.GetProjectsByCategorie(int64(evaluatorID) ,categorie)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(err.Error())
			return
		}
		json.NewEncoder(w).Encode(projects)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"error":"not have permission"})
		return
	}
}
func (uws *UserWebServer) GetTopRankProjectsByCategorie(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		categorie := chi.URLParam(r, "categorie")
		if categorie == "" {
			http.Error(w, "categorie is empty", http.StatusInternalServerError)
			return
		}

		projects, err := uws.userService.GetTopRankProjectsByCategorie(categorie)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(err.Error())
			return
		}
		json.NewEncoder(w).Encode(projects)
	
}
// func (uws *UserWebServer) GetProjectByID(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	projectID, err := strconv.Atoi(chi.URLParam(r, "project_id"))
// 	if err != nil {
// 		http.Error(w, "project_id is not int!", http.StatusInternalServerError)
// 		return
// 	}
// 	project, err := uws.userService.GetProjectByID(int64(projectID))
// 	if err != nil{
// 		w.WriteHeader(http.StatusInternalServerError)
// 		json.NewEncoder(w).Encode(err.Error())
// 		return
// 	}
// 	json.NewEncoder(w).Encode(project)
// }

func (uws *UserWebServer) GetProjectByUserID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, claims, _ := jwtauth.FromContext(r.Context())

	userID, ok := claims["id"].(float64)
	if !ok {
		http.Error(w, "id is not int!", http.StatusInternalServerError)
		return
	}

	project, err := uws.userService.GetProjectByUserID(int64(userID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	json.NewEncoder(w).Encode(project)

}

func (uws *UserWebServer) SendMaterialClass(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, claims, _ := jwtauth.FromContext(r.Context())

	var materialClass *model.MaterialClass
	err := json.NewDecoder(r.Body).Decode(&materialClass)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	userID, ok := claims["id"].(float64)
	if !ok {
		http.Error(w, "id is not int!", http.StatusInternalServerError)
		return
	}
	sendMaterial, err := uws.userService.SendMaterialClass(materialClass.Title, materialClass.Subject, materialClass.Content, int64(userID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	json.NewEncoder(w).Encode(sendMaterial)
}

func (uws *UserWebServer) GetMaterialsClass(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	getMaterials, err := uws.userService.GetMaterialsClass()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	json.NewEncoder(w).Encode(getMaterials)
}

func (uws *UserWebServer) GetMaterialClassByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	materialID, err := strconv.Atoi(chi.URLParam(r, "material_id"))
	if err != nil {
		http.Error(w, "material_id is not int!", http.StatusInternalServerError)
		return
	}
	getMaterial, err := uws.userService.GetMaterialClassByID(int64(materialID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	json.NewEncoder(w).Encode(getMaterial)
}
