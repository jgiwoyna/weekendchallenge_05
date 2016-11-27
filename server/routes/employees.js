var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req, res) {
  console.log('get request');

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
        console.log('connection error: ', err);
        res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function(err, result) {
      done();

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
        res.send(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  var newEmployee = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO employees (first_name, last_name, id_number, job_title, annual_salary, active) ' +
      'VALUES ($1, $2, $3, $4, $5, $6)',
      [newEmployee.first_name, newEmployee.last_name, newEmployee.id_number, newEmployee.job_title, newEmployee.annual_salary, newEmployee.active],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });
});

router.put('/:id', function(req, res) {
  console.log('put request');
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('put connection error: ', err);
      res.sendStatus(500);
    }

    client.query('UPDATE employees SET active = NOT active WHERE id=$1', [id],
      function(err, result) {
        done();

        if(err) {
          console.log('update query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });//end connect
});//end route

module.exports = router;
