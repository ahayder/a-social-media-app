angular.module('freemig.signinController', [])

.controller('signinCtrl', signinCtrl)

signinCtrl.$inject = ['SiginFactory', 'ionicToast', '$cordovaGeolocation', '$state', '$localStorage', '$ionicLoading']

function signinCtrl(SiginFactory, ionicToast, $cordovaGeolocation, $state, $localStorage, $ionicLoading) {

    var vm = this;

    vm.signinData = {};


    // Set the default value of inputType
   vm.inputType = 'password';


    // final login
    function finallyDoLogin(){

        vm.signinData.lat = vm.signinData.lat ? vm.signinData.lat : vm.signinData.lat = "";
        vm.signinData.lan = vm.signinData.lan ? vm.signinData.lan : vm.signinData.lan = "";

        SiginFactory.doSignin(vm.signinData).then(
            function (response) {
                response = response.data;
                if (response.status === "2000"){
                    $ionicLoading.hide();
                    $localStorage.user = response.data;
                    ionicToast.show("Login successful!", "top", false, 2000);
                    $state.go("app.tabs.home");
                } else if(response.status === "5000"){
                    $localStorage.user = "";
                    $ionicLoading.hide();
                    ionicToast.show("Please provide valid username or password.", "top", false, 3000);
                    //error
                } else if(response.status === "8000"){
                    $localStorage.user = "";
                    $ionicLoading.hide();
                    ionicToast.show("Error! Please try again.", "top", false, 3000);
                    //error
                } else{
                    $localStorage.user = "";
                    $ionicLoading.hide();
                    ionicToast.show("Error! Please try again.", "top", false, 3000);

                }
            },function(error){
                $localStorage.user = "";
                $ionicLoading.hide();
                ionicToast.show("Error! Please try again.", "top", false, 3000);
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
        $ionicLoading.show({
            template: 'Loading...'
        })
        // MARK:- Time zone
        var offset = new Date().getTimezoneOffset();
        vm.signinData.tz = -offset/60;
        // MARK:- Geolocation
        getUserLocation();
    }
    
    // Hide & show password function
    vm.hideShowPassword = function(){
        if (vm.inputType == 'password')
       vm.inputType = 'text';
        else
       vm.inputType = 'password';
    };
    
};