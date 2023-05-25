DROP DATABASE IF EXISTS personel_db;
CREATE DATABASE personel_db;

USE personel_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30)NOT NULL,
  last_name VARCHAR(30), 
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
CREATE TABLE manager (
  id = employee.manager_id
  manager = CONCAT(employee.first_name," ",employee.last_name) 
);
