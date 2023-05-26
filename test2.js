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
    console.log(`Connected to the personel_db database.`)
);

db.query('SELECT CONCAT(first_name," ",last_name) AS name, id FROM employee ORDER BY last_name', function (err, results) {
    console.log (results)
    const column = results.map(piece=> Object.values(piece));
    console.table(results,["name","id"]);
    console.table (column); 
});
db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    console.table(column); 
});