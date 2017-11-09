var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var poolOfConnection = require('./dbConnection');

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
  var username = req.body.username;
  var name = req.body.name;
  var email = req.body.email;
  var salary = req.body.salary;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var isMarried = req.body.isMarried;

  var inserts = [username, name, email, dob, gender, salary, isMarried];
  var sql = 'INSERT INTO endpointUser(username, name, email, dob, gender, salary, isMarried) VALUES (?, ?, ?, ?, ?, ?, ?)';
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
  var userId = req.body.userId;
  var username = req.body.username;
  var name = req.body.name;
  var email = req.body.email;
  var salary = req.body.salary;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var isMarried = req.body.isMarried;

  var inserts = [username, name, email, dob, gender, salary, isMarried, userId];
  var sql = 'UPDATE endpointUser SET username = ?,  name = ?, email = ?, dob = ?, gender = ?, salary = ?, isMarried = ? WHERE userId = ?';
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
