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
    console.log(`Connected to the personel_db database.`));

db.query('SELECT * FROM department'), function (err, results){
    console.log(results);
    console.table(results);
}