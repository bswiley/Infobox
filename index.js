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
                        makeNameList();
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
         console.log(`\n${department} added to departments\n`);
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
         console.log(`\n${role} added to roles\n`);
             restart()};       
function viewEmployees() {
// supposed to diplay the id, names, titles, departments, salaries, and managers of all employees
            db.query('SELECT department.name AS Department, role.title AS Title, role.salary AS Salary, employee.id AS Employee_Id, CONCAT(employee.first_name," ",employee.last_name) AS Employee, CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM role LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN manager ON employee.manager_id = manager.id ORDER BY employee.id',function (err, results) {
                console.table(results);
                restart();
              })
            };
    




                    

        

    
function updateE(nameList){
inquirer
    .prompt([
        {
            type: 'list',
            message: 'Whose data would you like to change?',
            name: 'change',
            choices: nameList
        },
    ])
    .then((response) => {
       choice = response.change;
       console.log ("Choice = "+choice)
       list=choice.split(' ',4);
       employeesId = list[0];
       firstName = list[2]
       lastName = list [3]
       console.log ("employeesId = "+employeesId)
       console.log ("firstName = "+firstName)
       changeHow(firstName);
    })  

    };

function changeHow(firstName){
        console.log("firstName = "+firstName)
       db.query(`SELECT * FROM employee WHERE id = "${employeesId}"`, function (err, results) {
        let test = results;
        console.table(test);})
    
        inquirer
        .prompt([
            {
                type: 'list',
                message: `What part of ${firstName}'s data would you like to change?`,
                name: 'what',
                choices: [`${firstName}'s first name`,
                `${firstName}'s last name`,
                `${firstName}'s role`,
                `${firstName}'s manager`]
            },
        ])
        .then((response) => {
           switch(response.what){
            case `${firstName}'s first_name`:
                inquirer
                .prompt([
                    {
                        type: 'input',
                        message: `What should ${firstName}'s new first name be?`,
                        name: 'newName',
                    },
                ])
                .then((response) => {
                firstNameChange(response.newName)});
            break;
            case `${firstName}'s last_name`:
                inquirer
                .prompt([
                    {
                        type: 'input',
                        message: `What should ${firstName}'s new last name be?`,
                        name: 'newName',
                    },
                ])
                .then((response) => {
                lastNameChange(response.newName)})
            break;
            case`${firstName}'s role_id`:
            roleId()
            break;
            case `${firstName}'s manager_id`:
            managerId
            break;
                }})};
function firstNameChange(newName){
    db.query(`UPDATE employee SET first_name = "${newName}" WHERE id = "${employeesId}"`, function (err, results) {
        let test = results});
    db.query(`SELECT * FROM employee WHERE id = "${employeesId}"`, function (err,results) {
        console.log (`You've just changed ${firstName}'s entry accordingly:`)
        console.table (results)
        console.log ("made it 220")
        restart()})
}
function lastNameChange(changeName){
    db.query(`UPDATE employee SET last_name = "${changeName}" WHERE id = "${employeesId}"`, function (err, results) {
        let test = results});
    db.query(`SELECT * FROM employee WHERE id = "${employeesId}"`, function (err,results) {
        console.log (`You've just changed ${firstName}'s entry accordingly:`)
        console.table (results)
        console.log ("made it 229")
        restart()})
}
function roleId(){

}
function managerId(){

}






    // db.query('SELECT CONCAT(first_name," ",last_name) AS name, id FROM employee ORDER BY last_name', function (err, results) {
    //         nameID = results;
    //         const employeeID = nameID.filter(function(person) {
    //             if (person.name === 'Ilie Albenscu'){
    //                 console.log (person.id)
    //                 updateEmployee(person.id)
    //                 }
    //           });        
    //       });

//this function should ask for the information required to add a new role and add it 
// function addRole() {
//     db.query("SELECT CONCAT(id," - ",name) AS department FROM department", function (err, results){
//             tabledDepartments = results;
//             console.log(tabledDepartments);
//             console.table(tabledDepartments);
//         const useDepartments=tabledDepartments.map(department=>{
//             const pObj = JSON.parse(JSON.stringify(department));
//             let newDepartment = Object.values(pObj);
//             return newDepartment;});
//             departments=useDepartments.flat();
//             console.log(departments);   
//     });
//     console.log("made it 287)")
//     inquirer.prompt([
//         {
//         type: 'input',
//         message: 'What is the name of the role you would like to add?',
//         name: 'newRole',
//         },
//         {  
//         type: 'list',
//         message: 'What department is the role connected to?',
//         name: 'owningDepartment',
//         options: departments     
        
//         },
//         {
//         type: 'input',
//         message: 'What is the salary of this role?',
//         name: 'assignedSalary'
//         }

//     ])
//     .then((response) => {
//         const { newRole, owningDepartment, assignedSalary } = response 
//         console.log(owningDepartment)  
//         const dep = split(owningDepartment,3)
//         console.log(dep[0],dep[1],dep[2])   
//         db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole}","${assignedSalary}","${dep}")`, function (err, results){});
//         db.query(`SELECT * FROM department WHERE name = "${newRole}")`, function (err, results){console.log(`${department} added to departments`);
//         console.table(results)
//     });
        // restart();})};

//this function should ask for the information required to add a new employee and and them
function addEmployee(){
    inquirer.prompt([
{
    type: 'input',
    message: 'What is the first_name of the new employee?',
    name: 'newFirst',
    },
    {
        type: 'input',
        message: 'What is the last_name of the new employee?',
        name: 'newLast',
        },
    {  
    type: 'list',
    message: 'What department is the role connected to?',
    name: 'owningDepartment',
    options: departments     
    
    },
    {
    type: 'input',
    message: 'What is the salary of this role?',
    name: 'assignedSalary'
    }
    ])};
//this function should ask for the information to update an employee and update them
function updateEmployee(){

            }
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
                        makeDepartmentList();
                        init();
                        }else{
                        process.exit(0)
                    }
            })}


