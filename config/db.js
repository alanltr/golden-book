var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'alan',
  password : 'alan',
  database : 'goldenbook'
});
 
connection.connect();

module.exports = connection;