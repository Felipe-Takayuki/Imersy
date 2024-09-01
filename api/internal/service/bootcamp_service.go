package service

import (
	"github.com/Felipe-Takayuki/Imersy/api/internal/database"
	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
)

type BootcampService struct {
	bdb *database.BootcampDatabase
}

func NewBootcampService(bdb *database.BootcampDatabase) *BootcampService {
	return &BootcampService{
		bdb: bdb,
	}
}

func (bs *BootcampService) RegisterInBootcamp(bootcampID int, subscribeType string, highScholl int, userType, userName, userEmail, userPassword, userCPF, userScholl string, phoneNumber int) (*model.User, error) {
	user, err := bs.bdb.RegisterInBootcamp(bootcampID, subscribeType, highScholl, userType, userName, userEmail, userPassword, userCPF, userScholl, phoneNumber)
	if err != nil {
		return nil, err 
	}
	return user, nil 
}

func (bs *BootcampService) GetBootcampActual() (*model.Bootcamp, error) {
	bootcamp, err := bs.bdb.GetBootcampActual()
	if err != nil {
		return nil, err 
	}
	return bootcamp, nil 
}