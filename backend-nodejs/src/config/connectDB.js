import mysql from 'mysql2'

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'database_web'
});

module.exports = connection;