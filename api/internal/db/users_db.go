package db

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
	
	
