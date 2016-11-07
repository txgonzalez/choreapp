function initEmployeeApp() {
    // Create the AngularJS app
    var app = angular.module('Employees', ['EmployeeStorageService']);

    // Create the Controller
    app.controller('EmployeesController', ['$scope', 'getEmployeeLocalStorage', function ($scope, getEmployeeLocalStorage) {

        var date = new Date();
        var dateNow = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

        $scope.appTitle = "Today's Chores - " + dateNow;

        //Read the Employee List from LocalStorage  
        $scope.employees = getEmployeeLocalStorage.getEmployees();

        //Count the Employee List  
        $scope.count = $scope.employees.length;


        //Add Employee - using AngularJS push to add Employee in the Employee Object  
        //Call Update Employee to update the locally stored Employee List  
        //Reset the AngularJS Employee scope  
        //Update the Count  
        $scope.addEmployee = function () {
            $scope.employees.push({ 'empno': $scope.empno, 'empname': $scope.empname, 'empsalary': $scope.empsalary });
            getEmployeeLocalStorage.updateEmployees($scope.employees);
            $scope.empno = '';
            $scope.empname = '';
            $scope.empsalary = '';
            $scope.count = $scope.employees.length;
        };

        //Delete Employee - Using AngularJS splice to remove the emp row from the Employee list  
        //All the Update Employee to update the locally stored Employee List  
        //Update the Count  
        $scope.deleteEmployee = function (emp) {
            $scope.employees.splice($scope.employees.indexOf(emp), 1);
            getEmployeeLocalStorage.updateEmployees($scope.employees);
            $scope.count = $scope.employees.length;
        };
    }]);


    //Create the AngularJS module named StorageService
    //Create getEmployeeLocalStorage service to access UpdateEmployees and getEmployees method  
    var storageService = angular.module('EmployeeStorageService', []);
    storageService.factory('getEmployeeLocalStorage', function () {
        var employeeList = {};
        return {
            list: employeeList,
            updateEmployees: function (EmployeesArr) {
                if (window.localStorage && EmployeesArr) {
                    //Local Storage to add Data  
                    localStorage.setItem("employees", angular.toJson(EmployeesArr));
                }
                employeeList = EmployeesArr;

            },
            getEmployees: function () {
                //Get data from Local Storage  
                employeeList = angular.fromJson(localStorage.getItem("employees"));
                return employeeList ? employeeList : [];
            }
        };

    });
}
