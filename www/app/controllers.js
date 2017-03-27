angular.module('freemig.controllers', [])

.controller('AppCtrl', function($scope, $localStorage, $rootScope, Constants, $state, ionicToast, $http) {

  var vm = this;

  vm.apiurl = Constants.apiurl;

  if($rootScope.isLoggedin){
    vm.user = $localStorage.user;
  }

  vm.logout = function(){
    console.log("logout");
    $http.get(vm.apiurl + "/en/api/v0.1/app/auth/logout/?token="+vm.user.token.key).then(
      function(success){
        $localStorage.user = undefined;
        $rootScope.isLoggedin = false;
        ionicToast.show("Logout successful!", "top", false, 2000);
        $state.go("signin");
      },function(error){
        ionicToast.show("Error! Please try agin.", "top", false, 2000);
      }
    );
    
  }


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
