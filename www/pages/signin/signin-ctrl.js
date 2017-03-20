angular.module('freemig.signinController', [])

.controller('signinCtrl', signinCtrl)

signinCtrl.$inject = ['$http', 'SiginFactory', 'ionicToast', '$cordovaGeolocation', '$state', '$localStorage']

function signinCtrl($http, SiginFactory, ionicToast, $cordovaGeolocation, $state, $localStorage) {

    var vm = this;

    vm.signinData = {};


    // final login
    function finallyDoLogin(){
        console.log(vm.signinData);

        vm.signinData.lat = vm.signinData.lat ? vm.signinData.lat : vm.signinData.lat = "";
        vm.signinData.lan = vm.signinData.lan ? vm.signinData.lan : vm.signinData.lan = "";

        SiginFactory.doSignin(vm.signinData).then(
            function (response) {
                console.log(response);
                response = response.data;
                if (response.status === "2000"){
                    if($localStorage.user){$localStorage.user = "";}
                    $localStorage.user = response.data;
                    console.log($localStorage.user)
                    ionicToast.show("You are logged in now", "top", false, 2000);
                    $state.go("tabs.home");
                } else if(response.status === "5000"){
                    ionicToast.show("Error! Please try again.", "top", false, 3000);
                    //error
                } else if(response.status === "8000"){
                    ionicToast.show("Error! Please try again.", "top", false, 3000);
                    //error
                } else{

                }
            },function(error){
                console.log(error);
            });
    }// final login

    // get positioin
    function getUserLocation() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        try{
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    vm.signinData.lat = position.coords.latitude;
                    vm.signinData.lan = position.coords.longitude;
                    finallyDoLogin();
                }, function(error) {
                    finallyDoLogin();
                    switch(error.code){
                        case error.PERMISSION_DENIED:
                            //console.log("User denied the request for Geolocation.")
                            ionicToast.show("Pleasae share your position for better experience with Freemig", "top", false, 3000);
                            break;
                        case error.POSITION_UNAVAILABLE:
                            //console.log("Location information is unavailable.")
                            ionicToast.show("Position unavailable", "top", false, 3000);
                            break;
                        case error.TIMEOUT:
                            //console.log("The request to get user location timed out.")
                            ionicToast.show("Request Timeout", "top", false, 3000);
                            break;
                        case error.UNKNOWN_ERROR:
                            //console.log("An unknown error occurred.")
                            ionicToast.show("Unknown error occured", "top", false, 3000);
                            break;
                    }
                });
        }catch(e){
            console.log(vm.signinData);
            SiginFactory.doSignin(vm.signinData).then(
                function (response) {
                    console.log(response);
                    // if (response.status === 2000) {
                    //     $state.go("home");
                    // } else if(){
                    //     //error
                    // }
                },function(error){
                    console.log(error);
                });
        }
    }// get positioin

    // sign in
    vm.signin = function(){
        // MARK:- Time zone
        var offset = new Date().getTimezoneOffset();
        vm.signinData.tz = -offset/60;
        // MARK:- Geolocation
        getUserLocation();
    }
    
};