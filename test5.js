async function main() {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: 'root',password: '4wm58f6t', database: 'personel_db'});
    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM `department`');
console.log (rows);
console.table(rows);
printrows (rows);
}
function printrows(rows){
    console.log(rows);
    console.table(rows);
    console.log ("made it 15")
}
const results = await this.executeTransactions([
    {
        id: 'insert1',
        query: 'INSERT INTO user SET name = ?, age = ?',
        parameters: ['nick', 31],
    },
    {
        id: 'insert2',
        query: 'INSERT INTO user SET name = ?, age = ?',
        parameters: ['jeff', 1798],
    },
    {
        id: 'select',
        query: 'SELECT * FROM user WHERE id = ?',
        parameters: [1],
    },
    {
        id: 'delete',
        query: 'DELETE FROM user WHERE name = ?',
        parameters: ['jeff'],
    },
]);