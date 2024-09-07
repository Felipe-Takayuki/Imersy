package queries

const GET_TOP_RANKERS = `
	SELECT p.id, p.name, u.name, p.description, p.video_url, p.github_url,     ROUND(AVG((ep.quality_grade + ep.creativity_grade) / 2.0), 1) AS average_grade
	FROM project p
	JOIN evaluated_project ep ON p.id = ep.project_id
	JOIN project_owner po ON p.id = po.project_id
	JOIN user u ON u.id = po.user_id
	WHERE u.teach_type = ?
	GROUP BY p.id, p.name, u.name, p.description, p.video_url, p.github_url
	ORDER BY average_grade DESC
	LIMIT 3
`


const GET_USER_PROJECT = `
	SELECT p.id, p.name, u.name, p.description, p.video_url, p.github_url FROM project p 
	JOIN project_owner po ON po.project_id = p.id 
	JOIN user u on u.id = po.user_id WHERE u.id= ?`

const GET_MATERIALS_CLASS = `	
	SELECT m.id, m.title, u.name, m.subject FROM class_material m 
	JOIN owner_material om ON om.material_id = m.id
	JOIN user u ON u.id = om.user_id`

const GET_MATERIAL_CLASS = `	
	SELECT m.id, m.title, u.name, m.subject, m.content FROM class_material m 
	JOIN owner_material om ON om.material_id = m.id
	JOIN user u ON u.id = om.user_id
	WHERE m.id = ?`