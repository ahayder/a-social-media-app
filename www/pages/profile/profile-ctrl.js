angular.module('freemig.profileController', [])

.controller('profileCtrl', profileCtrl)

profileCtrl.$inject = ['$scope', '$localStorage', 'Constants']

function profileCtrl($scope, $localStorage, Constants) {

    var vm = this;

    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;

    
};