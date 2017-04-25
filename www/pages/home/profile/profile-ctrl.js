angular.module('freemig.profileController', [])

.controller('profileCtrl', profileCtrl)

profileCtrl.$inject = ['$scope', 
'$localStorage', 
'Constants', 
'ProfileFactory', 
'$ionicLoading', 
'$ionicModal',
'ionicToast']

function profileCtrl($scope, 
$localStorage, 
Constants, 
ProfileFactory, 
$ionicLoading, 
$ionicModal,
ionicToast) {

    $ionicLoading.show({
      template: 'Loading...'
    })

    var vm = this;
    vm.renderhtmlNow = false;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;


    

    function init(){
        var data = {"id":vm.user.userId,"tz":vm.user.userTZ}
        ProfileFactory.getCoverPhotoAndOtherInfo(vm.user.key, data).then(
            function(response){
                $ionicLoading.hide();
                console.log(response.data.data.data_info);
                vm.userOverview = response.data.data.data_info;
                vm.coverImage = vm.apiurl+vm.userOverview.cover;
                vm.proPic = vm.apiurl+vm.userOverview.avatar;
                vm.renderhtmlNow = true;
            },function(error){
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        )
        widgetInfo();
    }init();


    // Modal
    vm.openModal = function(modalName) {
        
        if(modalName == "connections"){
            allConnections();
        }else if(modalName == "followers"){
            allFollowers();
        }else if(modalName == "following"){
            allFollowing();
        }

        $ionicModal.fromTemplateUrl('pages/modals/'+modalName+'-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

    };

    vm.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    function allConnections(){
        $ionicLoading.show({
            template: 'Loading...'
        })
        ProfileFactory.getAllConnections(vm.user.key, vm.user.userTZ).then(
            function(response){
                $ionicLoading.hide();
                console.log(response);
                vm.connections = response.data.data.data_info;
            },function(error){
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    function allFollowing(){
        $ionicLoading.show({
            template: 'Loading...'
        })
        ProfileFactory.getAllFollowing(vm.user.key).then(
            function(response){
                $ionicLoading.hide();
                vm.following = response.data.data.data_info;
            },function(error){
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    function allFollowers(){
        $ionicLoading.show({
            template: 'Loading...'
        })
        ProfileFactory.getAllFollowers(vm.user.key).then(
            function(response){
                $ionicLoading.hide();
                console.log(response);
                vm.followers = response.data.data.data_info;
            },function(error){
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    function widgetInfo(){
        var data = {"userId":vm.user.userId,"tz":vm.user.userTZ};
        ProfileFactory.getWidgetInfo(vm.user.key, data).then(
            function(response){
                console.log(response.data.data.data_info);
                vm.widgetInfo = response.data.data.data_info;
            },function(error){
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    
};