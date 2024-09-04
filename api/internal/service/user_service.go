package service

import (
	"github.com/Felipe-Takayuki/Imersy/api/internal/database"
	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
)

type UserService struct {
	userDB *database.UserDB
}

func NewUserService(userDB *database.UserDB) *UserService {
	return &UserService{
		userDB: userDB,
	}
}

func (us *UserService) LoginUser(email, password string) (*model.User, error) {
	user, err := us.userDB.LoginUser(email, password)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (us *UserService) GetInfoUser(userID int64) (*model.User, error) {
	user, err := us.userDB.GetInfoUser(userID)
	if err != nil {
		return nil, err 
	}
	return user, nil 
}

func (us *UserService) SendProject(title,description, videoUrl, projectUrl string, ownerID int) (*model.Project, error) {
	project, err := us.userDB.SendProject(title, description,videoUrl,projectUrl,ownerID)
	if err != nil {
		return nil, err 
	}
	return project, nil 
}

// func (us *UserService) GetProjectByID(projectID int64) (*model.Project, error) {
// 	project, err := us.userDB.GetProjectByID(projectID)
// 	if err != nil {
// 		return nil, err 
// 	}
// 	return project, nil 
// }

func (us *UserService) GetProjectsByCategorie( categorie string)([]*model.Project, error) {
	projects, err := us.userDB.GetProjectsByCategorie(categorie)
	if err != nil {
		return nil, err 
	}
	return projects, nil
}

func (us *UserService) GetTopRankProjectsByCategorie(categorie string) ([]*model.Project, error) {
	topRanks, err := us.userDB.GetTopRankProjectsByCategorie(categorie)
	if err != nil {
		return nil, err 
	}
	return topRanks, nil 
}

func (us *UserService) SendEvaluationProject(evaluatorID, projectID, qualityGrade, creativityGrade int64) error {
	err :=  us.userDB.SendEvaluationProject(evaluatorID, projectID, qualityGrade, creativityGrade)
	if err != nil {
		return err 
	}
	return nil 
}
func (us *UserService) GetProjectByUserID(id int64) (*model.Project, error) {
	project, err := us.userDB.GetProjectByUserID(id)
	if err != nil {
		return nil, err 
	}
	return project, nil 
} 


func (us *UserService) SendMaterialClass(title, subject, content string, userID int64) (*model.MaterialClass, error) {
	materialClass, err := us.userDB.SendMaterialClass(title, subject, content, userID)
	if err != nil {
		return nil, err 
	}
	return materialClass, nil
}

func (us *UserService) GetMaterialsClass() ([]*model.MaterialClass, error) {
	materialsClass, err := us.userDB.GetMaterialsClass()
	if err != nil {
		return nil, err 
	}
	return materialsClass, nil 
}

func (us *UserService) GetMaterialClassByID(materialID int64) (*model.MaterialClass, error) {
	materialClass, err := us.userDB.GetMaterialClassByID(materialID)
	if err != nil {
		return nil, err 
	}
	return materialClass, nil 
}

