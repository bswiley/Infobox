let departments;
let names;
let addOrChange;
let employeesId;
let firstName;
let lastName;
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
function init() {
    console.clear()
    console.log("this here")
    inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do with the database?',
                name: 'shape',
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add to or update the database"]
            },
        ])
        .then((response) => {
            switch (response.shape) {
                case "View all departments":
                    viewDepartments()
                    break;
                case "View all roles":
                    viewRoles()
                    break;
                case "View all employees":
                    viewEmployees()
                    break;
                case "Add to or update the database":
                    changeDatabase()
                    break;
            };
        })
};
init();
function viewDepartments() {
    // supposed to diplay all the department names and id's in the CLI
        db.query('SELECT id AS Department_Id, name AS Department FROM department', function (err, results) {
            console.table(results);
            restart();
          })
        };