INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Engineering"),
       ("Production"),
       ("Service"),
       ("Administration"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES
("Account manager", 103568, 1),
("Marketing specialist", 125568, 2),
("Design Engineer", 98735,3),
("Manufacturing team member", 25987,4),
("Service engineer", 49876,5),
("Human resource manager", 81845,6),
("Chief Operations Officer", 192987,7),
("Sales manager", 125123,1),
("Director of marketing", 134015,2),
("Manufacturing engineer", 87346,3),
( "Production Supervisor", 32009,4);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES 
("Jagonnoth","Minh",7,NULL),
("Ilie","Albenscu",8, 1),
("Meilin","Juhasz",9,1),
("Abdolreza","Bunrueang",10,1),
("Guglielmo","Fleitas",11,1),
("Aitona","Lorranogu",1, 2),
("Anja","Ahonen",2 , 3),
("Mikki","Asano",3 ,4),
("Hanna","Pereira",4, 4),
("Maxim","Afinogenou",5 ,1),
("Yukio","Park",6 ,1);

CREATE TABLE manager SELECT * FROM employee;