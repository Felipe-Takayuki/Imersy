package database

import (
	"database/sql"

	"github.com/Felipe-Takayuki/Imersy/api/internal/model"
	"github.com/Felipe-Takayuki/Imersy/api/internal/utils"
	"github.com/Felipe-Takayuki/Imersy/api/internal/utils/queries"
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
	user := model.NewUser(userType, name, email, utils.EncriptKey(password), utils.EncriptKey(cpf), scholl, teachType, highScholl, phoneNumber)
	createUser, err := udb.db.Exec("INSERT INTO user(user_type, name, email, password, cpf, scholl, teach_type, high_scholl, phone_number) VALUES (?,?,?,?,?,?,?,?,?)", user.UserType, user.Name, user.Email, user.Password, user.Cpf, user.Scholl, user.TeachType, user.HighScholl, user.PhoneNumber)
	if err != nil {
		return nil, err
	}
	user.ID, err = createUser.LastInsertId()
	if err != nil {
		return nil, err
	}
	
	return user, nil
}

func (udb *UserDB) GetInfoUser(userID int64) (*model.User, error) {
	var user model.User
	err := udb.db.QueryRow("SELECT id, name, email, user_type FROM user WHERE id = ?", userID).Scan(&user.ID, &user.Name, &user.Email, &user.UserType)
	if err != nil {
		return nil, err 
	}
	return &user, nil 
} 
func (udb *UserDB) LoginUser(email, password string) (*model.User, error) {
	var user model.User
	err := udb.db.QueryRow("SELECT id, name, email, user_type FROM user WHERE email = ? and password = ?", email, utils.EncriptKey(password)).Scan(
		&user.ID, &user.Name, &user.Email, &user.UserType,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (udb *UserDB) SendProject(title, description, videoUrl, projectUrl string, ownerID int) (*model.Project, error) {
	project := model.NewProject(title, description, videoUrl, projectUrl)
	sendProject, err := udb.db.Exec("INSERT INTO project(name, description, video_url, github_url, status) VALUES (?, ?, ?, ?, ?)", project.Name, project.Description, project.VideoUrl, project.ProjectUrl, "enviado")
	if err != nil {
		return nil, err
	}
	project.Status = "enviado"
	project.ID, err = sendProject.LastInsertId()
	if err != nil {
		return nil, err
	}
	_, err = udb.db.Exec("INSERT INTO project_owner(user_id, project_id) VALUES (?, ?)", ownerID, project.ID)
	if err != nil {
		return nil, err
	}
	_, err = udb.db.Exec("INSERT INTO submitted_project(bootcamp_id, project_id) VALUES (?, ?)", 1, project.ID)
	if err != nil {
		return nil, err
	}
	return project, nil
}

func (udb *UserDB) GetProjectsByCategorie(userID int64, categorie string) ([]*model.Project, error) {
	query := `
	SELECT p.id, p.name, u.name, p.description, p.video_url, p.github_url FROM project p 
	JOIN project_owner po ON po.project_id = p.id 
	JOIN user u on u.id = po.user_id 
	WHERE NOT EXISTS (
        SELECT 1
        FROM evaluated_project ep
        WHERE ep.project_id = p.id
		AND ep.evaluator_id = ?
    ) 
	AND u.teach_type = ?`
	rows, err := udb.db.Query(query,userID,categorie)
	if err != nil {
		return nil, err
	}
	var projects []*model.Project
	for rows.Next() {
		var project model.Project
		err := rows.Scan(&project.ID, &project.Name, &project.OwnerName, &project.Description, &project.VideoUrl, &project.ProjectUrl)
		if err != nil {
			return nil, err
		}
		projects = append(projects, &project)
	}
	return projects, nil
}

func (udb *UserDB) SendEvaluationProject(evaluatorID, projectID, qualityGrade, creativityGrade int64) error {

	_, err := udb.db.Exec("INSERT INTO evaluated_project(evaluator_id, project_id, quality_grade, creativity_grade) VALUES (?, ?, ?, ?)", evaluatorID, projectID, qualityGrade, creativityGrade)
	if err != nil {
		return err
	}
	err = isEvaluated(udb.db, projectID)
	if err != nil {
		return err 
	}
	return nil
}

func isEvaluated(db *sql.DB, projectID int64) error {
	var quantityMentors, quantityEvaluators int64

	query := `
		SELECT 
			(SELECT COUNT(*) FROM user WHERE user_type = 'mentor') AS mentor_count,
			(SELECT COUNT(*) FROM evaluated_project WHERE project_id = ?) AS evaluation_count
	`
	err := db.QueryRow(query, projectID).Scan(&quantityMentors, &quantityEvaluators)
	if err != nil {
		return err
	}
	if quantityMentors == quantityEvaluators {
		_, err = db.Exec("UPDATE project SET status = ? where id = ?", "avaliado", projectID)
		if err != nil {
			return err
		}
		_, err := db.Exec("DELETE FROM submitted_project where project_id = ?", projectID)
		if err != nil {
			return err
		}
	}
	return nil 
}


func (udb *UserDB) GetProjectByUserID(id int64) (*model.Project, error) {
	project := model.Project{}
	err := udb.db.QueryRow(queries.GET_USER_PROJECT, id).Scan(&project.ID, &project.Name, &project.OwnerName, &project.Description, &project.VideoUrl, &project.ProjectUrl)
	if err != nil {
		return nil, err
	}
	return &project, nil
}

func (udb *UserDB) GetTopRankProjectsByCategorie(categorie string) ([]*model.Project, error) {

	rows, err := udb.db.Query(queries.GET_TOP_RANKERS, categorie)
	if err != nil {
		return nil, err
	}
	var topRanks []*model.Project
	for rows.Next() {
		var topRank model.Project
		err := rows.Scan(&topRank.ID, &topRank.Name, &topRank.OwnerName, &topRank.Description, &topRank.VideoUrl, &topRank.ProjectUrl, &topRank.Average)
		if err != nil {
			return nil, err
		}
		topRanks = append(topRanks, &topRank)
	}
	return topRanks, nil

}
func (udb *UserDB) SendMaterialClass(title, subject, content string, userID int64) (*model.MaterialClass, error) {
	materialClass := model.NewMaterialClass(title, subject, content)
	sendMaterial, err := udb.db.Exec("INSERT INTO class_material(title, subject, content) VALUES (?,?,?)", materialClass.Title, materialClass.Subject, materialClass.Content)
	if err != nil {
		return nil, err
	}
	materialClass.ID, err = sendMaterial.LastInsertId()
	if err != nil {
		return nil, err
	}
	_, err = udb.db.Exec("INSERT INTO owner_material(material_id, user_id) VALUES (?, ?)", materialClass.ID, userID)
	if err != nil {
		return nil, err
	}
	return materialClass, nil
}

func (udb *UserDB) GetMaterialsClass() ([]*model.MaterialClass, error) {

	rows, err := udb.db.Query(queries.GET_MATERIALS_CLASS)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var materials []*model.MaterialClass
	for rows.Next() {
		var material model.MaterialClass
		if err := rows.Scan(&material.ID, &material.Title, &material.OwnerName, &material.Subject); err != nil {
			return nil, err
		}
		materials = append(materials, &material)
	}
	return materials, nil
}

func (udb *UserDB) GetMaterialClassByID(materialID int64) (*model.MaterialClass, error) {
	material := model.MaterialClass{}

	err := udb.db.QueryRow(queries.GET_MATERIAL_CLASS, materialID).Scan(&material.ID, &material.Title, &material.OwnerName, &material.Subject, &material.Content)
	if err != nil {
		return nil, err
	}
	return &material, nil
}
