CREATE TABLE manager (
  extra_id INT NOT NULL AUTO_INCREMENT,
  manager_id INT FOREIGN KEY,
  first VARCHAR(30) FOREIGN KEY,
  last VARCHAR(30) FOREIGN KEY,
  PRIMARY KEY (extra_id),
  FOREIGN KEY (manager_id) REFERENCES employee(manager_id) ON DELETE CASCADE,
  FOREIGN KEY (first_name) REFERENCES employee(first_name) ON DELETE CASCADE,
  FOREIGN KEY (last_name) REFERENCES employee(last_name) ON DELETE CASCADE
);