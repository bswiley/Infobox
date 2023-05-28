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

/* CREATE TABLE manager SELECT * FROM employee; */
/* CREATE TABLE manager (
  extra_id INT NOT NULL AUTO_INCREMENT,
  manager_id INT FOREIGN KEY,
  first VARCHAR(30) FOREIGN KEY,
  last VARCHAR(30) FOREIGN KEY,
  PRIMARY KEY (extra_id),
  FOREIGN KEY (manager_id) REFERENCES employee(manager_id) ON DELETE CASCADE,
  FOREIGN KEY (first_name) REFERENCES employee(first_name) ON DELETE CASCADE,
  FOREIGN KEY (last_name) REFERENCES employee(last_name) ON DELETE CASCADE
); */

