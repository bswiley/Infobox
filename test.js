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

  db.query('SELECT CONCAT(first_name," ",last_name) AS name FROM employee', function (err, results) {
    const column = results.map(piece=>Object.values(piece));
    console.log(results);
    console.log (column); 
  });

  

