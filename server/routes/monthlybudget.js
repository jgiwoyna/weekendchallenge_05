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

    client.query('SELECT SUM (annual_salary/12) as monthly_expenditures FROM employees',
    function(err, result) {
      done();

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
        // console.log(result);
        res.send(result.rows);
    });
  });
});

module.exports = router;
