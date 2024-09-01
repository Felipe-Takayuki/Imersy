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
	HighScholl  int    `json:"high_scholl"`
	TeachType   string `json:"teach_type"`
}

func NewUser(userType, name, email, password, cpf, scholl, teachType string, highScholl, phoneNumber int) *User {
	return &User{
		UserType:    userType,
		Name:        name,
		Email:       email,
		Password:    password,
		Cpf:         cpf,
		Scholl:      scholl,
		HighScholl:  highScholl,
		TeachType:   teachType,
		PhoneNumber: phoneNumber,
	}
}

type Project struct {
	ID              int64  `json:"id"`
	Name            string `json:"title"`
	OwnerName       string `json:"owner_name"`
	Description     string `json:"description"`
	VideoUrl        string `json:"video_url"`
	ProjectUrl      string `json:"project_url"`
	Status          string `json:"status"` // enviado || avaliado
	Average 		float64 `json:"avarage"`
}

func NewProject(name, description, videoUrl, projectUrl string) *Project {
	return &Project{
		Name:        name,
		Description: description,
		VideoUrl:    videoUrl,
		ProjectUrl:  projectUrl,
	}
}

type Evaluation struct {
	ProjectID int64 `json:"project_id"`
	QualityGrade int64 `json:"quality_grade"`
	CreativityGrade int64 `json:"creativity_grade"`
}
type Bootcamp struct {
	ID          int64   `json:"id"`
	Title       string  `json:"title"`
	Address     string  `json:"address"`
	Subscribers []*User `json:"subscribers"`
	StartDate   string  `json:"start_date"`
	EndDate     string  `json:"end_date"`
}

type MaterialClass struct {
	ID        int64  `json:"id"`
	Title     string `json:"title"`
	OwnerName string `json:"owner_name"`
	Subject   string `json:"subject"`
	Content   string `json:"content"`
}

func NewMaterialClass(title, subject, content string) *MaterialClass {
	return &MaterialClass{
		Title:   title,
		Subject: subject,
		Content: content,
	}
}
