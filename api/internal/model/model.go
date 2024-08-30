package model

type User struct {
	ID          int64  `json:"id"`
	UserType    string `json:"user_type"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Cpf         string `json:"cpf"`
	Scholl      string `json:"scholl"`
	PhoneNumber int    `json:"phone_number"`
	HighScholl 	int 	`json:"high_scholl"`
	TeachType   string 	`json:"teach_type"`
}

func NewUser(userType, name, email, password, cpf, scholl, teachType string, highScholl, phoneNumber int) *User {
	return &User{
		UserType:    userType,
		Name:        name,
		Email:       email,
		Password:    password,
		Cpf:         cpf,
		Scholl:      scholl,
		HighScholl: highScholl,
		TeachType: teachType,
		PhoneNumber: phoneNumber,
	}
}

type Project struct {
	ID          int64  `json:"id"`
	Name        string `json:"title"`
	OwnerName   string `json:"owner_name"`
	Description string `json:"description"`
	VideoUrl    string `json:"video_url"`
	ProjectUrl  string `json:"project_url"`
}

type Bootcamp struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Address     string `json:"address"`
	Subscribers []*User `json:"subscribers"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
}

