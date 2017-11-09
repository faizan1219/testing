var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var poolOfConnection = require('./dbConnection');

router.get('/:userId', function(req, res) {
  var userId = req.params.userId; 
  var sql = 'Select * From endpointUser WHERE userId = ?';
  var inserts = [userId] ;
  sql = mysql.format(sql, inserts);
  poolOfConnection.getConnection(function(error, connection) {
    if (error) throw error;
    else {
      connection.query(sql, function(err, results) {
        connection.release();
        if(err) throw err;
        else {
          res.json(results);
        }
      })
    }
    
  })
})

/* GET users listing. */
router.get('/', function(req, res) {
  var sql = 'Select * From endpointUser';
  poolOfConnection.getConnection(function(error, connection) {
    connection.release();
    if(error) throw error;
    else {
      connection.query(sql, function(err, result) {
        if(err) throw err;
        else {
          res.json(result);
        }
      })
    }
  })
});

router.post('/', function(req, res) {
  console.log(req.body);
  var username = req.body.username || '';
  var name = req.body.name || '';
  var email = req.body.email || '';
  var password = req.body.passwrod || '';
  var dpURL = req.body.dpURL || '';
  var salary = req.body.salary || null;
  var gender = req.body.gender || '';
  var dob = req.body.dob || '';
  var isMarried = req.body.isMarried || false;

  var inserts = [username, name, email, dob, gender, salary, isMarried, password, dpURL];
  var sql = 'INSERT INTO endpointUser(username, name, email, dob, gender, salary, isMarried, password, dpURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  sql = mysql.format(sql, inserts);

  poolOfConnection.getConnection(function(error, connection) {
    if(error) throw error;
    else {
      connection.query(sql, function(err, result) {
        connection.release();
        if(err) throw err;
        else {
          res.json(result);
        }
      })
    }
  })
});

router.put('/', function(req, res) {
  var insertsForUpdate;
  var userId      = req.body.userId;
  var username    = req.body.username;
  var name        = req.body.name;
  var email       = req.body.email;
  var salary      = req.body.salary;
  var gender      = req.body.gender;
  var dob         = req.body.dob;
  var isMarried   = req.body.isMarried;
  var password    = req.body.passwrod;
  var dpURL       = req.body.dpURL;

  var sqlForUpdate     = 'UPDATE endpointUser SET username = ?';
  var sqlForCurrent    = 'Select * From endpointUser WHERE userId = ?';
  var insertForCurrent = [userId] ;
  sqlForCurrent        = mysql.format(sqlForCurrent, insertForCurrent);

  poolOfConnection.getConnection(function(error, connection) {
    if (error) throw error;
    else {
      connection.query(sqlForCurrent, function(err, results) {
        if(err) throw err;
        else {
          insertsForUpdate = [results[0].username];
          if(username != results[0].name) {
            sqlForUpdate += ', name = ?';
            insertsForUpdate[0] = username;
          }
          if(name != results[0].name) {
            sqlForUpdate += ', name = ?';
            insertsForUpdate.push(name);
          }
          if(email != results[0].email) {
            sqlForUpdate += ', email = ?';
            insertsForUpdate.push(email);
          }
          if(salary != results[0].salary) {
            sqlForUpdate += ', salary = ?';
            insertsForUpdate.push(salary);
          }
          if(gender != results[0].gender) {
            sqlForUpdate += ', gender = ?';
            insertsForUpdate.push(gender);
          }
          if(dob != results[0].dob) {
            sqlForUpdate += ', dob = ?';
            insertsForUpdate.push(dob);
          }
          if(isMarried != results[0].isMarried) {
            sqlForUpdate += ', isMarried = ?';
            insertsForUpdate.push(isMarried);
          }
          if(password != results[0].password) {
            sqlForUpdate += ', password = ?';
            insertsForUpdate.push(password);
          }
          if(dpURL != results[0].dpURL) {
            sqlForUpdate += ', dpURL = ?';
            insertsForUpdate.push(dpURL);
          }
          sqlForUpdate += ' WHERE userId = ?';
          insertsForUpdate.push(userId);

          sqlForUpdate = mysql.format(sqlForUpdate, insertsForUpdate);
          poolOfConnection.getConnection(function(error, connection) {
            if(error) throw error;
            else {
              connection.query(sqlForUpdate, function(err, result) {
                connection.release();
                if(err) throw err;
                else {
                  res.json(result);
                }
              })
            }
          })
        }
      })
    }
  })
});

router.delete('/:userId', function(req, res) {
  console.log('in3')
  var userId = req.params.userId; 
  var sql = 'DELETE FROM endpointUser WHERE userId = ?';
  var inserts = [userId] ;
  sql = mysql.format(sql, inserts);
  poolOfConnection.getConnection(function(error, connection) {
    if (error) throw error;
    else {
      connection.query(sql, function(err, results) {
        connection.release();
        if(err) throw err;
        else {
          res.json(results);
        }
      })
    }
    
  })
})

module.exports = router;
