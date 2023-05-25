let employeeName;
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
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do with the database?',
                name: 'shape',
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add to or update the database",
                ]
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
                    addDatabase()
                    break;
            }
        })
}

init();
function viewDepartments() {
// supposed to diplay all the department names and id's in the CLI
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
      })
    };
function viewRoles() {
// supposed to diplay the id, title, department, and salary of the role
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON department.id = role.department_id ORDER BY role.id', function (err, results) {
            console.log(results);
          })
        };
function viewEmployees() {
// supposed to diplay the id, names, titles, departments, salaries, and managers of all employees
            db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON department.id = role.department_id ORDER BY role.id', function (err, results) {
                console.log(results);
              })
            };
    
function addDatabase(){
// Asks questions and directs to function to add/update desired information in database
            inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What would you like to add or update on the database?',
                    name: 'change',
                    choices: [
                        "add a department",
                        "update an employee's information",
                        "add a role",
                        "add an employee",

                    ]
                },
            ])
            .then((response) => {
                switch (response.change) {
                    case "add a department":
                        addDepartment()
                        break;
                    case "add a role":
                        addRole()
                        break;
                    case "add an employee":
                        addEmployee()
                        break;
                    case "update an employee's information":
                        updateEmployee()
                        break;
                }
            })}
function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What is the name of the department you would like to add?',
            name: 'newDepartment',
            
        },
    ])
    .then((response) => {
db.query('SELECT CONCAT(first_name," ",last_name) AS name, id FROM employee ORDER BY last_name', function (err, results) {
            nameID = results;
            const employeeID = nameID.filter(function(person) {
                if (person.name === nameToTest){
                    console.log (person.id)
                    updateEmployee(person.id)
                    }
              });        
          });

}
function addRole() {
//this function should ask for the information required to add a new role and add it 
}
function addEmployee(){
//this function should ask for the information required to add a new employee and and them
}
function updateEmployee(){
//this function should ask for the information to update an employee and update them
// db.query('SELECT CONCAT(first_name," ",last_name) AS name FROM employee ORDER BY last_name ', function (err, results) {
//     employeeName = results.map(piece=>Object.values(piece));
//     console.log(results);
//     console.log (employeeName); 
//   });
//   db.query('SELECT first_name,last_name, id FROM employee ORDER BY last_name', function (err, results) {
//     const employeeId = results.map(piece=>Object.values(piece));
//     console.log(results);
//     console.log (employeeId); 
//   });
// inquirer
//             .prompt([
//                 {
//                     type: 'list',
//                     message: 'For whom would you like to update the database?',
//                     name: 'change',
//                     choices: employeeName
//                 },
//             ])
//             .then((response) => {
//                 console.log(response.change)
                
                
//                 })
            }



