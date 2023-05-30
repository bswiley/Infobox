let tempvariable;
let role;
let assignedRole;
let roles;
let departments;
let names;
let employeesId;
let firstName;
let lastName;
const inquirer = require("inquirer");
const sql = require("mysql2");
const db = sql.createConnection({host: 'localhost', user: 'root', password: '4wm58f6t',database: 'personel_db'},(`Connected to the classlist_db database.`));
//Aside from the first two menus, most of the functions are arranged by what part of the database they are working on.
//(i.e. first all department functions, then role functions, and finally employee functions).
//At the end are functions involved with the beginning and end, generally 'administrative' functions involved with both.


//This function (init) starts the process by asking the user what they want to do and directs to other
//functions based on the results.
function init() {
    console.clear()
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
//These are the initial active parts of the code when run.  The three 'make' functions create the lists that
//are used in some of the inquirer questions.  The 'init' function calls the above function.
makeNameList();
makeRoleList();
makeDepartmentList();
init();

//this function (changeDatabase) can be seen as 'part2' of the 'init' function because it asks more questions when 
//'Add to or update the database' has been chosen.  It asks further questions and redirects accordingly.
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
        updateEmployee();
        break;
    }
})}

//This function (viewDepartments) shows a table of the deparments and department ids
function viewDepartments() {

    db.query('SELECT id AS Department_Id, name AS Department FROM department', function (err, results) {
        console.table(results);
        restart();
      })
    };

//This function asks the necessary questions to add a new department and then does that.
async function addDepartment() {

const department = (await inquirer.prompt([
    {
    type: 'input',
    message: 'What is the name of the department you would like to add?',
    name: 'department'
    },
])).department

db.query(`INSERT INTO department (name) VALUES ("${department}")`), function (err, results){};

console.log(`\n${department} was added to departments\n`);
restart()};
//This function (viewRoles) displays the role_id, title, department, and salary of the role

function viewRoles() {

db.query('SELECT department.name AS Department, role.id AS Role_Id, role.title AS Title, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id ORDER BY role.id', function (err, results) {

console.table(results);
restart();
})};

//This function (addRole) asks the appropriate questions to add a new role and then does that. 
async function addRole() {

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

db.query(`INSERT INTO role (title,salary,department_id) VALUES ("${role}",${salary},${id})`), function (err, results){};

console.log(`\n${role} was added to roles\n`);

restart()};       


//This function will produce a table displaying department, title, salary, employee id the employee's name, and their manager's name
function viewEmployees() {

db.query('SELECT department.name AS Department, role.title AS Title, role.salary AS Salary, employee.id AS Employee_Id, CONCAT(employee.first_name," ",employee.last_name) AS Employee, CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM role LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN manager ON employee.manager_id = manager.id ORDER BY employee.id', function (err, results) {
console.table(results);
restart();
})};

 
 //This function will ask the questions needed to add an employee and then adds one           
async function addEmployee(){

names.push('0 - no one');

const newFirst = (await inquirer.prompt([
{
type: 'input',
message: 'What is the first name of the new employee?',
name: 'newFirst',
}])).newFirst

const newLast = (await inquirer.prompt([
{
type: 'input',
message: 'What is the last name of the new employee?',
name: 'newLast',
}])).newLast

assignedRole = (await inquirer.prompt([
{  
type: 'list',
message: 'What role does this employee fill?',
name: 'assignedRole',
choices: roles     
}])).assignedRole

let newvariable = assignedRole.split(" ",3);
role = newvariable[0];

const employeesManager = (await inquirer.prompt([
{
type: 'list',
message: "Who is this employee's manager?",
name: 'employeesManager',
choices: names
}])).employeesManager

let tempvariable = employeesManager.split(" ",3);
let managerId = tempvariable[0];
if(managerId===0){
    managerId=NULL};
tempvariable = assignedRole.split(" ",3);
role = tempvariable[0];

db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${newFirst}","${newLast}",${role})`), function (err, results){}

console.log(`\n${newFirst} ${newLast} was added to employees\n`);
restart();}

//This function will ask questions about updating an employee's information and update it
async function updateEmployee (){
let employee = (await inquirer.prompt([
 {
type: 'list',
message: "What employee do you want to change?",
name: 'employee',
choices: names
 }])).employee;
 let tempvariable = employee.split(" - ",2);
employeeId = tempvariable[0];
employee = tempvariable[1];
const whatChange = (await inquirer.prompt([
{
type: 'list',
message: `What details do you want to change for ${employee}?`,
name: 'whatChange',
choices: ['First Name','Last name', 'Title', 'Manager']
}])).whatChange

switch (whatChange) {

case 'First Name':
const newFirst =(await inquirer.prompt([
{
type: 'input',
message: `What is ${employee}'s new first name?`,
name: 'newFirst'
}])).newFirst

db.query(`UPDATE employee SET first_name = "${newFirst}" WHERE id = ${employeeId}`), function (err, results){}  

console.log (`\n${employee}'s first name was changed to ${newFirst}\n`);
restart();
break;

case 'Last name':
const newLast =(await inquirer.prompt([
{
type: 'input',
message: `What is ${employee}'s new last name?`,
name: 'newLast'
}])).newLast 

db.query(`UPDATE employee SET last_name = "${newLast}" WHERE id = ${employeeId}`), function (err, results){} 

console.log (`\n${employee}'s last name was changed to ${newLast}\n`);
restart();
break;

case 'Title':
const title =(await inquirer.prompt([
{
type: 'list',
message: `What is ${employee}'s new title?`,
name: 'title',
choices: roles
}])).title

let tempvariable = title.split(" ",3);
titleId =tempvariable[0]; 

db.query(`UPDATE employee SET role_id = ${titleId} WHERE id = ${employeeId}`), function (err, results){}   

console.log (`\n${employee}'s title was changed to ${titleId}\n`);
restart(); 
break;

case 'Manager':
  let manager =(await inquirer.prompt([
{
type: 'list',
message: `Who is ${employee}'s new manager?`,
name: 'manager',
choices: names
}])).manager

let tempVariable = manager.split(" - ",2);
manager = tempVariable[1];
let managerId = tempVariable[0]; 

db.query(`UPDATE employee SET manager_id = ${managerId} WHERE id = ${employeeId}`), function (err, results){} 

console.log (`\n${employee}'s manager was changed to ${manager}\n`);
restart();    
break;}}           

//The following three functions(MakeDepartmentList, makeRoleList, makeNameList) are called at the beginning of each run of the 
//program to create lists to use by the respective inquirer menus when needed.  They are referencing global variables so that
//they can be used in that way.  They are called first thing, to ensure each list has the most current information possible.
//Since I use a "manager" table as well as the other three, that one is created new each time as well so I only have to update
//the employee table when the program is running. 

//This function (makeDepartmentList) makes a list of names of departments to be used when adding a new role where the 
//department id is needed.  Using the lists makes it so that the user doesn't have to memorize the codes. 
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

//This function (makeRoleList) is simlar to the above function.  It is required when an employee is added or changed and the 
//use needs to decide what the title is for that employee. Coincidently this is also the function that happens to rebuild the 
//manager database.  It just needed to be in one of these three. 
function makeRoleList(){
db.query("CREATE TABLE manager SELECT * FROM employee", function (err, results){});

db.query('SELECT CONCAT(id," - ",title) AS role FROM role', function (err, results){;

tabledRoles = results;

const useRoles=tabledRoles.map(role=>{
const pObj = JSON.parse(JSON.stringify(role));
let newRole = Object.values(pObj);
return newRole;});
roles=useRoles.flat();
return;})}

//This function (makeNameList) is the same as the other two.  The names are actually used quite often in the menu choices both
//to choose an employee by name as well as to choose their manager.  On use, however, the id numbers attached is what is actually used.
function makeNameList(){
    
db.query('SELECT CONCAT(id," - ",first_name," ",last_name) AS name FROM employee ORDER BY id', function (err, results) {

const tabledNames = results;

const useNames=tabledNames.map(name=>{
const pObj = JSON.parse(JSON.stringify(name));
let newName = Object.values(pObj);
return newName;});
names=useNames.flat();
return;})};
         
//Every menu option ends by sending here where the user is asked to quit or continue.  This is also the function that 'drops' the 
//manager table since, by the end of whatever was done, it could be already out of date.  The new one will be created then with
//the 'makeRoleList' function.          
function restart(){

db.query("DROP TABLE manager", function (err, results){});

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
process.exit(0)}})};


