//Global variables
var password = '1234';

// Create the AngularJS app
var app2 = angular.module('Chores', ['ChoreStorageService', 'ParentSuccessService', 'ui.bootstrap']);
//var app2 = angular.module('Chores', ['ChoreStorageService']);

//Create the AngularJS module named StorageService
//Create getLocalStorage service to access UpdateChores and getChores method  
var storageService = angular.module('ChoreStorageService', []);
storageService.factory('getChoresLocalStorage', function () {
    var choreList = {};
    return {
        list: choreList,
        updateChores: function (choresArr) {
            if (window.localStorage && choresArr) {
                //Local Storage to add Data  
                localStorage.setItem("chores", angular.toJson(choresArr));
            }
            choreList = choresArr;

        },
        getChores: function () {
            //Get data from Local Storage  
            choreList = angular.fromJson(localStorage.getItem("chores"));
            return choreList ? choreList : [];
        }
    };
});

var parentSuccessService = angular.module('ParentSuccessService', []);
parentSuccessService.factory('getParentSuccess', function () {
    return {
        setSuccess: function (success) {
            if (success === true) {
                window.localStorage.setItem("parentSuccess", true);
            };
            if (success === false) {
                window.localStorage.setItem("parentSuccess", false);
            };
        },
        getSuccess: function () {
            if (window.localStorage.getItem("parentSuccess") == null) {
                return false;
            }
            return window.localStorage.getItem("parentSuccess");
        }
    }
}
);


// Create the Controller
app2.controller('ChoresController', ['$scope', 'getChoresLocalStorage', 'getParentSuccess', '$window', function ($scope, getChoresLocalStorage, getParentSuccess, $window) {

    var date = new Date();
    var dateNow = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

    $scope.date = dateNow;

    $scope.appTitle = "Today's Chores - " + dateNow;
    //Read the Chore List from LocalStorage  
    $scope.chores = getChoresLocalStorage.getChores();

    //Add Chore - using AngularJS push to add Chore in the Chore Object  
    //Call Update Chore to update the locally stored Chore List  
    //Reset the AngularJS Chore scope  
    $scope.addChore = function () {
        $scope.chores.push({
            'choreName': $scope.choreName,
            'choreValue': $scope.choreValue,
            'choreActive': true,
            'choreCompletedDate': $scope.choreCompletedDate,
            'choreVerifiedDate': $scope.choreVerifiedDate
        });
        getChoresLocalStorage.updateChores($scope.chores);
    };

    //Delete Chore - Using AngularJS splice to remove the chore row from the Chore list  
    //$scope.deleteChore = function (chore) {
    //    $scope.chores.splice($scope.chores.indexOf(chore), 1);
    //    getChoresLocalStorage.updateChores($scope.chores);
    //};

    $scope.choreTotal = function () {
        var total = 0;
        $.each($scope.chores, function (i, chore) {
            if (chore.choreVerifiedDate != null) {
                total += chore.choreValue;
            };
        });
        //for (var chore in $scope.chores)
        //{
        //    console.log(chore.choreName + "+" + chore.choreVerifiedDate);
        //}
        return total;
    };

    $scope.toggleActiveChore = function (index) {
        if ($scope.chores[index].choreActive === true) {
            $scope.chores[index].choreActive = false;
        }
        else {
            $scope.chores[index].choreActive = true;
        }
        getChoresLocalStorage.updateChores($scope.chores);
    };

    $scope.getParentSuccess = getParentSuccess.getSuccess();
    $scope.setParentSuccess = getParentSuccess.setSuccess();

    $scope.getActiveFilter = function (chore) {
        switch ($scope.getParentSuccess) {
            case 'true':
                return chore;
            default:
                if (chore.choreActive)
                    return chore;
        };
        return chore;
    };

    $scope.childComplete = function (index) {
        if (typeof $scope.chores[index].choreCompletedDate !== "undefined") {
            $window.alert("Already completed");
            return;
        }
        var confirm = $window.confirm("Are you sure?");
        if (confirm) {
            $scope.chores[index].choreCompletedDate = dateNow;
            getChoresLocalStorage.updateChores($scope.chores);
        }
    };
    $scope.checkCompletedDate = function (index) {
        if ($scope.chores[index].choreCompletedDate != null) {
            return "fa fa-check fa-checked";
        }
        else {
            return "fa-check";
        }
    };

    $scope.choreVerifiedDate = function (index) {
        if ($scope.getParentSuccess !== "true") {
            alert("Log in to verify");
            return; //click of lock icon;
        }
        $scope.chores[index].choreVerifiedDate = dateNow;
        getChoresLocalStorage.updateChores($scope.chores);
    };
    $scope.checkVerifiedDate = function (index) {
        if ($scope.chores[index].choreVerifiedDate != null) {
            return "fa fa-check fa-checked";
        }
        else {
            return "fa-check";
        }
    };

    $scope.previouslyClicked = function (index, permission) {
        if (permission === "child") {
            if ($scope.chores[index].choreCompletedDate == undefined) {
                return false;
            }
        }
        if (permission === "parent") {
            if ($scope.chores[index].choreVerifiedDate == undefined) {
                return false;
            }
        }
        return false;
    };

    $scope.toggleLock = function () {
        getParentSuccess.setSuccess(false);
        location.reload();
    };

    //Angular uiBootstrap - not used
    //$scope.modalOpen = function () {
    //    var modalInstance = $uibModal.open({
    //        animation: $ctrl.animationsEnabled,
    //        ariaLabelledBy: 'modal-title',
    //        ariaDescribedBy: 'modal-body',
    //        templateUrl: 'myModalContent.html',
    //        controller: 'ModalInstanceCtrl',
    //        controllerAs: '$ctrl',
    //        size: size,
    //        resolve: {
    //            items: function () {
    //                return $ctrl.items;
    //            }
    //        }
    //    });
    //};

    $scope.parentUnlock = function () {
        parentUnlock();
    };

    function parentUnlock() {
        var $enteredValue = document.getElementById('passwordInput').value;
        if ($enteredValue === password) {
            document.getElementById('passwordInput').value = "";

            getParentSuccess.setSuccess(true);

            //reset to unlock icon and set lock ability
            //TODO: showHideParentalControls(true);
            $('#btnParentalLockClose').click();
            $('.modal').hide();
            location.reload();
        }
        else {
            document.getElementById('passwordInput').value = "";
            alert("Password incorrect!");
        }
    }


}]);


//function Chore(no, name, value, active, completedDate, verifiedDate){
//    this.no = no;
//    this.choreName = name;
//    this.value = value,
//    this.active = active;
//    this.completedDate = completedDate;
//    this.verifiedDate = verifiedDate;
//}