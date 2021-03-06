var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees');
var monthlyBudget = require('./routes/monthlybudget');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/employees', employees);

app.use('/monthlybudget', monthlyBudget);

app.use(express.static(path.resolve('./server/public')));

app.get('/monthlybudget', function(req, res) {
    res.send("hello from the server");
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(3000, function() {
  console.log("server running, check localhost:3000");
});
