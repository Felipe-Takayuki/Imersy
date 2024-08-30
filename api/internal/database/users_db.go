package database

import (
	"database/sql"

	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
	"github.com/Felipe-Takayuki/Imersy/api/internal/utils"
)

type UserDB struct {
	db *sql.DB
}

func NewUserDB(db *sql.DB) *UserDB {
	return &UserDB{
		db: db,
	}
}


func (udb *UserDB) RegisterUser(userType, name, email, password, cpf, scholl, teachType string, highScholl, phoneNumber int) (*model.User, error) {
	user := model.NewUser(userType, name, email, utils.EncriptKey(password), utils.EncriptKey(cpf), scholl, teachType,highScholl,phoneNumber)
	createUser, err := udb.db.Exec("INSERT INTO USER(user_type, name, email, password, cpf, scholl, teach_type, high_scholl, phone_number) VALUES (?,?,?,?,?,?,?,?,?)", user.UserType, user.Name, user.Email, user.Password, user.Cpf, user.Scholl, user.TeachType, user.HighScholl, user.PhoneNumber)
	if err != nil {
		return nil, err
	}
	user.ID, err= createUser.LastInsertId()
	if err != nil {
		return nil, err
	}
	return user, nil 
}
func (udb * UserDB) LoginUser(email, password string) (*model.User, error) {
	var user model.User
	err := udb.db.QueryRow("SELECT id, name, email, user_type FROM USER WHERE email = ? and password = ?", email, utils.EncriptKey(password)).Scan(
		&user.ID, &user.Name, &user.Email, &user.UserType,
	)
	if err != nil {
		return nil ,err 
	}
	return &user, nil
}
	
	
