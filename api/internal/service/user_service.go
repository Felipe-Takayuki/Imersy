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
