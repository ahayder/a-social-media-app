angular.module('freemig.notificationsController', [])

.controller('notificationsCtrl', notificationsCtrl)

notificationsCtrl.$inject = ['$scope', 'Constants', '$http', '$localStorage']

function notificationsCtrl($scope, Constants, $http, $localStorage) {

    var vm = this;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;

    function init(pageno){
        var data = {"pageNo":pageno,"tz":vm.user.userTZ};
        $http.post(vm.apiurl + '/api/v0.1/app/notification/getAllNotification?token=' + vm.user.key, data).then(
            function(response){
                console.log(response)
            },function(error){
                console.log(error)
            }
        );
    }init(1)

    
};