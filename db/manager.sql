CREATE TABLE manager (
SELECT employee.id as manager_id, first_name AS manager_first_name, last_name AS manager_last_name FROM employee);