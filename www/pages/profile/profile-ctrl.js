angular.module('freemig.profileController', [])

.controller('profileCtrl', profileCtrl)

profileCtrl.$inject = ['$scope', '$localStorage', 'Constants', 'ProfileFactory', '$ionicLoading']

function profileCtrl($scope, $localStorage, Constants, ProfileFactory, $ionicLoading) {

    $ionicLoading.show({
      template: 'Loading...'
    })

    var vm = this;
    vm.renderhtmlNow = false;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;


    var data = {"id":vm.user.userId,"tz":vm.user.userTZ}
    ProfileFactory.getCoverPhotoAndOthersInfo(vm.user.key, data).then(
        function(response){
            $ionicLoading.hide();
            console.log(response.data.data.data_info);
            vm.userOverview = response.data.data.data_info;
            vm.coverImage = vm.apiurl+vm.userOverview.cover;
            vm.proPic = vm.apiurl+vm.userOverview.avatar;
            vm.renderhtmlNow = true;
        },function(error){
            $ionicLoading.hide();
        }
    );

    
};