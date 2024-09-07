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
INSERT INTO user (id, user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES (5, 'estudante', 'Felipe ', 'felipe@email.com', '6f51d49d2b5a3123ea1fe2b7ebe9233e6b577b248b7ac961ff2dda3184e6ed7c', 'ETEC ANTONIO DEVISATE', 'tecnico', 3, '7595256c9d93aef398411694271b9008451976b822b27fe201a96563c3ecb9da', 14999877777);
INSERT INTO user (id, user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES (6, 'estudante', 'Edward', 'edward@email.com', 'defaed5bb2853a9d588ad50badf50e241136c28d4659ede15da6414615a2743c', 'ETEC ANTONIO DEVISATE', 'tecnico', 3, '2db4be58a7434acc92f790354ef4aac81720de43c27c1d7fed53738a5b5fbc97', 14997812344);
INSERT INTO user (id, user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES (7, 'estudante', 'Ezac', 'ezac@email.com', '4f1052754f6d4e36938c90794957a4490c769609ee5021bffb7a1cac68f38144', 'ETEC ANTONIO DEVISATE', 'tecnico', 3, '74ab2cde620d28a186c2005816d90d17dfc21afbb9822e138b1851431acfae64', 14997663211);
INSERT INTO user (id, user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES (8, 'estudante', 'Rock', 'rock@email.com', '362a502e225dc84eba1b6c99e398d9c9b70e540d9d96164889a559f7c106c7c2', 'Colégio Compacto', 'medio', 3, '2729b9afba3926d323b2299d4ddc6ce91bf1e820382a071437e0ee844ab5664a', 14996773322);
INSERT INTO user (id, user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES (9, 'estudante', 'Lorenzo', 'lorenzo@email.com', '4475a1207e0699835a419aa2f182ce0f7a147ebc6863fd5dc2b96a963bc92ebb', 'SESI', 'medio', 3, '8f4d11f6b395e8766e421276db8627e78fb1e64c3eccb83832a772b4998fa010', 14975648881);
INSERT INTO user (id, user_type, name, email, cpf, scholl, teach_type, high_scholl, password, phone_number) VALUES (10, 'estudante', 'Cauã', 'caua@email.com', 'b8033b7e40fe847cb2d60d13af0b5030d2f1822bc56b48c135fe4111bb7f82ef', 'EE. Prof. Baltazar de Godoy Moreira', 'medio', 3, 'bb3ec7082eb4e4599cd30a7646afb4e7bb4b71d98606b7f86189d1bbea6b34d7', 14876291828);

CREATE TABLE project (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(150) NOT NULL,
    description nvarchar(500) NOT NULL,
    video_url nvarchar(2100) NOT NULL,
    github_url nvarchar(2100) NOT NULL,
    status char(7) NOT NULL
);
INSERT INTO project (id, name, description, video_url, github_url, status) VALUES (1, 'Imersy', 'uma plataforma unimar, com o objetivo de facilitar a participação dos estudantes em bootcamps', 'https://yotube.com', 'https://github.com/Felipe-Takayuki/Imersy', 'enviado');
INSERT INTO project (id, name, description, video_url, github_url, status) VALUES (3, 'Robix', 'aluguel de jogos via pix', 'https://youtube.com', 'https://github.com', 'enviado');
INSERT INTO project (id, name, description, video_url, github_url, status) VALUES (4, 'garden1', 'loja de venda de plantas', 'https://youtube.com', 'https://github.com', 'enviado');
INSERT INTO project (id, name, description, video_url, github_url, status) VALUES (5, 'Dentist123', 'agendamento com o dentista online', 'https://youtube.com', 'https://github.com', 'enviado');
INSERT INTO project (id, name, description, video_url, github_url, status) VALUES (6, 'F1game', 'jogo de formula 1', 'https://youtube.com', 'https://github.com', 'enviado');
INSERT INTO project (id, name, description, video_url, github_url, status) VALUES (7, 'Drawnime', 'site para fazer desenhos', 'https://youtube.com', 'https://github.com', 'enviado');

CREATE TABLE project_owner (
    user_id int NOT NULL,
    project_id int NOT NULL,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);
INSERT INTO project_owner (user_id, project_id) VALUES (5, 1);
INSERT INTO project_owner (user_id, project_id) VALUES (6, 3);
INSERT INTO project_owner (user_id, project_id) VALUES (7, 4);
INSERT INTO project_owner (user_id, project_id) VALUES (8, 5);
INSERT INTO project_owner (user_id, project_id) VALUES (9, 6);
INSERT INTO project_owner (user_id, project_id) VALUES (10, 7);


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
INSERT INTO subscriber_bootcamp (bootcamp_id, user_id) VALUES (1, 5);
INSERT INTO subscriber_bootcamp (bootcamp_id, user_id) VALUES (1, 6);
INSERT INTO subscriber_bootcamp (bootcamp_id, user_id) VALUES (1, 7);
INSERT INTO subscriber_bootcamp (bootcamp_id, user_id) VALUES (1, 8);
INSERT INTO subscriber_bootcamp (bootcamp_id, user_id) VALUES (1, 9);
INSERT INTO subscriber_bootcamp (bootcamp_id, user_id) VALUES (1, 10);



CREATE TABLE class_material (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(150) NOT NULL,
    subject varchar(256) NOT NULL,
    content nvarchar(3000) NOT NULL
);
INSERT INTO class_material (id, title, subject, content) VALUES (1, 'Aula 1', 'principios básicos de html e css', '### HTML (Linguagem de Marcação de HiperTexto)\n- é o bloco de construção mais básico da web. Define o significado e a estrutura do conteúdo da web. Outras tecnologias além do HTML geralmente são usadas para descrever a aparência/apresentação (CSS) ou a funcionalidade/comportamento (JavaScript) de uma página da web.\n### Cascading Style Sheets (CSS)\n- é usado para formatar o layout de uma página da web. Com CSS, você pode controlar a cor, a fonte, o tamanho do texto, o espaçamento entre os elementos, como os elementos são posicionados e dispostos, quais imagens ou cores de fundo serão usadas, diferentes exibições para diferentes dispositivos e tamanhos de tela e muito mais!');
INSERT INTO class_material (id, title, subject, content) VALUES (2, 'Aula 2', 'React ', '## React\nO React é uma biblioteca front-end JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. \n\nexemplo:\n\nimport { useEffect, useState } from "react"\nimport { useNavigate, useParams } from "react-router-dom"\nimport { MaterialClass } from "../user_page/categories/material"\nimport ReactMarkdown from "react-markdown"\nimport { NavBarUser } from "../user_page/navbar_user"\nimport { GetMaterialWContent } from "../../api/m_class"\n\n\n\nexport function MaterialClassPage() {\n    const {material_id} = useParams()\n    const navigate = useNavigate()\n    const [material, setMaterial] = useState<MaterialClass>()\n    useEffect(() => {\n      GetMaterialWContent(material_id, setMaterial)\n    }, [material_id])\n    return (\n    <>\n    <NavBarUser />\n    <main className="text-white p-10">\n        <button onClick={() => navigate("/user-page")}><img src="../../public/icons/arrow-left.svg" alt="arrow-left" className="w-6 mb-14"/></button>\n        <p className="text-3xl">{material?.title}</p>\n        <p className="text-gray text-2xl mb-24">conteúdo:{material?.subject}</p>\n        <ReactMarkdown children={material?.content!} className="text-2xl"></ReactMarkdown>\n\n    </main>\n     \n    </>)\n}\n');
INSERT INTO class_material (id, title, subject, content) VALUES (4, 'Aula 3', 'Flutter', '# Flutter \né um kit de desenvolvimento de software de interface de usuário, de código aberto, criado pela empresa Google em 2015, baseado na linguagem de programação Dart, que possibilita a criação de aplicativos para Web e para os sistemas operacionais Android, iOS, Windows, macOS, Linux e Fuchsia');

CREATE TABLE owner_material (
    material_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (material_id, user_id),
    FOREIGN KEY (material_id) REFERENCES class_material(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
INSERT INTO owner_material (material_id, user_id) VALUES (1, 2);
INSERT INTO owner_material (material_id, user_id) VALUES (2, 1);
INSERT INTO owner_material (material_id, user_id) VALUES (4, 3);

CREATE TABLE submitted_project (
    bootcamp_id int NOT NULL,
    project_id int NOT NULL,
    PRIMARY KEY (bootcamp_id, project_id),
    FOREIGN KEY (bootcamp_id) REFERENCES bootcamp(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);
INSERT INTO submitted_project (bootcamp_id, project_id) VALUES (1, 1);
INSERT INTO submitted_project (bootcamp_id, project_id) VALUES (1, 3);
INSERT INTO submitted_project (bootcamp_id, project_id) VALUES (1, 4);
INSERT INTO submitted_project (bootcamp_id, project_id) VALUES (1, 5);
INSERT INTO submitted_project (bootcamp_id, project_id) VALUES (1, 6);
INSERT INTO submitted_project (bootcamp_id, project_id) VALUES (1, 7);


CREATE TABLE evaluated_project (
    evaluator_id int NOT NULL,
    project_id int NOT NULL,
    quality_grade int NOT NULL,
    creativity_grade int NOT NULL,
    PRIMARY KEY (evaluator_id, project_id),
    FOREIGN KEY (evaluator_id) REFERENCES user(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

