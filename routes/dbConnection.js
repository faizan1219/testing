var mysql = require('mysql');

var poolOfConnection = mysql.createPool({
  host     : 'bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'h5ocpja96rcsw4ty',
  password : 'cd7d2et236n64btx',
  database : 'a701xr7ranlad92f'
})

module.exports = poolOfConnection;
