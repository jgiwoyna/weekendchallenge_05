var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/mb', {
      templateUrl: '/views/templates/home.html',
      controller: 'MonthlyBudgetController',
      controllerAs: 'mb'
    })
    .when('/employees' ,{
      templateUrl: '/views/templates/employees.html',
      controller: 'EmployeesController',
      controllerAs: 'employees'
    })
    .otherwise({
      redirectTo: 'mb'
    });

}]);

app.controller('MonthlyBudgetController', ['$http', function($http) {
  console.log('mb controller running');
  var self = this;
  self.mb = {};
  getBudget();

function getBudget(){
  $http.get('/monthlybudget')
    .then(function(res) {
      res.data.monthly_expenditures = self.mb;
      console.log('res.data: ', res.data);
      console.log(self.mb);
    })
  }
}]);

app.controller('EmployeesController',["$http", function($http) {
  console.log('Employees controller running');
  var self = this;
  self.employees = [];

  getEmployees();

  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        console.log(response.data);
        self.employees = response.data;
      });
  }

  self.addEmployee = function() {
  console.log('new employee: ', self.newEmployee);
  $http.post('/employees', self.newEmployee)
    .then(function(response) {
      console.log('POST finished.');
      getEmployees();
    });
}

}]);
