db.query('SELECT CONCAT(id," - ",name) AS department FROM department"', function (err, results){
    console.log(results);
    console.table(results);
}