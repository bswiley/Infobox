
let listDepartments;
let departments;
const sql = require("mysql2");
const db = sql.createConnection({host: 'localhost', user: 'root', password: '4wm58f6t',database: 'personel_db'},console.log(`Connected to the classlist_db database.`));


function makeDepartmentList(){
    
  db.query('SELECT CONCAT(id," - ",name) AS department FROM department', function (err, results){
  
     tabledDepartments = results;
  
 listDepartments=tabledDepartments.map(department=>{
     const pObj = JSON.parse(JSON.stringify(department));
     let newDepartment = Object.values(pObj);
     return newDepartment;});
     departments=listDepartments.flat();
     console.log(departments);
     return; 
 })}
department = '3 - Engineering'
departmentParts = department.split(" ",3)
want = departmentParts[0];
console.log (want);



