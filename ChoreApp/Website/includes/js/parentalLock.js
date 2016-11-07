//Global variables
//var password = '1234';
//var parentSuccess = false;


//$(document).ready(function() {
    //establish parentSuccess for icon and parent functions
    //var parentSuccessStorage = $('.body-content').data("parent-success");
    
    //if (parentSuccessStorage == null || parentSuccessStorage === "") {
    //    setParentSuccessService(false);
    //    parentSuccess = false;
    //};
    //if (parentSuccessStorage === "true" || parentSuccessStorage == true) {
    //    parentSuccess = true;
    //    showHideParentalControls(true);
    //};
    //if (parentSuccessStorage === "false" || parentSuccessStorage == false) {
    //    parentSuccess = false;
    //    showHideParentalControls(false);
    //};

    //Cycles through items to verify already checked child and parent checkmarks
    //var childCheckmarks = $('i[name=childCheckmark]');
    //var parentCheckmarks = $('i[name=parentCheckmark]');
    //$(childCheckmarks).each(function () {
    //    //check if completed already
    //    var index = this.getAttribute("index-child-value");
    //    var completeDate = angular.element(document.getElementById('ChoresController')).scope().chores[index].choreCompletedDate;
    //    if (completeDate != undefined) {
    //        $(this).css({ "color": "green" });
    //    }
    //});
    //$(parentCheckmarks).each(function () {
    //    //check if completed already
    //    var index = this.getAttribute("index-parent-value");
    //    var completeDate = angular.element(document.getElementById('ChoresController')).scope().chores[index].choreVerifiedDate;
    //    if (completeDate != undefined) {
    //        $(this).css({ "color": "green" });
    //    }
    //});
    
    ////Child chore check
    //$('i[name=childCheckmark]').on({
    //    'click': function (e) {
    //        //check if already clicked in the past
    //        if (previouslyClicked(this.attributes[2].value, "child") == false) {
    //            var response = confirmComplete();
    //            if (response == true) {
    //                $(this).css({ "color": "green" });
    //                //call to $scope.childComplete
    //                angular.element(document.getElementById('ChoresController')).scope().childComplete(this.attributes[2].value);
    //            }
    //        }
    //        else {
    //            alert("Already checked");
    //        }
    //    }
    //});

    ////Parent chore check / login modal if not logged in
    //$('i[name=parentCheckmark]').on({
    //    'click': function (e) {
    //        alert(this.data("child-index").value);
    //        //check if already clicked in the past
    //        if (previouslyClicked(this.attributes[2].value, "parent") == false) {
    //            if (parentSuccess != true) {
    //                $('#parentalLock').click();
    //            }
    //            if (parentSuccess) {
    //                $(this).css({ "color": "green" });
    //                //call to $scope.choreVerifiedDate
    //                angular.element(document.getElementById('ChoresController')).scope().choreVerifiedDate(this.attributes[2].value);
    //            }
    //        }
    //        else {
    //            alert("Already checked");
    //        }
    //    }
    //});

    ////Parent password submit
    //$('#passwordSubmit').on({
    //    'click': function (e) {
    //        parentUnlocked();
    //    }
    //});

    ////Parent complete - Relock child lock
    //$('#parentalUnlocked').on({
    //    'click': function (e) {
    //        parentLock();
    //    }
    //});

//    $('#btnSubmitAddChore').on("click", function () { $('#addChoreModal').modal('hide'); });
//});

//function confirmComplete() {
//    var confirmResponse;
//    if (confirm("Are you sure?") == true) {
//        confirmResponse = true;
//    } else {
//        confirmResponse = false;
//    }
//    return confirmResponse;
//}

//function setParentSuccessService(success) {
//    alert(success);
//    angular.element(document.getElementById('ChoresController')).scope().parentSuccessService.setSuccess(success);
//}
//function getParentSuccessService() {
//    return angular.element(document.getElementById('ChoresController')).scope().parentSuccessService.getSuccess();
//}

//function parentUnlocked() {
//    $enteredValue = document.getElementById('passwordInput').value;
//    if ($enteredValue == password) {
//        document.getElementById('passwordInput').value = "";
//        parentSuccess = true;
//        //window.localStorage.setItem("parentSuccess", true);
//        setParentSuccessService(true);
//        //reset to unlock icon and set lock ability
//        showHideParentalControls(true);
//        $('#btnParentalLockClose').click();
//        $('.modal').hide();
//    }
//    else {
//        document.getElementById('passwordInput').value = "";
//        alert("Password incorrect!");
//    }
//}

//function parentLock() {
//    parentSuccess = false;
//    //window.localStorage.setItem("parentSuccess", false);
//    setParentSuccessService(false);
//    showHideParentalControls(false);
//}

//function showHideParentalControls(unlock) {
//    if (unlock == true) {
//        $('#parentalUnlocked').show();
//        $('#parentalLock').hide();
//        $('#parentalControls').removeClass("hidden");
//        $('td[name=activeState], th[name=activeState]').removeClass("hidden");
//    }
//    else {
//        $('#parentalLock').show();
//        $('#parentalUnlocked').hide();
//        $('#parentalControls').addClass("hidden");
//        $('td[name=activeState], th[name=activeState]').addClass("hidden");
//    }
//}

//function previouslyClicked(index, permission) {
//    return angular.element(document.getElementById('ChoresController')).scope().previouslyClicked(index, permission);
//}