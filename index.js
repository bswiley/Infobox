let roles;
let departments;
let names;
let addOrChange = "notchange"
let employeesId;
let firstName;
let lastName;
const inquirer = require("inquirer");
const sql = require("mysql2");
const db = sql.createConnection({host: 'localhost', user: 'root', password: '4wm58f6t',database: 'personel_db'},console.log(`Connected to the classlist_db database.`));

//This functions starts the process by asking the user what they want to do and directs to other
//functions based on the results.
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
//These are the initial active parts of the code when run.  The two 'make' functions make lists that
//are used in some of the inquirer questions.  The 'init' function calls the above function.
makeNameList();
makeRoleList();
makeDepartmentList();
init();
//this function can be seen as 'part2' of the init function because it asks more questions when 
//'Add to or update the database" has been chosen.  It asks further questions and redirects 
//accordingly
function changeDatabase(){
    
                inquirer
                .prompt([
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
                    console.log ("made it 70");
                    switch (response.change) {
                        case "add a department":
                        console.log("made it 73");   
                        addDepartment()
                            break;
                        case "add a role":
                            console.log('made it 77');
                            addRole()
                            break;
                        case "add an employee":
                        addOrChange = "add";    
                        addEmployee()
                            break;
                        case "update an employee's information":
                        console.log("made it 103") 
                        addOrChange = "Change";   
                        updateEmployee();
                            break;
                    }
                })}
function viewDepartments() {
// supposed to diplay all the department names and id's in the CLI
    db.query('SELECT id AS Department_Id, name AS Department FROM department', function (err, results) {
        console.table(results);
        restart();
      })
    };
async function addDepartment() {
    console.log("made it 110)")
     const department = (await inquirer.prompt([
         {
             type: 'input',
             message: 'What is the name of the department you would like to add?',
             name: 'department'
         },
     ])).department
         db.query(`INSERT INTO department (name) VALUES ("${department}")`), function (err, results){
             console.log(results);};
         console.log(`\n${department} was added to departments\n`);
             restart()};

//This function displays the role_id, title, department, and salary of the role
function viewRoles() {
        db.query('SELECT department.name AS Department, role.id AS Role_Id, role.title AS Title, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id ORDER BY role.id', function (err, results) {
            console.table(results);
            restart();
          })
        };
//This function adds a new role
async function addRole() {
    console.log("made it 110)")
     const role = (await inquirer.prompt([
         {
             type: 'input',
             message: 'What is the title of the new role you would like to add?',
             name: 'role'
         }])).role
         const department = (await inquirer.prompt([
         {
            type: 'list',
            message: 'What department is this role part of?',
            name: 'department',
            choices: departments
         }])).department
         const salary = (await inquirer.prompt([
         {
            type: 'input',
            message: 'What is the salary for the new role?',
            name: 'salary'
         }
     ])).salary
         department_id = department.split(" ",3);
         id = department_id[0];
         db.query(`INSERT INTO role (title,salary,department_id) VALUES ("${role}",${salary},${id})`), function (err, results){
             console.log(results);};
         console.log(`\n${role} was added to roles\n`);
             restart()};       

//This function will produce a table displaying the information for all the employees
 function viewEmployees() {
    db.query('SELECT department.name AS Department, role.title AS Title, role.salary AS Salary, employee.id AS Employee_Id, CONCAT(employee.first_name," ",employee.last_name) AS Employee, CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM role LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN manager ON employee.manager_id = manager.id ORDER BY employee.id',function (err, results) {
    console.table(results);
    restart();
  })
};
 
 //This function will ask the questions needed to add an employee and then add them           
async function addEmployee(){
    names.push('0 - no one');
    const newFirst = (await inquirer.prompt([
{
    type: 'input',
    message: 'What is the first_name of the new employee?',
    name: 'newFirst',
    }])).newFirst
    const newLast = (await inquirer.prompt([
    {
        type: 'input',
        message: 'What is the last_name of the new employee?',
        name: 'newLast',
        }])).newLast
    const assignedRole = (await inquirer.prompt([
    {  
    type: 'list',
    message: 'What role does this employee fill?',
    name: 'assignedRole',
    choices: roles     
        }])).assignedRole

    const employeesManager = (await inquirer.prompt([
    {
    type: 'list',
    message: "Who is this employee's manager?",
    name: 'employeesManager',
    choices: names
    }])).employeesManager
        let tempvariable = employeesManager.split(" ",3);
        let managerId = tempvariable[0];
        tempvariable = assignedRole.split(" ",3);
        let role = tempvariable[0];
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newFirst}","${newLast}",${role},${managerId})`), function (err, results){}
            console.log(`\n${newFirst} ${newLast} was added to employees\n`);
        restart();

    }
//This function will ask questions about updating an employee's information and do that
async function updateEmployee (){
            const employee = (await inquirer.prompt([
     {
        type: 'list',
        message: "What employee do you want to change?",
        name: 'employee'
     }])).employee;
     let tempvariable = employee.split(" ",3);
        employeeId = tempvariable[0];
        employee = tempvariable[2];
        const whatChange = (await inquirer.prompt([
            {
                type: 'list',
                message: `What details do you want to change for ${employee}?`,
                name: 'whatChange'
                choices: ['First Name','Last name', 'Title', 'Manager']
            }])).whatChange
            switch (whatChange) {
                case 'First Name':
                console.log("made it 219"); 
                const newFirst =(await inquirer.prompt([
                    {
                        type: 'input',
                        message: `What is ${employee}'s new first name?`,
                        name: 'newFirst'
                        }])).newFirst 
                        db.query(`UPDATE employee SET first_name = ${newFirst} WHERE employee_id = ${employeeId}`), function (err, results){}  
                        console.log (`\n${employee}'s first name was changed to ${newFirst}\n`);
                        restart();
                addDepartment()
                    break;
                case 'Last name':
                    console.log('made it 223');
                    const newLast =(await inquirer.prompt([
                        {
                            type: 'input',
                            message: `What is ${employee}'s new last name?`,
                            name: 'newLast'
                            }])).newLast 
                            db.query(`UPDATE employee SET last_name = ${newLast} WHERE employee_id = ${employeeId}`), function (err, results){}  
                            console.log (`\n${employee}'s last name was changed to ${newLast}\n`);
                            restart();
                    break;
                case 'Title':
                    console.log('made it 223');
                    const title =(await inquirer.prompt([
                        {
                            type: 'list',
                            message: `What is ${employee}'s new last name?`,
                            name: 'title',
                            choices: names
                            }])).title
                            let tempvariable = names.split(" ",3);
                            titleId =tempvariable[0]; 
                            db.query(`UPDATE employee SET role_id = ${titleId} WHERE employee_id = ${employeeId}`), function (err, results){}  
                            console.log (`\n${employee}'s title was changed to ${titleId}\n`);
                            restart();   

                    break;
                case 'Manager':
                console.log("made it 103") 
                const manager =(await inquirer.prompt([
                    {
                        type: 'list',
                        message: `What is ${employee}'s new last name?`,
                        name: 'manager',
                        choices: names
                        }])).manager
                        let tempvariable = names.split(" - ",2);
                        let manager = tempvariable[1];
                        let managerId = tempvariable[0]; 
                        db.query(`UPDATE employee SET manager_id = "${managerId}" WHERE employee_id = ${employeeId}`), function (err, results){}  
                        console.log (`\n${employee}'s manager was changed to ${manager}\n`);
                        restart();    
                        break;


            }

     }           


    }


                    

        

    
 
//this function should ask for the information to update an employee and update them


//This function makes a list of names of employees to be used by different user options
function makeNameList(){
    console.log ("made it 329")
    db.query('SELECT CONCAT(id," - ",first_name," ",last_name) AS name FROM employee ORDER BY id', function (err, results) {
        tabledNames = results;
    
    const useNames=tabledNames.map(name=>{
        const pObj = JSON.parse(JSON.stringify(name));
        let newName = Object.values(pObj);
        return newName;});
        names=useNames.flat();
  
        return;
         })};

//This function makes a list of names of departments to be used by different menu options
function makeDepartmentList(){
    
 db.query('SELECT CONCAT(id," - ",name) AS department FROM department', function (err, results){
 
    tabledDepartments = results;
 
const useDepartments=tabledDepartments.map(department=>{
    const pObj = JSON.parse(JSON.stringify(department));
    let newDepartment = Object.values(pObj);
    return newDepartment;});
    departments=useDepartments.flat();
  
    return; 
})}

function makeRoleList(){
    
    db.query('SELECT CONCAT(id," - ",title) AS role FROM role', function (err, results){
    
       tabledRoles = results;
    
   const useRoles=tabledRoles.map(role=>{
       const pObj = JSON.parse(JSON.stringify(role));
       let newRole = Object.values(pObj);
       return newRole;});
       roles=useRoles.flat();
     
       return; 
   })}
         
//Every menu option ends by sending here where the user is asked to quit or continue         
function restart(){
            console.log ("made it 385")
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
                        makeNameList();
                        makeRoleList();
                        makeDepartmentList();
                        init();
                        }else{
                        process.exit(0)
                    }
            })}


