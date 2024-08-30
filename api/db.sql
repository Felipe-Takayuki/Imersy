DROP DATABASE IF EXISTS imersy;

CREATE DATABASE imersy;

USE imersy; 

CREATE TABLE USER(
    id int NOT NULL auto_increment PRIMARY KEY,
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

CREATE TABLE PROJECT(
    id int NOT NULL auto_increment PRIMARY KEY,
    name varchar(150) NOT NULL,
    description nvarchar(500) NOT NULL,
    video_url nvarchar(2100) NOT NULL,
    github_url nvarchar(2100) NOT NULL
);

CREATE TABLE PROJECT_OWNER(
    user_id int NOT NULL REFERENCES USER(id),
    project_id int NOT NULL REFERENCES PROJECT(id),
    PRIMARY KEY (user_id, project_id)
);

CREATE TABLE BOOTCAMP(
    id int NOT NULL auto_increment PRIMARY KEY,
    title varchar(150) NOT NULL,
    address varchar(256) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

INSERT INTO `bootcamp` (`id`, `title`, `address`, `start_date`, `end_date`) VALUES (1, 'Jovem Programador 2024', 'rua higino muzy', '2024-08-30 19:03:03', '2024-09-06 19:03:06');


CREATE TABLE SUBSCRIBER_BOOTCAMP(
    bootcamp_id int NOT NULL REFERENCES BOOTCAMP(id),
    user_id int NOT NULL REFERENCES USER(id),

    PRIMARY KEY (bootcamp_id, user_id)
);

CREATE TABLE CLASS_MATERIAL(
    id int NOT NULL auto_increment PRIMARY KEY,
    title varchar(150) NOT NULL,
    subject varchar(256) NOT NULL,
    content nvarchar(3000) NOT NULL
);

CREATE TABLE OWNER_MATERIAL(
    material_id int NOT NULL REFERENCES CLASS_MATERIAL(id),
    user_id int NOT NULL REFERENCES OWNER_MATERIAL(id),
    PRIMARY KEY (material_id, user_id)
);

CREATE TABLE SUBMITTED_PROJECT(
    bootcamp_id int NOT NULL REFERENCES BOOTCAMP(id),
    project_id int NOT NULL REFERENCES PROJECT(id),
    PRIMARY KEY (bootcamp_id, project_id)
);

CREATE TABLE EVALUTED_PROJECT(
    bootcamp_id int NOT NULL REFERENCES BOOTCAMP(id),
    project_id int NOT NULL REFERENCES PROJECT(id),
    quality_grade int NOT NULL,
    creativity_grade int NOT NULL,
    PRIMARY KEY (bootcamp_id, project_id)
)