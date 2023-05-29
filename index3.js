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

//This function is the second part of the menu; whats left after "Add to or update the database" 
function changeDatabase(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to add or update on the database?',
            name: 'change',
            choices: [
                "add a department",
                "add a role",
                "add an employee",
                "update an employee's information",
            ]
        },
    ])
    .then((response) => {
        console.log ("made it 91");
        switch (response.change) {
            case "add a department":
            console.log("made it 94");   
            addDepartment()
                break;
            case "add a role":
                addRole()
                break;
            case "add an employee":
            addOrChange = add    
            addEmployee()
                break;
            case "update an employee's information":
            console.log("made it 103") 
            addOrChange = Change;   
            makeNameList();
                break;
        }
    })}


//This function displays all the department names and id's 
function viewDepartments() {

        db.query('SELECT id AS Department_Id, name AS Department FROM department', function (err, results) {
            console.table(results);
            restart();
          })
        };
//This function asks the name of the department and adds it
function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: "newDepartmentName",
    }])
    .then((response)=>{ 


        
    })









}







// This function diplays the id, title, department, and salary of the role
function viewRoles() {

    db.query('SELECT department.name AS Department, role.id AS Role_Id, role.title AS Title, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id ORDER BY role.id', function (err, results) {
        console.table(results);
        restart();
      })
    };

// supposed to diplay the id, names, titles, departments, salaries, and managers of all employees
function viewEmployees() {
    db.query('SELECT department.name AS Department, role.title AS Title, role.salary AS Salary, employee.id AS Employee_Id, CONCAT(employee.first_name," ",employee.last_name) AS Employee, CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM role LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN manager ON employee.manager_id = manager.id ORDER BY employee.id',function (err, results) {
        console.table(results);
        restart();
      })
    }; 



















//Every menu option ends by sending here where the user is asked to quit or continue         
function restart(){
    console.log ("made it 258")
    inquirer.prompt([
            {
                type: 'list',
                message: 'Would you like to continue and do something more or stop here?',
                name: 'reStart',
                choices: ["Do something more","Stop here"]
            },
        ])
        .then((response) => {
            if (response.reStart==="Do something more"){
                init();
            }else{
                process.exit(0)
            }
    })}

