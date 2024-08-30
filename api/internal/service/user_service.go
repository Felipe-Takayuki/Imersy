package service

import (
	"github.com/Felipe-Takayuki/Imersy/api/internal/db"
	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
)

type UserService struct {
	userDB *db.UserDB 
}

func NewUserDB(userDB *db.UserDB) *UserService {
	return &UserService{
		userDB: userDB,
	}
}

func (us * UserService) LoginUser(email, password string) (*model.User, error) {
	user, err := us.userDB.LoginUser(email, password)
	if err != nil {
		return nil, err 
	}
	return user, nil 
}