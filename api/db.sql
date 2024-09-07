DROP DATABASE IF EXISTS imersy;

CREATE DATABASE imersy;

USE imersy;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_type varchar(10) NOT NULL,
    name varchar(256) UNIQUE NOT NULL,
    email varchar(256) UNIQUE NOT NULL,
    cpf char(64) UNIQUE NOT NULL,
    scholl varchar(256) NOT NULL,
    teach_type varchar(7) NOT NULL,
    high_scholl int NOT NULL,
    password char(64) NOT NULL,
    phone_number bigint NOT NULL
);

INSERT INTO user (user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES 
    ('mentor', 'joze', 'joze@email.com', 'af53aaf87656940fccd31afc9a799fb65b14ca21ceacfe3a4536951a8699b78a', 'ETEC ANTONIO DEVISATE', 'tecnico', 4, '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 14999999999),
    ('mentor', 'isaac', 'isaac@email.com', '167e34232a828b5b1685f830ef954adb8ec6786777eae70ac80e1bbd2344d3d6', 'ETEC ANTONIO DEVISATE', 'tecnico', 4, '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 14999999998),
    ('mentor', 'marco', 'marco@email.com', '3f94d68a35d872e8c73b59e6a36e34d12c7263b3c81e83b09aa41aacf536ead8', 'ETEC ANTONIO DEVISATE', 'tecnico', 4, '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 14999999997);

CREATE TABLE project (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(150) NOT NULL,
    description nvarchar(500) NOT NULL,
    video_url nvarchar(2100) NOT NULL,
    github_url nvarchar(2100) NOT NULL,
    status char(7) NOT NULL
);

CREATE TABLE project_owner (
    user_id int NOT NULL,
    project_id int NOT NULL,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE bootcamp (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(150) NOT NULL,
    address varchar(256) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

INSERT INTO bootcamp (id, title, address, start_date, end_date) VALUES 
    (1, 'Jovem Programador 2024', 'rua higino muzy', '2024-08-30 19:03:03', '2024-09-06 19:03:06');

CREATE TABLE subscriber_bootcamp (
    bootcamp_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (bootcamp_id, user_id),
    FOREIGN KEY (bootcamp_id) REFERENCES bootcamp(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE class_material (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(150) NOT NULL,
    subject varchar(256) NOT NULL,
    content nvarchar(3000) NOT NULL
);

CREATE TABLE owner_material (
    material_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (material_id, user_id),
    FOREIGN KEY (material_id) REFERENCES class_material(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE submitted_project (
    bootcamp_id int NOT NULL,
    project_id int NOT NULL,
    PRIMARY KEY (bootcamp_id, project_id),
    FOREIGN KEY (bootcamp_id) REFERENCES bootcamp(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE evaluated_project (
    evaluator_id int NOT NULL,
    project_id int NOT NULL,
    quality_grade int NOT NULL,
    creativity_grade int NOT NULL,
    PRIMARY KEY (evaluator_id, project_id),
    FOREIGN KEY (evaluator_id) REFERENCES user(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);
