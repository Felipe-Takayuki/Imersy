package database

import (
	"database/sql"
	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
)

type BootcampDatabase struct {
	db *sql.DB
}

func NewBootcampDatabase(db *sql.DB) *BootcampDatabase {
	return &BootcampDatabase{db: db}
} 

func (bdb *BootcampDatabase) RegisterInBootcamp(bootcampID int, subscribeType string, highScholl int, userType, userName, userEmail, userPassword, userCPF, userScholl string, phoneNumber int ) (*model.User,error) {

	udb := NewUserDB(bdb.db) 
	user := model.NewUser(userType, userName, userEmail, userPassword, userCPF, userScholl, subscribeType,highScholl, phoneNumber)
	_ , err := udb.RegisterUser(user.UserType, user.Name, user.Email, user.Password, user.Cpf, user.Scholl, user.TeachType, user.HighScholl, user.PhoneNumber)
	if err != nil {
		return nil, err 
	}
	_, err = bdb.db.Exec("INSERT INTO SUBSCRIBER_BOOTCAMP(bootcamp_id, user_id) VALUES (?, ?)", bootcampID, user.ID)
	if err != nil {
		return nil, err 
	}
	return user, nil 
}


