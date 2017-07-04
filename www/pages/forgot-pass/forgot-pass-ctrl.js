angular.module('freemig.forgotPassController', [])

.controller('forgotCtrl', ['$scope', 'Constants', '$http', 'ionicToast',
function ($scope, Constants, $http, ionicToast) {

    var vm = this;

    var offset = new Date().getTimezoneOffset();
    vm.tz = -offset/60;


    vm.forgotPass = function(){
        ionicToast.show("Working...", "top", true, 2000);
        data = {
                    "tz": vm.tz,
                    "phone": vm.phone,
                    "country_code": "880",
                    "country_name": "bangladesh"
                }
        
        $http.post(Constants.apiurl + '/en/api/v0.1/app/auth/reset-password', data).then(
            function(response){
                console.log(response.data);
                ionicToast.show(response.data.data.msg, "top", false, 2000);
            },function(error){
                ionicToast.show("Error! Please try again.", "top", false, 2000);
            }
        );
    }


}]);