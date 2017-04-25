angular.module('freemig.controllers', [])

  .controller('AppCtrl', function ($scope, $localStorage, $rootScope, Constants, $state, ionicToast, $http) {

    var vm = this;

    vm.apiurl = Constants.apiurl;

    if ($rootScope.isLoggedin) {
      vm.user = $localStorage.user;
    }

    vm.logout = function () {
      console.log(vm.user.token)
      // return;
      $http.get(vm.apiurl + "/en/api/v0.1/app/auth/logout?token=" + vm.user.token.key).then(
        function (success) {
          $localStorage.user = "";
          $rootScope.isLoggedin = false;
          ionicToast.show("Logout successful!", "top", false, 2000);
          $state.go("signin");
        }, function (error) {
          ionicToast.show("Error! Please try agin.", "top", false, 2000);
        })
    }


    vm.testSms = function(){
        var data = {"country_code":"880","country_name":"Bangladesh","token":"123456","phone":"+8801710125431"};

        $http.post(vm.apiurl + '/en/app/api/v0.1/social/send-sms-phone', data).then(
            function(res){
                console.log(res);
            },function(err){
                console.log(err)
            }
        );
    }


  });
