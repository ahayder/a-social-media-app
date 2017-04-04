angular.module('freemig.commentsController', [])

.controller('commentsCtrl', commentsCtrl)

commentsCtrl.$inject = ['$scope', '$localStorage', 'Constants', 'HomeFactory', '$ionicLoading']

function commentsCtrl($scope, $localStorage, Constants, HomeFactory, $ionicLoading) {

    $ionicLoading.show({
      template: 'Loading...'
    })

    var vm = this;
    vm.renderhtmlNow = false;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;


    var data = {"id":vm.user.userId,"tz":vm.user.userTZ}
    
};