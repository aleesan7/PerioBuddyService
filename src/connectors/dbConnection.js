var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'periobuddy-db.cdkqiecwyunu.us-east-2.rds.amazonaws.com', // Replace with your host name
    user: 'admin',      // Replace with your database username
    password: '123456789',      // Replace with your database password
    database: 'PerioBuddy' // Replace with your database Name
}); 
 
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = conn;