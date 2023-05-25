let person = [1,2,3,4,5]
function updateEmployee(person){
    db.query(`SELECT * FROM employee WERE id = ${person}`, function (err, results) {
        updateEmployeeId = person.map(piece=>Object.values(piece));
        console.log (updateEmployeeId); 
      });}


let nameID;
const nameToTest = "Ilie Albenscu";
const inquirer = require("inquirer");
const sql = require("mysql2");
const db = sql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '4wm58f6t',
      database: 'personel_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

db.query('SELECT name FROM department', function (err, results) {
    const column = results.map(piece=>Object.values(piece));
    console.log(results);
    console.log (column); 
  });
  db.query('SELECT CONCAT(first_name," ",last_name) AS name FROM employee ORDER BY last_name', function (err, results) {
    const column = results.map(piece=> Object.values(piece));
    console.log(results);
    console.log (column); 
  });
 db.query('SELECT CONCAT(first_name," ",last_name) AS name, id FROM employee ORDER BY last_name', function (err, results) {
    nameID = results;
    const employeeID = nameID.filter(function(person) {
        if (person.name === nameToTest){
            console.log (person.id)
            updateEmployee(person.id)
            }
      });        
  });




