package queries

const GET_TOP_RANKERS = `
	SELECT p.id, p.name, u.name, p.description, p.video_url, p.github_url,     ROUND(AVG((ep.quality_grade + ep.creativity_grade) / 2.0), 1) AS average_grade
	FROM PROJECT p
	JOIN EVALUATED_PROJECT ep ON p.id = ep.project_id
	JOIN PROJECT_OWNER po ON p.id = po.project_id
	JOIN USER u ON u.id = po.user_id
	WHERE u.teach_type = ?
	GROUP BY p.id, p.name, u.name, p.description, p.video_url, p.github_url
	ORDER BY average_grade DESC
	LIMIT 3
`


const GET_USER_PROJECT = `
	SELECT p.id, p.name, u.name, p.description, p.video_url, p.github_url FROM PROJECT p 
	JOIN PROJECT_OWNER po ON po.project_id = p.id 
	JOIN USER u on u.id = po.user_id WHERE u.id= ?`

const GET_MATERIALS_CLASS = `	
	SELECT m.id, m.title, u.name, m.subject FROM CLASS_MATERIAL m 
	JOIN OWNER_MATERIAL om ON om.material_id = m.id
	JOIN USER u ON u.id = om.user_id`

const GET_MATERIAL_CLASS = `	
	SELECT m.id, m.title, u.name, m.subject, m.content FROM CLASS_MATERIAL m 
	JOIN OWNER_MATERIAL om ON om.material_id = m.id
	JOIN USER u ON u.id = om.user_id
	WHERE m.id = ?`